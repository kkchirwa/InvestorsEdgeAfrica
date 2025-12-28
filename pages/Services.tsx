import React, { useRef, useState, useEffect } from 'react';
import { Briefcase, Coins, BookOpen, Calendar, ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import VirtualGuide from '../components/VirtualGuide';
import { TextReveal, Magnetic } from '../components/UIEffects';

// Upgraded Spotlight Card with Mouse Tracking and Parallax
const SpotlightCard: React.FC<{
  title: string;
  desc: string;
  icon: React.ReactNode;
  onHover: (text: string) => void;
  onLeave: () => void;
  guideText: string;
}> = ({ title, desc, icon, onHover, onLeave, guideText }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
     const handleScroll = () => {
         if (cardRef.current) {
             const rect = cardRef.current.getBoundingClientRect();
             // Simple parallax calc: offset based on position in viewport relative to window height
             // Factor 0.05 makes it subtle
             const scrollFactor = 0.05;
             const offset = (window.innerHeight - rect.top) * scrollFactor;
             setOffsetY(offset);
         }
     };
     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      className="spotlight-card ios-glass rounded-[2.5rem] p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col group relative overflow-hidden border border-white/40"
      onMouseEnter={() => onHover(guideText)}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Background Element */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-yellow/5 pointer-events-none transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${offsetY}px) scale(1.2)` }}
      ></div>

      <div className="absolute top-0 right-0 p-20 bg-brand-blue/5 rounded-full blur-3xl group-hover:bg-brand-blue/10 transition-colors z-0"></div>
      
      {/* Content wrapper with z-index to stay above spotlight */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm bg-white text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-8 flex-grow font-medium">{desc}</p>
        <Link to="/contact" className="mt-auto inline-flex items-center bg-white px-6 py-3 rounded-full text-slate-900 font-bold text-sm hover:bg-brand-blue hover:text-white transition-all shadow-sm w-fit group-hover:translate-x-2">
          Learn more <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-200/50 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-blue' : 'text-slate-800'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500'}`}>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-slate-600 leading-relaxed font-medium">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-scale').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const defaultMessage = "Welcome! I'm Limbani. Explore our premium services.";
  const [guideMessage, setGuideMessage] = useState(defaultMessage);

  const handleHover = (text: string) => setGuideMessage(text);
  const handleLeave = () => setGuideMessage(defaultMessage);

  const services = [
    {
      title: "Business Consultancy",
      desc: "Strategic guidance for modern entrepreneurs. We analyze your market position and optimize operations for scalable growth.",
      icon: <Briefcase className="h-8 w-8" />,
      guideText: "Consultancy: Analyzing growth patterns..."
    },
    {
      title: "Startup Capital & Funding",
      desc: "Seed funding access and investor readiness preparation. We help you build the perfect pitch deck and financial model.",
      icon: <Coins className="h-8 w-8" />,
      guideText: "Funding: Structuring financials for investment..."
    },
    {
      title: "Mentorship & Training",
      desc: "Hands-on mentorship programs covering financial literacy, risk management, and business plan writing.",
      icon: <BookOpen className="h-8 w-8" />,
      guideText: "Mentorship: Accessing expert knowledge base..."
    },
    {
      title: "Event Management",
      desc: "Organizers of the 'Next Gem Founders Summit', creating spaces for networking, learning, and deal-making.",
      icon: <Calendar className="h-8 w-8" />,
      guideText: "Events: Connecting with the ecosystem..."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 overflow-hidden relative">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-[-100px] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-20 left-[-100px] w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <style>{`
        .reveal-scale {
          opacity: 0;
          transform: scale(0.8) translateY(30px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .reveal-scale.active {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      `}</style>

      <VirtualGuide message={guideMessage} />

      {/* Hero */}
      <div className="relative py-32 text-center text-slate-800 z-10">
        <div className="relative max-w-4xl mx-auto px-4">
           <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4 inline-block ios-glass px-4 py-1 rounded-full border border-white/40">Our Expertise</span>
           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-sm">
             <TextReveal text="Services &" /> <span className="text-brand-blue">Solutions</span>
           </h1>
           <p className="max-w-2xl mx-auto text-slate-600 text-xl font-medium ios-glass p-6 rounded-3xl border border-white/20">
             Comprehensive tools for the modern African entrepreneur.
           </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8 mb-32">
          {services.map((service, index) => (
            <SpotlightCard 
              key={index} 
              {...service} 
              onHover={handleHover} 
              onLeave={handleLeave} 
            />
          ))}
        </div>
      </div>

      {/* Interactive Process Roadmap */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="ios-glass rounded-[3rem] p-12 relative border border-white/40">
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-black text-slate-900 mb-4">Our Process</h2>
                 <p className="text-slate-500 font-medium">How we turn ideas into institutions.</p>
              </div>

              {/* Animated Line & Steps */}
              <div className="relative">
                 {/* Desktop Line - SVG drawing animation */}
                 <div className="hidden md:block absolute top-[40px] left-0 w-full h-full pointer-events-none z-0">
                    <svg width="100%" height="100" className="overflow-visible">
                       <path 
                          d="M 100 40 L 300 40 C 400 40 500 40 600 40 C 700 40 800 40 1000 40" 
                          stroke="#CBD5E1" strokeWidth="4" fill="none" strokeDasharray="10,10" 
                       />
                       <path 
                          d="M 100 40 L 300 40 C 400 40 500 40 600 40 C 700 40 800 40 1000 40" 
                          stroke="#0033A0" strokeWidth="4" fill="none" className="animate-draw"
                       />
                    </svg>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                  {[
                    { title: "Consultation", desc: "Understanding vision.", delay: "0ms" },
                    { title: "Strategy", desc: "Drafting the roadmap.", delay: "200ms" },
                    { title: "Execution", desc: "Implementing plans.", delay: "400ms" },
                    { title: "Growth", desc: "Scaling sustainably.", delay: "600ms" }
                  ].map((step, idx) => (
                    <div 
                      key={idx} 
                      className="reveal-scale flex flex-col items-center text-center group" 
                      style={{ transitionDelay: step.delay }}
                    >
                      <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-xl font-black shadow-lg mb-6 text-brand-blue group-hover:scale-110 group-hover:border-brand-blue transition-all duration-500 relative z-10">
                        {idx + 1}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-500 text-sm font-medium">{step.desc}</p>
                    </div>
                  ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 relative z-10 px-4">
        <div className="max-w-7xl mx-auto ios-glass-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-brand-blue/20"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6">Customized Engagement</h2>
                 <p className="text-blue-100 text-lg mb-8 leading-relaxed font-light">
                   Whether you need a one-time consultation or a long-term partnership, we have flexible packages designed for startups, SMEs, and large corporations.
                 </p>
                 <Magnetic>
                    <Link to="/contact" className="inline-block bg-brand-yellow text-brand-dark font-bold px-8 py-4 rounded-full hover:bg-white transition-colors shadow-lg hover:scale-105 transform">
                      Request a Quote
                    </Link>
                 </Magnetic>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="ios-glass rounded-[3rem] p-10 border border-white/40">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
                {[
                  { q: "How do you select startups for funding?", a: "We have a rigorous due diligence process that evaluates team capability, market size, product viability, and traction." },
                  { q: "Is the Summit open to everyone?", a: "Yes! While we curate content for founders and investors, students and policy makers are welcome." },
                  { q: "Do you offer remote consultancy?", a: "Absolutely. We work with clients across the SADC region utilizing digital tools." },
                  { q: "What is the cost of your mentorship program?", a: "We offer both free community mentorship circles and paid executive coaching." }
                ].map((item, idx) => (
                  <FaqItem key={idx} question={item.q} answer={item.a} />
                ))}
            </div>
         </div>
      </section>

    </div>
  );
};

export default Services;