import { Mail, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export default function Footer({ activeTab, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Map numbers to active tabs for our site-wide footer paginator
  const pageOrder: ActiveTab[] = ['home', 'about', 'events', 'sermons', 'contact', 'calendar', 'giving'];
  const currentIndex = pageOrder.indexOf(activeTab);

  const handlePageSelect = (tab: ActiveTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handlePageSelect(pageOrder[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < pageOrder.length - 1) {
      handlePageSelect(pageOrder[currentIndex + 1]);
    }
  };

  return (
    <footer className="bg-[#0b0b0c] border-t border-zinc-900 px-6 py-12 mt-20" id="main-footer">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Social media connections */}
        <div className="flex justify-center gap-6" id="footer-socials">
          <a
            href="mailto:messageofthehoursikusibeliever@gmail.com"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
            title="Gmail"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/@messageofthehourassbls_Sikusi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
            title="Youtube"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <button onClick={() => handlePageSelect('home')} className="hover:text-amber-400 cursor-pointer transition-colors">Home</button>
          <button onClick={() => handlePageSelect('about')} className="hover:text-amber-400 cursor-pointer transition-colors">About Us</button>
          <button onClick={() => handlePageSelect('events')} className="hover:text-amber-400 cursor-pointer transition-colors">Events</button>
          <button onClick={() => handlePageSelect('sermons')} className="hover:text-amber-400 cursor-pointer transition-colors">Sermons</button>
          <button onClick={() => handlePageSelect('contact')} className="hover:text-amber-400 cursor-pointer transition-colors">Contact Us</button>
          <button onClick={() => handlePageSelect('calendar')} className="hover:text-amber-400 cursor-pointer transition-colors">Calendar</button>
          <button onClick={() => handlePageSelect('giving')} className="hover:text-amber-400 cursor-pointer transition-colors">Giving</button>
        </div>

        {/* Custom Paginator block matching their exact original multi-page static visual pagination! */}
        <div className="flex flex-col items-center gap-3 pt-6 border-t border-zinc-900" id="footer-site-pagination">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Site Navigator</p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className={`p-2 bg-zinc-900 border border-zinc-850 rounded-xl transition-all cursor-pointer ${
                currentIndex <= 0 ? 'text-zinc-700 pointer-events-none opacity-40' : 'text-zinc-400 hover:text-amber-400 hover:border-amber-500/40'
              }`}
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-1.5">
              {pageOrder.map((tabName, pIdx) => {
                const isSelected = activeTab === tabName;
                return (
                  <button
                    key={tabName}
                    onClick={() => handlePageSelect(tabName)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center border ${
                      isSelected
                        ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/10'
                        : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                    title={`Go to ${tabName}`}
                  >
                    {pIdx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex >= pageOrder.length - 1}
              className={`p-2 bg-zinc-900 border border-zinc-850 rounded-xl transition-all cursor-pointer ${
                currentIndex >= pageOrder.length - 1 ? 'text-zinc-700 pointer-events-none opacity-40' : 'text-zinc-400 hover:text-amber-400 hover:border-amber-500/40'
              }`}
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic footer copy bar */}
        <div className="text-center pt-2">
          <p className="text-zinc-600 text-xs font-medium">
            &copy; {currentYear} Sikusi Believers-Message of the Hour Assemblies. All Rights Reserved.
          </p>
          <p className="text-[10px] text-zinc-700 mt-1">
            Accepting God's Provided Way At The End Time • Bungoma County, Kenya
          </p>
        </div>

      </div>
    </footer>
  );
}
