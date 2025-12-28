import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  Calendar, MapPin, ArrowRight, Sparkles, 
  Target, TrendingUp, Users, Mic, Rocket, 
  Lightbulb, Globe, CheckCircle2, Zap, Award, Coffee, Image, Handshake, PlayCircle, Star, Hash, Ticket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic, FadeIn, TextReveal } from '../components/UIEffects';

// Wrapper for animated icons
const AnimatedIcon: React.FC<{ children: React.ReactNode; colorClass?: string }> = ({ children, colorClass = "text-brand-yellow" }) => {
  return (
    <div className={`transform transition-all duration-500 hover:scale-125 hover:rotate-12 ${colorClass}`}>
      {children}
    </div>
  );
};

// Countdown Unit
const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center justify-center ios-glass-dark border border-white/20 rounded-2xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] shadow-lg relative overflow-hidden group hover:bg-white/15 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <span className="text-3xl sm:text-4xl font-black text-white tabular-nums animate-tick">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] sm:text-xs text-brand-yellow uppercase tracking-widest font-bold mt-1">{label}</span>
    </div>
  );
};

const SponsorsMarquee = () => {
    const { sponsors } = useData();
    if (sponsors.length === 0) return null;

    return (
        <div className="py-12 bg-white border-b border-slate-100 overflow-hidden relative z-20">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Backed by Industry Leaders</p>
            </div>
            <div className="flex animate-marquee hover:[animation-play-state:paused] items-center space-x-16 w-fit">
                {/* Doubled for seamless loop */}
                {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((s, i) => (
                    <div key={i} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 px-4 group">
                        <img src={s.logo} alt={s.name} className="h-10 md:h-12 w-auto object-contain max-w-[150px] transform group-hover:scale-110 transition-transform" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const Summit: React.FC = () => {
  const { summitConfig, speakers, highlights, experienceItems } = useData();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const iconMap: any = {
      Mic: <Mic />,
      Coffee: <Coffee />,
      Award: <Award />,
      Zap: <Zap />
  };

  // --- Particle Animation Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    const colors = ['#0033A0', '#3B82F6', '#FFC72C']; // Brand Colors

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    resize();

    // Mouse tracking
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.directionX = (Math.random() * 1.5) - 0.75; // Slower speed for better performance
        this.directionY = (Math.random() * 1.5) - 0.75;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Movement
        this.x += this.directionX;
        this.y += this.directionY;

        // Boundary check
        if (canvas) {
          if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
          if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        }

        // Mouse Interaction - Optimization: Simple box check before distance calculation
        if (Math.abs(mouse.x - this.x) < 120 && Math.abs(mouse.y - this.y) < 120) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const forceDirectionX = dx / distance;
              const forceDirectionY = dy / distance;
              const force = (120 - distance) / 120;
              const directionX = forceDirectionX * force * 3; // Push strength
              const directionY = forceDirectionY * force * 3;
              
              this.x -= directionX;
              this.y -= directionY;
            }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Optimization: Significantly reduced particle count for performance
      // Was / 15000, increased divisor to 25000 to reduce count
      const numberOfParticles = (canvas.width * canvas.height) / 25000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particleCount = particles.length;
      const connectionDistance = 100;
      const connectionDistanceSq = connectionDistance * connectionDistance; // Optimization

      for (let i = 0; i < particleCount; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles - Optimized loop
        for (let j = i; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          // Optimization: Skip vertical calculation if horizontal is already too far
          if (Math.abs(dx) > connectionDistance) continue;
          
          const dy = particles[i].y - particles[j].y;
          if (Math.abs(dy) > connectionDistance) continue;

          // Optimization: Compare squared distance to avoid Math.sqrt
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < connectionDistanceSq) {
             ctx.beginPath();
             // Only calculate sqrt for opacity if we are drawing
             const distance = Math.sqrt(distanceSq);
             ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/connectionDistance})`;
             ctx.lineWidth = 0.5;
             ctx.moveTo(particles[i].x, particles[i].y);
             ctx.lineTo(particles[j].x, particles[j].y);
             ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Dynamic date parsing
    const targetDate = new Date(summitConfig.targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [summitConfig.targetDate]);


  return (
    <div className="bg-slate-50 min-h-screen font-sans relative overflow-x-hidden selection:bg-brand-yellow selection:text-brand-dark">
      
       {/* Global Background Blobs for Glass Effect */}
       <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-lightBlue/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob"></div>
         <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-yellow/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-2000"></div>
         <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-4000"></div>
      </div>

      <style>{`
          @keyframes tick { 0% { transform: translateY(-10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
          .animate-tick { animation: tick 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradient-shift 8s ease infinite;
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-32 bg-brand-dark overflow-hidden min-h-[95vh] flex items-center border-b border-white/5">
        {/* Animated Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-blue-950 to-slate-900 animate-gradient-shift opacity-100"></div>
        
        {/* INTERACTIVE PARTICLE CANVAS */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pointer-events-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-white z-20">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-dark border border-white/20 text-brand-yellow text-xs font-bold uppercase tracking-widest mb-8 hover:bg-white/10 transition-colors cursor-default">
                   <Sparkles className="w-4 h-4 animate-pulse" />
                   <span>{summitConfig.subHeadline}</span>
                </div>
              </FadeIn>
              
              <FadeIn delay={200}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
                   {summitConfig.headline.split(' ').map((word, i) => (
                      <span key={i} className={`block ${i === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-white to-blue-300' : ''}`}>
                        {word}
                      </span>
                   ))}
                </h1>
              </FadeIn>
              
              <FadeIn delay={400}>
                <p className="text-xl text-blue-100 font-light leading-relaxed max-w-lg mb-10 ios-glass-dark p-6 rounded-3xl border-l-4 border-brand-yellow/80 backdrop-blur-xl">
                  {summitConfig.description}
                </p>
              </FadeIn>

              {/* Countdown */}
              <FadeIn delay={600}>
                <div className="mb-12">
                  <p className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4 flex items-center gap-2"><Hash className="w-4 h-4" /> Time Until Launch</p>
                  <div className="flex flex-wrap gap-3">
                    <CountdownUnit value={timeLeft.days} label="Days" />
                    <CountdownUnit value={timeLeft.hours} label="Hours" />
                    <CountdownUnit value={timeLeft.minutes} label="Mins" />
                    <CountdownUnit value={timeLeft.seconds} label="Secs" />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={800}>
                <div className="flex flex-col sm:flex-row gap-4">
                   <Magnetic>
                     <Link to="/register" className="group px-8 py-4 bg-brand-yellow text-brand-blue font-bold rounded-full hover:bg-white transition-all shadow-[0_0_40px_rgba(255,199,44,0.3)] flex items-center justify-center gap-2 text-lg">
                        Secure Your Seat <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </Link>
                   </Magnetic>
                   <Magnetic>
                     <div className="flex items-center gap-4 px-6 py-4 ios-glass-dark rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                        <Calendar className="text-white w-5 h-5" />
                        <div className="text-sm">
                           <span className="block font-bold text-white">{summitConfig.dateText}</span>
                           <span className="block text-blue-300">{summitConfig.location}</span>
                        </div>
                     </div>
                   </Magnetic>
                </div>
              </FadeIn>
            </div>

            {/* Right Visual */}
            <div className="w-full lg:w-1/2 relative lg:h-[600px] flex items-center justify-center">
               <FadeIn delay={400} className="w-full max-w-md mx-auto lg:max-w-full">
                  <div className="relative z-10 ios-glass-dark p-3 rounded-[2.5rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 w-full">
                      <img src={summitConfig.heroImage} alt="Summit Vibe" className="w-full h-[400px] lg:h-[550px] object-cover rounded-[2rem]" />
                      
                      {/* Floating Stats - Dynamic from Context */}
                      {summitConfig.stats[0] && (
                        <div className="absolute -left-4 md:-left-8 top-12 ios-glass p-5 rounded-2xl shadow-xl animate-float backdrop-blur-xl border border-white/40">
                          <div className="flex items-center gap-3">
                              <div className="p-3 bg-blue-100 text-brand-blue rounded-full"><Users size={24} /></div>
                              <div>
                                <p className="text-2xl font-black text-slate-900">{summitConfig.stats[0].value}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase">{summitConfig.stats[0].label}</p>
                              </div>
                          </div>
                        </div>
                      )}

                      {summitConfig.stats[1] && (
                        <div className="absolute -right-4 md:-right-8 bottom-20 ios-glass-dark p-5 rounded-2xl shadow-xl animate-float-delayed text-white backdrop-blur-xl border border-white/20">
                          <div className="flex items-center gap-3">
                              <div className="p-3 bg-white/20 text-brand-yellow rounded-full"><TrendingUp size={24} /></div>
                              <div>
                                <p className="text-2xl font-black">{summitConfig.stats[1].value}</p>
                                <p className="text-xs text-blue-200 font-bold uppercase">{summitConfig.stats[1].label}</p>
                              </div>
                          </div>
                        </div>
                      )}
                  </div>
               </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SPONSORS SECTION */}
      <SponsorsMarquee />

      {/* 3. THE EXPERIENCE (Value Prop) */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-blue/5 rounded-full blur-[100px] -z-10"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn className="mb-16 text-center md:text-left">
               <h2 className="text-brand-blue font-bold text-sm uppercase tracking-widest mb-3 flex items-center justify-center md:justify-start gap-2"><Sparkles size={16}/> The Experience</h2>
               <h3 className="text-4xl md:text-5xl font-black text-slate-900">What to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500">Expect</span></h3>
               <p className="text-slate-500 mt-4 max-w-2xl text-lg font-medium">Curated tracks designed to maximize value for every attendee.</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {experienceItems.map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 100} className={`${idx % 2 !== 0 ? 'md:translate-y-12' : ''}`}>
                    <div className="ios-glass p-10 rounded-[2.5rem] ios-card-hover group transition-all duration-300 border border-white/60 h-full">
                      <div className="flex items-start justify-between mb-6">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.colorClass} shadow-lg group-hover:scale-110 transition-transform`}>
                            {iconMap[item.iconName] ? React.cloneElement(iconMap[item.iconName] as React.ReactElement, { className: "w-8 h-8" }) : <Star size={28} />}
                          </div>
                          <span className="text-6xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">0{idx + 1}</span>
                      </div>
                      <h4 className="text-2xl font-bold mb-3 text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </FadeIn>
               ))}
            </div>
         </div>
      </section>

      {/* 4. AUDIENCE (Who is this for) */}
      <section className="py-24 relative z-10 bg-slate-100/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-16">
               <h2 className="text-brand-blue font-bold text-sm uppercase tracking-widest mb-3">Target Audience</h2>
               <h3 className="text-3xl md:text-4xl font-black text-slate-900">Who Belongs Here?</h3>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               {/* Founders Card */}
               <FadeIn delay={200}>
                 <div className="ios-glass bg-white rounded-[2.5rem] p-10 ios-card-hover border-l-8 border-brand-blue relative overflow-hidden group h-full">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-brand-blue/5 rounded-bl-[100px] transition-transform group-hover:scale-150 duration-700"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                          <div className="p-4 bg-brand-blue text-white rounded-2xl shadow-lg shadow-brand-blue/20"><Rocket size={32} /></div>
                          <div>
                            <h3 className="text-2xl font-black text-slate-900">Founders</h3>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-wide">Visionaries & Builders</p>
                          </div>
                      </div>
                      <ul className="space-y-4">
                          <li className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={16} /></div>
                            <span className="font-bold text-slate-700">Seeking Seed to Series A funding</span>
                          </li>
                          <li className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={16} /></div>
                            <span className="font-bold text-slate-700">Looking for strategic mentorship</span>
                          </li>
                          <li className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={16} /></div>
                            <span className="font-bold text-slate-700">Validating business models</span>
                          </li>
                      </ul>
                    </div>
                 </div>
               </FadeIn>

               {/* Investors Card */}
               <FadeIn delay={400}>
                 <div className="ios-glass-dark bg-slate-900 rounded-[2.5rem] p-10 text-white ios-card-hover border-l-8 border-brand-yellow relative overflow-hidden group h-full">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-[100px] transition-transform group-hover:scale-150 duration-700"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                          <div className="p-4 bg-brand-yellow text-brand-dark rounded-2xl shadow-lg shadow-brand-yellow/20"><TrendingUp size={32} /></div>
                          <div>
                            <h3 className="text-2xl font-black">Investors</h3>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-wide">Angels & VCs</p>
                          </div>
                      </div>
                      <ul className="space-y-4">
                          <li className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow"><CheckCircle2 size={16} /></div>
                            <span className="font-bold text-blue-100">Scouting pre-vetted deal flow</span>
                          </li>
                          <li className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow"><CheckCircle2 size={16} /></div>
                            <span className="font-bold text-blue-100">Diversifying African portfolios</span>
                          </li>
                          <li className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-yellow"><CheckCircle2 size={16} /></div>
                            <span className="font-bold text-blue-100">Connecting with enablers</span>
                          </li>
                      </ul>
                    </div>
                 </div>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 5. SPEAKERS (Credibility) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-16">
               <div>
                   <span className="text-brand-blue font-bold uppercase tracking-widest text-sm">Lineup</span>
                   <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Industry Voices</h2>
               </div>
               <div className="hidden md:block">
                   <Link to="/team" className="text-sm font-bold text-slate-500 hover:text-brand-blue transition-colors flex items-center gap-1">View Full Team <ArrowRight size={14} /></Link>
               </div>
           </FadeIn>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {speakers.map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] shadow-lg cursor-pointer border border-white/30 bg-slate-200">
                    <img src={`components/${s.imageUrl}`} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                          <p className="text-white font-bold text-xl">{s.name}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-brand-yellow text-brand-dark text-xs font-bold uppercase rounded-md tracking-wider">{s.role}</span>
                        </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
           </div>
        </div>
      </section>

      {/* 6. PAST HIGHLIGHTS (Social Proof) */}
      <section className="py-24 relative bg-slate-900 text-white overflow-hidden">
         <div className="absolute inset-0 bg-brand-blue/10"></div>
         {/* Decorative Grid */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn className="text-center mb-16">
               <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Gallery</span>
               <h2 className="text-4xl font-black text-white mt-2">Past Highlights</h2>
               <p className="text-blue-200 mt-4 max-w-2xl mx-auto font-light text-lg">
                 Relive the most impactful moments from our previous engagements.
               </p>
            </FadeIn>

            {/* Masonry-style Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
               {highlights.map((item, idx) => (
                  <FadeIn key={item.id} delay={idx * 100} className={`relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800 ${idx % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''} h-full`}>
                     {item.type === 'video' ? (
                        <div className="relative w-full h-full">
                            <video 
                                src={item.url} 
                                className="w-full h-full object-cover" 
                                autoPlay 
                                muted 
                                loop 
                                playsInline
                            />
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                                <PlayCircle size={24} className="animate-pulse" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
                                <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold uppercase tracking-wider">Playing</span>
                            </div>
                        </div>
                     ) : (
                        <img src={`components/${item.imageUrl}`} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                     )}
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8 pointer-events-none">
                        <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.caption}</p>
                     </div>
                  </FadeIn>
               ))}
            </div>
         </div>
      </section>

      {/* 7. CTA (Action) */}
      <section className="py-32 relative overflow-hidden bg-slate-50">
         {/* More Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-lightBlue/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
           <FadeIn className="ios-glass p-12 md:p-24 rounded-[3rem] shadow-2xl border border-white/60 bg-white/40">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Don't Miss The <br/> <span className="text-brand-blue">Momentum</span></h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Tickets are limited. Whether you are pitching a unicorn idea or looking for the next big thing, this is where you need to be.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Magnetic>
                    <Link to="/register" className="px-10 py-5 bg-brand-blue text-white rounded-full font-bold text-xl hover:bg-blue-800 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-3">
                      Get Tickets Now <TicketIcon />
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link to="/contact" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-xl hover:border-brand-blue hover:text-brand-blue transition-all shadow-sm hover:shadow-md">
                      Sponsor Event
                    </Link>
                  </Magnetic>
              </div>
           </FadeIn>
        </div>
      </section>

    </div>
  );
};

// Simple Icon Component for the button
const TicketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 9L2 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 9L22 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 12H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 12H14.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 3L11 3C7.68629 3 5 5.68629 5 9V15C5 18.3137 7.68629 21 11 21L13 21C16.3137 21 19 18.3137 19 15V9C19 5.68629 16.3137 3 13 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Summit;