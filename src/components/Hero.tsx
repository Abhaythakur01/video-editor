import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const logoTrackRef = useRef(null);

  useEffect(() => {
    let animationId;
    let startTime = null;
    const duration = 25000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      const offset = -(progress * 50);
      setScrollOffset(offset);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-12">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-white">
            Anurag{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent font-bold">
              MediaWorks
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <div className="text-xl md:text-2xl mb-8">
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300">
            <span className="font-light tracking-wide text-yellow-400">Video Editor</span>
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></span>
            <span className="font-light tracking-wide text-green-400">Story Sculptor</span>
            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></span>
            <span className="font-light tracking-wide text-yellow-500">Mumbai</span>
          </div>
        </div>

        {/* CTA Button (Blob Button with Tailwind) */}
        <div className="flex justify-center mb-16">
          <a href="#showreel" className="inline-block">
            <button
              aria-label="Watch video showreel"
              className="relative px-12 py-4 font-bold text-yellow-400 uppercase tracking-wide rounded-full overflow-hidden transition-colors duration-500 border-2 border-yellow-400 group"
            >
              <span className="relative z-10">Watch Showreel</span>

              {/* Blobs */}
              <span className="absolute inset-0 overflow-hidden rounded-full z-0">
                <span className="relative block w-full h-full filter [filter:url(#goo)]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span
                      key={i}
                      className={`absolute top-0 h-full w-1/4 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 transform translate-y-full scale-125 transition-transform duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100`}
                      style={{
                        left: `${i * 25}%`,
                        transitionDelay: `${i * 80}ms`,
                      }}
                    ></span>
                  ))}
                </span>
              </span>

              {/* Hover overlay to change text color */}
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-400 opacity-0 transition-opacity duration-300 rounded-full group-hover:opacity-100"></span>
            </button>
          </a>

          {/* Gooey SVG filter */}
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  
                          0 1 0 0 0  
                          0 0 1 0 0  
                          0 0 0 21 -7"
                  result="goo"
                ></feColorMatrix>
                <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Social Proof Stats */}
        <div className="flex justify-center items-center gap-6 text-sm text-slate-400 mb-12">
          <div className="flex items-center gap-2 transition-all duration-500 ease-out hover:scale-105">
            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></div>
            <span className="text-yellow-400">200+ Projects</span>
          </div>
          <div className="flex items-center gap-2 transition-all duration-500 ease-out hover:scale-105">
            <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
            <span className="text-green-400">14+ Years Experience</span>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-12">
          <div className="text-xs text-slate-300 uppercase tracking-widest mb-8 font-light">Trusted By</div>
          <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div
              ref={logoTrackRef}
              className="flex gap-8"
              style={{
                transform: `translateX(${scrollOffset}%)`,
                width: 'max-content',
                transition: 'transform 0.1s linear',
              }}
            >
              {[...logos, ...logos].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 bg-gradient-to-br from-white via-yellow-50/80 to-green-50/60 border border-gray-200/30 rounded-xl px-6 py-4 shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:-translate-y-1"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className={`h-10 w-auto max-w-[120px] object-contain filter brightness-100 contrast-110 ${
                      company.name === 'Flipkart' || company.name === 'Discovery' ? 'scale-125' : ''
                    }`}
                    loading="lazy"
                    style={{ minWidth: '80px', imageRendering: 'crisp-edges' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.logo-text')) {
                        const textSpan = document.createElement('span');
                        textSpan.className = 'logo-text text-gray-800 text-sm font-semibold px-4';
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
