import React, { useEffect } from 'react';
import { Linkedin, Mail, Sparkles, ArrowUp } from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    // ✅ Load Montserrat Bold
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const socialLinks = [
    { 
      icon: <Linkedin size={24} />, 
      href: 'https://www.linkedin.com/in/anurag-gupta-a48775185/', 
      label: 'LinkedIn',
      color: 'hover:text-green-400',
      bgColor: 'hover:bg-green-500/10'
    },
    { 
      icon: <Mail size={24} />, 
      href: 'mailto:anuragmediaworks@gmail.com', 
      label: 'Email',
      color: 'hover:text-yellow-400',
      bgColor: 'hover:bg-yellow-500/10'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="bg-gradient-to-t from-slate-950 to-slate-900 border-t border-white/10 relative overflow-hidden"
      style={{ fontFamily: "Montserrat, system-ui, sans-serif", fontWeight: 700 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-green-400/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-l from-green-400/10 to-yellow-400/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent">
                  Anurag Gupta
                </span>
              </h3>
              <p className="text-slate-400 text-lg mb-2">Video Editor & Story Sculptor</p>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Sparkles size={14} className="text-yellow-400" />
                <span>Mumbai, India</span>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
              Crafting visual stories that connect hearts, inspire minds, and create lasting impact through the art of cinematic editing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {['About', 'Portfolio', 'Services', 'Stats', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-slate-400 hover:text-yellow-400 transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <div className="space-y-3">
              {['Commercial Editing', 'Concept Films', 'Music Videos', 'Brand Stories', 'Color Grading'].map((service) => (
                <div key={service} className="text-slate-400 text-sm">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center mb-12">
          <h4 className="text-white font-semibold mb-6">Let's Connect</h4>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-slate-800/30 border border-white/10 text-slate-400 ${link.color} ${link.bgColor} transition-all duration-300 hover:scale-110 hover:border-white/20 group`}
                aria-label={link.label}
              >
                <div className="group-hover:rotate-12 transition-transform duration-300">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm mb-1">
                © 2024 Anurag Gupta. All rights reserved.
              </p>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm italic mb-2">
                "Every frame tells a story. Every cut shapes emotion."
              </p>
              <button
                onClick={scrollToTop}
                className="group bg-gradient-to-r from-yellow-500/10 to-green-500/10 hover:from-yellow-500/20 hover:to-green-500/20 border border-white/10 hover:border-yellow-500/30 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} className="text-slate-400 group-hover:text-yellow-400 group-hover:-translate-y-1 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-12 right-12 w-1.5 h-1.5 bg-yellow-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </footer>
  );
};

export default Footer;
