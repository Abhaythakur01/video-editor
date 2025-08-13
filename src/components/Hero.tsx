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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1
          className={`text-6xl md:text-8xl font-bold mb-4 transition-all duration-1000 ease-out ${
            nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white tracking-wider">
            ABHAY{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-extrabold">
              THAKUR
            </span>
          </span>
        </h1>

        <div
          className={`text-xl md:text-2xl mb-8 transition-all duration-1000 ease-out delay-300 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-wrap justify-center items-center gap-4 text-slate-300">
            <span className="font-light tracking-wide hover:text-pink-400 transition-colors duration-300">
              Video Editor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></span>
            <span className="font-light tracking-wide hover:text-purple-400 transition-colors duration-300">
              Story Sculptor
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></span>
            <span className="font-light tracking-wide hover:text-cyan-400 transition-colors duration-300">
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
          <button className="group relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center">
              <Play className="mr-2" size={20} />
              Watch Showreel
            </span>
          </button>

          <button className="group relative border-2 border-cyan-400/50 hover:border-cyan-400 text-slate-300 hover:text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <div className="w-8 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
            <span>50+ Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"></div>
            <span>5 Years Experience</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <ChevronDown className="text-cyan-400/80 mt-2" size={24} />
        </div>
        <div className="text-xs text-slate-400 mt-2 tracking-widest font-light">SCROLL</div>
      </div>
    </section>
  );
};

export default Hero;
