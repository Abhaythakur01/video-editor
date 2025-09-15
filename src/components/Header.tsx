import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // ✅ Load Montserrat Bold
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#showreel', label: 'Showreel' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-2 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-500 rounded-full ${
        isScrolled
          ? 'bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-md shadow-yellow-400/5'
          : 'bg-transparent'
      }`}
      style={{ fontFamily: 'Montserrat, system-ui, sans-serif', fontWeight: 700 }}
    >
      <nav className="container mx-auto px-4 py-1">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center space-x-2">
            <img
              src="/assets/company-icon.png"
              alt="Anurag MediaWorks Logo"
              className="h-14 w-auto transition-all duration-300 hover:scale-105"
            />
            <span className="hidden sm:inline-block text-white tracking-wide text-lg md:text-xl">
              Anurag MediaWorks
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-white/80 hover:text-white transition-all duration-300 group tracking-wide text-sm"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-all duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative">
              {/* Menu Icon */}
              <Menu 
                size={24} 
                className={`transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-180 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'
                }`}
              />
              {/* Close Icon */}
              <X 
                size={24} 
                className={`absolute top-0 left-0 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : 'rotate-180 opacity-0 scale-75'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Animated Container */}
        <div className={`md:hidden overflow-hidden transition-all duration-800 ease-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`transform transition-all duration-800 ease-out ${
            isMobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-8 scale-90'
          }`}>
            <div className="mt-4 pb-2 border-t border-white/10">
              <div className="flex flex-col space-y-1 pt-4 bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg shadow-yellow-400/10">
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-500 ease-out transform hover:scale-102 ${
                      isMobileMenuOpen 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-8 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : '0ms'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;