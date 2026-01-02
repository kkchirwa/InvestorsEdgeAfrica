
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lightbulb } from 'lucide-react';
import { Magnetic } from './UIEffects';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/hub' },
    { name: 'Services', path: '/services' },
    { name: 'Summit', path: '/summit' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Scroll Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-blue via-brand-lightBlue to-brand-yellow z-[60] transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>

      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-start px-4 pointer-events-none gap-4">
        
        {/* Container 1: Main Navigation & Logo */}
        <nav className="pointer-events-auto">
          <div className="ios-glass-nav rounded-full pl-2 pr-2 py-2 flex items-center shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-2xl">
              
              {/* Logo Pill */}
              <Link to="/" className="flex-shrink-0 flex items-center justify-center bg-white rounded-full w-10 h-10 shadow-sm mr-2 group hover:scale-110 transition-transform">
                 <Lightbulb className="h-5 w-5 text-brand-blue" strokeWidth={2.5} />
              </Link>
              
              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                      isActive(link.path) 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'text-slate-600 hover:bg-white/20 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

               {/* Mobile Toggle (Inside the main pill for mobile) */}
               <div className="flex items-center md:hidden pr-2">
                 <span className="font-black text-lg tracking-tight text-slate-900 leading-none mr-4 ml-2">IEA</span>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-slate-800 p-2 rounded-full hover:bg-white/20 transition backdrop-blur-md"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div className="md:hidden mt-2 ios-glass rounded-3xl p-2 animate-fade-in-up origin-top absolute top-full left-0 right-0 mx-4">
              <div className="space-y-1 bg-white/50 backdrop-blur-xl rounded-2xl p-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive(link.path)
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Mobile Ticket Button */}
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center mt-2 bg-brand-yellow text-brand-dark px-5 py-3 rounded-xl font-bold shadow-lg"
                >
                  Get Tickets
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Container 2: Action Button (Desktop Only) */}
        <div className="hidden md:block pointer-events-auto">
          <Magnetic>
             <Link
                to="/register"
                className="group relative flex items-center justify-center ios-glass-nav bg-white/20 hover:bg-brand-blue hover:border-brand-blue hover:text-white text-slate-900 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-brand-blue/30 backdrop-blur-md border border-white/20 overflow-hidden"
              >
                <span className="relative z-10">Get Tickets</span>
                {/* Button Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></div>
             </Link>
          </Magnetic>
        </div>

      </div>
    </>
  );
};

export default Navbar;
