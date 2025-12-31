import React, { useEffect, useRef } from "react";
import { Linkedin, Twitter, Mail, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { TextReveal } from "../components/UIEffects";

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <div
      className="h-full transition-transform duration-200 ease-out"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const Team: React.FC = () => {
  const { teamMembers } = useData();

  useEffect(() => {
    // Staggered Animation Logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-stagger").forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 150}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [teamMembers]);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-lightBlue/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-yellow/20 rounded-full blur-[120px] mix-blend-multiply filter animate-blob animation-delay-2000"></div>
      </div>

      <style>{`
        .reveal-stagger {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal-stagger.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Header */}
      <section className="relative pt-32 pb-48 text-center z-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full ios-glass text-brand-yellow text-sm font-bold uppercase tracking-widest mb-6">
            <Star className="w-4 h-4 fill-brand-yellow" /> Our Leadership
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
            <TextReveal text="Architects of" />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lightBlue to-brand-blue">
              Change
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 font-medium leading-relaxed ios-glass p-6 rounded-3xl backdrop-blur-md">
            We are a collective of strategists, investors, and dreamers
            dedicated to reshaping the African narrative through economic
            empowerment.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative -mt-24 pb-24 px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="reveal-stagger group h-full">
                <TiltCard>
                  <div className="ios-glass rounded-[2.5rem] p-4 shadow-xl h-full flex flex-col relative overflow-hidden border border-white/40 bg-white/30">
                    {/* Image Area */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] mb-6 bg-white/50">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                      />

                      {/* Floating Socials */}
                      <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-blue shadow-lg hover:bg-brand-blue hover:text-white transition-colors">
                          <Linkedin size={18} />
                        </button>
                        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-blue shadow-lg hover:bg-brand-blue hover:text-white transition-colors">
                          <Twitter size={18} />
                        </button>
                        <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand-blue shadow-lg hover:bg-brand-blue hover:text-white transition-colors">
                          <Mail size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4 flex-grow flex flex-col text-center">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-bold text-brand-blue/70 uppercase tracking-wider mb-4">
                        {member.role}
                      </p>
                      <p className="text-slate-600 font-medium leading-relaxed text-sm mb-4 line-clamp-4">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}

            {/* Join Us Card */}
            <div className="reveal-stagger h-full">
              <TiltCard>
                <div className="ios-glass-dark rounded-[2.5rem] p-8 shadow-xl h-full flex flex-col justify-center items-center text-center text-white border border-white/10 hover:bg-slate-900/80 transition-colors cursor-pointer group backdrop-blur-xl">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ArrowRight size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Join The Team</h3>
                  <p className="text-blue-100 mb-8 max-w-xs font-light">
                    We are constantly scouting for the next generation of
                    leaders. Are you one of them?
                  </p>
                  <Link
                    to="/contact"
                    className="px-8 py-3 bg-brand-yellow text-brand-dark rounded-full font-bold hover:bg-white hover:text-brand-blue transition-all"
                  >
                    Apply Now
                  </Link>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
