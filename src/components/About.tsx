import React, { useRef, useEffect, useState } from 'react';
import { Camera, Film, Scissors, Sparkles } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const scenes = [
    {
      title: "Chapter 1 • Origins",
      icon: <Camera className="text-pink-400" size={28} />,
      content: "Born from a passion for visual storytelling, my journey began in Mumbai's vibrant streets where every frame pulses with life. What started as curiosity evolved into mastery, crafting narratives that transcend boundaries and connect souls.",
      gradient: "from-pink-500/20 to-purple-500/20"
    },
    {
      title: "Chapter 2 • Mastery",
      icon: <Scissors className="text-purple-400" size={28} />,
      content: "Years of precision in cuts, color grading, and rhythm have given me the tools to transform raw footage into compelling visual poetry. From high-energy commercials to soul-stirring concept films, every project is crafted with cinematic excellence.",
      gradient: "from-purple-500/20 to-cyan-400/20"
    },
    {
      title: "Chapter 3 • Philosophy",
      icon: <Film className="text-cyan-400" size={28} />,
      content: "Video editing transcends technical skill—it's the art of time manipulation, emotion orchestration, and story architecture. Every cut serves purpose, every transition enhances feeling, every frame captivates hearts.",
      gradient: "from-cyan-400/20 to-pink-500/20"
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden" ref={ref}>
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ willChange: 'opacity' }}></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" 
             style={{ willChange: 'opacity', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-xl animate-pulse" 
             style={{ willChange: 'opacity', animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Portrait Section */}
          <div className={`relative transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ willChange: 'opacity, transform' }}>
            <div className="relative group">
              {/* Main Image Container */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg"
                  alt="Abhay Thakur"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Modern Decorative Elements */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full opacity-80">
                <Sparkles size={16} className="text-white" />
              </div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-4 backdrop-blur-md">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">50+</div>
                      <div className="text-xs opacity-80">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">5+</div>
                      <div className="text-xs opacity-80">Years</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">∞</div>
                      <div className="text-xs opacity-80">Stories</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className={`space-y-8 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ willChange: 'opacity, transform' }}>
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">MY</span>{' '}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  STORY
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                Behind every great edit is a storyteller who understands that cinema is not just about what you show, but how you make people 
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-semibold"> feel</span>.
              </p>
            </div>

            {/* Enhanced Scenes */}
            <div className="space-y-8">
              {scenes.map((scene, index) => (
                <div 
                  key={index}
                  className={`group relative transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: `${(index + 2) * 150}ms`,
                    willChange: 'opacity, transform'
                  }}
                >
                  {/* Modern Card Design */}
                  <div className="relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${scene.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-3 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          {scene.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                          {scene.title}
                        </h3>
                      </div>
                      
                      {/* Content */}
                      <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {scene.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className={`pt-8 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                <span className="flex items-center gap-2">
                  <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  Let's Create Magic Together
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;