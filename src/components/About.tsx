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
      icon: <Camera className="text-yellow-400" size={28} />, 
      content: "I am a passionate individual who started editing in Mumbai’s vibrant media space. From fiction and non-fiction reality shows to commercials, music videos, intros, and short films, every project has been a step towards mastering cinematic storytelling.",
      gradient: "from-yellow-400/20 to-green-400/20"
    },
    {
      title: "Chapter 2 • Mastery",
      icon: <Scissors className="text-green-400" size={28} />,
      content: "My work includes neat visual & sound effects, eye-catching transitions, color correction, perfect audio syncing, and more. Over the years, I’ve built expertise with tools like FCP 7, Adobe Premiere Pro, and Soundtrack Pro—bringing clarity and polish to every frame.",
      gradient: "from-green-400/20 to-yellow-400/20"
    },
    {
      title: "Chapter 3 • Philosophy",
      icon: <Film className="text-yellow-400" size={28} />,
      content: "Editing for me is beyond cuts—it’s about orchestrating emotions and delivering stories that resonate. I believe in unlimited revisions until my clients are satisfied, delivering in any format they prefer, while always maintaining the highest quality.",
      gradient: "from-yellow-400/20 to-green-400/20"
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800/20 to-slate-900 relative overflow-hidden" ref={ref}>
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/5 to-green-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Portrait Section */}
          <div className={`relative transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="relative group">
              {/* Main Image Container */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="/assets/photos/myStory.png"
                  alt="Anurag Gupta"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-green-400 p-2 rounded-full opacity-80">
                <Sparkles size={16} className="text-white" />
              </div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-card p-4 backdrop-blur-md">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">300+</div>
                      <div className="text-xs opacity-80">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">14+</div>
                      <div className="text-xs opacity-80">Years</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">∞</div>
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
          }`}>
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">MY</span>{' '}
                <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent">
                  STORY
                </span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                I craft compelling edits for fiction, non-fiction, commercials, and music videos with a focus on emotion and clarity. My mission is to make every frame not just visible, but unforgettable.
              </p>
            </div>

            {/* Scenes */}
            <div className="space-y-8">
              {scenes.map((scene, index) => (
                <div 
                  key={index}
                  className={`group relative transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                >
                  <div className="relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-300 group-hover:scale-[1.02]">
                    <div className={`absolute inset-0 bg-gradient-to-r ${scene.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-3 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          {scene.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                          {scene.title}
                        </h3>
                      </div>
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
              <a 
                href="mailto:anuragmediaworks@gmail.com?subject=Let's Create Magic Together&body=Hi Anurag,%0D%0A%0D%0AI'd love to discuss a video editing project with you.%0D%0A%0D%0ABest regards,"
                className="group inline-block bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-300 hover:to-green-300 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  Let's Create Magic Together
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
