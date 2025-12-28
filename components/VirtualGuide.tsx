import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface VirtualGuideProps {
  message?: string;
}

const VirtualGuide: React.FC<VirtualGuideProps> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }
    
    setIsVisible(true);
    let i = 0;
    setDisplayedText('');
    const speed = 25;
    
    const interval = setInterval(() => {
      if (i < message.length) {
        setDisplayedText(message.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [message]);

  if (!isVisible && !message) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none w-full max-w-md px-4">
      <div className="mx-auto ios-glass-dark rounded-full px-6 py-3 flex items-center gap-3 shadow-2xl animate-fade-in-up">
        <div className="bg-brand-yellow rounded-full p-1.5 flex-shrink-0">
           <Sparkles className="w-4 h-4 text-brand-dark" />
        </div>
        <p className="text-white text-sm font-medium tracking-wide leading-tight">
          {displayedText}
          <span className="animate-pulse inline-block ml-1">|</span>
        </p>
      </div>
    </div>
  );
};

export default VirtualGuide;