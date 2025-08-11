import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Users, 
  Globe, 
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Quote,
  ExternalLink,
  Rocket,
  DollarSign,
  User
} from 'lucide-react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

const HomePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-['Satoshi',system-ui,sans-serif] antialiased">
      {/* Centered Glass Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
        <motion.nav 
          className="bg-white/30 backdrop-blur-2xl border border-white/40 rounded-full px-8 py-4 shadow-xl shadow-black/10"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gray-900 rounded-full mr-3 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <h1 className="text-xl font-medium text-gray-900">SpectreX</h1>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Services', 'Enterprise', 'Team'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-normal relative group"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white/40 backdrop-blur-2xl border border-white/50 rounded-2xl p-6 shadow-xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
            >
              <div className="space-y-4">
                {['About', 'Services', 'Enterprise', 'Team'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-700 hover:text-gray-900 font-normal w-full text-left"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.nav>
      </div>

      {/* Hero Section with Spline Animation */}
      <section id="hero" className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center bg-gray-50">
            <motion.div 
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div 
                className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-600 text-sm font-light">Loading experience...</p>
            </motion.div>
          </div>
        }>
          <Spline
            scene="https://prod.spline.design/AKQIX1YDwlSmCaIl/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent'
            }}
          />
        </Suspense>
      </section>

      {/* Main Content Introduction */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h1 
              className="text-7xl md:text-8xl font-light mb-8 leading-tight text-gray-900 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Reinventing the{' '}
              <span className="font-normal text-gray-700">Software Experience</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We don't just build software. We build the future.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Section - Main Content */}
      <section id="about" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-light mb-8 text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Improve your business with{' '}
                <span className="font-normal text-gray-700">SpectreX AI</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed mb-12 font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                SpectreXweb builds next-generation software and AI systems for founders, enterprises, 
                and institutions, combining elegant design with cutting-edge technology to shape the future of innovation.
              </motion.p>
              
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-sm text-gray-500 font-normal">
                  Trusted by Icons • Empowering leaders in entertainment, finance, and education
                </div>
                <div className="text-sm text-gray-400">
                  Through eMazzanti Technologies
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Globe, title: "Global Reach", desc: "Serving clients across 50+ countries with enterprise-grade solutions" },
                { icon: Zap, title: "Lightning Fast", desc: "Deploy solutions in record time with our streamlined development process" },
                { icon: Shield, title: "Enterprise Grade", desc: "Bank-level security and reliability for mission-critical applications" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-light">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-light mb-6 text-gray-900">
              Incredible stats that showcase our{' '}
              <span className="font-normal text-gray-700">impact</span>
            </h2>
            <p className="text-lg text-gray-600 font-light">in people's lives</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { number: "900k+", label: "US Dollars added to global families", icon: DollarSign },
              { number: "78%", label: "Increase in global employment satisfaction", icon: TrendingUp },
              { number: "2000+", label: "Trusted customers worldwide", icon: Users }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-8 h-8 text-gray-700" />
                </div>
                <div className="text-4xl font-light text-gray-900 mb-4">{stat.number}</div>
                <p className="text-gray-600 font-light leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-light mb-4 text-gray-900">Built by visionaries. For visionaries.</h3>
            <p className="text-lg text-gray-600 font-light">Unbelievably fast. Incredibly powerful.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-light mb-6 text-gray-900">SpectreX for clients</h2>
            <p className="text-xl text-gray-600 font-light">Paths that make life a little easier</p>
          </motion.div>

          <motion.div 
            className="bg-white border border-gray-200 rounded-3xl p-12 mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-gray-400 mx-auto mb-8" />
            <blockquote className="text-2xl font-light mb-8 text-gray-800 leading-relaxed">
              "Every morning, I wake up asking myself: How can I make a meaningful difference in someone's life today?"
            </blockquote>
            <p className="text-gray-600 font-light">— Richard Titan, CEO of SpectreXweb</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovate +",
                desc: "End-to-end product development for companies ready to scale with intelligence, elegance, and speed.",
                icon: Rocket
              },
              {
                title: "Talent +",
                desc: "Elite embedded dev squads. Available to select ventures quarterly. Fully aligned, battle-tested, and discreet.",
                icon: Users
              },
              {
                title: "Vanguard™",
                desc: "Confidential R&D for category-defining ideas. Available only by invitation.",
                icon: Shield
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-light">{service.desc}</p>
                <div className="flex items-center text-gray-700 font-normal">
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Plans */}
      <section id="enterprise" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-light mb-6 text-gray-900">SpectreX Enterprise</h2>
            <p className="text-xl text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
              Three plans. Unlimited potential. Built for agencies, creators, and companies shaping the world.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Partner Innovate +",
                desc: "Ideal for agencies, freelancers, or companies with clients requiring regular websites or digital solutions.",
                features: [
                  "Development of up to 5 institutional websites per month",
                  "Modern and responsive design",
                  "Basic SEO optimization",
                  "Social media integration",
                  "Priority technical support",
                  "Free resale possibility"
                ],
                popular: false
              },
              {
                name: "Partner Talent +",
                desc: "For companies managing multiple digital projects or providing services to medium-sized clients.",
                features: [
                  "Up to 12 websites or e-commerce sites per month",
                  "Simple applications or SaaS platforms",
                  "Creative team for design",
                  "Project management with roadmaps",
                  "Basic AI Agents included",
                  "White-label permission",
                  "Annual magazine exposure"
                ],
                popular: true
              },
              {
                name: "Partner Vanguard™",
                desc: "For large agencies, consultancies, or tech companies needing complex project delivery.",
                features: [
                  "Unlimited websites (up to 25/month)",
                  "Custom software development",
                  "Advanced AI Agents 24/7",
                  "Complete team included",
                  "24/7 support",
                  "Forbes & CNBC exposure",
                  "Virtual office included"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div 
                key={index}
                className={`rounded-3xl p-8 border ${
                  plan.popular 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-gray-50 border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {plan.popular && (
                  <div className="text-center mb-6">
                    <span className="inline-block bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className={`text-xl font-medium mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 font-light leading-relaxed ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.desc}
                </p>
                
                <div className="mb-8">
                  <h4 className={`font-medium mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    Includes:
                  </h4>
                  <div className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start space-x-3">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-green-400' : 'text-green-500'}`} />
                        <span className={`text-sm font-light ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  plan.popular 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-light mb-6 text-gray-900">Reviews & testimonials</h2>
            <p className="text-lg text-gray-600 font-light max-w-4xl mx-auto leading-relaxed">
              We don't chase attention. But results speak. Trusted by global brands, startup pioneers, 
              and government-level innovators. Most of our work is protected by NDAs. The rest is building empires.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "They didn't just build our platform. They gave us momentum.",
                author: "Confidential Founder",
                company: "Fintech Sector"
              },
              {
                quote: "I've worked with dev teams before. This isn't that. This is different.",
                author: "Head of Product",
                company: "SaaS Startup"
              },
              {
                quote: "It now runs smoother than anything we've seen in our global portfolio.",
                author: "Senior Systems Architect",
                company: "Confidential Logistics Conglomerate"
              },
              {
                quote: "They rebuilt our product's core without fanfare or failure. Investors thought we'd raised Series B.",
                author: "Head of Product",
                company: "Stealth-Mode Fintech"
              },
              {
                quote: "Most dev teams execute tickets. SpectreXweb executed a vision.",
                author: "Technical Director",
                company: "Government-Adaptive Software Division"
              },
              {
                quote: "The systems SpectreXweb deployed for us have become foundational. Reliable. Untraceable.",
                author: "Confidential Office",
                company: "Secretary of State"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Quote className="w-8 h-8 text-gray-300 mb-6" />
                <p className="text-gray-700 mb-6 font-light leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm font-light">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-light mb-6 text-gray-900">Our executive team</h2>
            <p className="text-xl text-gray-600 font-light">The visionaries powering SpectreX</p>
            <p className="text-gray-500 mt-4 font-light">Shaping technology, strategy, and global growth</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { name: "Richard Titan", role: "Founder & Chief Executive Officer" },
              { name: "Mike Aronow", role: "Co-Founder & Chief Operations Officer" },
              { name: "Carlo Mazzanti", role: "Chief Technology Partner" },
              { name: "Debbie Wentz", role: "Chief Marketing Officer" },
              { name: "Joel Bastos", role: "Angel Investor" }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">{member.name}</h3>
                <p className="text-gray-600 mb-4 font-light leading-relaxed">{member.role}</p>
                <ExternalLink className="w-5 h-5 text-gray-400 mx-auto" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-12">
              <h3 className="text-2xl font-medium mb-4 text-gray-900">USD 1,500,000 funding round</h3>
              <p className="text-gray-600 mb-8 font-light text-lg">Become a SpectreX investor</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium">
                  Become an investor
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium">
                  Become a finance partner
                </button>
              </div>
            </div>
            <p className="text-xl text-gray-600 font-light mt-8">Built for business visionaries</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <h3 className="text-xl font-medium mb-6">SpectreX</h3>
              <p className="text-gray-400 mb-6 font-light leading-relaxed">
                SpectreXweb builds next-generation software and AI systems for founders, enterprises, 
                and institutions, combining elegant design with cutting-edge technology.
              </p>
              <p className="text-sm text-gray-500 font-light">Engineered in Europe. Designed for the world.</p>
            </div>
            
            {[
              {
                title: "Company",
                links: ["Home", "The Spectre Ethos", "Case Studies", "Careers", "Contact Us"]
              },
              {
                title: "Paths",
                links: ["Talent+", "Innovate+", "Vanguard™"]
              },
              {
                title: "Spectre X",
                links: ["SpectreVault", "SpectreX Store"]
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-medium mb-4">{section.title}</h4>
                <ul className="space-y-3 text-gray-400 font-light">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex space-x-6 mb-4 md:mb-0 text-gray-400 font-light">
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
            <p className="text-gray-400 font-light">© 2025 SpectreXweb. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;