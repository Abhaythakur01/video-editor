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
    const observerOptions = { threshold: 0.7 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          const animateStat = (key: keyof typeof stats, finalValue: number) => {
            let current = 0;
            const increment = Math.ceil(finalValue / 50);
            const counter = setInterval(() => {
              current += increment;
              if (current >= finalValue) {
                setStats((prev) => ({ ...prev, [key]: finalValue }));
                clearInterval(counter);
              } else {
                setStats((prev) => ({ ...prev, [key]: current }));
              }
            }, 30);
          };

          animateStat("projects", 120);
          animateStat("years", 10);
          animateStat("shows", 25);
          animateStat("revisions", 999);
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
      className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">LIVE</span>{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent">
              STATS
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A dynamic snapshot of dedication, creativity, and storytelling excellence brought to life.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 text-center">
          <div className="space-y-3">
            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent stat-number">
              {stats.projects}+
            </div>
            <p className="text-slate-400">Projects Delivered</p>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent stat-number">
              {stats.years}+
            </div>
            <p className="text-slate-400">Years Experience</p>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent stat-number">
              {stats.shows}+
            </div>
            <p className="text-slate-400">Reality Shows & Series</p>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent stat-number">
              {stats.revisions}+
            </div>
            <p className="text-slate-400">Revisions Offered</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-300 hover:to-green-300 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25">
            <span className="flex items-center gap-2 justify-center">
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              Let’s Build Together
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
