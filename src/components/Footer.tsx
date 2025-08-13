import React from 'react';
import { Instagram, Linkedin, Youtube, Mail, Heart, Sparkles, ArrowUp } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { 
      icon: <Instagram size={24} />, 
      href: '#', 
      label: 'Instagram',
      color: 'hover:text-pink-400',
      bgColor: 'hover:bg-pink-500/10'
    },
    { 
      icon: <Linkedin size={24} />, 
      href: '#', 
      label: 'LinkedIn',
      color: 'hover:text-purple-400',
      bgColor: 'hover:bg-purple-500/10'
    },
    { 
      icon: <Youtube size={24} />, 
      href: '#', 
      label: 'YouTube',
      color: 'hover:text-red-400',
      bgColor: 'hover:bg-red-500/10'
    },
    { 
      icon: <Mail size={24} />, 
      href: '#', 
      label: 'Email',
      color: 'hover:text-cyan-400',
      bgColor: 'hover:bg-cyan-500/10'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-t from-slate-950 to-slate-900 border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-l from-cyan-400/5 to-pink-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Abhay Thakur
                </span>
              </h3>
              <p className="text-slate-400 text-lg mb-2">Video Editor & Story Sculptor</p>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Sparkles size={14} className="text-pink-400" />
                <span>Mumbai, India</span>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
              Crafting visual stories that connect hearts, inspire minds, and create lasting impact through the art of cinematic editing.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="text-center p-3 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">50+</div>
                <div className="text-xs text-slate-500">Projects</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">5+</div>
                <div className="text-xs text-slate-500">Years</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">∞</div>
                <div className="text-xs text-slate-500">Stories</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {['About', 'Portfolio', 'Services', 'Testimonials', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-slate-400 hover:text-pink-400 transition-colors duration-300 text-sm hover:translate-x-1 transform transition-transform"
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
                <div
                  key={service}
                  className="text-slate-400 text-sm"
                >
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
                © 2024 Abhay Thakur. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs flex items-center gap-1 justify-center md:justify-start">
                Crafted with <Heart size={12} className="text-pink-400" /> and precision
              </p>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm italic mb-2">
                "Every frame tells a story. Every cut shapes emotion."
              </p>
              <button
                onClick={scrollToTop}
                className="group bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-white/10 hover:border-pink-500/30 p-3 rounded-xl transition-all duration-300 hover:scale-110"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} className="text-slate-400 group-hover:text-pink-400 group-hover:-translate-y-1 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-12 right-12 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </footer>
  );
};

export default Footer;