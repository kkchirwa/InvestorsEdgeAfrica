import React from 'react';

const VisionaryBackground: React.FC = () => {
  return (
    <div className="absolute top-1/2 right-0 md:right-[10%] transform -translate-y-1/2 pointer-events-none z-0 opacity-60 md:opacity-80" aria-hidden="true">
      <div className="w-64 h-64 md:w-96 md:h-96">
        <div className="scene">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      </div>

      <style>{`
        .scene {
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 20s linear infinite;
        }

        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          /* Glassmorphism / Wireframe aesthetic */
          border: 2px solid rgba(59, 130, 246, 0.4); /* Brand Light Blue */
          background: rgba(0, 51, 160, 0.05); /* Brand Blue Tint */
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.1);
        }

        /* 3D Transforms for faces */
        /* Distance translateZ is half the width/height (approx 50%) to form a cube */
        /* Since w/h are 100% of container, we use percent or px calculations. 
           For a responsive cube, it's safer to use specific px in media queries or relative units if container is fixed.
           Here assuming container is approx 250px-400px, let's use a safe translateZ relative to size.
        */
        
        .front  { transform: rotateY(0deg) translateZ(8rem); }
        .back   { transform: rotateY(180deg) translateZ(8rem); }
        .right  { transform: rotateY(90deg) translateZ(8rem); }
        .left   { transform: rotateY(-90deg) translateZ(8rem); }
        .top    { transform: rotateX(90deg) translateZ(8rem); }
        .bottom { transform: rotateX(-90deg) translateZ(8rem); }

        @media (min-width: 768px) {
          .front  { transform: rotateY(0deg) translateZ(12rem); }
          .back   { transform: rotateY(180deg) translateZ(12rem); }
          .right  { transform: rotateY(90deg) translateZ(12rem); }
          .left   { transform: rotateY(-90deg) translateZ(12rem); }
          .top    { transform: rotateX(90deg) translateZ(12rem); }
          .bottom { transform: rotateX(-90deg) translateZ(12rem); }
        }

        @keyframes rotateCube {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VisionaryBackground;