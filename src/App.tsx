import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, Sermon, Event, PrayerRequest, DonationLog } from './types';

const sundayServiceImage = new URL('./assets/images/sunday service.jpeg', import.meta.url).href;
const wednesdayFellowshipImage = new URL('./assets/images/wednesday fellowship.jpeg', import.meta.url).href;
const youthImage = new URL('./assets/images/youth.jpeg', import.meta.url).href;
const outreachImage = new URL('./assets/images/outreach.jpeg', import.meta.url).href;
const prayerNightImage = new URL('./assets/images/prayer night.jpeg', import.meta.url).href;
const weekendChallengeImage = new URL('./assets/images/weekend challenge.jpeg', import.meta.url).href;
const defaultEventImage = sundayServiceImage;

// Importing Page Components
import Header from './components/Header';
import Footer from './components/Footer';
import PageHome from './components/PageHome';
import PageAbout from './components/PageAbout';
import PageEvents from './components/PageEvents';
import PageSermons from './components/PageSermons';
import PageCalendar from './components/PageCalendar';
import PageGiving from './components/PageGiving';
import PageContact from './components/PageContact';
import AdminConsole from './components/AdminConsole';

// Initial pre-populated data matching their HTML contents perfectly
const INITIAL_EVENTS: Event[] = [
  {
    id: 'evt-1',
    name: 'Sunday Service',
    date: 'July 06, 2026',
    location: 'Sikusi Believers, Bungoma-Chwele Rd',
    description: 'Welcome we feast on the manna of this day.',
    category: 'General',
    imageUrl: sundayServiceImage
  },
  {
    id: 'evt-2',
    name: 'Wednesday Fellowship',
    date: 'July 08, 2026',
    location: 'Sikusi Tabernacle',
    description: 'Midweek prayers. Come let us pray together,feast on the word and get spiritual rejuvenation.',
    category: 'General',
    imageUrl: wednesdayFellowshipImage
  },
  {
    id: 'evt-3',
    name: 'Youth Meeting',
    date: 'July 12, 2026',
    location: 'Sikusi Youth Hall',
    description: 'Young believers gathering for deep teaching, prayers, and fellowship.',
    category: 'Youth',
    imageUrl: youthImage
  },
  {
    id: 'evt-4',
    name: 'Outreach',
    date: 'July 18, 2026',
    location: 'Bungoma Sub-County Prisons & Hospitals',
    description: 'Community visits, prison visits, outreach program, and sharing the Word.',
    category: 'Outreach',
    imageUrl: outreachImage
  },
  {
    id: 'evt-5',
    name: 'Prayer Night',
    date: 'July 22, 2026',
    location: 'Sikusi Tabernacle',
    description: 'Dedicated night of intercession, prayers, and communing on the evening-time Message.',
    category: 'Prayer Night',
    imageUrl: prayerNightImage
  },
  {
    id: 'evt-6',
    name: 'Weekend Challenge',
    date: 'July 22, 2026',
    location: 'Sikusi Tabernacle',
    description: 'Special weekend gathering with worship, thanksgiving, and testimonies.',
    category: 'Weekend Challenge',
    imageUrl: weekendChallengeImage
  }
];

const sundayServiceAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3';

const INITIAL_SERMONS: Sermon[] = [
  {
    id: 'srm-1',
    title: 'God\'s provided place of worship',
    minister: 'Pastor Maurice Wanyonyi',
    date: 'July 06, 2026',
    scripture: 'John 4:25-26',
    category: 'Sunday',
    duration: '2hrs',
    audioUrl: sundayServiceAudio,
    summary: 'There is only two ways of anything: that is the right way and the wrong way; that is your way and God\'s way. You can\'t have your own way and be in God\'s way; and you can\'t be in God\'s way and have your own way. It is your thoughts or God\'s Word. You have to accept one. Man has always been a failure. So, why try to rely upon your own understanding? Why not take God\'s way of it? because He always brings you out right.',
    listenCount: 45
  },
  {
    id: 'srm-2',
    title: 'The Future Home of the Heavenly Bridegroom & the earthly Bride',
    minister: 'Pastor Maurice Wanyonyi',
    date: 'July 08, 2026',
    scripture: '2 Peter 2:4-9',
    category: 'Wednesday',
    duration: '1 hr',
    summary: 'Jesus came to redeem it back to the Father. In order to do this, He became part of it; as I\'ve just went through. And from that very dust, the part Jesus was, Himself, being redeemed, through Him all of the attributes of God are redeemed with the earth.',
    listenCount: 22
  }
];

const INITIAL_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: 'pr-1',
    name: 'Brother Joseph',
    email: 'joseph@sikusi.org',
    request: 'Praying for the salvation of my wife.',
    status: 'Pending',
    date: 'July 12, 2026',
    countOfPrayers: 15
  },
  {
    id: 'pr-2',
    name: 'Sister Tabitha',
    email: 'tabitha@gmail.com',
    request: 'Please pray for my mother\'s complete healing from chronic health issues.',
    status: 'Prayed For',
    date: 'July 15, 2026',
    countOfPrayers: 28
  }
];

const INITIAL_DONATIONS: DonationLog[] = [
  {
    id: 'REC-524128',
    amount: 5000,
    date: '2026-07-06',
    fundType: 'Tithe',
    memberName: 'Brother Joseph',
    email: 'joseph@sikusi.org'
  },
  {
    id: 'REC-892415',
    amount: 1500,
    date: '2026-07-08',
    fundType: 'Outreach',
    memberName: 'Sister Mary',
    email: 'mary@gmail.com'
  }
];

const VALID_TABS: ActiveTab[] = ['home', 'about', 'events', 'sermons', 'contact', 'calendar', 'giving', 'admin'];

const getTabFromPath = (pathname: string): ActiveTab => {
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, '');
  if (!trimmedPath || trimmedPath === 'home') return 'home';
  return VALID_TABS.includes(trimmedPath as ActiveTab) ? (trimmedPath as ActiveTab) : 'home';
};

const getPathForTab = (tab: ActiveTab) => (tab === 'home' ? '/' : `/${tab}`);

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => getTabFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    const nextPath = getPathForTab(tab);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
  };

  // State arrays populated from localStorage or fallback defaults
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('sikusi_events');
    if (saved) {
      const parsed = JSON.parse(saved) as Event[];
      return parsed.map(evt => {
        if (evt.id === 'evt-1') {
          return {
            ...evt,
            name: 'Sunday Service',
            date: 'July 06, 2026',
            location: 'Sikusi Believers, Bungoma-Chwele Rd',
            description: 'Dining on the word. Message of our day.'
          };
        }
        if (evt.id === 'evt-2') {
          return {
            ...evt,
            name: 'Wednesday Fellowship',
            date: 'July 08, 2026',
            location: 'Sikusi Tabernacle',
            description: 'Midweek prayers. Come let us pray together,feast on the word and get spiritual rejuvenation.'
          };
        }
        if (evt.id === 'evt-3') {
          return {
            ...evt,
            name: 'Youth Meeting',
            description: 'Young believers gathering for deep teaching, prayers, and fellowship.'
          };
        }
        if (evt.id === 'evt-4') {
          return {
            ...evt,
            name: 'Outreach',
            date: 'July 18, 2026',
            location: 'Bungoma Sub-County Prisons & Hospitals',
            description: 'Community visits, prison visits, outreach program, and sharing the Word.'
          };
        }
        if (evt.id === 'evt-5') {
          return {
            ...evt,
            name: 'Prayer Night',
            date: 'July 22, 2026',
            location: 'Sikusi Tabernacle',
            description: 'Dedicated night of intercession, prayers, and communing on the evening-time Message.'
          };
        }
        if (evt.id === 'evt-6') {
          return {
            ...evt,
            name: 'Weekend Challenge',
            date: 'July 22, 2026',
            location: 'Sikusi Tabernacle',
            description: 'Special weekend gathering with worship, thanksgiving, and testimonies.'
          };
        }
        return evt;
      });
    }
    return INITIAL_EVENTS;
  });

  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const saved = localStorage.getItem('sikusi_sermons');
    if (saved) {
      const parsed = JSON.parse(saved) as Sermon[];
      return parsed.map(srm => {
        if (srm.id === 'srm-1') {
          return {
            ...srm,
            title: 'God\'s provided place of worship',
            minister: 'Pastor Maurice Wanyonyi',
            date: 'July 06, 2026',
            scripture: 'John 4:25-26',
            category: 'Sunday',
            duration: '2hrs',
            audioUrl: sundayServiceAudio,
            summary: 'There is only two ways of anything: that is the right way and the wrong way; that is your way and God\'s way. You can\'t have your own way and be in God\'s way; and you can\'t be in God\'s way and have your own way. It is your thoughts or God\'s Word. You have to accept one. Man has always been a failure. So, why try to rely upon your own understanding? Why not take God\'s way of it? because He always brings you out right.'
          };
        }
        if (srm.id === 'srm-2') {
          return {
            ...srm,
            title: 'The Future Home of the Heavenly Bridegroom & the earthly Bride',
            minister: 'Pastor Maurice Wanyonyi',
            date: 'July 08, 2026',
            scripture: '2 Peter 2:4-9',
            category: 'Wednesday',
            duration: '1 hr',
            summary: 'Jesus came to redeem it back to the Father. In order to do this, He became part of it; as I\'ve just went through. And from that very dust, the part Jesus was, Himself, being redeemed, through Him all of the attributes of God are redeemed with the earth.'
          };
        }
        return srm;
      });
    }
    return INITIAL_SERMONS;
  });

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('sikusi_prayers');
    if (saved) {
      const parsed = JSON.parse(saved) as PrayerRequest[];
      return parsed.map(pr => {
        if (pr.id === 'pr-1') {
          return {
            ...pr,
            name: 'Brother Joseph',
            email: 'joseph@sikusi.org',
            request: 'Praying for the salvation of my wife.',
            date: 'July 12, 2026'
          };
        }
        if (pr.id === 'pr-2') {
          return {
            ...pr,
            name: 'Sister Tabitha',
            email: 'tabitha@gmail.com',
            request: 'Please pray for my mother\'s complete healing from chronic health issues.',
            date: 'July 15, 2026'
          };
        }
        return pr;
      });
    }
    return INITIAL_PRAYER_REQUESTS;
  });

  const [donationLogs, setDonationLogs] = useState<DonationLog[]>(() => {
    const saved = localStorage.getItem('sikusi_donations');
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  // Sync to localStorage on any state changes
  useEffect(() => {
    localStorage.setItem('sikusi_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('sikusi_sermons', JSON.stringify(sermons));
  }, [sermons]);

  useEffect(() => {
    localStorage.setItem('sikusi_prayers', JSON.stringify(prayerRequests));
  }, [prayerRequests]);

  useEffect(() => {
    localStorage.setItem('sikusi_donations', JSON.stringify(donationLogs));
  }, [donationLogs]);

  // Event handlers
  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    const eventWithId: Event = {
      ...newEvent,
      id: `evt-${Date.now()}`
    };
    setEvents(prev => [eventWithId, ...prev]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Sermon handlers
  const handleAddSermon = (newSermon: Omit<Sermon, 'id' | 'listenCount'>) => {
    const sermonWithId: Sermon = {
      ...newSermon,
      id: `srm-${Date.now()}`,
      listenCount: 0
    };
    setSermons(prev => [sermonWithId, ...prev]);
  };

  const handleDeleteSermon = (id: string) => {
    setSermons(prev => prev.filter(s => s.id !== id));
  };

  // Prayer handlers
  const handleAddPrayerRequest = (newRequest: Omit<PrayerRequest, 'id' | 'status' | 'date' | 'countOfPrayers'>) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const requestWithId: PrayerRequest = {
      ...newRequest,
      id: `pr-${Date.now()}`,
      status: 'Pending',
      date: formattedDate,
      countOfPrayers: 1
    };
    setPrayerRequests(prev => [requestWithId, ...prev]);
  };

  const handleIncrementPrayer = (id: string) => {
    setPrayerRequests(prev =>
      prev.map(p => (p.id === id ? { ...p, countOfPrayers: p.countOfPrayers + 1 } : p))
    );
  };

  const handleTogglePrayerStatus = (id: string, status: 'Pending' | 'Prayed For' | 'Answered') => {
    setPrayerRequests(prev =>
      prev.map(p => (p.id === id ? { ...p, status } : p))
    );
  };

  // Donation handlers
  const handleAddDonation = (newDonation: Omit<DonationLog, 'id'>) => {
    const donationWithId: DonationLog = {
      ...newDonation,
      id: `REC-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setDonationLogs(prev => [donationWithId, ...prev]);
  };

  // Highlight featured items for the homepage
  const latestEvent = events.length > 0 ? events[0] : null;
  const latestSermon = sermons.length > 0 ? sermons[0] : null;

  return (
    <div className="min-h-screen flex flex-col justify-between" id="app-root-layout">
      
      {/* Universal header navigation */}
      <Header activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main viewport area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10" id="main-content-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && (
              <PageHome
                onNavigate={handleNavigate}
                featuredEvent={latestEvent}
                featuredSermon={latestSermon}
                latestSundaySermon={sermons.find(s => s.category === 'Sunday') || null}
              />
            )}
            {activeTab === 'about' && <PageAbout />}
            {activeTab === 'events' && <PageEvents events={events} />}
            {activeTab === 'sermons' && <PageSermons sermons={sermons} />}
            {activeTab === 'calendar' && <PageCalendar events={events} />}
            {activeTab === 'giving' && <PageGiving onAddDonation={handleAddDonation} />}
            {activeTab === 'contact' && (
              <PageContact
                prayerRequests={prayerRequests}
                onAddPrayerRequest={handleAddPrayerRequest}
                onIncrementPrayer={handleIncrementPrayer}
              />
            )}
            {activeTab === 'admin' && (
              <AdminConsole
                onAddEvent={handleAddEvent}
                onAddSermon={handleAddSermon}
                onDeleteEvent={handleDeleteEvent}
                onDeleteSermon={handleDeleteSermon}
                onTogglePrayerStatus={handleTogglePrayerStatus}
                events={events}
                sermons={sermons}
                prayerRequests={prayerRequests}
                donationLogs={donationLogs}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal footer */}
      <Footer activeTab={activeTab} onNavigate={handleNavigate} />
      
    </div>
  );
}
