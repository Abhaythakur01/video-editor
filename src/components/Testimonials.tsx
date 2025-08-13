import React, { useRef, useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      id: 1,
      quote: "Abhay transformed our brand's vision into a cinematic masterpiece. His attention to detail and storytelling prowess elevated our campaign beyond expectations.",
      client: "Rajesh Sharma",
      position: "Creative Director",
      company: "Premium Brands India",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg"
    },
    {
      id: 2,
      quote: "Working with Abhay is like having a visual poet on your team. He doesn't just edit videos; he crafts experiences that stay with you long after the credits roll.",
      client: "Priya Mehta",
      position: "Producer",
      company: "Mumbai Film Studios",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg"
    },
    {
      id: 3,
      quote: "The precision and artistry in Abhay's work is unmatched. He has an innate ability to find the soul of every story and bring it to life through his edits.",
      client: "David Chen",
      position: "International Client",
      company: "Global Media House",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    }
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Background glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2
            className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white">CLIENT</span>{' '}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              VOICES
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stories of collaboration, creativity, and the magic that happens when vision meets execution
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`rounded-2xl p-8 backdrop-blur-lg bg-slate-900/40 border border-white/10 hover:border-pink-400/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Quote */}
              <div className="mb-6">
                <Quote className="text-pink-400 mb-4 transition-transform duration-700 group-hover:scale-110" size={32} />
                <p className="text-slate-200 text-lg leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.client}
                    className="w-16 h-16 rounded-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-pink-400/30"></div>
                </div>
                <div>
                  <h4 className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold text-lg">
                    {testimonial.client}
                  </h4>
                  <p className="text-slate-400 text-sm">{testimonial.position}</p>
                  <p className="text-slate-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
