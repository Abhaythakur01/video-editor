import React, { useState, useEffect } from 'react';
import { ChevronDown, Play } from 'lucide-react';

const Hero = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setNameVisible(true), 800);
    const timer2 = setTimeout(() => setTitleVisible(true), 1600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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
      {/* Dark overlay for cinematic contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1
          className={`text-6xl md:text-8xl font-bold mb-4 transition-all duration-1000 ease-out ${
            nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white tracking-wider">
            ANURAG{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent font-extrabold">
              MEDIAWORKS
            </span>
          </span>
        </h1>

        <div
          className={`text-xl md:text-2xl mb-8 transition-all duration-1000 ease-out delay-300 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300">
            <span className="font-light tracking-wide hover:text-yellow-400 transition-colors duration-300">
              Video Editor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></span>
            <span className="font-light tracking-wide hover:text-green-400 transition-colors duration-300">
              Story Sculptor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></span>
            <span className="font-light tracking-wide hover:text-yellow-500 transition-colors duration-300">
              Mumbai
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 ease-out delay-500 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button className="group relative bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-300 hover:to-green-300 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center">
              <Play className="mr-2" size={20} />
              Watch Showreel
            </span>
          </button>

          <button className="group relative border-2 border-green-400/50 hover:border-green-400 text-slate-300 hover:text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">View Portfolio</span>
          </button>
        </div>

        {/* Social Proof */}
        <div
          className={`flex justify-center items-center gap-6 text-sm text-slate-400 transition-all duration-1000 delay-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full"></div>
            <span>50+ Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
            <span>5 Years Experience</span>
          </div>
        </div>

        {/* Trusted By Section */}
        <div
          className={`mt-12 transition-all duration-1000 delay-900 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-light">
            Trusted By
          </div>
          <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12">
            {[
              { name: 'Netflix', logo: '/assets/logos/netflix-logo.png' },
              { name: 'Discovery', logo: '/assets/logos/discovery-logo.png' },
              { name: 'Myntra', logo: '/assets/logos/myntra-logo.png' },
              { name: 'MX Player', logo: '/assets/logos/mx-player-logo.png' },
              { name: 'Hotstar', logo: '/assets/logos/hotstar-logo.png' },
              { name: 'Curefit', logo: '/assets/logos/curefit-logo.png' }
            ].map((company, index) => (
              <div
                key={company.name}
                className="group relative"
                style={{ animationDelay: `${900 + index * 100}ms` }}
              >
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-6 md:h-8 opacity-60 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0 group-hover:scale-110"
                />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded blur-md -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-green-400/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-yellow-400 to-green-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <ChevronDown className="text-green-400/80 mt-2" size={24} />
        </div>
        <div className="text-xs text-slate-400 mt-2 tracking-widest font-light">SCROLL</div>
      </div>
    </section>
  );
};

export default Hero;