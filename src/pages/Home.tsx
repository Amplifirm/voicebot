import { useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

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
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
          </div>
          <a 
            href="#book" 
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/30"
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
            Setup in 72 Hours • No Long-Term Contracts
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-slate-900">
            Your Phone Rings 24/7.
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Your Team Doesn't Have To.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            AI voice agents that book appointments, qualify leads, and support customers—indistinguishable from your best rep.
            <br className="hidden md:block" />
            <strong className="text-slate-900">No hiring. No training. No missed calls.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a 
              href="#book" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              Book Your Free Demo Call
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </a>
            <a 
              href="#demo" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg border border-slate-200 hover:border-slate-300"
            >
              Hear Real Calls
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { value: '80%', label: 'Lower Cost Than Hiring' },
              { value: '< 3 Days', label: 'To Go Live' },
              { value: '99%', label: 'Uptime Guarantee' },
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
              Don't Take Our Word For It.
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Listen.</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              These are real calls handled by our AI. Your prospects won't know the difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Cold Outbound Sales',
                desc: 'Qualifying leads at scale',
                file: '/019a2d0b-f473-7ff1-9e1f-34214a5ef166-1761692509998-56b9f759-110d-48fd-b720-afbfa29a172a-mono.wav',
              },
              {
                title: 'Customer Support',
                desc: 'Handling common requests',
                file: '/019a2ae0-bb6d-7ffa-89ce-9cf59e3cfa44-1761656244962-30682093-1f56-4d92-bf1d-0beedfc9495f-mono.wav',
              },
              {
                title: 'Appointment Booking',
                desc: 'Scheduling consultations',
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

          <div className="text-center">
            <a 
              href="#book" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-xl shadow-orange-500/30 hover:scale-105"
            >
              Ready to See This in Your Business?
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section id="book" className="py-32 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
              See How It Works
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">For Your Business</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Book a 30-minute demo call. We'll show you exactly how our AI can handle your calls, integrate with your systems, and scale your operations—without the pitch.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div 
              className="calendly-inline-widget rounded-2xl overflow-hidden border border-slate-200 shadow-2xl" 
              data-url="https://calendly.com/amplifirm/voicebot-development-meeting?primary_color=d94c05" 
              style={{minWidth: '280px', height: '700px', background: 'white'}}
            ></div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600">
              <strong className="text-slate-900">What happens on the call:</strong> We'll audit your current call flow, show you a custom demo, and give you a clear setup timeline—in 30 minutes or less.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
              Common Questions
            </h2>
            <p className="text-xl text-slate-600">Everything you need to know before booking</p>
          </div>

          <div className="space-y-4">
            {[
              { 
                q: 'How long does setup actually take?', 
                a: '1-3 days from contract signature to your first live call. We handle everything: custom script development, AI training on your brand voice, CRM/phone system integration, and testing. You review and approve—we do the work.' 
              },
              { 
                q: 'What happens if the AI can\'t handle a call?', 
                a: 'Smart call routing. If the AI detects complexity, an escalation request, or confusion, it transfers to your team immediately with full context and a conversation summary. You stay in control.' 
              },
              { 
                q: 'Can I really cancel anytime?', 
                a: 'Yes. Zero long-term contracts. Cancel or pause with 7 days notice. No fees, no penalties. We earn your business every month.' 
              },
              { 
                q: 'How much does this cost?', 
                a: 'Pricing depends on call volume and complexity. Most clients pay significantly less than hiring even one full-time rep. Book a call and well give you transparent pricing based on your specific needs—no hidden fees.' 
              },
              { 
                q: 'What systems do you integrate with?', 
                a: 'Salesforce, HubSpot, Zoho, Pipedrive, Google Calendar, Outlook, Calendly, Twilio, RingCentral, Vonage, and most major platforms. Custom integrations available. Well map this out during your demo call.' 
              },
              { 
                q: 'Will it actually sound human?', 
                a: 'Listen to the demos above. Our AI uses natural intonation, pauses appropriately, handles objections, and adjusts tone based on context. Most people genuinely cant tell the difference.' 
              },
              { 
                q: 'Is our data secure?', 
                a: 'Enterprise-grade encryption, SOC 2 compliant, regular security audits, strict privacy policies. Your data is encrypted in transit and at rest. We never share it. You own all conversation records.' 
              },
              { 
                q: 'Can we customize the voice and scripts?', 
                a: 'Completely. During setup, we train the AI on your exact brand voice—formal, casual, industry-specific jargon, you name it. Update scripts anytime through the dashboard. Changes go live instantly.' 
              },
            ].map((faq) => (
              <details 
                key={faq.q}
                className="group bg-slate-50 border border-slate-200 hover:border-orange-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <summary className="p-6 cursor-pointer font-semibold text-lg flex justify-between items-center text-slate-900 hover:text-orange-600 transition-colors">
                  {faq.q}
                  <span className="text-2xl text-orange-500 group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-200">
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