import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Award } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );
    
    const filterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFilterVisible(true), 200);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '30px 0px -30px 0px'
      }
    );
    
    const projectsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setProjectsVisible(true), 400);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: '20px 0px -20px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);
    if (filterRef.current) filterObserver.observe(filterRef.current);
    if (projectsRef.current) projectsObserver.observe(projectsRef.current);
    
    return () => {
      observer.disconnect();
      filterObserver.disconnect();
      projectsObserver.disconnect();
    };
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'commercial', label: 'Commercials' },
    { id: 'concept', label: 'Concept Films' },
    { id: 'music', label: 'Music Videos' },
    { id: 'brand', label: 'Brand Stories' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Luxury Watch Campaign',
      category: 'commercial',
      year: '2024',
      client: 'Premium Timepieces',
      image: 'https://images.pexels.com/photos/1697728/pexels-photo-1697728.jpeg',
      description: 'High-end commercial showcasing precision and elegance',
      awards: ['Best Commercial Edit 2024']
    },
    {
      id: 2,
      title: 'Urban Dreams',
      category: 'concept',
      year: '2024',
      client: 'Independent Film',
      image: 'https://images.pexels.com/photos/1181996/pexels-photo-1181996.jpeg',
      description: 'A cinematic exploration of dreams and reality in Mumbai',
      awards: []
    },
    {
      id: 3,
      title: 'Tech Startup Launch',
      category: 'brand',
      year: '2023',
      client: 'InnovateX',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      description: 'Dynamic brand story for a revolutionary tech company',
      awards: ['Silver Lion Cannes 2024']
    },
    {
      id: 4,
      title: 'Monsoon Melody',
      category: 'music',
      year: '2023',
      client: 'Indie Artist',
      image: 'https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg',
      description: 'Emotional music video capturing the essence of Mumbai monsoons',
      awards: []
    },
    {
      id: 5,
      title: 'Fashion Forward',
      category: 'commercial',
      year: '2023',
      client: 'Haute Couture Brand',
      image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
      description: 'Avant-garde fashion film with cutting-edge editing techniques',
      awards: ['Best Fashion Film 2023']
    },
    {
      id: 6,
      title: 'Silent Conversations',
      category: 'concept',
      year: '2023',
      client: 'Art House Production',
      image: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg',
      description: 'Experimental short film exploring human connections',
      awards: []
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div ref={ref} className="text-center mb-16">
          <h2
            className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="text-white">PORT</span>
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent">FOLIO</span>
          </h2>
          <p className={`text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Each project is a carefully crafted visual narrative, designed to captivate and inspire
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          ref={filterRef}
          className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
            filterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {filters.map((filter, index) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] backdrop-blur-lg border transform ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-yellow-400 to-green-400 text-white border-transparent shadow-lg shadow-yellow-400/20 scale-105'
                  : 'bg-slate-800/40 border-white/10 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-105'
              }`}
              style={{
                transitionDelay: filterVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
                projectsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ 
                transitionDelay: projectsVisible ? `${index * 120}ms` : '0ms'
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-lg border border-white/10 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-[700ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:scale-[1.02]">
                {/* Image */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

                  {/* Smooth Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-green-400/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center">
                    <ExternalLink className="text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-[400ms] ease-out delay-200 transform group-hover:scale-110" size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-[-2px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-green-400 group-hover:to-yellow-500 group-hover:bg-clip-text transition-all duration-[600ms] ease-out">
                      {project.title}
                    </h3>
                    <span className="text-sm text-white/80 bg-slate-800/40 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 transition-all duration-300 group-hover:bg-slate-700/60 group-hover:border-white/20">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-slate-300 mb-3 transition-colors duration-300 group-hover:text-slate-200">{project.client}</p>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed transition-colors duration-300 group-hover:text-slate-300">{project.description}</p>

                  {project.awards.length > 0 && (
                    <div className="flex items-center gap-2 text-slate-200 text-sm transition-all duration-300 group-hover:text-yellow-300">
                      <Award size={16} className="text-yellow-400 transition-all duration-300 group-hover:text-yellow-300 group-hover:scale-110" />
                      <span>{project.awards[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;