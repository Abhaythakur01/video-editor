import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [showLogos, setShowLogos] = useState(false);
  const logoTrackRef = useRef<HTMLDivElement | null>(null);

  const duration = 25000;

  useEffect(() => {
    // Load Montserrat Bold
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!showLogos) return;

    let animationId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      const offset = -(progress * 50);
      setScrollOffset(offset);

      if (elapsed < duration) {
        animationId = requestAnimationFrame(animate);
      } else {
        setShowLogos(false); // hide after one full cycle
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [showLogos]);

  const logos = [
    { name: 'Netflix', logo: '/assets/logos/netflix-logo.png' },
    { name: 'Discovery', logo: '/assets/logos/discovery-logo.png' },
    { name: 'Myntra', logo: '/assets/logos/myntra-logo.png' },
    { name: 'MX Player', logo: '/assets/logos/mx-player-logo.png' },
    { name: 'Hotstar', logo: '/assets/logos/hotstar-logo.png' },
    { name: 'Curefit', logo: '/assets/logos/curefit-logo.png' },
    { name: 'Flipkart', logo: '/assets/logos/flipkart-logo.png' }
  ];

  // Common gradient style for text elements
  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #facc15 0%, #4ade80 50%, #eab308 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    fontWeight: '900',
    display: 'inline-block',
    textShadow: 'none',
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
  };

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
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-4 leading-tight"
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
            style={gradientTextStyle}
          >
            MediaWorks
          </span>
        </h1>

        {/* Subtitle / Social Proof combined for mobile */}
        <div className="flex sm:hidden flex-row items-center justify-center gap-4 text-sm mb-8">
          <span 
            className="font-bold"
            style={gradientTextStyle}
          >
            Video Editor
          </span>
          <span 
            className="font-bold"
            style={gradientTextStyle}
          >
            14+ Years Experience
          </span>
        </div>

        {/* Subtitle for desktop */}
        <div className="hidden sm:block text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-slate-300">
          <span 
            className="tracking-wide font-bold"
            style={gradientTextStyle}
          >
            Video Editor
          </span>
          <span className="mx-2 text-slate-400">·</span>
          <span 
            className="tracking-wide font-bold"
            style={gradientTextStyle}
          >
            Story Sculptor
          </span>
          <span className="mx-2 text-slate-400">·</span>
          <span 
            className="tracking-wide font-bold"
            style={gradientTextStyle}
          >
            Mumbai
          </span>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <a href="#showreel" className="w-full max-w-[160px] sm:max-w-[220px]">
            <button
              aria-label="Watch video showreel"
              className="relative w-full px-4 py-2 sm:px-10 sm:py-3 text-white uppercase tracking-widest rounded-full overflow-hidden transition-all duration-500 bg-gradient-to-r from-yellow-400 to-green-400 text-xs sm:text-sm lg:text-base font-bold shadow-lg whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap">
                Watch Showreel
                <ChevronDown size={14} className="sm:size-[16px] lg:size-[18px] group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </button>
          </a>
        </div>

        {/* Social Proof full version for desktop */}
        <div className="hidden sm:flex flex-row flex-wrap items-center justify-center gap-3 text-sm mb-6 sm:mb-10">
          <span 
            className="font-bold text-base sm:text-lg"
            style={gradientTextStyle}
          >
            200+ Projects
          </span>
          <span className="text-slate-500">|</span>
          <span 
            className="font-bold text-base sm:text-lg"
            style={gradientTextStyle}
          >
            14+ Years Experience
          </span>
        </div>

        {/* Trusted By Button */}
        <div className="mt-2 sm:mt-10">
          <button
            onClick={() => setShowLogos((prev) => !prev)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-500 text-slate-300 text-xs uppercase tracking-widest rounded-full bg-transparent hover:bg-slate-800 transition"
          >
            Trusted By
          </button>
        </div>

        {/* Logo Carousel */}
        {showLogos && (
          <div className="mt-6 sm:mt-8">
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
                    className="flex-shrink-0 bg-gradient-to-br from-white via-yellow-50/80 to-green-50/60 border border-gray-200/30 rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-md"
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="object-contain h-8 sm:h-10 max-w-[120px] filter brightness-100 contrast-110"
                      loading="lazy"
                      style={{ imageRendering: 'crisp-edges' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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