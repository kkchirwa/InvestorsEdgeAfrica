import React, { useEffect } from 'react';
import { Target, Eye, Globe, TrendingUp, ShieldCheck, Users, Zap, CheckCircle2, Flag } from 'lucide-react';
import { TextReveal } from '../components/UIEffects';

const About: React.FC = () => {
  // Animation Logic (Scroll Reveal)
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

  const values = [
    { icon: <ShieldCheck />, title: "Integrity", desc: "Upholding the highest standards of honesty in every investment advice." },
    { icon: <Zap />, title: "Innovation", desc: "Pioneering new ways to bridge capital and creativity in Africa." },
    { icon: <Users />, title: "Collaboration", desc: "Building a network where founders and investors thrive together." },
    { icon: <TrendingUp />, title: "Excellence", desc: "Delivering world-class due diligence and operational support." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-lightBlue/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob"></div>
         <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-brand-yellow/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-2000"></div>
         <div className="absolute -bottom-32 left-20 w-[800px] h-[800px] bg-pink-300/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-4000"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-48 text-center text-slate-800 z-10">
        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ios-glass border border-white/40 text-brand-blue text-sm font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
            <Globe className="w-4 h-4" />
            <span>Our Identity</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            <TextReveal text="Architecting the" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-lightBlue block mt-2">Future of Finance</span>
          </h1>
          <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:400ms] ios-glass p-6 rounded-3xl backdrop-blur-md">
            We are more than a consultancy; we are the bridge connecting ambitious African founders with the global capital they deserve.
          </p>
        </div>
      </section>

      {/* 2. STATS BAR (Floating) */}
      <div className="relative z-20 -mt-24 max-w-6xl mx-auto px-4 reveal">
        <div className="ios-glass rounded-[3rem] p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200/50">
           {[
             { label: "Founded", value: "2025" },
             { label: "HQ", value: "Blantyre" },
             { label: "Community", value: "400+" },
             { label: "Status", value: "Reg. Firm" }
           ].map((stat, i) => (
             <div key={i} className="text-center px-4">
               <div className="text-3xl font-black text-brand-blue mb-1">{stat.value}</div>
               <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
             </div>
           ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32 relative z-10">
        
        {/* 3. MISSION & VISION (Interactive Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 reveal">
          <div className="group relative ios-glass p-10 rounded-[3rem] ios-card-hover overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
               <Target className="w-40 h-40 text-brand-blue" />
            </div>
            <div className="relative z-10">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue mb-8 shadow-sm">
                 <Target className="w-7 h-7" />
               </div>
               <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
               <p className="text-slate-600 text-lg leading-relaxed font-medium">
                 To bridge the information gap in Malawi's and Africa's investment landscape, providing entrepreneurs with the knowledge, tools, and expertise needed to make informed decisions, manage risk, and achieve their investment objectives.
               </p>
            </div>
          </div>

          <div className="group relative ios-glass-dark p-10 rounded-[3rem] ios-card-hover overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
               <Eye className="w-40 h-40 text-brand-yellow" />
            </div>
            <div className="relative z-10">
               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-yellow mb-8 backdrop-blur-sm">
                 <Eye className="w-7 h-7" />
               </div>
               <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
               <p className="text-blue-100 text-lg leading-relaxed font-light">
                 To be the leading catalyst for investment growth and entrepreneurial empowerment across Malawi and Africa, fostering a dynamic ecosystem where informed decisions drive sustainable economic development.
               </p>
            </div>
          </div>
        </div>

        {/* 4. CORE VALUES (Grid) */}
        <div className="reveal">
          <div className="text-center mb-16">
            <span className="text-brand-blue font-bold uppercase tracking-widest text-sm">Our Ethos</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="ios-glass p-8 rounded-[2.5rem] ios-card-hover text-center group">
                 <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 mb-6 shadow-sm">
                   {React.cloneElement(val.icon as React.ReactElement, { className: "w-8 h-8" })}
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                 <p className="text-slate-600 text-sm leading-relaxed font-medium">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. HISTORY (Timeline Style) */}
        <div className="reveal flex flex-col md:flex-row gap-16 items-center">
           <div className="w-full md:w-1/2 relative p-4">
              <div className="absolute inset-0 bg-brand-yellow/30 translate-x-4 translate-y-4 rounded-[3rem] blur-xl"></div>
              <div className="ios-glass p-2 rounded-[3rem]">
                <img src="https://picsum.photos/seed/office_meeting/800/600" alt="Team History" className="relative w-full rounded-[2.5rem] z-10" />
              </div>
           </div>
           <div className="w-full md:w-1/2">
              <span className="text-brand-blue font-bold uppercase tracking-widest text-sm">Our Journey</span>
              <h2 className="text-4xl font-black text-slate-900 mt-2 mb-8">From Concept to Corporate</h2>
              
              <div className="space-y-8 border-l-2 border-slate-200/60 pl-8 ml-3 relative">
                 <div className="relative">
                    <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-50 bg-brand-blue shadow-md"></div>
                    <div className="text-sm font-bold text-brand-blue mb-1">March 13, 2025</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Inception & MRA Partnership</h4>
                    <p className="text-slate-600 font-medium">Investors Edge Africa officially commenced operations, marking our entry with a strategic partnership with the Malawi Revenue Authority.</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-50 bg-brand-yellow shadow-md"></div>
                    <div className="text-sm font-bold text-brand-blue mb-1">June 2025</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Next Gem Founders Summit</h4>
                    <p className="text-slate-600 font-medium">Successfully hosted our inaugural summit with over 400 attendees, solidifying our presence in the ecosystem.</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-50 bg-slate-300 shadow-md"></div>
                    <div className="text-sm font-bold text-brand-blue mb-1">Present Day</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Scaling Impact</h4>
                    <p className="text-slate-600 font-medium">Now a registered Private Company Limited by Shares, we are actively expanding our portfolio and services.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* 6. EXPANSION (Futuristic Card) */}
        <div className="ios-glass-dark rounded-[3rem] p-10 md:p-16 relative overflow-hidden reveal text-white shadow-2xl border border-white/10">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
             <h2 className="text-3xl md:text-5xl font-black mb-6">Strategic Roadmap</h2>
             <p className="text-blue-200 text-lg font-light">Our ambitious plan to redefine the investment landscape across the continent.</p>
           </div>

           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-brand-yellow rounded-xl text-slate-900">
                      <Flag className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Regional Expansion</h3>
                 </div>
                 <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-blue-100 font-light">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Establishing hubs in neighboring Southern African nations.
                    </li>
                    <li className="flex items-start gap-3 text-blue-100 font-light">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Cross-border investment syndicates.
                    </li>
                 </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-brand-lightBlue rounded-xl text-white">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Digital Ecosystem</h3>
                 </div>
                 <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-blue-100 font-light">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Launching "IEA Learn" for online entrepreneurship education.
                    </li>
                    <li className="flex items-start gap-3 text-blue-100 font-light">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      Proprietary deal-flow matching platform.
                    </li>
                 </ul>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;