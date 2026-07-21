import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Calendar, HeartHandshake, BookOpen, MessageSquare, 
  Flame, Sparkles, Compass, Mail, Youtube, Play, Pause, 
  Volume2, VolumeX, Disc
} from 'lucide-react';
import { ActiveTab, Sermon, Event } from '../types';

const heroImage = new URL('../assets/images/hero.jpeg', import.meta.url).href;

interface PageHomeProps {
  onNavigate: (tab: ActiveTab) => void;
  featuredEvent: Event | null;
  featuredSermon: Sermon | null;
  latestSundaySermon: Sermon | null;
}

const FALLBACK_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3';

export default function PageHome({ onNavigate, featuredEvent, featuredSermon, latestSundaySermon }: PageHomeProps) {
  // Audio playback state for Sunday Service
  const [isPlayingSunday, setIsPlayingSunday] = useState(false);
  const [sundayCurrentTime, setSundayCurrentTime] = useState(0);
  const [sundayDuration, setSundayDuration] = useState(0);
  const [isSundayMuted, setIsSundayMuted] = useState(false);
  const sundayAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (sundayAudioRef.current) sundayAudioRef.current.pause();
    };
  }, []);

  const togglePlaySunday = () => {
    const audioUrl = latestSundaySermon?.audioUrl || FALLBACK_AUDIO_URL;
    if (!audioUrl) return;

    const audio = sundayAudioRef.current;
    if (audio) {
      if (isPlayingSunday) {
        audio.pause();
        setIsPlayingSunday(false);
      } else {
        audio.play().catch(err => console.log('Sunday audio play error:', err));
        setIsPlayingSunday(true);
      }
    }
  };

  const handleSundayTimeUpdate = () => {
    if (sundayAudioRef.current) {
      setSundayCurrentTime(sundayAudioRef.current.currentTime);
    }
  };

  const handleSundayLoadedMetadata = () => {
    if (sundayAudioRef.current) {
      setSundayDuration(sundayAudioRef.current.duration || 0);
    }
  };

  const handleSundayEnded = () => {
    setIsPlayingSunday(false);
    setSundayCurrentTime(0);
  };

  const handleSundaySeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sundayAudioRef.current && sundayDuration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * sundayDuration;
      sundayAudioRef.current.currentTime = newTime;
      setSundayCurrentTime(newTime);
    }
  };

  const toggleSundayMute = () => {
    if (sundayAudioRef.current) {
      const newVal = !isSundayMuted;
      sundayAudioRef.current.muted = newVal;
      setIsSundayMuted(newVal);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const sundayAudioUrl = latestSundaySermon?.audioUrl || FALLBACK_AUDIO_URL;

  return (
    <div className="space-y-16">
      {/* Hidden Audio Elements */}
      <audio
        ref={sundayAudioRef}
        src={sundayAudioUrl}
        onTimeUpdate={handleSundayTimeUpdate}
        onLoadedMetadata={handleSundayLoadedMetadata}
        onEnded={handleSundayEnded}
      />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden rounded-3xl" id="home-hero">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Majestic Eagle"
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c]/80 via-transparent to-[#0b0b0c]/80" />
        </div>

        <div className="relative z-10 max-w-4xl text-center px-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Accepting God's Provided Way At The End Time
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-none"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Sikusi Believers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-300 max-w-3xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            "We have no law but love, no book but the Bible, no creed but Christ." We believe the Full Gospel, every bit of the Word, exactly the way it is written, without adding or taking anything away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button
              onClick={() => onNavigate('sermons')}
              id="btn-hero-sermons"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition-all shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Lets Get Started
            </button>
            <button
              onClick={() => onNavigate('about')}
              id="btn-hero-about"
              className="px-6 py-3 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 rounded-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-2"
            >
              What We Believe <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" id="quick-navigation-grid">
        <div
          onClick={() => onNavigate('about')}
          id="quick-card-about"
          className="group bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 hover:bg-zinc-850/80 p-6 rounded-2xl cursor-pointer transition-all duration-300 text-center"
        >
          <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">Our Beliefs</h3>
          <p className="text-zinc-500 text-xs mt-1.5 hidden sm:block">What we believe and teach from the scriptures</p>
        </div>

        <div
          onClick={() => onNavigate('events')}
          id="quick-card-events"
          className="group bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 hover:bg-zinc-850/80 p-6 rounded-2xl cursor-pointer transition-all duration-300 text-center"
        >
          <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">Events</h3>
          <p className="text-zinc-500 text-xs mt-1.5 hidden sm:block">Explore our upcoming congregational events</p>
        </div>

        <div
          onClick={() => onNavigate('sermons')}
          id="quick-card-sermons"
          className="group bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 hover:bg-zinc-850/80 p-6 rounded-2xl cursor-pointer transition-all duration-300 text-center"
        >
          <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">Sermons</h3>
          <p className="text-zinc-500 text-xs mt-1.5 hidden sm:block">Listen to the spoken evening-time Message</p>
        </div>

        <div
          onClick={() => onNavigate('contact')}
          id="quick-card-prayer"
          className="group bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 hover:bg-zinc-850/80 p-6 rounded-2xl cursor-pointer transition-all duration-300 text-center"
        >
          <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">Prayer Wall</h3>
          <p className="text-zinc-500 text-xs mt-1.5 hidden sm:block">Submit a request & pray for others</p>
        </div>
      </section>

      {/* Featured Church Updates / Dynamic Content */}
      <section className="grid md:grid-cols-2 gap-8" id="featured-section">
        {/* Featured Sermon Spot (Latest Message Food) */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full font-medium">
                <Compass className="w-3.5 h-3.5" /> Latest Message Food
              </div>
              <span className="text-zinc-500 text-xs">Updated recently</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-serif font-semibold text-white">Gods provided place of worship</h4>
              <p className="text-sm text-zinc-400">Minister:</p>
              <p className="text-xs text-zinc-500">Service Date: July 06, 2026</p>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Come feast with us on the revealed Word of the hour, keeping our lamps trimmed and burning.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('sermons')}
              id="btn-featured-sermons"
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Show sermon audio <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sunday Service Gathering Spot (Next Special Event) */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Next Special Event
              </div>
              <span className="text-zinc-500 text-xs">Active notice</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-serif font-semibold text-white">Sunday Service</h4>
              <p className="text-sm text-zinc-400">Location: Sikusi Believers, Bungoma-Chwele Rd</p>
              <p className="text-xs text-zinc-500">Date: July 06, 2026</p>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Welcome we feast on the manna of this day.
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('events')}
              id="btn-featured-events"
              className="text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              See full event timeline <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Scripture & Core Pillars Banner */}
      <section className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 p-8 rounded-r-3xl" id="home-quote-banner">
        <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Scripture</p>
        <blockquote className="text-xl font-serif italic text-amber-100 leading-relaxed">
          "For wheresoever the carcase is, there will the eagles be gathered together."
        </blockquote>
        <cite className="block text-amber-400 font-sans text-sm font-medium mt-2">— Matthew 24:28</cite>
      </section>
    </div>
  );
}
