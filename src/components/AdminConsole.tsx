import React, { useState } from 'react';
import { Shield, Lock, FileText, HeartHandshake, BookOpen, Calendar, HelpCircle, Users, Trash, Plus, DollarSign, LogOut } from 'lucide-react';
import { Sermon, Event, PrayerRequest, DonationLog } from '../types';

interface AdminConsoleProps {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onAddSermon: (sermon: Omit<Sermon, 'id' | 'listenCount'>) => void;
  onDeleteEvent: (id: string) => void;
  onDeleteSermon: (id: string) => void;
  onTogglePrayerStatus: (id: string, status: 'Pending' | 'Prayed For' | 'Answered') => void;
  events: Event[];
  sermons: Sermon[];
  prayerRequests: PrayerRequest[];
  donationLogs: DonationLog[];
}

export default function AdminConsole({
  onAddEvent,
  onAddSermon,
  onDeleteEvent,
  onDeleteSermon,
  onTogglePrayerStatus,
  events,
  sermons,
  prayerRequests,
  donationLogs
}: AdminConsoleProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab control inside admin console
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'events' | 'sermons' | 'prayers' | 'donations'>('overview');

  // New Event Form State
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState<'Easter' | 'Youth' | 'Weekend Challenge' | 'Outreach' | 'Prayer Night' | 'General'>('General');

  // New Sermon Form State
  const [sermonTitle, setSermonTitle] = useState('');
  const [sermonMinister, setSermonMinister] = useState('Pst. Maurice');
  const [sermonDate, setSermonDate] = useState('');
  const [sermonScripture, setSermonScripture] = useState('');
  const [sermonCategory, setSermonCategory] = useState<'Sunday' | 'Wednesday' | 'Youth' | 'Special'>('Sunday');
  const [sermonDuration, setSermonDuration] = useState('35 mins');
  const [sermonSummary, setSermonSummary] = useState('');
  const [sermonAudioUrl, setSermonAudioUrl] = useState('');

  // Simulated login check
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '' || password === '') {
      setLoginError('Please enter both username and password.');
      return;
    }

    // Accept "admin" as username and "admin" as password for ease of preview testing!
    if (username.toLowerCase() === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin / admin for the preview login.');
    }
  };

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !eventDate || !eventLocation) return;

    onAddEvent({
      name: eventName,
      date: eventDate,
      location: eventLocation,
      description: eventDescription || 'No description provided.',
      category: eventCategory,
      imageUrl: new URL('../assets/images/sunday service.jpeg', import.meta.url).href
    });

    // Reset Form
    setEventName('');
    setEventDate('');
    setEventLocation('');
    setEventDescription('');
    setEventCategory('General');
    alert('Event created successfully!');
  };

  const handleCreateSermonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sermonTitle || !sermonScripture || !sermonDate) return;

    onAddSermon({
      title: sermonTitle,
      minister: sermonMinister,
      date: sermonDate,
      scripture: sermonScripture,
      category: sermonCategory,
      duration: sermonDuration,
      summary: sermonSummary || 'Spoken word sermon archive.',
      audioUrl: sermonAudioUrl || undefined
    });

    // Reset Form
    setSermonTitle('');
    setSermonMinister('Pst. Maurice');
    setSermonDate('');
    setSermonScripture('');
    setSermonSummary('');
    setSermonCategory('Sunday');
    setSermonAudioUrl('');
    alert('Sermon logged successfully!');
  };

  // Helper calculation for total donations KES
  const totalDonations = donationLogs.reduce((acc, log) => acc + log.amount, 0);

  // Group donations by fund
  const donationsByFund = donationLogs.reduce((acc, log) => {
    acc[log.fundType] = (acc[log.fundType] || 0) + log.amount;
    return acc;
  }, {} as Record<string, number>);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12" id="admin-login-screen">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 border border-amber-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">Admin Portal</h2>
            <p className="text-zinc-500 text-xs">Unlock administrative features & congregation trackers</p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-center text-xs text-red-400 font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4" id="login-form">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-sm outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              id="btn-login-submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Lock className="w-4 h-4" /> Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" id="admin-dashboard">
      {/* Header Admin Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <h2 className="text-2xl font-serif font-bold text-white">Administrator Terminal</h2>
          </div>
          <p className="text-zinc-500 text-xs">Managing Sikusi Believers assemblies logs & databases</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAuthenticated(false)}
            id="btn-admin-logout"
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-red-500/30 text-zinc-400 hover:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" id="admin-stats-strip">
        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-850">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Offerings</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-lg md:text-xl font-mono font-bold text-white">KES {totalDonations.toLocaleString()}</p>
          <span className="text-[10px] text-zinc-500">From envelope logs</span>
        </div>

        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-850">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Church Events</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-lg md:text-xl font-mono font-bold text-white">{events.length} Active</p>
          <span className="text-[10px] text-zinc-500">Scheduled on calendar</span>
        </div>

        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-850">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Sermons Archive</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-lg md:text-xl font-mono font-bold text-white">{sermons.length} Spoken</p>
          <span className="text-[10px] text-zinc-500">Logged audio catalogs</span>
        </div>

        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-850">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Intercessions</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-lg md:text-xl font-mono font-bold text-white">{prayerRequests.length} Requests</p>
          <span className="text-[10px] text-zinc-500">Congregation prayer wall</span>
        </div>
      </section>

      {/* Internal Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800/60 pb-3" id="admin-tabs">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeAdminTab === 'overview' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          General Overview
        </button>
        <button
          onClick={() => setActiveAdminTab('events')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeAdminTab === 'events' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          Manage Events
        </button>
        <button
          onClick={() => setActiveAdminTab('sermons')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeAdminTab === 'sermons' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          Manage Sermons
        </button>
        <button
          onClick={() => setActiveAdminTab('prayers')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeAdminTab === 'prayers' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          Prayer Requests ({prayerRequests.filter(p => p.status === 'Pending').length})
        </button>
        <button
          onClick={() => setActiveAdminTab('donations')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeAdminTab === 'donations' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'}`}
        >
          Donation Envelopes
        </button>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6" id="admin-panel-content">
        {activeAdminTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8" id="panel-overview">
            {/* Fund distribution visual block */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-serif font-semibold text-white">Allocations by Fund</h3>
              <div className="space-y-3 pt-2">
                {['Tithe', 'Outreach', 'Special Projects', 'General Offering'].map((fundType) => {
                  const amount = donationsByFund[fundType] || 0;
                  const pct = totalDonations > 0 ? (amount / totalDonations) * 100 : 0;
                  return (
                    <div key={fundType} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-zinc-300">{fundType === 'Special Projects' ? 'Special Projects Fund' : fundType}</span>
                        <span className="text-amber-400 font-mono">KES {amount.toLocaleString()} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                        <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick overview of latest activity log */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-lg font-serif font-semibold text-white">Recent Donations Log</h3>
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto no-scrollbar">
                {donationLogs.length > 0 ? (
                  donationLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="bg-zinc-950/40 p-3 rounded-xl border border-zinc-850 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-white truncate max-w-[150px]">{log.memberName}</p>
                        <p className="text-zinc-500 text-[10px]">{log.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400 font-bold font-mono">KES {log.amount}</p>
                        <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">{log.fundType}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500 text-xs py-6 text-center">No donations logged yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'events' && (
          <div className="grid md:grid-cols-12 gap-8" id="panel-events">
            {/* Create Event Form */}
            <form
              onSubmit={handleCreateEventSubmit}
              className="md:col-span-5 bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4"
              id="admin-create-event-form"
            >
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-1.5">
                <Plus className="w-5 h-5 text-amber-400" /> Create Event
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Event Name</label>
                <input
                  type="text"
                  placeholder="e.g. Easter Youth Retreat"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Event Date</label>
                  <input
                    type="text"
                    placeholder="July 18, 2026"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Category</label>
                  <select
                    value={eventCategory}
                    onChange={(e: any) => setEventCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                  >
                    <option value="General">General</option>
                    <option value="Easter">Easter</option>
                    <option value="Youth">Youth</option>
                    <option value="Weekend Challenge">Weekend Challenge</option>
                    <option value="Outreach">Outreach</option>
                    <option value="Prayer Night">Prayer Night</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  placeholder="Bungoma Sanctuary Hall"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Description</label>
                <textarea
                  placeholder="Describe event schedule & guest preachers..."
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                id="btn-admin-submit-event"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition-all cursor-pointer text-xs"
              >
                Publish Event
              </button>
            </form>

            {/* List and manage scheduled events */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-serif font-bold text-white">Active Calendar Event Logs</h3>
              <div className="space-y-3 max-h-[450px] overflow-y-auto no-scrollbar">
                {events.map((e) => (
                  <div key={e.id} className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-2xl flex justify-between items-center gap-4">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">{e.category}</span>
                      <h4 className="font-bold text-white text-sm truncate font-serif">{e.name}</h4>
                      <p className="text-zinc-500 text-xs truncate">{e.date} • {e.location}</p>
                    </div>

                    <button
                      onClick={() => onDeleteEvent(e.id)}
                      id={`btn-delete-event-${e.id}`}
                      className="p-2.5 bg-zinc-800 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 rounded-xl transition-colors cursor-pointer border border-zinc-800 shrink-0"
                      title="Delete Event"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'sermons' && (
          <div className="grid md:grid-cols-12 gap-8" id="panel-sermons">
            {/* Add Sermon Form */}
            <form
              onSubmit={handleCreateSermonSubmit}
              className="md:col-span-5 bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4"
              id="admin-create-sermon-form"
            >
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-1.5">
                <Plus className="w-5 h-5 text-amber-400" /> Log Sermon Spoken
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Sermon Title</label>
                <input
                  type="text"
                  placeholder="e.g. Letting Go of Your Own Ways"
                  value={sermonTitle}
                  onChange={(e) => setSermonTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Minister Name</label>
                  <input
                    type="text"
                    value={sermonMinister}
                    onChange={(e) => setSermonMinister(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Sermon Date</label>
                  <input
                    type="text"
                    placeholder="July 18, 2026"
                    value={sermonDate}
                    onChange={(e) => setSermonDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Scripture Reference</label>
                  <input
                    type="text"
                    placeholder="e.g. Luke 12:32"
                    value={sermonScripture}
                    onChange={(e) => setSermonScripture(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Category</label>
                  <select
                    value={sermonCategory}
                    onChange={(e: any) => setSermonCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                  >
                    <option value="Sunday">Sunday Sermon</option>
                    <option value="Wednesday">Wednesday Fellowship</option>
                    <option value="Youth">Youth Gathering</option>
                    <option value="Special">Special Meeting</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Duration (Simulated)</label>
                <input
                  type="text"
                  value={sermonDuration}
                  onChange={(e) => setSermonDuration(e.target.value)}
                  placeholder="e.g. 45 mins"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Audio URL (MP3 link)</label>
                  <span className="text-[10px] text-amber-500 font-bold">Real Audio!</span>
                </div>
                <input
                  type="url"
                  value={sermonAudioUrl}
                  onChange={(e) => setSermonAudioUrl(e.target.value)}
                  placeholder="https://example.com/audio.mp3"
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all"
                />
                
                {/* Audio URL quick helper presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[9px] text-zinc-500 font-bold">Presets:</span>
                  <button
                    type="button"
                    onClick={() => setSermonAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')}
                    className="text-[9px] bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-white px-2 py-0.5 rounded cursor-pointer"
                  >
                    Helix Sample 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setSermonAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3')}
                    className="text-[9px] bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-white px-2 py-0.5 rounded cursor-pointer"
                  >
                    Helix Sample 2
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Summary or Quick Script</label>
                <textarea
                  placeholder="Enter short outline of sermon message..."
                  value={sermonSummary}
                  onChange={(e) => setSermonSummary(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-amber-500/50 rounded-xl text-white text-xs outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                id="btn-admin-submit-sermon"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition-all cursor-pointer text-xs"
              >
                Log Sermon Message
              </button>
            </form>

            {/* List and manage logged sermons */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-lg font-serif font-bold text-white">Sermon Catalogs</h3>
              <div className="space-y-3 max-h-[450px] overflow-y-auto no-scrollbar">
                {sermons.map((s) => (
                  <div key={s.id} className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-2xl flex justify-between items-center gap-4">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">{s.category} SERVICE</span>
                      <h4 className="font-bold text-white text-sm truncate font-serif">{s.title}</h4>
                      <p className="text-zinc-500 text-xs truncate">{s.date} • {s.minister} • {s.scripture}</p>
                    </div>

                    <button
                      onClick={() => onDeleteSermon(s.id)}
                      id={`btn-delete-sermon-${s.id}`}
                      className="p-2.5 bg-zinc-800 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 rounded-xl transition-colors cursor-pointer border border-zinc-800 shrink-0"
                      title="Delete Sermon"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeAdminTab === 'prayers' && (
          <div className="space-y-4" id="panel-prayers">
            <h3 className="text-lg font-serif font-semibold text-white">Prayer Request Intercession Feed</h3>
            <div className="grid gap-4">
              {prayerRequests.length > 0 ? (
                prayerRequests.map((req) => (
                  <div key={req.id} className="bg-zinc-900/40 border border-zinc-850 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{req.name}</span>
                        <span className="text-zinc-500 text-[10px]">{req.email}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-500 text-[10px]">{req.date}</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed italic">"{req.request}"</p>
                      
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[10px] uppercase font-bold text-zinc-500">Current Status:</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          req.status === 'Answered'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : req.status === 'Prayed For'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">
                      <button
                        onClick={() => onTogglePrayerStatus(req.id, 'Pending')}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${req.status === 'Pending' ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                      >
                        Set Pending
                      </button>
                      <button
                        onClick={() => onTogglePrayerStatus(req.id, 'Prayed For')}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${req.status === 'Prayed For' ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                      >
                        Mark Prayed
                      </button>
                      <button
                        onClick={() => onTogglePrayerStatus(req.id, 'Answered')}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${req.status === 'Answered' ? 'bg-green-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                      >
                        Mark Answered
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500 text-xs py-8 text-center bg-zinc-900/10 border border-dashed border-zinc-800 rounded-2xl">No prayer requests received yet.</p>
              )}
            </div>
          </div>
        )}

        {activeAdminTab === 'donations' && (
          <div className="space-y-4" id="panel-donations">
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-lg font-serif font-semibold text-white">Complete Envelope Audit Logs</h3>
              <span className="text-zinc-500 text-xs font-mono">Total Collected: KES {totalDonations.toLocaleString()}</span>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-850 rounded-2xl overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider">
                    <th className="p-4">Receipt No</th>
                    <th className="p-4">Donor Name</th>
                    <th className="p-4">Allocated Fund</th>
                    <th className="p-4">Date Logged</th>
                    <th className="p-4 text-right">Amount (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  {donationLogs.length > 0 ? (
                    donationLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-zinc-900/50 transition-colors text-zinc-300">
                        <td className="p-4 font-mono font-bold text-[11px] text-zinc-400">{log.id}</td>
                        <td className="p-4 font-medium text-white">
                          <p>{log.memberName}</p>
                          <p className="text-[10px] text-zinc-500">{log.email}</p>
                        </td>
                        <td className="p-4">
                          <span className="bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded tracking-wide text-[10px]">
                            {log.fundType}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-zinc-500">{log.date}</td>
                        <td className="p-4 text-right font-mono font-bold text-white">KES {log.amount.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-500 italic">No donations registered inside local state storage.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
