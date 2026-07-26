import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageSquare, Heart, Shield, Send, Check, Mail } from 'lucide-react';
import { PrayerRequest } from '../types';

interface PageContactProps {
  prayerRequests: PrayerRequest[];
  onAddPrayerRequest: (request: Omit<PrayerRequest, 'id' | 'status' | 'date' | 'countOfPrayers'>) => void;
  onIncrementPrayer: (id: string) => void;
}

export default function PageContact({ prayerRequests, onAddPrayerRequest, onIncrementPrayer }: PageContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;

    onAddPrayerRequest({
      name: name.trim() || 'Anonymous Believer',
      email: email.trim() || 'anonymous@sikusi.org',
      request: request.trim()
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setRequest('');

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const activeRequests = prayerRequests.slice(0, 4); // Show top 4 latest

  return (
    <>
      <Helmet>
        <title>Contact Us | Message of the Hour Assemblies - Sikusi Believers</title>
        <meta
          name="description"
          content="Contact Message of the Hour Assemblies - Sikusi Believers for prayer requests, fellowship, or visits in Bungoma County, Kenya."
        />
      </Helmet>
      <div className="space-y-12">
      {/* Introduction Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4" id="contact-intro">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">We would love to hear from you</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
          Reach Out For Prayer & Fellowship
        </h2>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
          Whether you need prayer support, want to visit us, or need guidance on the spoken Word, our church 
          family is ready to welcome you.
        </p>
      </section>

      <section className="grid md:grid-cols-12 gap-8 items-start" id="contact-grid">
        {/* Direct Contact Cards - Left Side */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-6">
            <h3 className="text-xl font-serif font-bold text-white">Prayer Request</h3>
            
            <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-850 space-y-2 text-center">
              <Phone className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Direct Prayer Line</p>
              <a href="tel:+254711663838" className="text-lg md:text-xl font-mono font-bold text-white hover:text-amber-400 transition-colors block">
                +254 711 663 838
              </a>
            </div>

            {/* Direct messaging shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="contact-quick-links">
              <a
                href="tel:+254711663838"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-750 text-white text-xs font-bold rounded-xl transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone Call
              </a>
              <a
                href="sms:+254711663838"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-750 text-white text-xs font-bold rounded-xl transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Direct SMS
              </a>
              <a
                href="mailto:healerblessing@gmail.com"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-750 text-white text-xs font-bold rounded-xl transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-amber-500" /> Gmail
              </a>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <h4 className="font-semibold text-white">Find Us in Bungoma</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              We are located in <strong>Bungoma County</strong>, along the Bungoma-Chwele Road. We hold services weekly 
              and would be overjoyed to have you join our sanctuary.
            </p>
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-850 space-y-1.5 text-xs text-zinc-500 font-semibold">
              <p className="text-amber-400 font-bold">SUNDAY DIVINE SERVICE</p>
              <p>9:30 AM — 1:30 PM</p>
              <p className="text-amber-400 font-bold mt-2">WEDNESDAY FELLOWSHIP</p>
              <p>4:00 PM — 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Submit Prayer Request Form - Right Side */}
        <div className="md:col-span-7 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-5"
            id="prayer-form"
          >
            <div className="space-y-1.5">
              <h3 className="text-xl font-serif font-semibold text-white">Submit Prayer Request</h3>
              <p className="text-xs text-zinc-400">"Is any sick among you? let him call for the elders of the church..." — James 5:14</p>
            </div>

            {submitted ? (
              <div className="bg-amber-500/10 border border-amber-500/35 p-5 rounded-2xl text-center space-y-2 animate-in zoom-in-95 duration-250">
                <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-white text-base">Request Submitted Successfully</h4>
                <p className="text-zinc-400 text-xs">Our elders and prayer warriors will stand in intercession for your request. God bless you!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Brother John"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Your Prayer request or Message</label>
                  <textarea
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    required
                    placeholder="Describe your request or leave a message..."
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-submit-prayer"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Send className="w-4 h-4" /> Send Request
                </button>
              </div>
            )}
          </form>

          {/* Congregation Prayer Wall */}
          <div className="space-y-4" id="prayer-wall">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-semibold text-amber-400">Congregational Prayer Wall</h3>
              <span className="text-zinc-500 text-xs">Total Intercessions Active</span>
            </div>

            <div className="grid gap-4">
              {activeRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 bg-zinc-900/30 border border-zinc-850 rounded-2xl space-y-3 flex justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-zinc-300">{req.name}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-500">{req.date}</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed italic">
                      "{req.request}"
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center shrink-0">
                    <button
                      onClick={() => onIncrementPrayer(req.id)}
                      id={`btn-pray-heart-${req.id}`}
                      className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-full transition-all cursor-pointer border border-amber-500/20 active:scale-90"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <span className="text-[10px] text-zinc-500 font-bold mt-1">
                      {req.countOfPrayers} Praying
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
