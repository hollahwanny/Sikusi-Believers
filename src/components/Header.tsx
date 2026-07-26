import { useState } from 'react';
import { Menu, X, Calendar, HeartHandshake, Shield, Flame } from 'lucide-react';
import { ActiveTab } from '../types';

const logoImage = new URL('../assets/images/logo.jpeg', import.meta.url).href;

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export default function Header({ activeTab, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; tab: ActiveTab }[] = [
    { label: 'HOME', tab: 'home' },
    { label: 'ABOUT US', tab: 'about' },
    { label: 'EVENTS', tab: 'events' },
    { label: 'SERMONS', tab: 'sermons' },
    { label: 'CONTACT US', tab: 'contact' }
  ];

  const handleNavClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-[#0b0b0c]/90 backdrop-blur-md border-b border-zinc-900 z-50 px-6 py-4" id="main-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Church Logo & Brand Title */}
        <div
          onClick={() => handleNavClick('home')}
          id="header-logo-brand"
          className="flex items-center gap-3.5 cursor-pointer group shrink-0"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500/80 group-hover:scale-105 transition-all duration-300">
              <img
                src={logoImage}
                alt="Sikusi Believers church logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 p-0.5 rounded-full border border-black">
              <Flame className="w-2.5 h-2.5 text-black animate-pulse" />
            </div>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-sm md:text-base font-serif font-bold text-white tracking-tight leading-none group-hover:text-amber-400 transition-colors">
              Sikusi Believers
            </h1>
            <p className="text-[10px] text-zinc-500 font-medium font-mono leading-none uppercase tracking-wider">
              Message of the Hour Assemblies
            </p>
          </div>
        </div>

        {/* Center Desktop Navigation Navbar */}
        <nav className="hidden lg:flex items-center gap-1.5" id="desktop-navbar">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === item.tab
                  ? 'text-amber-400 bg-amber-400/5'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Desktop Quick Links & Controls */}
        <div className="hidden lg:flex items-center gap-3" id="desktop-quick-actions">
          <button
            onClick={() => handleNavClick('calendar')}
            id="header-link-calendar"
            className="p-2.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer border border-zinc-850 flex items-center gap-2 text-xs font-bold"
            title="Calendar"
          >
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => handleNavClick('admin')}
            id="header-link-admin"
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-bold ${
              activeTab === 'admin'
                ? 'bg-amber-500 border-amber-500 text-black'
                : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
            title="Admin Portal"
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

        {/* Hamburger Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Admin badge mobile */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-amber-500 border-amber-500 text-black'
                : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="menu-icon-toggle"
            className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu Panel */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 right-0 bg-[#0b0b0c] border-b border-zinc-800 px-6 py-6 space-y-4 shadow-2xl z-45 animate-in slide-in-from-top-5 duration-250" id="mobile-navbar">
          <ul className="space-y-2 text-center">
            {navItems.map((item) => (
              <li key={item.tab}>
                <button
                  onClick={() => handleNavClick(item.tab)}
                  className={`w-full py-3.5 text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                    activeTab === item.tab
                      ? 'text-amber-400 bg-amber-400/5 font-extrabold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-zinc-900">
            <button
              onClick={() => handleNavClick('calendar')}
              id="header-mobile-calendar"
              className="w-full py-3 bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-500" /> Calendar
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
