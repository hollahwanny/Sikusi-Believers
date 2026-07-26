import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Play, Pause, Disc, BookOpen, Clock, Heart, Volume2, VolumeX } from 'lucide-react';
import { Sermon } from '../types';

const DEFAULT_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

interface PageSermonsProps {
  sermons: Sermon[];
}

export default function PageSermons({ sermons }: PageSermonsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Real Audio Playback States
  const [nowPlaying, setNowPlaying] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const categories = ['All', 'Sunday', 'Wednesday', 'Youth', 'Special'];

  // Handle source changes
  useEffect(() => {
    if (audioRef.current) {
      if (nowPlaying) {
        const url = nowPlaying.audioUrl || DEFAULT_AUDIO_URL;
        audioRef.current.src = url;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch(err => {
            console.error("Playback error:", err);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
        audioRef.current.src = '';
        setIsPlaying(false);
      }
    }
  }, [nowPlaying]);

  // Handle play/pause toggle
  useEffect(() => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Playback error:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = 
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.scripture.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.minister.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handlePlaySermon = (sermon: Sermon) => {
    if (nowPlaying?.id === sermon.id) {
      setIsPlaying(!isPlaying);
    } else {
      setNowPlaying(sermon);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sermons | Sikusi Believers</title>
        <meta
          name="description"
          content="Browse sermons and teachings from Sikusi Believers - Message of the Hour Assemblies and listen to the end-time message."
        />
      </Helmet>
      <div className="space-y-10">
      {/* Introduction Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4" id="sermons-intro">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Sermon Archives</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
          Feasting On The Spoken Word
        </h2>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
          Listen to our weekly services, Sunday school teachings, and spiritual archives. Feed your soul with the 
          revealed truth of the end-time message.
        </p>
      </section>

      {/* Search & Filters */}
      <section className="grid sm:grid-cols-12 gap-4 items-center" id="sermons-filter-bar">
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, scripture, minister or topic..."
            className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-2xl text-white text-sm outline-none transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="sm:col-span-6 flex flex-wrap gap-2 sm:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat} {cat !== 'All' && 'Services'}
            </button>
          ))}
        </div>
      </section>

      {/* Sermons list */}
      <section className="grid gap-6 md:grid-cols-2" id="sermons-list-grid">
        {filteredSermons.length > 0 ? (
          filteredSermons.map((sermon) => {
            const isCurrent = nowPlaying?.id === sermon.id;
            const isCurrentPlaying = isCurrent && isPlaying;
            return (
              <div
                key={sermon.id}
                className={`group p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  isCurrent 
                    ? 'bg-amber-500/5 border-amber-500/40 shadow-xl shadow-amber-500/5' 
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-4">
                  {/* Category & Date banner */}
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md uppercase tracking-wide">
                      {sermon.category} Service
                    </span>
                    <span className="text-zinc-500">{sermon.date}</span>
                  </div>

                  {/* Title & Scripture */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                      {sermon.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500/90 font-medium bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded-lg w-fit">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{sermon.scripture}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                    {sermon.summary}
                  </p>
                </div>

                {/* Footer of Sermon Card: Speaker & Play Button */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 font-medium">
                  <div className="space-y-0.5">
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Minister</p>
                    <p className="text-white text-sm font-semibold">{sermon.minister}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{sermon.duration}</span>
                    </div>

                    <button
                      onClick={() => handlePlaySermon(sermon)}
                      id={`btn-play-sermon-${sermon.id}`}
                      className={`p-3 rounded-2xl flex items-center justify-center transition-all cursor-pointer transform active:scale-95 ${
                        isCurrentPlaying
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-16 bg-zinc-900/15 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 text-sm">No sermons found matching your search or filter.</p>
          </div>
        )}
      </section>

      {/* Hidden Real HTML5 Audio Tag */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Floating Audio Player */}
      {nowPlaying && (
        <section
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[420px] bg-zinc-950/95 backdrop-blur-md border border-amber-500/30 p-5 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-4"
          id="audio-player-sermons"
        >
          <div className="relative shrink-0">
            <div className={`w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 border border-amber-500/20 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
              <Disc className="w-6 h-6" />
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex justify-between items-start gap-2">
              <div className="truncate">
                <p className="text-xs text-amber-400 font-bold uppercase tracking-widest text-[9px]">Now Playing</p>
                <h4 className="text-sm font-semibold text-white truncate font-serif leading-tight">{nowPlaying.title}</h4>
                <p className="text-zinc-500 text-[11px] truncate mt-0.5">{nowPlaying.minister}</p>
              </div>
              <button
                onClick={() => setNowPlaying(null)}
                className="text-zinc-500 hover:text-white text-sm shrink-0 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Seekable Slider Bar */}
            <div className="space-y-1">
              <div 
                onClick={handleSeek}
                className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden cursor-pointer relative group/progress"
                title="Click anywhere to seek"
              >
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-100"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                <span>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
                <button
                  onClick={handleToggleMute}
                  className="text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer p-1"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            id="btn-player-toggle"
            className="p-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-all cursor-pointer shadow-md transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </section>
      )}
      </div>
    </>
  );
}
