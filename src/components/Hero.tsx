import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [socialVisible, setSocialVisible] = useState(false);
  const [trustedVisible, setTrustedVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const logoTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Much more gradual timing for smoother cascading effect
    const timer1 = setTimeout(() => setNameVisible(true), 500);
    const timer2 = setTimeout(() => setTitleVisible(true), 1200);
    const timer3 = setTimeout(() => setButtonsVisible(true), 1800);
    const timer4 = setTimeout(() => setSocialVisible(true), 2200);
    const timer5 = setTimeout(() => setTrustedVisible(true), 2600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  // JavaScript-based scrolling animation for better compatibility
  useEffect(() => {
    let animationId: number;
    let startTime: number | null = null;
    const duration = 25000; // 25 seconds for full cycle

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Calculate offset (scroll from 0 to -50%)
      const offset = -(progress * 50);
      setScrollOffset(offset);
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
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
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out"
        src="/assets/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        title="Background video showcasing video editing work"
      />
      <div className="absolute inset-0 bg-black/60 transition-opacity duration-1000 ease-out"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-12">
        <h1
          className={`text-5xl md:text-7xl font-bold mb-4 transition-all duration-[1400ms] ease-out transform ${
            nameVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          <span className="text-white">
            Anurag{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent font-bold inline-block">
              MediaWorks
            </span>
          </span>
        </h1>

        <div
          className={`text-xl md:text-2xl mb-8 transition-all duration-[1200ms] ease-out transform ${
            titleVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-98'
          }`}
        >
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300">
            <span className="font-light tracking-wide text-yellow-400 transition-all duration-700 ease-out">
              Video Editor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-500 ease-out"></span>
            <span className="font-light tracking-wide text-green-400 transition-all duration-700 ease-out">
              Story Sculptor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full transition-all duration-500 ease-out"></span>
            <span className="font-light tracking-wide text-yellow-500 transition-all duration-700 ease-out">
              Mumbai
            </span>
          </div>
        </div>

        {/* Single Sophisticated Button */}
        <div
          className={`flex justify-center mb-16 transition-all duration-[1100ms] ease-out transform ${
            buttonsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <a href="#showreel" className="inline-block">
            <button 
              className="relative px-12 py-4 bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 rounded-full text-white font-semibold uppercase tracking-wide transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 hover:-translate-y-1 active:scale-95"
              aria-label="Watch video showreel"
            >
              <span className="relative z-10">Watch Showreel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-green-400/10 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </button>
          </a>
        </div>

        {/* Social Proof */}
        <div
          className={`flex justify-center items-center gap-6 text-sm text-slate-400 transition-all duration-[1000ms] ease-out transform ${
            socialVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-98'
          }`}
        >
          <div className="flex items-center gap-2 transition-all duration-500 ease-out hover:scale-105">
            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-300 ease-out"></div>
            <span className="text-yellow-400">200+ Projects</span>
          </div>
          <div className="flex items-center gap-2 transition-all duration-500 ease-out hover:scale-105">
            <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full transition-all duration-300 ease-out"></div>
            <span className="text-green-400">14+ Years Experience</span>
          </div>
        </div>

        {/* Trusted By Section with JavaScript-based Scrolling */}
        <div
          className={`mt-12 transition-all duration-[900ms] ease-out transform ${
            trustedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-xs text-slate-300 uppercase tracking-widest mb-8 font-light">
            Trusted By
          </div>
          
          {/* Logo Container with Overflow Hidden */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling Track */}
            <div 
              ref={logoTrackRef}
              className="flex gap-8 transition-transform duration-75 ease-linear"
              style={{ 
                transform: `translateX(${scrollOffset}%)`,
                width: 'max-content'
              }}
              onMouseEnter={() => setScrollOffset(scrollOffset)} // Pause on hover
            >
              {/* Render logos twice for seamless loop */}
              {[...logos, ...logos].map((company, index) => (
                <div 
                  key={`${company.name}-${index}`} 
                  className="flex-shrink-0 bg-slate-800/40 border border-yellow-400/20 rounded-xl px-6 py-4 transition-all duration-300 ease-out hover:scale-105 hover:border-yellow-400/40 hover:bg-slate-700/50 hover:shadow-lg hover:shadow-yellow-400/10"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-8 w-auto opacity-90 transition-opacity duration-300 hover:opacity-100"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to text if image fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.logo-text')) {
                        const textSpan = document.createElement('span');
                        textSpan.className = 'logo-text text-white text-sm font-semibold';
                        textSpan.textContent = company.name;
                        parent.appendChild(textSpan);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-green-400/60 rounded-full flex justify-center transition-all duration-700 ease-out hover:border-green-400/80 hover:scale-110">
            <div className="w-1 h-3 bg-gradient-to-b from-yellow-400 to-green-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <ChevronDown className="text-green-400/80 mt-2 transition-all duration-500 ease-out hover:text-green-400 hover:scale-110" size={24} />
        </div>
        <div className="text-xs text-slate-400 mt-2 tracking-widest font-light">SCROLL</div>
      </div>
    </section>
  );
};

export default Hero;