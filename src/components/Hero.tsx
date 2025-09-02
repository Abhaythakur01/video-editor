import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const logoTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // âœ… Load Montserrat Bold
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    let animationId: number;
    let startTime: number | null = null;
    const duration = 25000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      const offset = -(progress * 50);
      setScrollOffset(offset);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const logos = [
    { name: 'Netflix', logo: '/assets/logos/netflix-logo.png' },
    { name: 'Discovery', logo: '/assets/logos/discovery-logo.png' },
    { name: 'Myntra', logo: '/assets/logos/myntra-logo.png' },
    { name: 'MX Player', logo: '/assets/logos/mx-player-logo.png' },
    { name: 'Hotstar', logo: '/assets/logos/hotstar-logo.png' },
    { name: 'Curefit', logo: '/assets/logos/curefit-logo.png' },
    { name: 'Flipkart', logo: '/assets/logos/flipkart-logo.png' }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      style={{ fontFamily: 'Montserrat, system-ui, sans-serif', fontWeight: 700 }}
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        title="Background video showcasing video editing work"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        {/* Main Heading */}
        <h1 
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight"
          style={{
            fontWeight: '900',
            fontFamily: 'Montserrat, system-ui, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          <span 
            className="text-white block sm:inline"
            style={{
              fontWeight: '900',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Anurag{' '}
          </span>
          <span
            className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent block sm:inline"
            style={{
              background: 'linear-gradient(135deg, #facc15 0%, #4ade80 50%, #eab308 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: '900',
              display: 'inline-block',
              textShadow: 'none',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            MediaWorks
          </span>
        </h1>

        {/* Subtitle */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 text-slate-300">
            <span className="tracking-wide text-yellow-400 font-bold">Video Editor</span>
            <span className="hidden sm:block w-2 h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full" />
            <span className="tracking-wide text-green-400 font-bold">Story Sculptor</span>
            <span className="hidden sm:block w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full" />
            <span className="tracking-wide text-yellow-500 font-bold">Mumbai</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <a href="#showreel" className="inline-block">
            <button
              aria-label="Watch video showreel"
              className="relative px-8 sm:px-12 py-3 sm:py-4 text-white uppercase tracking-widest rounded-full overflow-hidden transition-all duration-500 border-2 border-yellow-400 group text-sm sm:text-base font-bold"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Watch Showreel
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </button>
          </a>
        </div>

        {/* Social Proof - Centered */}
        <div className="flex flex-col items-center justify-center gap-3 text-sm mb-8 sm:mb-12">
          <div className="text-center">
            <span className="text-yellow-400 font-bold text-lg">200+ Projects</span>
          </div>
          <div className="text-center">
            <span className="text-green-400 font-bold text-lg">14+ Years Experience</span>
          </div>
        </div>

        {/* Trusted By */}
        <div className="mt-8 sm:mt-12">
          <div className="text-xs text-slate-300 uppercase tracking-widest mb-6 sm:mb-8 font-bold">
            Trusted By
          </div>
          <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <div
              ref={logoTrackRef}
              className="flex gap-4 sm:gap-8"
              style={{
                transform: `translateX(${scrollOffset}%)`,
                width: 'max-content',
                transition: 'transform 0.1s linear',
              }}
            >
              {[...logos, ...logos].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 bg-gradient-to-br from-white via-yellow-50/80 to-green-50/60 border border-gray-200/30 rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="object-contain h-8 sm:h-10 max-w-[120px] filter brightness-100 contrast-110"
                    loading="lazy"
                    style={{ imageRendering: 'crisp-edges' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.logo-text')) {
                        const textSpan = document.createElement('span');
                        textSpan.className =
                          'logo-text text-gray-800 text-xs sm:text-sm px-2 sm:px-4';
                        textSpan.style.fontFamily =
                          'Montserrat, system-ui, sans-serif';
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
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-green-400/60 rounded-full flex justify-center transition-all duration-700 ease-out hover:border-green-400/80 hover:scale-110">
            <div className="w-1 h-3 bg-gradient-to-b from-yellow-400 to-green-400 rounded-full mt-2 animate-pulse" />
          </div>
          <ChevronDown
            className="text-green-400/80 mt-2 transition-all duration-500 ease-out hover:text-green-400 hover:scale-110"
            size={20}
          />
        </div>
        <div className="text-xs text-slate-400 mt-2 tracking-widest">
          SCROLL
        </div>
      </div>
    </section>
  );
};

export default Hero;