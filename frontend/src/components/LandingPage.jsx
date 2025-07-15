import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ChevronDown, Play, Shield, Zap, Users, Star, ArrowRight, Menu, X, Globe, TrendingUp, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';
const MarketplaceLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { 
      icon: Shield, 
      title: "Enterprise Security", 
      desc: "Advanced encryption and multi-layer security protocols ensuring complete data protection and compliance",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: Zap, 
      title: "High Performance", 
      desc: "Optimized infrastructure delivering lightning-fast response times with 99.9% uptime guarantee",
      color: "from-emerald-500 to-green-600"
    },
    { 
      icon: Globe, 
      title: "Global Platform", 
      desc: "Seamlessly connect with customers and partners across 180+ countries with localized support",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const testimonials = [
    {
      text: "This platform has streamlined our operations significantly. The ROI we've seen is exceptional.",
      author: "Michael Chen",
      role: "CEO, TechCorp Solutions",
      rating: 5
    },
    {
      text: "Outstanding reliability and support. Our team productivity increased by 40% within the first quarter.",
      author: "Sarah Williams",
      role: "Operations Director, Global Industries",
      rating: 5
    },
    {
      text: "The best marketplace solution we've implemented. Scalable, secure, and incredibly user-friendly.",
      author: "David Martinez",
      role: "CTO, Innovation Labs",
      rating: 5
    }
  ];

  const stats = [
    { number: "5M+", label: "Active Users", icon: Users },
    { number: "$1.2B+", label: "Transaction Volume", icon: TrendingUp },
    { number: "150+", label: "Countries", icon: Globe },
    { number: "99.9%", label: "Uptime", icon: Shield }
  ];

  const benefits = [
    "Advanced Analytics Dashboard",
    "24/7 Customer Support",
    "API Integration",
    "Custom Branding",
    "Multi-Currency Support",
    "Real-time Notifications"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
        <Navbar/>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Building a Greener
              <br />
              <span className="text-emerald-400">Commerce Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empower your marketplace with sustainable tools and eco-intelligent insights.
        Join the movement toward a planet-first digital economy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#8BC34A] to-[#00C853]">
          GreenHive 🌿
        </Link>

            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="platform" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Core Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built with enterprise-grade technology to deliver exceptional performance, security, and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-emerald-400/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-6`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Everything You Need to
                <span className="text-emerald-400"> Succeed</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Our comprehensive platform includes all the tools and features necessary to build, manage, and scale your marketplace business effectively.
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-center">
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-800/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Trusted by Industry Leaders
          </h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <p className="text-xl text-gray-200 mb-6 italic leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </p>
            
            <div className="space-y-1">
              <p className="text-white font-semibold">
                {testimonials[currentTestimonial].author}
              </p>
              <p className="text-emerald-400">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-emerald-400' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust our platform to power their marketplace success. Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="border-2 border-gray-600 hover:border-emerald-400 hover:text-emerald-400 px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-white mb-4 md:mb-0">
              <span className="text-emerald-400">Nexus</span>Market
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Support</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            <p>&copy; 2024 NexusMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplaceLanding;