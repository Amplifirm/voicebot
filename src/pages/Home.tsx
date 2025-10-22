import { useState, useEffect } from 'react';

export default function Bloomsberry() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [logoUrl, setLogoUrl] = useState('');
  const [countdown, setCountdown] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    console.log(scrollY);
    
    setLogoUrl('/bloomsberry (2).png');
    
    // Countdown to January 19th, 2026
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date('2026-01-19T00:00:00');
      const diff = target.getTime() - now.getTime();

      
      if (diff <= 0) {
        setCountdown({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;
      
      setCountdown({ months, days: remainingDays, hours, minutes, seconds });
    };
    
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async () => {
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://sheetdb.io/api/v1/u8ignr7ifh1is', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            email: email,
            timestamp: new Date().toISOString()
          }
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef6e4]">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .float { animation: float 3s ease-in-out infinite; }
        .slide-in-left { animation: slideInLeft 0.6s ease-out; }
        .slide-in-right { animation: slideInRight 0.6s ease-out; }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <header className="border-b-4 border-black sticky top-0 bg-[#fef6e4] z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3 slide-in-left">
              {logoUrl ? (
                <img 
                src={logoUrl}
                  alt="Bloomsberry Logo"
                  className="h-10 sm:h-12 md:h-14 w-auto"
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-3 sm:border-4 border-black bg-[#ff6b6b] rounded-xl flex items-center justify-center transform -rotate-6 pulse">
                  <span className="text-xl sm:text-2xl">🍓</span>
                </div>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">BLOOMSBERRY</h1>
                <p className="text-[10px] sm:text-xs font-bold tracking-wider text-[#ff6b6b]">LAUNCHING JAN 2026</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="inline-block border-3 border-black bg-[#ffe66d] px-4 py-2 transform -rotate-2 rounded-lg">
                <span className="text-sm font-black">PRE-LAUNCH</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-10 text-4xl sm:text-6xl float opacity-20">🍓</div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="slide-in-left">
            <div className="inline-block border-3 border-black bg-[#ff6b6b] px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
              <span className="text-sm sm:text-base md:text-lg font-black text-white">COMING TO GORDON SQUARE, UCL</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 sm:mb-8">
              CHOCOLATE<br/>
              COVERED<br/>
              <span className="text-[#ff6b6b]">STRAWBERRIES</span>
            </h2>
            
            <div className="border-l-4 border-black pl-4 sm:pl-6 mb-6 sm:mb-8">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                We're eight UCL students launching a chocolate-covered strawberry business at Gordon Square 
                in January 2026. Fresh strawberries from Covent Garden Market every morning, hand-dipped in 
                Belgian chocolate, sold at fair prices.
              </p>
              <div className="border-3 border-black bg-[#ffe66d] p-3 sm:p-4 mb-4 rounded-lg">
                <p className="text-base sm:text-lg font-black mb-2">🎉 LIMITED EARLY ACCESS</p>
                <p className="text-sm sm:text-base font-bold">
                  Only 500 waitlist spots available. First 100 signups get lifetime 20% discount on every order.
                </p>
              </div>
              <p className="text-base sm:text-lg font-bold">
                Join now to secure your spot and get 20% off your first order.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="your.email@ucl.ac.uk"
                  className="flex-1 border-3 border-black px-4 sm:px-6 py-3 sm:py-4 font-bold text-base sm:text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl"
                  disabled={loading}
                />
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="border-3 border-black bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-black text-base sm:text-lg hover:bg-[#ff6b6b] hover:text-black transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'JOINING...' : 'JOIN WAITLIST'}
                </button>
              </div>
              {submitted && (
                <div className="border-3 border-black bg-[#ffe66d] px-4 py-3 mt-3 fade-in rounded-lg">
                  <p className="font-bold text-xs sm:text-sm">✓ You're on the list! Check your email for confirmation.</p>
                </div>
              )}
              {error && (
                <div className="border-3 border-black bg-red-100 px-4 py-3 mt-3 rounded-lg">
                  <p className="font-bold text-xs sm:text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              <strong>387 people</strong> have already joined • <strong>113 lifetime discount spots left</strong>
            </p>
          </div>

          <div className="relative slide-in-right mt-8 md:mt-0">
            <div className="border-4 border-black bg-white p-3 sm:p-4 transform rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-transform rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800" 
                alt="Chocolate Strawberries"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
              />
            </div>
            <div className="absolute -top-4 -right-4 border-3 border-black bg-[#ffe66d] px-4 sm:px-6 py-3 sm:py-4 transform rotate-6 shadow-lg pulse rounded-xl">
              <p className="text-xs sm:text-sm font-black text-center">LAUNCHING<br/>JANUARY<br/>2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="border-y-4 border-black bg-[#ff6b6b] py-8 sm:py-10 md:py-12 fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center">
            <p className="text-white font-black text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4">LAUNCHING IN</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {[
                { value: countdown.months.toString().padStart(2, '0'), label: 'MONTHS' },
                { value: countdown.days.toString().padStart(2, '0'), label: 'DAYS' },
                { value: countdown.hours.toString().padStart(2, '0'), label: 'HOURS' },
                { value: countdown.minutes.toString().padStart(2, '0'), label: 'MINS' },
                { value: countdown.seconds.toString().padStart(2, '0'), label: 'SECS' }
              ].map((item, i) => (
                <div key={i} className="border-3 sm:border-4 border-black bg-white p-2 sm:p-3 md:p-4 min-w-[60px] sm:min-w-[70px] md:min-w-[90px] rounded-xl">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2">{item.value}</div>
                  <div className="text-[8px] sm:text-[10px] md:text-xs font-black">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="mb-12 sm:mb-14 md:mb-16 slide-in-left">
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">WHAT WE'RE BUILDING</h2>
            <div className="flex-1 border-t-4 border-black"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl">
            Not just another campus food stall. We're creating something students actually want.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-12 sm:mb-14 md:mb-16">
          {[
            {
              title: "QUALITY FIRST",
              desc: "Fresh strawberries from Covent Garden Market every morning at 6am. Belgian chocolate properly tempered. No shortcuts, no cheap ingredients. We're building this the right way from day one."
            },
            {
              title: "FAIR PRICING",
              desc: "£3 for small, £7.50 for large. We did the math - these prices give us healthy margins while being affordable for students. No inflated pricing, no hidden fees."
            },
            {
              title: "CONSISTENT SCHEDULE",
              desc: "Monday to Friday, 10am-4pm at Gordon Square. Same location, same hours, same quality. You'll know exactly when and where to find us."
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all slide-in-right rounded-xl"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">{item.title}</h3>
              <p className="text-sm sm:text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-3 sm:border-4 border-black p-6 sm:p-8 md:p-12 bg-[#ffe66d] transform -rotate-1 hover:rotate-0 transition-transform rounded-xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-5 md:mb-6">OUR TARGET</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { number: "1,300+", label: "Cups per week by Month 3" },
              { number: "£24K", label: "Monthly revenue target" },
              { number: "8", label: "UCL students running this" },
              { number: "100%", label: "Fresh every single day" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lifetime Discount Callout */}
        <div className="border-3 sm:border-4 border-black p-6 sm:p-8 md:p-12 bg-white mt-12 sm:mt-14 md:mt-16 rounded-xl">
          <div className="text-center mb-6 sm:mb-7 md:mb-8">
            <div className="inline-block border-3 border-black bg-[#ff6b6b] text-white px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl mb-4 sm:mb-5 md:mb-6">
              <p className="font-black text-lg sm:text-xl md:text-2xl">⚡ EARLY BIRD SPECIAL</p>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-5 md:mb-6">LIFETIME DISCOUNT FOR FIRST 100</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 max-w-4xl mx-auto">
            <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-[#ffe66d] rounded-xl">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 text-center">🏆</div>
              <h4 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 text-center">FIRST 100 SIGNUPS</h4>
              <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                Get <strong>20% off EVERY order, FOREVER.</strong> Not just your first order. 
                Every single time you buy from us, for as long as we're in business.
              </p>
              <p className="text-xs sm:text-sm font-bold">
                Small cup: £2.40 instead of £3.00<br/>
                Large cup: £6.00 instead of £7.50
              </p>
            </div>
            
            <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-white rounded-xl">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 text-center">🎁</div>
              <h4 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 text-center">SIGNUPS 101-500</h4>
              <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                Get <strong>20% off your first order</strong> when we launch in January. 
                Plus early access to our soft launch week.
              </p>
              <p className="text-xs sm:text-sm font-bold">
                First order discount only, but you still get priority access before the general public.
              </p>
            </div>
          </div>
          
          <div className="border-t-4 border-black mt-6 sm:mt-7 md:mt-8 pt-6 sm:pt-7 md:pt-8 text-center">
            <p className="text-lg sm:text-xl font-black mb-3 sm:mb-4">
              Why are we doing this? Because early supporters deserve to be rewarded properly.
            </p>
            <p className="text-base sm:text-lg">
              If you believe in us before we even launch, you get the best deal possible. Simple as that.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="bg-white border-y-4 border-black py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-12 sm:mb-14 md:mb-16">
            <div className="flex items-center gap-4 sm:gap-6 mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">THE MENU</h2>
              <div className="flex-1 border-t-4 border-black"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl">
              Two options, three chocolates. Simple is better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
            <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-[#fef6e4] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl">
              <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6">
                <div>
                  <div className="text-xs sm:text-sm font-black text-[#ff6b6b] mb-2">SMALL CUP</div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">£3.00</h3>
                  <p className="font-bold text-base sm:text-lg">Two strawberries</p>
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl float">🍓</div>
              </div>

              <div className="border-t-2 border-black pt-4 sm:pt-5 md:pt-6 space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base leading-relaxed">
                  Perfect for a quick treat between lectures. Two large, fresh strawberries 
                  hand-dipped in your choice of chocolate. Takes about 5 minutes to finish.
                </p>
                <div className="border-2 border-black p-3 sm:p-4 bg-white rounded-lg">
                  <p className="text-xs sm:text-sm font-bold">
                    <strong>January 2026 Launch:</strong> First 100 customers get small cups for £2.50
                  </p>
                  <p className="text-[10px] sm:text-xs mt-2 text-gray-600">
                    Lifetime discount holders: £2.40 every time
                  </p>
                </div>
              </div>
            </div>

            <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-[#ff6b6b] text-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl">
              <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6">
                <div>
                  <div className="text-xs sm:text-sm font-black mb-2">LARGE CUP</div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">£7.50</h3>
                  <p className="font-bold text-base sm:text-lg">10-12 strawberries</p>
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl float" style={{ animationDelay: '0.5s' }}>🍓</div>
              </div>

              <div className="border-t-2 border-white pt-4 sm:pt-5 md:pt-6 space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base leading-relaxed">
                  Our expected bestseller. Ten to twelve large strawberries, perfect for sharing 
                  or treating yourself. Mix different chocolates in the same cup.
                </p>
                <div className="border-2 border-white p-3 sm:p-4 bg-white text-black rounded-lg">
                  <p className="text-xs sm:text-sm font-bold">
                    <strong>January 2026 Launch:</strong> First 50 customers get large cups for £6.00
                  </p>
                  <p className="text-[10px] sm:text-xs mt-2 text-gray-600">
                    Lifetime discount holders: £6.00 every time
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-[#ffe66d] mt-6 sm:mt-7 md:mt-8 rounded-xl">
            <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-5 md:mb-6">CHOCOLATE OPTIONS</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {[
                { name: "DARK", color: "#3d2817", desc: "70% Belgian cocoa. Rich and slightly bitter. Best for those who don't want too sweet." },
                { name: "MILK", color: "#8b4513", desc: "Classic creamy milk chocolate. Sweet and smooth. Safe choice if buying for someone else." },
                { name: "WHITE", color: "#f5f5dc", desc: "Pure white Belgian chocolate. Very sweet and buttery. Only for serious sweet tooths." }
              ].map((choc, i) => (
                <div key={i} className="slide-in-left" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-lg" style={{ backgroundColor: choc.color }}></div>
                    <h4 className="text-lg sm:text-xl font-black">{choc.name}</h4>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{choc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">WHO WE ARE</h2>
            <div className="flex-1 border-t-4 border-black"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl">
            Eight UCL students with zero food business experience. Here's why we're doing this anyway.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg leading-relaxed mb-10 sm:mb-11 md:mb-12">
          <p className="slide-in-left">
            We're not entrepreneurs. We're just students who got tired of overpriced, mediocre food on campus 
            and decided to do something about it. We've been spending the last few months researching suppliers, 
            calculating costs, testing recipes, and figuring out logistics.
          </p>

          <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-white slide-in-right rounded-xl">
            <p className="text-sm sm:text-base leading-relaxed">
              Here's what we learned: chocolate-covered strawberries at fancy shops cost £15-20. 
              But strawberries from wholesale markets are £3.50/kg. Belgian chocolate in bulk is affordable. 
              With eight people splitting the work, we can make this profitable while charging fair prices.
            </p>
          </div>

          <p className="slide-in-left text-sm sm:text-base">
            Our plan is simple: wake up at 5:30am, get to Covent Garden Market by 6am, buy fresh strawberries, 
            prep everything, and open at Gordon Square by 10am. Monday to Friday. We're aiming to sell 
            1,300+ cups per week by month three.
          </p>

          <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-[#ff6b6b] text-white slide-in-right rounded-xl">
            <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">OUR PROMISE</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">✓</span>
                <span className="text-sm sm:text-base">Fresh strawberries bought same morning, every single day</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">✓</span>
                <span className="text-sm sm:text-base">Belgian chocolate, properly tempered, no cheap alternatives</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">✓</span>
                <span className="text-sm sm:text-base">Fair pricing - £3 small, £7.50 large, no surge pricing</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">✓</span>
                <span className="text-sm sm:text-base">Consistent schedule - same times, same location, every weekday</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {[
            { role: "OPERATIONS", desc: "Sourcing strawberries, managing inventory, quality control" },
            { role: "FINANCE", desc: "Tracking costs, managing cash, supplier relationships" },
            { role: "PRODUCTION", desc: "Dipping strawberries, assembly, serving customers" }
          ].map((role, i) => (
            <div 
              key={i} 
              className="border-3 sm:border-4 border-black p-5 sm:p-6 bg-[#ffe66d] text-center hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl"
            >
              <h4 className="text-lg sm:text-xl font-black mb-2 sm:mb-3">{role.role}</h4>
              <p className="text-xs sm:text-sm leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Launch Plan */}
      <section className="bg-white border-y-4 border-black py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-12 sm:mb-14 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4">LAUNCH ROADMAP</h2>
            <p className="text-base sm:text-lg md:text-xl">Here's exactly how we're getting to January 2026.</p>
          </div>

          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            {[
              {
                month: "NOVEMBER 2025",
                status: "IN PROGRESS",
                color: "#ff6b6b",
                items: [
                  "Finalize supplier contracts with Covent Garden vendors",
                  "Complete food hygiene Level 2 certifications for all team members",
                  "Design packaging, branding, and stall setup",
                  "Test chocolate tempering and dipping techniques"
                ]
              },
              {
                month: "DECEMBER 2025",
                status: "NEXT",
                color: "#ffe66d",
                items: [
                  "Secure pitch permit at Gordon Square",
                  "Purchase equipment (tempering machine, display fridge, packaging)",
                  "Run test batches and get feedback from friends",
                  "Finalize menu and pricing"
                ]
              },
              {
                month: "JANUARY 2026",
                status: "LAUNCH",
                color: "#4ecdc4",
                items: [
                  "Soft launch: Week 1 - Limited hours, testing operations",
                  "Week 2: Full schedule 10am-4pm Monday-Friday",
                  "Week 3-4: Scale up production based on demand",
                  "Month-end: Review and optimize"
                ]
              }
            ].map((phase, i) => (
              <div 
                key={i} 
                className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all fade-in rounded-xl"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                  <div 
                    className="border-3 border-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 font-black text-base sm:text-lg rounded-lg"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.month}
                  </div>
                  <div className="text-xs sm:text-sm font-black">{phase.status}</div>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl">→</span>
                      <span className="text-sm sm:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black">WHERE TO FIND US</h2>
            <div className="flex-1 border-t-4 border-black"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl">
            Gordon Square, UCL Campus. Right by the church, next to the other food stalls.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
          <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-white rounded-xl">
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-5 md:mb-6">LOCATION DETAILS</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="font-black mb-2 text-sm sm:text-base">ADDRESS</p>
                <p className="text-sm sm:text-base leading-relaxed">
                  Gordon Square<br/>
                  By the church, next to food stalls<br/>
                  UCL Campus<br/>
                  London WC1H 0AG
                </p>
              </div>
              <div className="border-t-2 border-black pt-3 sm:pt-4">
                <p className="font-black mb-2 text-sm sm:text-base">GETTING HERE</p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  <strong>Tube:</strong> Euston Square (5 min), Warren Street (7 min), Goodge Street (8 min)<br/>
                  <strong>Bus:</strong> Routes 10, 73, 134, 390<br/>
                  <strong>Look for:</strong> The stall with the strawberry sign
                </p>
              </div>
            </div>
          </div>

          <div className="border-3 sm:border-4 border-black p-6 sm:p-7 md:p-8 bg-[#ffe66d] rounded-xl">
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-5 md:mb-6">OPENING HOURS</h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                "MONDAY: 10:00 - 13:00",
                "TUESDAY: 10:00 - 13:00",
                "WEDNESDAY: 10:00 - 16:00",
                "THURSDAY: 10:00 - 16:00",
                "FRIDAY: 11:00 - 16:00"
              ].map((day, i) => (
                <div key={i} className="border-2 border-black p-3 sm:p-4 bg-white font-black text-sm sm:text-base rounded-lg">
                  {day}
                </div>
              ))}
              <div className="border-2 border-black p-3 sm:p-4 bg-black text-white font-black text-sm sm:text-base rounded-lg">
                SATURDAY-SUNDAY: CLOSED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="final-cta" className="bg-[#ff6b6b] border-y-4 border-black py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center text-white">
          <div className="inline-block border-3 sm:border-4 border-black bg-[#ffe66d] text-black px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 mb-6 sm:mb-7 md:mb-8 rounded-xl transform -rotate-2">
            <p className="font-black text-base sm:text-lg md:text-xl">⚡ ONLY 500 SPOTS AVAILABLE</p>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-5 md:mb-6">JOIN THE WAITLIST</h2>
          
          <div className="border-3 sm:border-4 border-white bg-white text-black p-6 sm:p-7 md:p-8 mb-6 sm:mb-7 md:mb-8 rounded-xl">
            <p className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">SPECIAL EARLY BIRD OFFER</p>
            <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
              <strong>First 100 signups:</strong> Lifetime 20% discount on EVERY order forever
            </p>
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Signups 101-500:</strong> 20% off your first order
            </p>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12">
            Plus early access to our soft launch in January 2026 and exclusive updates on our progress
          </p>

          <div className="max-w-2xl mx-auto mb-6 sm:mb-7 md:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="your.email@ucl.ac.uk"
                className="flex-1 border-3 sm:border-4 border-black px-6 sm:px-7 md:px-8 py-4 sm:py-5 md:py-6 font-bold text-base sm:text-lg md:text-xl text-black focus:outline-none rounded-xl"
                disabled={loading}
              />
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="border-3 sm:border-4 border-black bg-black text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 font-black text-base sm:text-lg md:text-xl hover:bg-white hover:text-black transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'JOINING...' : 'SIGN UP'}
              </button>
            </div>
            {submitted && (
              <div className="border-3 sm:border-4 border-black bg-[#ffe66d] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 mt-3 sm:mt-4 fade-in rounded-lg">
                <p className="font-black text-black text-base sm:text-lg">✓ YOU'RE IN! Check your email for confirmation.</p>
              </div>
            )}
            {error && (
              <div className="border-3 sm:border-4 border-black bg-red-100 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 mt-3 sm:mt-4 rounded-lg">
                <p className="font-black text-red-700 text-base sm:text-lg">{error}</p>
              </div>
            )}
          </div>

          <div className="border-t-4 border-white pt-6 sm:pt-7 md:pt-8">
            <p className="text-base sm:text-lg md:text-xl font-bold">387 students on the waitlist • 113 lifetime discount spots remaining</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-[#fef6e4] py-12 sm:py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-11 md:mb-12">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                {logoUrl ? (
                  <img 
                    src={logoUrl}
                    alt="Bloomsberry Logo"
                    className="h-10 sm:h-12 md:h-14 w-auto"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-3 sm:border-4 border-black bg-[#ff6b6b] rounded-xl flex items-center justify-center pulse">
                    <span className="text-xl sm:text-2xl">🍓</span>
                  </div>
                )}
                <span className="text-xl sm:text-2xl font-black">BLOOMSBERRY</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Fresh chocolate-covered strawberries launching January 2026 at Gordon Square, UCL.
              </p>
              <p className="text-[10px] sm:text-xs font-bold">
                Made by Eight UCL students who care about quality.
              </p>
            </div>

            <div>
              <h4 className="font-black mb-3 sm:mb-4 text-sm sm:text-base">LAUNCHING</h4>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4">
                January 2026<br/>
                Gordon Square, UCL<br/>
                London WC1H 0AG
              </p>
              <p className="text-xs sm:text-sm">
                Instagram: @bloomsberry.ucl<br/>
                Email: hello@bloomsberry.co.uk
              </p>
            </div>

            <div>
              <h4 className="font-black mb-3 sm:mb-4 text-sm sm:text-base">QUICK LINKS</h4>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <a href="#" className="block hover:text-[#ff6b6b]">Join Waitlist</a>
                <a href="#" className="block hover:text-[#ff6b6b]">Menu Preview</a>
                <a href="#" className="block hover:text-[#ff6b6b]">About Us</a>
                <a href="#" className="block hover:text-[#ff6b6b]">Location</a>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-black pt-6 sm:pt-7 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm font-black">© 2025 BLOOMSBERRY</p>
            <p className="text-[10px] sm:text-xs">Launching January 2026 • Gordon Square, UCL</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-40">
        <div className="relative pulse">
          <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-[#ff6b6b] border-2 border-black rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[10px] sm:text-xs font-black text-white">
            113
          </div>
          <button 
            onClick={() => document.querySelector('#final-cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-3 sm:border-4 border-black bg-[#ffe66d] px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 font-black text-sm sm:text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all rounded-xl"
          >
            JOIN WAITLIST
          </button>
        </div>
      </div>
    </div>
  );
}