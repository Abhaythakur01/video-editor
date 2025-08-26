import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    projects: 0,
    years: 0,
    shows: 0,
    revisions: 0
  });

  useEffect(() => {
    const observerOptions = { 
      threshold: 0.1, // Reduced threshold for mobile
      rootMargin: '0px 0px -50px 0px' // Trigger animation earlier
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          const animateStat = (key: keyof typeof stats, finalValue: number) => {
            let current = 0;
            const duration = 2000; // 2 seconds
            const steps = 60; // 60 steps for smooth animation
            const increment = finalValue / steps;
            const stepDuration = duration / steps;

            const counter = setInterval(() => {
              current += increment;
              if (current >= finalValue) {
                setStats((prev) => ({ ...prev, [key]: finalValue }));
                clearInterval(counter);
              } else {
                setStats((prev) => ({ ...prev, [key]: Math.floor(current) }));
              }
            }, stepDuration);
          };

          // Stagger the animations slightly
          setTimeout(() => animateStat("projects", 300), 100);
          setTimeout(() => animateStat("years", 14), 200);
          setTimeout(() => animateStat("shows", 30), 300);
          setTimeout(() => animateStat("revisions", 999), 400);
        }
      });
    }, observerOptions);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      id="stats"
      ref={ref}
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background glowing orbs - adjusted for mobile */}
      <div className="absolute top-1/4 left-1/6 sm:left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/6 sm:right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-white">LIVE</span>{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent">
              STATS
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
            A dynamic snapshot of dedication, creativity, and storytelling excellence brought to life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 text-center">
          <div className="space-y-2 sm:space-y-3 p-4 rounded-lg bg-slate-800/30 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent stat-number">
              {stats.projects}+
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">Projects Delivered</p>
          </div>
          <div className="space-y-2 sm:space-y-3 p-4 rounded-lg bg-slate-800/30 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent stat-number">
              {stats.years}+
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">Years Experience</p>
          </div>
          <div className="space-y-2 sm:space-y-3 p-4 rounded-lg bg-slate-800/30 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent stat-number">
              {stats.shows}+
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">Reality Shows & Series</p>
          </div>
          <div className="space-y-2 sm:space-y-3 p-4 rounded-lg bg-slate-800/30 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent stat-number">
              {stats.revisions}+
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">Revisions Offered</p>
          </div>
        </div>

        {/* CTA */}
                {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <a 
            href="mailto:anuragmediaworks@gmail.com?subject=Let's Build Together&body=Hi Anurag,%0D%0A%0D%0AI'm interested in working with you on a video editing project.%0D%0A%0D%0ABest regards,"
            className="group inline-block bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-300 hover:to-green-300 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 text-sm sm:text-base"
          >
            <span className="flex items-center gap-2 justify-center">
              <Sparkles size={16} className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              Let's Build Together
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Stats;