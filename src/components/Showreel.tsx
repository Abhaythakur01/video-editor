import React, { useState } from 'react';
import { Play } from 'lucide-react';

const Showreel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const reelThumbnails = [
    {
      id: 1,
      title: 'Commercial Reel 2024',
      thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg',
      duration: '2:30'
    },
    {
      id: 2,
      title: 'Concept Films',
      thumbnail: 'https://images.pexels.com/photos/1181996/pexels-photo-1181996.jpeg',
      duration: '3:45'
    },
    {
      id: 3,
      title: 'Brand Stories',
      thumbnail: 'https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg',
      duration: '1:55'
    }
  ];

  return (
    <section id="showreel" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">SHOW</span>
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">REEL</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A curated collection of stories brought to life through precision editing and visual storytelling
          </p>
        </div>

        {/* Main Showreel */}
        <div className="relative mb-16 group">
          <div
            className={`relative overflow-hidden rounded-2xl backdrop-blur-lg bg-slate-900/40 border border-white/10 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isPlaying ? 'shadow-xl shadow-purple-500/20' : 'shadow-lg shadow-black/40'
            }`}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg"
                alt="Main Showreel"
                className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-90"></div>

              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:shadow-lg group-hover:shadow-purple-500/30 delay-200">
                    <Play size={48} className="ml-2" />
                  </div>
                </button>
              )}

              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white p-4 rounded-lg">
                  <p className="text-lg">Video would play here</p>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white hover:scale-105 transition-transform duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reel Thumbnails */}
        <div className="grid md:grid-cols-3 gap-8">
          {reelThumbnails.map((reel, idx) => (
            <div
              key={reel.id}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-lg border border-white/10 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70 transition-opacity duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-90"></div>

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-150">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-300">
                    <Play size={24} className="ml-1" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm border border-white/10">
                  {reel.duration}
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] delay-200">
                <h3 className="text-white font-semibold text-lg">{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showreel;
