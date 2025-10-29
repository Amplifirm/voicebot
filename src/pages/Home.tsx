import { useEffect } from 'react';
import { ArrowRight, Phone, Zap, Clock, TrendingUp } from 'lucide-react';

const VoiceBotVSL = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/AmpLogo.png" alt="Amplifirm" className="h-8 w-auto" />
            <span className="text-xl font-bold text-slate-900">amplifirm</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#demo" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Demo</a>
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
          </div>
          <a 
            href="#book" 
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-orange-500/30"
          >
            Book Call
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 right-0 w-[800px] h-[800px] bg-orange-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-1/2 left-0 w-[800px] h-[800px] bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-orange-200 rounded-full text-sm text-orange-700 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            No-Contract Voice Bot Service
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-slate-900">
            Automate Every Call.
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Never Miss Revenue.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            AI voice agents that handle sales, support, and appointments 24/7.
            <br className="hidden md:block" />
            Setup in 72 hours. No contracts. No hiring.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a 
              href="#book" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              Book Free Call
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </a>
            <a 
              href="#demo" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg border border-slate-200 hover:border-slate-300"
            >
              Listen to Demo
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { value: '80%', label: 'Cost Savings' },
              { value: '24/7', label: 'Available' },
              { value: '72hr', label: 'Setup' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
              Hear It
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"> Live</span>
            </h2>
            <p className="text-xl text-slate-600">Real AI conversations that sound 100% human</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sales Outreach',
                desc: 'Lead qualification call',
                file: '/019a2d0b-f473-7ff1-9e1f-34214a5ef166-1761692509998-56b9f759-110d-48fd-b720-afbfa29a172a-mono.wav',
              },
              {
                title: 'Customer Support',
                desc: 'Service interaction',
                file: '/019a2ae0-bb6d-7ffa-89ce-9cf59e3cfa44-1761656244962-30682093-1f56-4d92-bf1d-0beedfc9495f-mono.wav',
              },
              {
                title: 'Appointment Booking',
                desc: 'Scheduling consultation',
                file: '/019a2ff1-11af-7ff2-a979-d3f333543e75-1761741050787-56f85669-ec15-449d-ae9e-ab08e6c258a0-mono.wav',
              },
            ].map((demo) => (
              <div key={demo.title} className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-orange-300 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{demo.title}</h3>
                    <p className="text-sm text-slate-600">{demo.desc}</p>
                  </div>
                </div>
                <audio 
                  controls 
                  className="w-full"
                  style={{height: '48px'}}
                >
                  <source src={demo.file} type="audio/wav" />
                </audio>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
              Why
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"> Voice AI?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Instant Setup', desc: 'Live in 1-3 days. We handle scripts, training, and integration.' },
              { icon: Clock, title: '24/7 Operations', desc: 'Never miss a call. Your AI works while you sleep.' },
              { icon: TrendingUp, title: 'Infinite Scale', desc: 'Handle 10 or 10,000 calls per day. No extra cost.' },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="group bg-white border border-slate-200 hover:border-orange-300 rounded-2xl p-8 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-orange-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section id="book" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
              Book Your
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent"> Free Call</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              30 minutes to discover how AI can transform your calling operations
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div 
              className="calendly-inline-widget rounded-2xl overflow-hidden border border-slate-200 shadow-2xl" 
              data-url="https://calendly.com/amplifirm/voicebot-development-meeting?primary_color=d94c05" 
              style={{minWidth: '280px', height: '700px', background: 'white'}}
            ></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">FAQ</h2>
            <p className="text-xl text-slate-600">Everything you need to know before getting started</p>
          </div>

          <div className="space-y-4">
            {[
              { 
                q: 'How long does setup take?', 
                a: 'Most clients are live within 1-3 days. Our team handles 100% of the technical setup, including custom script development, AI voice training on your brand tone, system integration with your CRM and phone systems, and comprehensive testing. You simply review and approve - we do all the heavy lifting.' 
              },
              { 
                q: 'Can I cancel anytime?', 
                a: 'Absolutely. We believe in earning your business every month. There are no long-term contracts, no cancellation fees, and no penalties. Simply give us 7 days notice if you need to pause or cancel. You can also pause your subscription at any time if you need a break.' 
              },
              { 
                q: 'Do the bots sound human?', 
                a: 'Yes! We use cutting-edge AI voice technology with natural intonation, appropriate pauses, and conversational flow. Most people cannot tell the difference from a real agent. Our bots can handle objections, answer questions dynamically, and even adjust tone based on the conversation context. Listen to our demo calls above to hear for yourself.' 
              },
              { 
                q: 'What if the bot cannot handle a call?', 
                a: 'Our AI includes intelligent call routing. If the bot detects it needs human assistance - whether due to a complex question, escalation request, or technical issue - it seamlessly transfers the call to your team with full context and a summary of the conversation so far. You maintain complete control.' 
              },
              { 
                q: 'How much does it cost?', 
                a: 'Pricing is customized based on your call volume, use case complexity, and specific needs. We offer packages starting from small-scale operations to enterprise solutions handling thousands of daily calls. Book a free call with us to discuss your requirements and receive a personalized quote with transparent pricing - no hidden fees.' 
              },
              { 
                q: 'What integrations do you support?', 
                a: 'We integrate with most major CRMs (Salesforce, HubSpot, Zoho, Pipedrive), calendar systems (Google Calendar, Outlook, Calendly), phone systems (Twilio, RingCentral, Vonage), and can build custom integrations for your specific tools. During your onboarding call, we will map out all necessary integrations.' 
              },
              { 
                q: 'Is my data secure?', 
                a: 'Yes. We take security seriously with enterprise-grade encryption, SOC 2 compliance, regular security audits, and strict data privacy policies. Your call data and customer information are encrypted in transit and at rest. We never share your data with third parties and you maintain full ownership of all conversations and records.' 
              },
              { 
                q: 'Can I customize the bot\'s personality and responses?', 
                a: 'Absolutely! During setup, we work with you to define your bot\'s personality, tone, script flow, and responses. Want it formal and professional? Friendly and casual? We train the AI to match your brand voice perfectly. You can update scripts and responses anytime through our dashboard, and changes take effect immediately.' 
              },
            ].map((faq) => (
              <details 
                key={faq.q}
                className="group bg-white border border-slate-200 hover:border-orange-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <summary className="p-6 cursor-pointer font-semibold text-lg flex justify-between items-center text-slate-900 hover:text-orange-600 transition-colors">
                  {faq.q}
                  <span className="text-2xl text-orange-500 group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/AmpLogo.png" alt="Amplifirm" className="h-6 w-auto" />
            <span className="font-bold text-slate-900">amplifirm</span> 
          </div>
          <div className="text-sm text-slate-600">© 2025 Amplifirm. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default VoiceBotVSL;