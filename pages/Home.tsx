import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Target, TrendingUp, Users, Award, Lightbulb, ArrowRight, Zap, Globe, Sparkles, CheckCircle2, Quote, ArrowUpRight, Calendar, Smartphone, Rocket, Star } from 'lucide-react';
import { Magnetic, TextReveal } from '../components/UIEffects';

// --- Components ---

// Spotlight Card Component (Wrapper)
const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Using simple style assignment instead of setProperty for potential micro-optimization if browser supports
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

// Infinite Marquee Component
const InfiniteMarquee = () => {
  const items = [
    "YOUTH LED", "INNOVATION", "CAPITAL", "GROWTH", "SADC REGION", "FINTECH", "AGRITECH", "FUTURE", "IMPACT"
  ];
  
  return (
    <div className="relative w-full overflow-hidden bg-brand-dark py-4 rotate-[-2deg] scale-110 mb-20 border-y border-white/10 shadow-2xl z-20 will-change-transform">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-white font-black text-xl md:text-2xl tracking-tighter opacity-80">{item}</span>
            <Star className="w-4 h-4 text-brand-yellow ml-8 fill-brand-yellow animate-spin-slow" />
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimate, setHasAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimate) {
          setHasAnimate(true);
          let startTime: number | null = null;
          let animationFrameId: number;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease out cubic function for smoother ending
            const easeOut = 1 - Math.pow(1 - percentage, 3);
            
            setCount(Math.floor(easeOut * end));

            if (progress < duration) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
          
          return () => cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimate]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Home: React.FC = () => {
  const { testimonials, stories } = useData();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ecosystemTabs = [
    {
      title: "For Founders",
      icon: <Lightbulb className="w-5 h-5" />,
      desc: "We provide the launchpad you need. From refining your business model to pitching in front of serious investors.",
      points: ["Pitch Deck Refinement", "Seed Funding Access", "Operational Mentorship", "Market Entry Strategy"],
      image: "https://picsum.photos/seed/founders_meeting/800/600",
      cta: "Pitch Your Idea"
    },
    {
      title: "For Investors",
      icon: <TrendingUp className="w-5 h-5" />,
      desc: "Discover vetted, high-potential startups. We de-risk your investment through rigorous due diligence.",
      points: ["Exclusive Deal Flow", "Due Diligence Reports", "Co-investment Opportunities", "Portfolio Management"],
      image: "https://picsum.photos/seed/investors_shake/800/600",
      cta: "Join Network"
    },
    {
      title: "For Partners",
      icon: <Users className="w-5 h-5" />,
      desc: "Align your brand with the future of African business. Sponsor our high-impact summits.",
      points: ["Brand Visibility", "CSR Alignment", "Industry Leadership", "Talent Acquisition"],
      image: "https://picsum.photos/seed/partners_summit/800/600",
      cta: "Partner With Us"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden">
      
      {/* Global Background Blobs for Glass Effect - Reduced blur size for performance */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-lightBlue/20 rounded-full blur-[80px] mix-blend-multiply filter animate-blob"></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/20 rounded-full blur-[80px] mix-blend-multiply filter animate-blob animation-delay-2000"></div>
         <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-[80px] mix-blend-multiply filter animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        
        {/* Dynamic Background Shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Rotating Rings (Top Left) */}
            <div className="absolute -top-[10%] -left-[5%] w-[60vh] h-[60vh] rounded-full border border-brand-blue/10 animate-[spin_60s_linear_infinite] will-change-transform"></div>
            <div className="absolute -top-[5%] -left-[2%] w-[50vh] h-[50vh] rounded-full border border-dashed border-brand-blue/10 animate-[spin_45s_linear_infinite_reverse] will-change-transform"></div>

            {/* Floating Glass Square (Top Right) */}
            <div className="absolute top-[20%] right-[10%] w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/10 backdrop-blur-sm rounded-[2rem] animate-float rotate-12 shadow-2xl will-change-transform"></div>

            {/* Floating Glass Circle (Bottom Left) */}
            <div className="absolute bottom-[20%] left-[10%] w-20 h-20 md:w-28 md:h-28 bg-brand-yellow/10 border border-white/10 backdrop-blur-sm rounded-full animate-float-delayed shadow-lg will-change-transform"></div>
            
            {/* Pulsing Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-lightBlue/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
          <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full ios-glass border border-white/40 text-brand-blue text-sm font-bold mb-8 tracking-widest uppercase animate-fade-in-up shadow-sm backdrop-blur-md">
             <Sparkles className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
             Building Tomorrow's Africa
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9] drop-shadow-sm">
            <TextReveal text="Next Gen" delay={0.2} />
            <span className="text-shimmer animate-shimmer block">Visionaries</span>
          </h1>
          
          <p className="max-w-2xl text-xl text-slate-600 mb-12 leading-relaxed animate-fade-in-up [animation-delay:0.8s] font-medium ios-glass p-6 rounded-2xl backdrop-blur-sm border border-white/20">
            We bridge the gap between knowledge and opportunity, providing entrepreneurs with the premium tools to thrive in the modern economy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in-up [animation-delay:1s]">
            <Magnetic>
                <Link to="/services" className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-brand-blue/30">
                <span className="relative z-10 flex items-center gap-2">
                    Explore Services <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                </Link>
            </Magnetic>
            <Magnetic>
                <Link to="/register" className="ios-glass inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-slate-800 hover:bg-white transition-all border border-white/50">
                Join Summit
                </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Strip */}
      <InfiniteMarquee />

      {/* Youth-Led Bento Grid (New Section) */}
      <section className="relative z-20 px-4 reveal mb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: The Vibe (With Spotlight) */}
            <SpotlightCard className="md:col-span-2 ios-glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-white/40">
               <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-transparent"></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-8">
                     <div>
                       <span className="inline-block px-3 py-1 bg-brand-yellow text-brand-dark rounded-full text-xs font-black uppercase tracking-widest mb-2">Youth-Led</span>
                       <h3 className="text-3xl md:text-4xl font-black text-slate-900">Fueled by Energy,<br/>Backed by Data.</h3>
                     </div>
                     <div className="bg-white p-4 rounded-full shadow-lg text-brand-blue rotate-12 group-hover:rotate-0 transition-transform duration-500">
                        <Rocket size={32} />
                     </div>
                  </div>
                  <p className="text-slate-600 font-medium text-lg max-w-lg">
                    We aren't just consultants; we are the generation we serve. 100% youth-managed, we understand the pulse of the digital economy better than anyone.
                  </p>
               </div>
            </SpotlightCard>

            {/* Box 2: Stats (Stacked) */}
            <div className="md:col-span-1 grid grid-rows-2 gap-6">
               <div className="ios-glass-dark rounded-[2.5rem] p-8 flex flex-col justify-center text-white relative overflow-hidden group border border-white/10">
                  <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-brand-yellow/20 transition-colors"></div>
                  <Users className="w-8 h-8 mb-4 text-brand-yellow" />
                  <div className="text-4xl font-black mb-1"><AnimatedCounter end={400} suffix="+" /></div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Active Community</div>
               </div>
               
               <SpotlightCard className="ios-glass rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden group border border-white/40">
                  <div className="absolute -right-4 -top-4 bg-brand-blue/10 w-24 h-24 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-end">
                    <div>
                       <Award className="w-8 h-8 mb-4 text-brand-blue" />
                       <div className="text-4xl font-black text-slate-900">Top 10</div>
                       <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Youth Firms</div>
                    </div>
                    <div className="text-5xl font-black text-slate-200 opacity-50 absolute right-4 bottom-2 group-hover:scale-110 transition-transform">#1</div>
                  </div>
               </SpotlightCard>
            </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-brand-blue font-bold text-sm uppercase tracking-widest mb-3">How We Operate</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">The Ecosystem</h3>
          </div>
          
          <div className="ios-glass rounded-[3rem] p-3 reveal shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-white/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/20">
               <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-center space-y-4 border-r border-white/20">
                 {ecosystemTabs.map((tab, idx) => (
                    <button key={idx} onClick={() => setActiveTab(idx)} className={`text-left p-6 rounded-3xl transition-all duration-300 group relative overflow-hidden ${activeTab === idx ? 'bg-brand-blue text-white shadow-xl scale-105' : 'hover:bg-white/50 text-slate-600'}`}>
                      <div className="relative z-10 flex items-center gap-4">
                         <div className={`p-3 rounded-full ${activeTab === idx ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}>{React.cloneElement(tab.icon as React.ReactElement, { className: "w-5 h-5" })}</div>
                         <span className="font-bold text-lg">{tab.title}</span>
                      </div>
                    </button>
                 ))}
               </div>
               <div className="lg:col-span-8 p-8 lg:p-12 relative min-h-[500px] flex flex-col justify-center">
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="animate-fade-in-up" key={activeTab}>
                        <h3 className="text-3xl font-black text-slate-900 mb-6">{ecosystemTabs[activeTab].title}</h3>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">{ecosystemTabs[activeTab].desc}</p>
                        <ul className="space-y-4 mb-8">
                          {ecosystemTabs[activeTab].points.map((point, i) => (
                             <li key={i} className="flex items-center gap-3"><CheckCircle2 className="text-brand-blue w-5 h-5 flex-shrink-0" /><span className="font-medium text-slate-700">{point}</span></li>
                          ))}
                        </ul>
                        <Magnetic>
                            <Link to="/services" className="inline-flex items-center text-brand-blue font-bold hover:gap-2 transition-all">{ecosystemTabs[activeTab].cta} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Magnetic>
                     </div>
                     <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 ios-glass p-2 border border-white/40" key={`img-${activeTab}`}>
                        <img src={ecosystemTabs[activeTab].image} alt={ecosystemTabs[activeTab].title} className="w-full h-full object-cover rounded-2xl animate-fade-in-up" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials - Chat Bubble Style */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
              <div>
                 <h2 className="text-brand-blue font-bold text-sm uppercase tracking-widest mb-3">Success Stories</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-slate-900">Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-600">Realized</span></h3>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
              {testimonials.map((item) => (
                 <div key={item.id} className="ios-glass p-8 rounded-[2rem] rounded-tl-none ios-card-hover group relative">
                    <div className="absolute top-0 left-0 w-8 h-8 bg-white/20 -translate-y-full rounded-tr-[1rem] pointer-events-none"></div> 
                    <Quote className="text-brand-blue w-8 h-8 mb-6" />
                    <p className="text-slate-700 text-lg mb-8 leading-relaxed font-medium">"{item.quote}"</p>
                    <div className="flex items-center gap-4 mt-auto border-t border-slate-200/50 pt-4">
                       <img src={`components/${item.imageUrl}`} alt={item.author} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" />
                       <div><p className="text-slate-900 font-bold text-sm">{item.author}</p><p className="text-slate-500 text-xs font-bold uppercase">{item.role}</p></div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Dynamic Stories/News */}
      <section className="py-24 relative z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
               <h2 className="text-brand-blue font-bold text-sm uppercase tracking-widest mb-3">Knowledge Hub</h2>
               <h3 className="text-4xl font-black text-slate-900">Latest <span className="text-brand-lightBlue">Insights</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
               {stories.map((post) => (
                  <div key={post.id} className="ios-glass rounded-[2rem] overflow-hidden ios-card-hover p-2 group cursor-pointer">
                     <div className="h-48 overflow-hidden relative rounded-[1.5rem]">
                      
                        <img src={`https://investorsedgeafrica.onrender.com/${post.logoUrl}`} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 ios-glass-dark px-3 py-1 rounded-full text-xs font-bold text-white uppercase backdrop-blur-md border border-white/10">{post.category}</div>
                     </div>
                     <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 font-bold uppercase tracking-wider"><Calendar className="w-3 h-3" />{post.date}</div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">{post.title}</h4>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2 font-medium">{post.excerpt}</p>
                        <Link to="/contact" className="text-brand-blue font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">Read Article <ArrowUpRight className="w-3 h-3" /></Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
          <div className="ios-glass rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/30 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
             
             <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight relative z-10">Ready to <span className="text-brand-blue">Scale?</span></h2>
             <div className="flex justify-center flex-col sm:flex-row gap-6 relative z-10">
                <Magnetic>
                    <Link to="/register" className="px-10 py-4 bg-brand-blue text-white rounded-full font-bold text-lg hover:bg-blue-800 transition shadow-xl hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center gap-2">Get Started <Sparkles className="w-5 h-5 text-brand-yellow" /></Link>
                </Magnetic>
                <Magnetic>
                    <Link to="/contact" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition hover:-translate-y-1 shadow-sm">Contact Us</Link>
                </Magnetic>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;