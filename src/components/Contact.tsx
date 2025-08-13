import React, { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Phone, Mail, Clock, Zap, Star } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    deadline: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      projectType: '',
      deadline: '',
      budget: '',
      message: ''
    });
  };

  const projectTypes = [
    'Commercial/Advertisement',
    'Concept Film',
    'Music Video',
    'Brand Story',
    'Documentary',
    'Wedding Film',
    'Corporate Video',
    'Social Media Content',
    'Other'
  ];

  const budgetRanges = [
    'Under ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000+',
    'Let\'s discuss'
  ];

  const contactInfo = [
    {
      icon: <MapPin className="text-pink-400" size={24} />,
      title: 'Location',
      detail: 'Mumbai, Maharashtra, India',
      gradient: 'from-pink-500/10 to-purple-500/10'
    },
    {
      icon: <Mail className="text-purple-400" size={24} />,
      title: 'Email',
      detail: 'abhay.thakur@filmmaker.com',
      gradient: 'from-purple-500/10 to-cyan-400/10'
    },
    {
      icon: <Phone className="text-cyan-400" size={24} />,
      title: 'Phone',
      detail: '+91 98765 43210',
      gradient: 'from-cyan-400/10 to-pink-500/10'
    },
    {
      icon: <Clock className="text-pink-400" size={24} />,
      title: 'Response Time',
      detail: 'Within 24 hours',
      gradient: 'from-pink-500/10 to-purple-500/10'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden" ref={ref}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ willChange: 'opacity' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" 
             style={{ willChange: 'opacity', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-l from-purple-500/5 to-pink-500/5 rounded-full blur-xl animate-pulse" 
             style={{ willChange: 'opacity', animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ willChange: 'opacity, transform' }}>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">LET'S</span>{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CREATE
              </span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="text-pink-400" size={20} />
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                Ready to bring your vision to life? Let's craft your story together.
              </p>
              <Star className="text-cyan-400" size={20} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Info */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ willChange: 'opacity, transform' }}>
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Get In Touch
                  </span>
                </h3>
                <p className="text-slate-400 mb-8">
                  Choose your preferred way to connect. I'm always excited to discuss new projects!
                </p>
              </div>
              
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="group relative p-6 rounded-2xl border border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                      willChange: 'transform'
                    }}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-3 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1 group-hover:text-pink-300 transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
                          {info.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">24hrs</div>
                    <div className="text-xs text-slate-400">Response</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">100%</div>
                    <div className="text-xs text-slate-400">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">50+</div>
                    <div className="text-xs text-slate-400">Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Contact Form */}
          <div className={`transition-all duration-1000 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
          style={{ willChange: 'opacity, transform' }}>
            <div className="relative p-8 rounded-2xl border border-white/10 backdrop-blur-md bg-gradient-to-b from-slate-800/30 to-slate-900/30">
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-8">
                <Zap className="text-pink-400" size={28} />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Production Brief
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">Name/Company</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-pink-400 focus:outline-none transition-all duration-300 focus:scale-[1.02]"
                      placeholder="Your name or company"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-all duration-300 focus:scale-[1.02]"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Project Type & Deadline */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all duration-300"
                      required
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-slate-800">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-pink-400 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-slate-300 mb-2 text-sm font-medium">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range} className="bg-slate-800">
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-300 mb-2 text-sm font-medium">Project Description</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-slate-800/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your vision, style preferences, target audience, and any specific requirements..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                      Send Production Brief
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;