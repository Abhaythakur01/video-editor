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
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-3 border-t border-white/10">
            <div className="flex flex-col space-y-3 pt-3 bg-slate-900/40 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-md shadow-yellow-400/5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
