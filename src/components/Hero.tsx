import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setNameVisible(true), 800);
    const timer2 = setTimeout(() => setTitleVisible(true), 1600);
    const timer3 = setTimeout(() => setButtonsVisible(true), 2400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const logos = [
    { name: 'Netflix', logo: '/assets/logos/netflix-logo.png' },
    { name: 'Discovery', logo: '/assets/logos/discovery-logo.png' },
    { name: 'Myntra', logo: '/assets/logos/myntra-logo.png' },
    { name: 'MX Player', logo: '/assets/logos/mx-player-logo.png' },
    { name: 'Hotstar', logo: '/assets/logos/hotstar-logo.png' },
    { name: 'Curefit', logo: '/assets/logos/curefit-logo.png' }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-12">
        <h1
          className={`text-5xl md:text-7xl font-bold mb-4 transition-all duration-1000 ease-out ${
            nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white">
            Anurag{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent font-bold">
              MediaWorks
            </span>
          </span>
        </h1>

        <div
          className={`text-xl md:text-2xl mb-8 transition-all duration-1000 ease-out delay-300 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300">
            <span className="font-light tracking-wide text-yellow-400">
              Video Editor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></span>
            <span className="font-light tracking-wide text-green-400">
              Story Sculptor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></span>
            <span className="font-light tracking-wide text-yellow-500">
              Mumbai
            </span>
          </div>
        </div>

        {/* Single Sophisticated Button */}
        <div
          className={`flex justify-center mb-16 transition-all duration-1000 ease-in-out delay-500 ${
            buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a href="#showreel" className="inline-block">
            <button className="sophisticated-btn">
              Watch Showreel
            </button>
          </a>
        </div>

        {/* Social Proof */}
        <div
          className={`flex justify-center items-center gap-6 text-sm text-slate-400 transition-all duration-1000 ease-in-out delay-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></div>
            <span className="text-yellow-400">200+ Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
            <span className="text-green-400">14+ Years Experience</span>
          </div>
        </div>

        {/* Trusted By Section with Infinite Scrolling Logos */}
        <div
          className={`mt-12 transition-all duration-1000 ease-in-out delay-900 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-xs text-slate-300 uppercase tracking-widest mb-8 font-light">
            Trusted By
          </div>
          <div className="logo-scroll-container">
            <div className="logo-scroll-track">
              {/* Render logos twice for a seamless loop */}
              {[...logos, ...logos].map((company, index) => (
                <div key={index} className="logo-container">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-10 md:h-12 opacity-100 filter brightness-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce"> {/* Shifted further downwards */}
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-green-400/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-yellow-400 to-green-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <ChevronDown className="text-green-400/80 mt-2" size={24} />
        </div>
        <div className="text-xs text-slate-400 mt-2 tracking-widest font-light">SCROLL</div>
      </div>

      {/* Styles */}
      <style>{`
        .sophisticated-btn {
          position: relative;
          padding: 20px 48px;
          background: linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(34, 197, 94, 0.1));
          border: 1px solid transparent;
          border-radius: 50px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .sophisticated-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50px;
          padding: 1px;
          background: linear-gradient(135deg, #facc15, #22c55e);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }
        .sophisticated-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, rgba(34, 197, 94, 0.3) 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: -1;
        }
        .sophisticated-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 
                      0 0 30px rgba(250, 204, 21, 0.2),
                      0 0 50px rgba(34, 197, 94, 0.1);
        }
        .sophisticated-btn:hover::after {
          width: 300px;
          height: 300px;
        }
        .sophisticated-btn:active {
          transform: translateY(0);
        }
        .logo-scroll-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 20px 0;
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
        .logo-scroll-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scrollLogos 20s linear infinite;
          will-change: transform;
        }
        .logo-scroll-container:hover .logo-scroll-track {
          animation-play-state: paused;
        }
        
        /* CORRECTED KEYFRAMES FOR INFINITE LOOP */
        @keyframes scrollLogos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .logo-container {
          position: relative;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(250, 204, 21, 0.3);
          border-radius: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
        .logo-container:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(250, 204, 21, 0.6);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 
                      0 0 25px rgba(250, 204, 21, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .logo-container::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(135deg, 
            rgba(250, 204, 21, 0.3) 0%, 
            rgba(34, 197, 94, 0.3) 50%, 
            rgba(250, 204, 21, 0.3) 100%);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .logo-container:hover::before {
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
};

export default Hero;