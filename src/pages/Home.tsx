import  { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight,  X, Menu,  Users,  MapPin, Clock, Shield, Zap, Camera,  Mountain, Eye, CheckCircle, Globe, Database, Smartphone, Wifi, Lock, Award,  BookOpen, Phone, Code, BarChart3, Headphones, Target, Lightbulb, Truck, Server, Monitor } from 'lucide-react';

const ReliefGridHomepage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);




  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div 
      className="min-h-screen bg-white font-normal antialiased" 
      style={{ 
        fontWeight: 400,
        fontSize: '14px',
        cursor: 'url(/Reliefgrid.png) 10 10, auto' 
      }}
    >

       {/* Enhanced Header */}
       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90'} ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center group">
              <img 
                src="/relief.png" 
                alt="Relief Grid" 
                className="w-30 h-12 group-hover:scale-105 transition-all duration-300 filter drop-shadow-sm"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex space-x-8">
                <div className="relative group">
                  <button className="flex items-center text-[#111111] hover:text-[#FF8E6C] text-sm font-medium transition-all duration-300 py-2">
                    Platform 
                    <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="p-6 space-y-4">
                      <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#FF8E6C]/5 transition-colors duration-200">
                        <MapPin className="w-5 h-5 text-[#FF8E6C]" />
                        <div>
                          <div className="font-medium text-[#111111]">Crisis Mapping</div>
                          <div className="text-xs text-[#111111]/60">Real-time disaster visualization</div>
                        </div>
                      </a>
                      <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#51DB81]/5 transition-colors duration-200">
                        <Shield className="w-5 h-5 text-[#51DB81]" />
                        <div>
                          <div className="font-medium text-[#111111]">Resource Allocation</div>
                          <div className="text-xs text-[#111111]/60">AI-powered matching</div>
                        </div>
                      </a>
                      <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-[#FEE581]/10 transition-colors duration-200">
                        <Lock className="w-5 h-5 text-[#111111]" />
                        <div>
                          <div className="font-medium text-[#111111]">Secure Communications</div>
                          <div className="text-xs text-[#111111]/60">End-to-end encrypted</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                
                <a href="#" className="text-[#111111] hover:text-[#FF8E6C] text-sm font-medium transition-all duration-300 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF8E6C] hover:after:w-full after:transition-all after:duration-300">
                  Solutions
                </a>
                <a href="#" className="text-[#111111] hover:text-[#FF8E6C] text-sm font-medium transition-all duration-300 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF8E6C] hover:after:w-full after:transition-all after:duration-300">
                  Impact
                </a>
                <a href="#" className="text-[#111111] hover:text-[#FF8E6C] text-sm font-medium transition-all duration-300 py-2 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF8E6C] hover:after:w-full after:transition-all after:duration-300">
                  Pricing
                </a>
              </nav>
              
              <div className="flex items-center space-x-4">
                <button className="text-[#111111] hover:text-[#FF8E6C] text-sm font-medium transition-all duration-300">
                  Sign In
                </button>
                <button className="bg-gradient-to-r from-[#FF8E6C] to-[#FF8E6C]/80 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-[#51DB81] hover:to-[#51DB81]/80">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t border-gray-100`}>
          <div className="p-6 space-y-4">
            <a href="#" className="block text-[#111111] hover:text-[#FF8E6C] py-2 transition-colors duration-200">Platform</a>
            <a href="#" className="block text-[#111111] hover:text-[#FF8E6C] py-2 transition-colors duration-200">Solutions</a>
            <a href="#" className="block text-[#111111] hover:text-[#FF8E6C] py-2 transition-colors duration-200">Impact</a>
            <a href="#" className="block text-[#111111] hover:text-[#FF8E6C] py-2 transition-colors duration-200">Pricing</a>
            <button className="w-full bg-[#FF8E6C] text-white py-3 rounded-full font-medium mt-4">Get Started</button>
          </div>
        </div>
      </header>
      
    <div className="pt-20">


      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FEE581]/10 via-white to-[#51DB81]/5">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className={`space-y-6 transition-all duration-700 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 bg-[#FF8E6C] rounded-full border-2 border-white shadow-sm"></div>
                  <div className="w-6 h-6 bg-[#51DB81] rounded-full border-2 border-white shadow-sm"></div>
                  <div className="w-6 h-6 bg-[#FEE581] rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <span className="text-xs text-[#111111]/60">45+ Organizations Connected</span>
              </div>
              
              <h1 className="text-6xl font-normal text-[#111111] leading-tight">
                Real-time disaster<br />
                response coordination<br />
                <span className="text-[#51DB81]">that saves lives</span>
              </h1>
              
              <p className="text-base text-[#111111]/70 leading-relaxed max-w-md">
                Relief Grid connects humanitarian organizations, government agencies, and local responders to coordinate aid delivery in crisis zones with unprecedented speed and accuracy.
              </p>
              
              <div className="flex items-center space-x-4">
                <button className="bg-[#111111] text-white px-6 py-3 rounded-full text-sm flex items-center hover:bg-[#FF8E6C] transition-all duration-300 hover:scale-105 group">
                  Start Coordinating
                  <ChevronRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="text-[#111111] px-4 py-3 text-sm hover:text-[#FF8E6C] transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              
              <div className="pt-6">
                <p className="text-xs text-[#111111]/40 mb-3">Trusted by leading organizations</p>
                <div className="flex items-center space-x-6">
                  <span className="text-sm text-[#111111]/30">UN OCHA</span>
                  <span className="text-sm text-[#111111]/30">Red Cross</span>
                  <span className="text-sm text-[#111111]/30">MSF</span>
                  <span className="text-sm text-[#111111]/30">USAID</span>
                </div>
              </div>
            </div>
            
            {/* Right Visual - Mobile Interface Inspired */}
            <div className={`relative transition-all duration-700 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
              <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4">
                  <ChevronRight className="w-5 h-5 text-[#111111] rotate-180" />
                  <span className="text-sm font-medium text-[#111111]">Live Crisis Feed</span>
                  <div className="w-5 h-5"></div>
                </div>
                
                {/* Map Area */}
                <div className="bg-gradient-to-br from-[#FEE581]/20 to-[#51DB81]/20 rounded-2xl h-48 relative mb-4 overflow-hidden">
                  <div className="absolute top-4 left-4 bg-[#FF8E6C] rounded-full p-2 shadow-lg">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-1 shadow-sm">
                    <span className="text-xs font-medium text-[#111111]">Earthquake Zone</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                    <Eye className="w-4 h-4 text-[#111111]" />
                  </div>
                </div>
                
                {/* Location Info */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-[#111111]">Emergency</h3>
                  <div className="flex items-center text-xs text-[#111111]/60">
                    <MapPin className="w-3 h-3 mr-1" />
                    Istanbul, Turkey
                  </div>
                </div>
                
                {/* Weather Card */}
                <div className="bg-[#51DB81] rounded-2xl p-4 mb-4 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-xs mb-1">Istanbul, 15 Feb 2024</p>
                      <p className="text-white text-2xl font-light mb-1">7.2M</p>
                      <p className="text-white/80 text-xs">Magnitude</p>
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-12 bg-white/20 rounded-full mb-2"></div>
                      <p className="text-white/80 text-xs">Critical</p>
                    </div>
                  </div>
                </div>
                
                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#FF8E6C]/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#FF8E6C]" />
                    </div>
                    <p className="text-xs text-[#111111]/60">Affected</p>
                    <p className="text-sm font-medium text-[#111111]">50,000</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#FEE581]/40 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <Mountain className="w-4 h-4 text-[#111111]" />
                    </div>
                    <p className="text-xs text-[#111111]/60">Depth</p>
                    <p className="text-sm font-medium text-[#111111]">12.5km</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#51DB81]/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#51DB81]" />
                    </div>
                    <p className="text-xs text-[#111111]/60">Response</p>
                    <p className="text-sm font-medium text-[#51DB81]">3.2hrs</p>
                  </div>
                </div>
                
                {/* Photos Section */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#111111]">Live Reports</span>
                    <span className="text-xs text-[#51DB81]">See All</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-200 rounded-lg h-16 flex items-center justify-center">
                      <Camera className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="bg-gray-200 rounded-lg h-16 flex items-center justify-center">
                      <Camera className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="bg-gray-200 rounded-lg h-16 flex items-center justify-center">
                      <Camera className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-gradient-to-br from-[#51DB81]/3 to-[#FEE581]/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#51DB81]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#51DB81] rounded-full mr-2"></div>
              Real Impact Metrics
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">Accelerating humanitarian response worldwide</h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Our platform has transformed how organizations coordinate disaster relief, reducing response times and saving more lives
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Response Time Card */}
            <div className="bg-gradient-to-br from-[#FF8E6C] to-[#FF8E6C]/80 rounded-2xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="relative z-10">
                <h3 className="text-4xl font-light mb-3">4.2hrs</h3>
                <p className="text-white/90 text-sm mb-6">Average Response Time</p>
                
                <div className="bg-[#111111]/20 rounded-xl p-4 mb-6">
                  <p className="text-xs leading-relaxed">
                    Reduced from 48+ hours to under 5 hours through real-time coordination
                  </p>
                </div>
                
                <div className="flex items-center text-xs">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>85% faster than traditional methods</span>
                </div>
              </div>
            </div>
            
            {/* Organizations Connected */}
            <div className="bg-[#111111] rounded-2xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="relative z-10">
                <h3 className="text-4xl font-light mb-3">450+</h3>
                <p className="text-white/80 text-sm mb-6">Organizations Connected</p>
                
                <div className="bg-[#FF8E6C]/20 rounded-xl p-4 mb-6">
                  <p className="text-xs text-white/90 leading-relaxed">
                    UN agencies, NGOs, governments, and local responders in unified network
                  </p>
                </div>
                
                <div className="flex -space-x-1">
                  <div className="w-8 h-8 bg-[#FF8E6C] rounded-full border-2 border-[#111111]"></div>
                  <div className="w-8 h-8 bg-[#51DB81] rounded-full border-2 border-[#111111]"></div>
                  <div className="w-8 h-8 bg-[#FEE581] rounded-full border-2 border-[#111111]"></div>
                  <div className="w-8 h-8 bg-[#FF8E6C]/70 rounded-full border-2 border-[#111111]"></div>
                  <div className="w-8 h-8 bg-[#51DB81]/70 rounded-full border-2 border-[#111111]"></div>
                </div>
              </div>
            </div>
            
            {/* Lives Impacted */}
            <div className="bg-gradient-to-br from-[#FEE581] to-[#FEE581]/80 rounded-2xl p-8 text-[#111111] relative overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="relative z-10">
                <h3 className="text-4xl font-light mb-3">2.1M</h3>
                <p className="text-[#111111]/80 text-sm mb-6">People Reached</p>
                
                <div className="bg-[#111111]/10 rounded-xl p-4 mb-6">
                  <p className="text-xs leading-relaxed">
                    Coordinated aid delivery reaching millions affected by disasters globally
                  </p>
                </div>
                
                <div className="flex items-center text-xs">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Across 85 countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Scenarios */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#FF8E6C]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#FF8E6C] rounded-full mr-2"></div>
              Crisis Scenarios
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Every disaster is different. Our response adapts.
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Relief Grid has been tested in the world's most challenging humanitarian crises
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Earthquake */}
            <div className="bg-gradient-to-br from-[#FF8E6C]/5 to-[#FF8E6C]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#FF8E6C] rounded-xl flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Earthquakes</h3>
              <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                Rapid structural assessment, search & rescue coordination, and emergency shelter deployment
              </p>
              <div className="text-xs text-[#FF8E6C] font-medium">7.2M magnitude → 3.2hr response</div>
            </div>
            
            {/* Flooding */}
            <div className="bg-gradient-to-br from-[#51DB81]/5 to-[#51DB81]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#51DB81] rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Floods</h3>
              <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                Water level monitoring, evacuation routing, and clean water distribution coordination
              </p>
              <div className="text-xs text-[#51DB81] font-medium">50,000 evacuated → 2.8hr response</div>
            </div>
            
            {/* Hurricane */}
            <div className="bg-gradient-to-br from-[#FEE581]/5 to-[#FEE581]/15 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#FEE581] rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Hurricanes</h3>
              <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                Storm tracking, pre-positioning resources, and coordinated evacuation management
              </p>
              <div className="text-xs text-[#111111] font-medium">Cat 5 storm → 12hr preparation</div>
            </div>
            
            {/* Conflict */}
            <div className="bg-gradient-to-br from-[#111111]/5 to-[#111111]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#111111] rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Conflict Zones</h3>
              <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                Secure communication channels, safe passage coordination, and refugee camp management
              </p>
              <div className="text-xs text-[#111111] font-medium">200K refugees → 24hr setup</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gradient-to-br from-[#FEE581]/5 to-[#51DB81]/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#51DB81]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#51DB81] rounded-full mr-2"></div>
              Response Process
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              From alert to action in minutes
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Our streamlined process ensures no time is wasted when lives are at stake
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-6">
            
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF8E6C] rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <MapPin className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#FF8E6C]">1</div>
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Crisis Detection</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Automated monitoring systems detect disasters through satellite data, social media, and field reports
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#51DB81] rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <Shield className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#51DB81]">2</div>
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Verification</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Multi-source verification confirms crisis details, severity, and immediate needs assessment
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FEE581] rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <Users className="w-8 h-8 text-[#111111]" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#111111]">3</div>
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Network Activation</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Relevant organizations are instantly notified and connected through secure communication channels
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#111111] rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <Zap className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#111111]">4</div>
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Resource Matching</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                AI-powered algorithms match available resources with urgent needs to optimize distribution
              </p>
            </div>
            
            {/* Step 5 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF8E6C] rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <CheckCircle className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-[#FF8E6C]">5</div>
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Coordinated Response</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Real-time tracking and coordination ensures efficient deployment and prevents resource duplication
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#FF8E6C]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#FF8E6C] rounded-full mr-2"></div>
              Platform Capabilities
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Built for crisis coordination
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Advanced tools designed specifically for humanitarian organizations to coordinate effectively during emergencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Real-time Mapping */}
            <div className="bg-gradient-to-br from-[#51DB81]/5 to-[#51DB81]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#51DB81] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#111111] mb-2">Crisis Mapping & Tracking</h3>
                  <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                    Real-time visualization of disaster zones, resource deployment, and affected populations with satellite integration
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Live Updates</span>
                    <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Satellite Data</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resource Coordination */}
            <div className="bg-gradient-to-br from-[#FF8E6C]/5 to-[#FF8E6C]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF8E6C] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#111111] mb-2">Resource Allocation</h3>
                  <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                    Intelligent matching of available resources with urgent needs, preventing duplication and ensuring efficient distribution
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">Auto-Matching</span>
                    <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">Priority Queue</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Communication Hub */}
            <div className="bg-gradient-to-br from-[#FEE581]/5 to-[#FEE581]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FEE581] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-[#111111]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#111111] mb-2">Secure Communications</h3>
                  <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                    Encrypted messaging and data sharing between all stakeholders with role-based access controls
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">End-to-End Encrypted</span>
                    <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">Role-Based</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Impact Analytics */}
            <div className="bg-gradient-to-br from-[#111111]/5 to-[#111111]/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#111111] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#111111] mb-2">Impact Analytics</h3>
                  <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                    Comprehensive reporting and analytics to measure response effectiveness and improve future operations
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-[#111111]/20 text-[#111111] px-2 py-1 rounded">Real-time Reports</span>
                    <span className="text-xs bg-[#111111]/20 text-[#111111] px-2 py-1 rounded">Predictive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-gradient-to-br from-[#51DB81]/3 to-[#FEE581]/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#111111]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#111111] rounded-full mr-2"></div>
              Technology Infrastructure
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Enterprise-grade technology for mission-critical operations
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Built on secure, scalable infrastructure designed to perform when lives depend on it
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Cloud Infrastructure */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#51DB81] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Global Cloud</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                99.9% uptime with redundant servers across 5 continents for instant global availability
              </p>
            </div>
            
            {/* Real-time Data */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#FF8E6C] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Real-time Sync</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Sub-second data synchronization across all connected devices and stakeholders
              </p>
            </div>
            
            {/* Mobile Optimized */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#FEE581] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Mobile First</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Optimized for field workers using tablets and smartphones in challenging conditions
              </p>
            </div>
            
            {/* Offline Capability */}
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#111111] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-[#111111] mb-2">Offline Mode</h3>
              <p className="text-xs text-[#111111]/70 leading-relaxed">
                Functions without internet connectivity, syncing data when connection is restored
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#51DB81]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#51DB81] rounded-full mr-2"></div>
              Integration Ecosystem
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Seamlessly integrates with existing systems
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Relief Grid connects with the tools and platforms humanitarian organizations already use
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Data Systems */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF8E6C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Data Management Systems</h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed mb-4">
                Direct integration with OCHA HDX, UNHCR Global Focus, and humanitarian data repositories
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">HDX</span>
                <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">Global Focus</span>
              </div>
            </div>
            
            {/* Communication Tools */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#51DB81] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Communication Platforms</h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed mb-4">
                Two-way integration with Slack, Microsoft Teams, WhatsApp Business, and satellite communication systems
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Slack</span>
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Teams</span>
              </div>
            </div>
            
            {/* GIS & Mapping */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FEE581] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#111111]" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Mapping & GIS</h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed mb-4">
                Native support for ArcGIS, QGIS, Google Earth Engine, and OpenStreetMap humanitarian data layers
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">ArcGIS</span>
                <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">OSM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Onboarding */}
      <section className="py-16 bg-gradient-to-br from-[#FF8E6C]/3 to-[#FEE581]/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#FF8E6C]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#FF8E6C] rounded-full mr-2"></div>
              Training & Support
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Get your team operational in 24 hours
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Comprehensive training and round-the-clock support ensure your team is ready for any crisis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Rapid Deployment Training */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#FF8E6C] rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#111111] mb-2">Rapid Deployment Training</h3>
                  <p className="text-sm text-[#111111]/70 leading-relaxed">
                    Interactive simulation exercises and role-based training modules tailored to your organization's disaster response protocols
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[#51DB81]" />
                  <span className="text-sm text-[#111111]">4-hour intensive workshop for coordinators</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[#51DB81]" />
                  <span className="text-sm text-[#111111]">2-hour field worker mobile app training</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[#51DB81]" />
                  <span className="text-sm text-[#111111]">Scenario-based crisis simulation exercises</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-[#51DB81]" />
                  <span className="text-sm text-[#111111]">Certification upon completion</span>
                </div>
              </div>
            </div>
            
            {/* 24/7 Support */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#51DB81] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#111111] mb-2">24/7 Crisis Support</h3>
                  <p className="text-sm text-[#111111]/70 leading-relaxed">
                    Round-the-clock technical support and humanitarian coordination expertise available during active emergencies
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#FF8E6C]" />
                  <span className="text-sm text-[#111111]">15-second average response time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#FF8E6C]" />
                  <span className="text-sm text-[#111111]">Dedicated crisis hotline</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-[#FF8E6C]" />
                  <span className="text-sm text-[#111111]">Humanitarian coordination specialists</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-[#FF8E6C]" />
                  <span className="text-sm text-[#111111]">Multi-language support (15 languages)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API & Developer Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#111111]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#111111] rounded-full mr-2"></div>
              Developer Platform
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Built for developers, designed for humanitarians
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Comprehensive API and developer tools for custom integrations and workflow automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* API Documentation */}
            <div className="bg-gradient-to-br from-[#111111]/5 to-[#111111]/10 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#111111] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#111111] mb-2">RESTful API & SDKs</h3>
                  <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                    Complete REST API with SDKs for Python, JavaScript, Java, and .NET. Interactive documentation and sandbox environment included.
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-[#111111]/20 text-[#111111] px-2 py-1 rounded">REST API</span>
                    <span className="text-xs bg-[#111111]/20 text-[#111111] px-2 py-1 rounded">GraphQL</span>
                    <span className="text-xs bg-[#111111]/20 text-[#111111] px-2 py-1 rounded">Webhooks</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Custom Dashboards */}
            <div className="bg-gradient-to-br from-[#51DB81]/5 to-[#51DB81]/10 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#51DB81] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#111111] mb-2">Custom Dashboard Builder</h3>
                  <p className="text-sm text-[#111111]/70 mb-4 leading-relaxed">
                    Drag-and-drop dashboard builder with pre-built humanitarian widgets and real-time data visualization components.
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">No-Code</span>
                    <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Real-time</span>
                    <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Embeddable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gradient-to-br from-[#FEE581]/5 to-[#51DB81]/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#FEE581]/20 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#FEE581] rounded-full mr-2"></div>
              Pricing Plans
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Flexible pricing for organizations of all sizes
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              From local NGOs to international organizations, we have a plan that fits your mission and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Local NGO */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium text-[#111111] mb-2">Local NGO</h3>
                <p className="text-sm text-[#111111]/70 mb-4">Perfect for regional organizations</p>
                <div className="text-4xl font-light text-[#111111] mb-1">$299</div>
                <div className="text-sm text-[#111111]/60">per month</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Up to 25 team members
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Basic crisis coordination tools
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Mobile app access
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Email support
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Basic reporting
                </li>
              </ul>
              
              <button className="w-full bg-[#111111] text-white py-3 rounded-full text-sm font-medium hover:bg-[#FF8E6C] transition-colors duration-300">
                Start Free Trial
              </button>
            </div>
            
            {/* International NGO */}
            <div className="bg-[#FF8E6C] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FEE581] text-[#111111] px-4 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium mb-2">International NGO</h3>
                <p className="text-sm text-white/80 mb-4">For multi-country operations</p>
                <div className="text-4xl font-light mb-1">$899</div>
                <div className="text-sm text-white/70">per month</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-white mr-3" />
                  Up to 100 team members
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-white mr-3" />
                  Advanced coordination suite
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-white mr-3" />
                  API access & integrations
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-white mr-3" />
                  24/7 phone support
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-white mr-3" />
                  Advanced analytics
                </li>
              </ul>
              
              <button className="w-full bg-white text-[#FF8E6C] py-3 rounded-full text-sm font-medium hover:bg-[#FEE581] hover:text-[#111111] transition-colors duration-300">
                Start Free Trial
              </button>
            </div>
            
            {/* UN Agency */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium text-[#111111] mb-2">UN Agency</h3>
                <p className="text-sm text-[#111111]/70 mb-4">Enterprise-grade for UN organizations</p>
                <div className="text-4xl font-light text-[#111111] mb-1">Custom</div>
                <div className="text-sm text-[#111111]/60">contact us</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Unlimited team members
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Custom integrations
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Dedicated infrastructure
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-[#51DB81] mr-3" />
                  Custom training program
                </li>
              </ul>
              
              <button className="w-full bg-[#111111] text-white py-3 rounded-full text-sm font-medium hover:bg-[#51DB81] transition-colors duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#51DB81]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#51DB81] rounded-full mr-2"></div>
              Mobile Application
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Field-ready mobile coordination
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Purpose-built mobile app for field workers, first responders, and humanitarian coordinators in challenging environments
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Offline Functionality */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF8E6C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Offline Capability</h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed mb-4">
                Works without internet connection, automatically syncing data when connectivity is restored. Essential for remote disaster zones.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">Offline Maps</span>
                <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">Auto-Sync</span>
              </div>
            </div>
            
            {/* Quick Reporting */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#51DB81] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Rapid Field Reporting</h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed mb-4">
                One-tap incident reporting with GPS coordinates, photos, and voice notes. Pre-configured templates for common emergency scenarios.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">GPS Auto-Tag</span>
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Voice Notes</span>
              </div>
            </div>
            
            {/* Secure Messaging */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FEE581] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#111111]" />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">Encrypted Communications</h3>
              <p className="text-sm text-[#111111]/70 leading-relaxed mb-4">
                End-to-end encrypted messaging with team channels, priority alerts, and emergency broadcast capabilities for crisis coordination.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">E2E Encrypted</span>
                <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">Priority Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Insights */}
      <section className="py-16 bg-gradient-to-br from-[#111111]/3 to-[#FF8E6C]/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#111111]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#111111] rounded-full mr-2"></div>
              Analytics & Insights
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Data-driven humanitarian response
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Advanced analytics and predictive insights to improve response effectiveness and prepare for future crises
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Predictive Analytics */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#FF8E6C] rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#111111] mb-2">Predictive Crisis Analytics</h3>
                  <p className="text-sm text-[#111111]/70 leading-relaxed">
                    Machine learning models analyze weather patterns, social indicators, and historical data to predict potential crisis hotspots up to 30 days in advance.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-[#51DB81]" />
                  <span className="text-sm text-[#111111]">87% accuracy in disaster prediction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#51DB81]" />
                  <span className="text-sm text-[#111111]">30-day advance warning system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-[#51DB81]" />
                  <span className="text-sm text-[#111111]">Global climate pattern integration</span>
                </div>
              </div>
            </div>
            
            {/* Response Optimization */}
            <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#51DB81] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#111111] mb-2">Response Optimization Engine</h3>
                  <p className="text-sm text-[#111111]/70 leading-relaxed">
                    AI-powered recommendations for resource allocation, logistics routing, and coordination strategies based on real-time crisis data and historical response outcomes.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="w-4 h-4 text-[#FF8E6C]" />
                  <span className="text-sm text-[#111111]">Optimal logistics routing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-[#FF8E6C]" />
                  <span className="text-sm text-[#111111]">Resource allocation recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-[#FF8E6C]" />
                  <span className="text-sm text-[#111111]">Performance benchmarking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#51DB81]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#51DB81] rounded-full mr-2"></div>
              Global Impact
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Active in 85 countries worldwide
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Relief Grid operates wherever humanitarian crises occur, from urban disasters to remote emergencies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Asia Pacific */}
            <div className="bg-gradient-to-br from-[#FF8E6C]/5 to-[#FF8E6C]/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-light text-[#FF8E6C] mb-2">23</div>
              <h3 className="text-sm font-medium text-[#111111] mb-1">Asia Pacific</h3>
              <p className="text-xs text-[#111111]/70">Countries covered including earthquake-prone Japan, flood-prone Bangladesh</p>
            </div>
            
            {/* Europe */}
            <div className="bg-gradient-to-br from-[#51DB81]/5 to-[#51DB81]/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-light text-[#51DB81] mb-2">28</div>
              <h3 className="text-sm font-medium text-[#111111] mb-1">Europe</h3>
              <p className="text-xs text-[#111111]/70">EU member states plus UK, supporting refugee crisis coordination</p>
            </div>
            
            {/* Americas */}
            <div className="bg-gradient-to-br from-[#FEE581]/5 to-[#FEE581]/15 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-light text-[#111111] mb-2">19</div>
              <h3 className="text-sm font-medium text-[#111111] mb-1">Americas</h3>
              <p className="text-xs text-[#111111]/70">Hurricane-prone Caribbean and earthquake zones in South America</p>
            </div>
            
            {/* Africa */}
            <div className="bg-gradient-to-br from-[#111111]/5 to-[#111111]/10 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-light text-[#111111] mb-2">15</div>
              <h3 className="text-sm font-medium text-[#111111] mb-1">Africa</h3>
              <p className="text-xs text-[#111111]/70">Drought response in East Africa, conflict zones in Central Africa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-[#FEE581]/5 to-[#51DB81]/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#51DB81]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#51DB81] rounded-full mr-2"></div>
              Success Stories
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Real coordination, real impact
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              How Relief Grid has transformed disaster response for organizations worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Case Study 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 bg-[#FF8E6C] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">UN</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#111111] text-sm">Turkey-Syria Earthquake Response</h4>
                  <p className="text-xs text-[#111111]/60">UN OCHA Regional Office</p>
                </div>
              </div>
              <p className="text-sm text-[#111111]/80 leading-relaxed mb-4">
                "Relief Grid enabled us to coordinate 45 international NGOs and 12 government agencies in real-time. We reduced our response coordination time from 72 hours to 4.2 hours, reaching 280,000 affected people within the first week."
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">94% faster</span>
                <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">280,000 people reached</span>
              </div>
            </div>
            
            {/* Case Study 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 bg-[#51DB81] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">RC</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#111111] text-sm">Bangladesh Monsoon Floods</h4>
                  <p className="text-xs text-[#111111]/60">Bangladesh Red Crescent Society</p>
                </div>
              </div>
              <p className="text-sm text-[#111111]/80 leading-relaxed mb-4">
                "The platform's resource matching prevented duplicate aid shipments and ensured optimal distribution. We coordinated evacuation of 120,000 people and saved over $3.2M in logistics costs while reaching 40% more beneficiaries than previous years."
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">$3.2M saved</span>
                <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">120,000 evacuated</span>
              </div>
            </div>
            
            {/* Case Study 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 bg-[#FEE581] rounded-full flex items-center justify-center">
                  <span className="text-[#111111] text-sm font-medium">MSF</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#111111] text-sm">Ukraine Humanitarian Corridor</h4>
                  <p className="text-xs text-[#111111]/60">Médecins Sans Frontières</p>
                </div>
              </div>
              <p className="text-sm text-[#111111]/80 leading-relaxed mb-4">
                "Secure communications through Relief Grid allowed us to coordinate safe passage for medical supplies through conflict zones. The platform enabled real-time coordination with 8 partner organizations, ensuring continuous medical care for 95,000 displaced people."
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">Zero breaches</span>
                <span className="text-xs bg-[#FF8E6C]/20 text-[#FF8E6C] px-2 py-1 rounded">95,000 treated</span>
              </div>
            </div>
            
            {/* Case Study 4 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-10 h-10 bg-[#111111] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">WFP</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#111111] text-sm">East Africa Drought Response</h4>
                  <p className="text-xs text-[#111111]/60">World Food Programme</p>
                </div>
              </div>
              <p className="text-sm text-[#111111]/80 leading-relaxed mb-4">
                "Relief Grid's predictive analytics helped us identify communities at risk before acute malnutrition set in. By coordinating with 15 partner agencies, we pre-positioned food supplies and reached vulnerable populations 3 weeks earlier than traditional methods."
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs bg-[#51DB81]/20 text-[#51DB81] px-2 py-1 rounded">3 weeks earlier</span>
                <span className="text-xs bg-[#FEE581]/30 text-[#111111] px-2 py-1 rounded">450,000 fed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#FF8E6C]/10 text-[#111111] px-4 py-2 rounded-full text-xs mb-6">
              <div className="w-2 h-2 bg-[#FF8E6C] rounded-full mr-2"></div>
              Frequently Asked Questions
            </div>
            <h2 className="text-5xl font-medium text-[#111111] mb-6 leading-tight">
              Common questions about Relief Grid
            </h2>
            <p className="text-sm text-[#111111]/70 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about implementing Relief Grid in your humanitarian operations
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "How quickly can we deploy Relief Grid during an active crisis?",
                answer: "Relief Grid can be deployed within 2-4 hours of initial contact. Our rapid deployment team provides immediate technical setup, user account creation, and basic training. Critical coordination features are available immediately, with advanced training following within 24-48 hours."
              },
              {
                question: "What happens if internet connectivity is poor or unavailable?",
                answer: "Relief Grid is designed for challenging environments. Our mobile app works completely offline, storing all data locally and automatically syncing when connectivity is restored. Satellite communication integration ensures coordination continues even in the most remote locations."
              },
              {
                question: "How does Relief Grid integrate with existing UN and government systems?",
                answer: "We offer native integrations with OCHA HDX, UNHCR systems, and major humanitarian databases. Our API allows custom integrations with any existing system. We also provide dedicated integration support for UN agencies and government organizations."
              },
              {
                question: "What security measures protect sensitive humanitarian data?",
                answer: "Relief Grid uses military-grade AES-256 encryption, zero-knowledge architecture, and role-based access controls. We're GDPR compliant, SOC 2 certified, and meet humanitarian data protection standards. All data centers are geographically distributed with 99.9% uptime guarantee."
              },
              {
                question: "Can Relief Grid handle multi-language operations?",
                answer: "Yes, Relief Grid supports 15 languages including Arabic, French, Spanish, Portuguese, Mandarin, and local languages for major humanitarian operation areas. The interface automatically adapts based on user location and preference."
              },
              {
                question: "What's the typical cost for a mid-size NGO?",
                answer: "Pricing varies based on team size and feature requirements. Most mid-size NGOs (25-100 staff) use our International NGO plan at $899/month. We offer significant discounts for multi-year commitments and provide free access during major humanitarian crises."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100">
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-100 rounded-2xl transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-[#111111] text-sm">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[#111111]/70 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-medium text-white mb-4 leading-tight">
            Ready to transform your disaster response?
          </h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
            Join hundreds of organizations already using Relief Grid to coordinate faster, more effective humanitarian responses
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-[#FF8E6C] text-white px-8 py-3 rounded-full text-sm hover:bg-[#51DB81] transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
            <button className="bg-white text-[#111111] px-8 py-3 rounded-full text-sm hover:bg-[#FEE581] transition-all duration-300 hover:scale-105">
              Schedule Demo
            </button>
          </div>
          
          <div className="text-xs text-white/50">
            Trusted by 450+ humanitarian organizations worldwide
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/Reliefgrid.png" 
                  alt="Relief Grid" 
                  className="w-24 h-24"
                />
              </div>
              <p className="text-white/60 leading-relaxed text-sm">
                Connecting humanitarian organizations for faster, more coordinated disaster response
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 text-sm">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-[#FF8E6C] text-sm transition-colors duration-300">Features</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#51DB81] text-sm transition-colors duration-300">Integrations</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#FEE581] text-sm transition-colors duration-300">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 text-sm">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-[#FF8E6C] text-sm transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#51DB81] text-sm transition-colors duration-300">Case Studies</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#FEE581] text-sm transition-colors duration-300">Training</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 text-sm">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-[#FF8E6C] text-sm transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#51DB81] text-sm transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="text-white/60 hover:text-[#FEE581] text-sm transition-colors duration-300">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          
          <div className="pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs">© 2024 Relief Grid. Built to save lives through better coordination.</p>
          </div>
        </div>
        
      </footer>
    </div>
    </div>
  );
};

export default ReliefGridHomepage;