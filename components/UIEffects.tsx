import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

// --- 1. Custom Cursor ---
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  // Use refs to store positions to avoid re-renders during animation loop
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add hover listeners to clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update the main dot immediately for responsiveness
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    let animationFrameId: number;

    const animateFollower = () => {
      // Linear interpolation (Lerp) for smooth trailing
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      // Smooth factor (lower = slower/smoother trail)
      const smoothness = 0.15;

      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, smoothness);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, smoothness);

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    
    // Start the animation loop
    animateFollower();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-brand-yellow rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference will-change-transform" 
      />
      {/* Trailing Ring */}
      <div 
        ref={followerRef} 
        className={`fixed top-0 left-0 w-10 h-10 border-2 border-brand-blue rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out mix-blend-difference will-change-transform ${hovered ? 'scale-150 bg-brand-blue/20 border-transparent' : 'scale-100'}`} 
      />
    </>
  );
};

// --- 2. Magnetic Button Wrapper ---
export const Magnetic: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Move element slightly towards cursor
    if (ref.current) {
        ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
  };

  const handleMouseLeave = () => {
      if (ref.current) {
          ref.current.style.transform = `translate(0px, 0px)`;
      }
  };

  return (
    <div 
        ref={ref} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
        className="transition-transform duration-200 ease-out inline-block will-change-transform"
    >
      {children}
    </div>
  );
};

// --- 3. Staggered Text Reveal ---
export const TextReveal: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = "", delay = 0 }) => {
  // Split by words to keep them together, then we can animate
  const words = text.split(" ");

  return (
    <div className={`overflow-hidden ${className}`}>
        {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-top mr-[0.2em]">
                <span 
                    className="inline-block animate-reveal-text opacity-0 transform translate-y-full" 
                    style={{ animationDelay: `${delay + (i * 0.1)}s`, animationFillMode: 'forwards' }}
                >
                    {word}
                </span>
            </span>
        ))}
    </div>
  );
};

// --- 4. Cinematic Preloader ---
export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isExit, setIsExit] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsExit(true), 500); // Start exit anim
                    setTimeout(onComplete, 1500); // Unmount
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);
        return () => clearInterval(interval);
    }, [onComplete]);

    if (isExit) {
        return (
            <div className="fixed inset-0 z-[10000] pointer-events-none flex flex-col">
                <div className="flex-1 bg-brand-dark animate-slide-up-curtain origin-top"></div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[10000] bg-brand-dark flex flex-col items-center justify-center text-white">
            <div className="mb-4">
               <Lightbulb className="w-12 h-12 text-brand-yellow animate-pulse" />
            </div>
            <div className="text-6xl font-black mb-2 tabular-nums">
                {Math.min(progress, 100)}%
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-blue font-bold">Initializing Ecosystem</p>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-brand-yellow transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

// --- 5. Scroll Fade In ---
export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};