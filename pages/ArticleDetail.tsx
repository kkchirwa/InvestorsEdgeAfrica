
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Calendar, Share2, Sparkles, Clock, ChevronLeft } from 'lucide-react';
import { FadeIn, Magnetic } from '../components/UIEffects';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { stories } = useData();
  const navigate = useNavigate();
  const [scrollWidth, setScrollWidth] = useState(0);

  const article = stories.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollWidth(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 ios-glass rounded-[3rem]">
          <h2 className="text-4xl font-black mb-6">Article Not Found</h2>
          <Link to="/hub" className="text-brand-blue font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            <ArrowLeft size={18} /> Back to Hub
          </Link>
        </div>
      </div>
    );
  }

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = article.excerpt.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-40">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1.5 bg-brand-blue z-[100] transition-all duration-75" style={{ width: `${scrollWidth}%` }}></div>

      {/* Floating Back Button */}
      <div className="fixed top-24 left-8 z-[60] hidden lg:block">
        <Magnetic>
          <button 
            onClick={() => navigate(-1)} 
            className="w-14 h-14 ios-glass rounded-full flex items-center justify-center shadow-2xl border border-white/60 hover:bg-brand-blue hover:text-white transition-all text-slate-900 group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </Magnetic>
      </div>

      {/* Header / Banner */}
      <section className="relative h-[75vh] min-h-[500px] flex items-end overflow-hidden">
        <img src={article.logoUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover brightness-[0.45] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfdfe] via-[#fcfdfe]/30 to-transparent"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 w-full pb-20">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow text-brand-dark text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl">
               <Sparkles size={12} className="fill-brand-dark" /> {article.category}
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10 max-w-4xl">
               {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-slate-500 font-black uppercase text-[11px] tracking-[0.2em]">
               <span className="flex items-center gap-2.5"><Calendar size={15} className="text-brand-blue" /> {article.date}</span>
               <span className="flex items-center gap-2.5"><Clock size={15} className="text-brand-blue" /> {readingTime} Min Read</span>
               <button className="flex items-center gap-2.5 hover:text-brand-blue transition-colors"><Share2 size={15} /> Share Insights</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 -mt-12">
        <FadeIn delay={200}>
          <div className="ios-glass rounded-[4rem] p-10 md:p-24 shadow-4xl border border-white/80 bg-white/70 backdrop-blur-[60px]">
             
             {/* Styled Article Body */}
             <div className="max-w-3xl mx-auto">
                <div className="prose prose-xl prose-slate">
                   {article.excerpt.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-xl md:text-[1.35rem] text-slate-700 leading-[1.8] font-medium mb-10 tracking-tight">
                         {paragraph}
                      </p>
                   ))}
                </div>

                {/* Article Footer / Author Card */}
                <div className="mt-24 pt-16 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-10">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-brand-blue rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-2xl rotate-3">IEA</div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-2">PUBLISHED BY</p>
                         <p className="text-xl font-black text-slate-900">Investors Edge Editorial</p>
                         <p className="text-sm font-bold text-brand-blue">Strategy & Research Desk</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <Magnetic>
                         <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-sm hover:bg-brand-blue transition-all shadow-2xl flex items-center gap-3">
                            Subscribe to Updates
                         </button>
                      </Magnetic>
                   </div>
                </div>
             </div>
          </div>
        </FadeIn>
      </section>

      {/* Recommended Articles Section */}
      <section className="py-32 max-w-6xl mx-auto px-6">
         <div className="flex items-center justify-between mb-16 px-4">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Continue Reading</h3>
            <Link to="/hub" className="text-brand-blue font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
               Visit Hub <ArrowLeft size={16} className="rotate-180" />
            </Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {stories.filter(s => s.id !== id).slice(0, 2).map(s => (
               <Link key={s.id} to={`/article/${s.id}`} className="group relative ios-glass p-10 rounded-[3rem] border border-white/40 hover:bg-white transition-all shadow-xl hover:shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 bg-brand-blue/5 rounded-full blur-3xl group-hover:bg-brand-blue/10 transition-colors"></div>
                  <div className="relative z-10">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-6">{s.category}</p>
                     <h4 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-brand-blue transition-colors leading-tight">{s.title}</h4>
                     <p className="text-slate-500 font-semibold leading-relaxed line-clamp-2 mb-8">{s.excerpt}</p>
                     <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest">
                        Read Story <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-2 transition-transform" />
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
