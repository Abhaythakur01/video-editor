import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Star, Sparkles } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ Load Montserrat Bold
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

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

  const contactInfo = [
    {
      icon: <MapPin className="text-yellow-400" size={28} />,
      title: 'Location',
      detail: 'Mumbai, Maharashtra, India',
      subtitle: 'Based in the heart of Bollywood',
      gradient: 'from-yellow-400/20 to-green-400/10',
      borderColor: 'hover:border-yellow-400/50'
    },
    {
      icon: <Mail className="text-green-400" size={28} />,
      title: 'Email',
      detail: 'anuragmediaworks@gmail.com',
      subtitle: 'Drop me a line anytime',
      gradient: 'from-green-400/20 to-yellow-400/10',
      borderColor: 'hover:border-green-400/50',
      clickable: true,
      link: 'mailto:anuragmediaworks@gmail.com?subject=Let\'s Create Something Amazing&body=Hi Anurag,%0D%0A%0D%0AI\'d love to discuss a video editing project with you.%0D%0A%0D%0ABest regards,'
    },
    {
      icon: <Phone className="text-yellow-400" size={28} />,
      title: 'Phone',
      detail: '+91 81084 66708',
      subtitle: 'Available for quick discussions',
      gradient: 'from-yellow-400/20 to-green-400/10',
      borderColor: 'hover:border-yellow-400/50',
      clickable: true,
      link: 'tel:+918108466708'
    },
    {
      icon: <Clock className="text-green-400" size={28} />,
      title: 'Response Time',
      detail: 'Within 24 hours',
      subtitle: 'Fast & reliable communication',
      gradient: 'from-green-400/20 to-yellow-400/10',
      borderColor: 'hover:border-green-400/50'
    }
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 sm:py-20 bg-gradient-to-b from-slate-900 via-slate-800/30 to-slate-900 relative overflow-hidden flex items-center"
      style={{ fontFamily: "Montserrat, system-ui, sans-serif", fontWeight: 700 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-br from-yellow-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-tr from-green-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-l from-yellow-400/5 to-green-400/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">GET IN</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-500 bg-clip-text text-transparent">
                TOUCH
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6">
              <Star className="text-yellow-400 hidden sm:block" size={20} />
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed text-center px-2">
                Ready to bring your vision to life? Choose your preferred way to
                connect and let's craft your story together.
              </p>
              <Star className="text-green-400 hidden sm:block" size={20} />
            </div>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group relative h-full transition-all duration-700 ease-out ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                {info.clickable ? (
                  <a
                    href={info.link}
                    className={`flex flex-col h-full relative p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] cursor-pointer ${info.borderColor} hover:shadow-xl hover:shadow-yellow-400/10 min-h-[220px] sm:min-h-[260px]`}
                  >
                    <ContactCardContent info={info} />
                  </a>
                ) : (
                  <div
                    className={`flex flex-col h-full relative p-5 sm:p-6 lg:p-8 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] ${info.borderColor} hover:shadow-xl hover:shadow-yellow-400/10 min-h-[220px] sm:min-h-[260px]`}
                  >
                    <ContactCardContent info={info} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-12 sm:mt-20 transition-all duration-1000 ease-out delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-800/40 via-slate-700/30 to-slate-800/40 border border-white/10 backdrop-blur-md">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mb-2">
                Why Choose Me?
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Proven track record of excellence
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              <StatBox number="24hrs" label="Response Time" />
              <StatBox number="100%" label="Client Satisfaction" />
              <StatBox number="300+" label="Projects Completed" />
              <StatBox number="14+" label="Years Experience" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-1000 ease-out delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="mailto:anuragmediaworks@gmail.com?subject=Let's Build Together&body=Hi Anurag,%0D%0A%0D%0AI'd love to collaborate with you on a project.%0D%0A%0D%0ABest regards,"
            className="group inline-block bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-300 hover:to-green-300 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/25"
          >
            <span className="flex items-center gap-2 sm:gap-3 justify-center">
              <Sparkles
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              Let's Build Together
              <Sparkles
                size={20}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

/* 🔹 Helper: Stat Box */
const StatBox = ({ number, label }: { number: string; label: string }) => (
  <div className="group">
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <div className="text-xs sm:text-sm text-slate-400">{label}</div>
  </div>
);

/* 🔹 Helper: Contact Card */
interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  detail: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  clickable?: boolean;
  link?: string;
}

const ContactCardContent = ({ info }: { info: ContactInfo }) => (
  <>
    <div
      className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
    ></div>
    <div className="relative z-10 text-center">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-3 sm:p-4 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300 mb-4 sm:mb-6 mx-auto w-fit">
        {info.icon}
      </div>
      <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-yellow-300 transition-colors duration-300">
        {info.title}
      </h4>
      <p className="text-sm sm:text-base text-slate-200 font-semibold mb-1 sm:mb-2 group-hover:text-white transition-colors duration-300 break-words">
        {info.detail}
      </p>
      <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
        {info.subtitle}
      </p>
    </div>
    {info.clickable && (
      <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-green-400 p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles size={12} className="text-white" />
      </div>
    )}
  </>
);

export default Contact;
