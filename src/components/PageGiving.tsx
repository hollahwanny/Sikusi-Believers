import React, { useState } from 'react';
import { Heart, Landmark, Globe, Hammer, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { DonationLog } from '../types';

interface PageGivingProps {
  onAddDonation: (donation: Omit<DonationLog, 'id'>) => void;
}

export default function PageGiving({ onAddDonation }: PageGivingProps) {
  const [selectedFund, setSelectedFund] = useState<'Tithe' | 'Outreach' | 'Special Projects' | 'General Offering'>('Outreach');
  const [amount, setAmount] = useState('');
  const [memberName, setMemberName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [receipt, setReceipt] = useState<{
    id: string;
    amount: number;
    fund: string;
    date: string;
    name: string;
  } | null>(null);

  const funds = [
    {
      type: 'Tithe' as const,
      title: 'Tithes & Offerings',
      icon: <Landmark className="w-5 h-5 text-amber-400" />,
      description: 'Support the daily ministry operations, pastoral care, and tabernacle maintenance of our local assembly.'
    },
    {
      type: 'Outreach' as const,
      title: 'Outreach Fund',
      icon: <Globe className="w-5 h-5 text-amber-400" />,
      description: 'Help us carry the Gospel to prisons, support community missions, and distribute message materials across Bungoma.'
    },
    {
      type: 'Special Projects' as const,
      title: 'Special Projects',
      icon: <Hammer className="w-5 h-5 text-amber-400" />,
      description: 'Contribute towards long-term church building plans, acquiring sound instruments, and hosting large conventions.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || !date) return;

    const donorName = memberName.trim() || 'Anonymous Believer';
    const donorEmail = email.trim() || 'anonymous@sikusi.org';
    const finalAmount = Number(amount);

    onAddDonation({
      amount: finalAmount,
      date,
      fundType: selectedFund,
      memberName: donorName,
      email: donorEmail
    });

    // Create a simulated receipt
    setReceipt({
      id: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
      amount: finalAmount,
      fund: selectedFund,
      date,
      name: donorName
    });

    // Reset Form
    setAmount('');
    setMemberName('');
    setEmail('');
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Intro Header */}
      <section className="text-center space-y-4" id="giving-intro">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Support the work</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
          Your Giving Helps Advance The Gospel
        </h2>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
          We welcome faithful giving to support ministry, outreach, and church building needs. Every gift helps 
          maintain a place of worship and carry light to Bungoma and beyond.
        </p>
      </section>

      {/* Funds Info Grid */}
      <section className="grid md:grid-cols-3 gap-6" id="giving-funds-grid">
        {funds.map((fund) => (
          <div
            key={fund.type}
            onClick={() => setSelectedFund(fund.type)}
            className={`p-6 rounded-2xl border transition-all duration-350 cursor-pointer flex flex-col justify-between space-y-4 ${
              selectedFund === fund.type
                ? 'bg-amber-500/5 border-amber-500 shadow-lg shadow-amber-500/5'
                : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedFund === fund.type ? 'bg-amber-500/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  {fund.icon}
                </div>
                <h4 className="font-bold text-white text-base font-serif">{fund.title}</h4>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">{fund.description}</p>
            </div>
            
            <div className="text-[10px] uppercase font-bold tracking-wider text-right">
              {selectedFund === fund.type ? (
                <span className="text-amber-400">Selected Fund ✓</span>
              ) : (
                <span className="text-zinc-500">Tap to select</span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Form or Receipt Switcher */}
      <section className="max-w-xl mx-auto" id="giving-action-container">
        {receipt ? (
          /* Thank You & Receipt Display Card */
          <div className="bg-zinc-900 border border-amber-500/40 p-8 rounded-3xl text-center space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Ambient top decoration */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
            
            <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 border border-amber-500/20">
              <CheckCircle className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-white">Thank You For Your Giving!</h3>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over..."
              </p>
              <cite className="block text-amber-400/90 text-xs font-semibold">— Luke 6:38</cite>
            </div>

            {/* Receipt details docket */}
            <div className="bg-zinc-950/60 border border-zinc-850 p-5 rounded-2xl text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-dashed border-zinc-800 pb-2">
                <span className="text-zinc-500">RECEIPT NO</span>
                <span className="text-white font-bold">{receipt.id}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-zinc-800 pb-2">
                <span className="text-zinc-500">DONOR</span>
                <span className="text-white font-medium truncate max-w-[200px]">{receipt.name}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-zinc-800 pb-2">
                <span className="text-zinc-500">ALLOCATED FUND</span>
                <span className="text-amber-400 font-bold">{receipt.fund.toUpperCase()}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-zinc-800 pb-2">
                <span className="text-zinc-500">DATE</span>
                <span className="text-white">{receipt.date}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-zinc-400 font-bold text-sm">AMOUNT</span>
                <span className="text-amber-400 font-bold text-base">KES {receipt.amount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setReceipt(null)}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all cursor-pointer text-sm"
            >
              Submit Another Offering
            </button>
          </div>
        ) : (
          /* Offering Submission Form */
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-5"
            id="donation-form"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-semibold text-white">Donation Details</h3>
              <p className="text-xs text-zinc-500">Allocating to: <strong className="text-amber-400">{selectedFund}</strong></p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Your Name (Optional)</label>
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="Anonymous Believer"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Your Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Donation Amount (KES)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                  placeholder="1,000"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Offering Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all text-zinc-400"
                />
              </div>
            </div>

            <button
              type="submit"
              id="btn-submit-donation"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-xl shadow-lg shadow-amber-500/10 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <CreditCard className="w-4 h-4" /> Submit Offering
            </button>

            <p className="text-[10px] text-zinc-500 text-center">
              *By clicking submit, you are simulating a secure church envelope donation. The data will be saved locally.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
