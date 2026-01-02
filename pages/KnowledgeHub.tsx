
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  TrendingUp, Calendar, ArrowUpRight, Sparkles, Loader2, ArrowRight
} from 'lucide-react';
import { FadeIn, Magnetic } from '../components/UIEffects';

const KnowledgeHub: React.FC = () => {
  const { stories } = useData();
  const [itemsToShow, setItemsToShow] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (itemsToShow < stories.length) {
      setIsLoading(true);
      // Simulating a network delay for a smoother infinite scroll feel
      setTimeout(() => {
        setItemsToShow(prev => Math.min(prev + 3, stories.length));
        setIsLoading(false);
      }, 600);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading && itemsToShow < stories.length) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [itemsToShow, isLoading, stories.length]);

  return (
    <div className="bg-slate-50 min-h-screen pb-32 pt-32 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-brand-lightBlue/10 rounded-full blur-[120px] mix-blend-multiply filter animate-blob"></div>
         <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-brand-yellow/10 rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-24 text-center">
            <FadeIn>
               <div className="relative inline-block">
                  <div className="absolute -left-12 -top-12 w-24 h-24 rounded-full border border-brand-yellow pointer-events-none opacity-40 animate-pulse-slow">
                     <div className="absolute top-1/2 left-0 w-3 h-3 bg-brand-blue rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  <span className="text-brand-blue font-black text-[12px] uppercase tracking-[0.5em] mb-4 block">Knowledge Hub</span>
                  <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-6">
                     Latest <span className="text-brand-blue">Insights</span>
                  </h1>
               </div>
               <p className="max-w-2xl mx-auto text-slate-500 font-medium text-lg leading-relaxed">
                  The definitive resource for de-risking investments and mastering the mechanics of growth in the modern African market.
               </p>
            </FadeIn>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {stories.slice(0, itemsToShow).map((article, idx) => (
              <FadeIn key={article.id} delay={idx % 3 * 100}>
                 <div className="ios-glass rounded-[2.5rem] overflow-hidden group hover:shadow-3xl transition-all duration-500 border border-white/60 bg-white/40 flex flex-col h-full">
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] overflow-hidden m-4 rounded-[2rem]">
                       <img src={article.logoUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                           <div className="flex items-center gap-3 mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                 <TrendingUp size={16} />
                              </div>
                              <p className="text-[10px] text-white font-bold uppercase tracking-widest leading-none">Market Analysis</p>
                           </div>
                       </div>
                    </div>

                    {/* Content Area */}
                    <div className="px-8 pb-10 flex flex-col flex-grow">
                       <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold mb-4 uppercase tracking-widest">
                          <Calendar size={12} /> {article.date}
                       </div>
                       <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-brand-blue transition-colors">
                          {article.title}
                       </h4>
                       <p className="text-slate-500 text-base leading-relaxed font-medium line-clamp-3 mb-8">
                          {article.excerpt}
                       </p>
                       <Link to={`/article/${article.id}`} className="mt-auto inline-flex items-center gap-2 text-brand-blue font-black text-sm group/link">
                          Read Article <ArrowUpRight size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                       </Link>
                    </div>
                 </div>
              </FadeIn>
           ))}
        </div>

        {/* Sentinel element for intersection observer */}
        <div ref={observerTarget} className="h-20 w-full flex items-center justify-center mt-20">
           {isLoading && (
              <div className="flex flex-col items-center gap-3 text-brand-blue">
                 <Loader2 className="animate-spin" size={32} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Fetching Insights...</span>
              </div>
           )}
        </div>

        {/* Fallback Load More Button */}
        {!isLoading && itemsToShow < stories.length && (
           <div className="flex justify-center mt-10">
              <Magnetic>
                 <button 
                   onClick={loadMore}
                   className="px-12 py-5 bg-brand-blue text-white font-black rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
                 >
                   Load More Articles <ArrowRight size={20} />
                 </button>
              </Magnetic>
           </div>
        )}

        {/* End of content indicator */}
        {itemsToShow >= stories.length && stories.length > 0 && (
           <div className="text-center mt-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full ios-glass border border-white/40 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                 <Sparkles size={14} className="text-brand-yellow" /> You've reached the end
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeHub;
