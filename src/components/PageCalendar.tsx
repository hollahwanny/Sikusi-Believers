import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight, List, Grid } from 'lucide-react';
import { Event } from '../types';

const getEventTime = (eventName: string) => {
  const nameLower = eventName.toLowerCase();
  if (nameLower.includes('sunday')) {
    return '09:30 AM — 01:30 PM (EAT)';
  }
  if (nameLower.includes('wednesday') || nameLower.includes('fellowship')) {
    return '04:00 PM — 06:00 PM (EAT)';
  }
  return '09:30 AM (EAT)';
};

interface PageCalendarProps {
  events: Event[];
}

export default function PageCalendar({ events }: PageCalendarProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  // We are focused on July 2026 as per the user's HTML calendar events.
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6); // 0-indexed, 6 is July

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to parse dates like "July 06, 2026" or "2026-07-06" to match days
  const getEventDay = (eventDateStr: string): number | null => {
    try {
      if (eventDateStr.includes('-')) {
        const parts = eventDateStr.split('-');
        if (parts.length === 3 && Number(parts[1]) === month + 1) {
          return Number(parts[2]);
        }
      } else {
        // Parse "July 06, 2026"
        const clean = eventDateStr.replace(',', '').split(' ');
        if (clean.length === 3) {
          const mIndex = monthNames.findIndex(m => m.toLowerCase().startsWith(clean[0].toLowerCase().slice(0, 3)));
          if (mIndex === month && Number(clean[2]) === year) {
            return Number(clean[1]);
          }
        }
      }
    } catch (e) {
      // Fallback
    }
    return null;
  };

  // Group events by day of July 2026
  const getEventsForDay = (day: number): Event[] => {
    return events.filter(event => getEventDay(event.date) === day);
  };

  // General calendar math
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  // List pagination
  const totalPages = Math.ceil(events.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[] | null>(null);
  const [selectedDayNum, setSelectedDayNum] = useState<number | null>(null);

  const handleDayClick = (dayNum: number, dayEvents: Event[]) => {
    setSelectedDayNum(dayNum);
    setSelectedDayEvents(dayEvents.length > 0 ? dayEvents : null);
  };

  return (
    <div className="space-y-10">
      {/* Intro section */}
      <section className="text-center max-w-2xl mx-auto space-y-4" id="calendar-intro">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Church Calendar</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
          Upcoming Services & Events
        </h2>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
          Keep track of the church activities planned for the coming weeks. Click on highlighted calendar days to view details.
        </p>
      </section>

      {/* View Toggle Controls */}
      <div className="flex justify-center items-center gap-4 pb-2" id="calendar-view-toggle">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 border ${
            viewMode === 'grid'
              ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/10'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <Grid className="w-3.5 h-3.5" /> Calendar Grid
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-2 border ${
            viewMode === 'list'
              ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/10'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <List className="w-3.5 h-3.5" /> Event Cards
        </button>
      </div>

      {viewMode === 'grid' ? (
        /* Monthly Calendar Grid View */
        <div className="max-w-4xl mx-auto space-y-6" id="calendar-grid-view">
          {/* Month Navigation Banner */}
          <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl">
            <h3 className="text-lg md:text-xl font-serif font-semibold text-white">
              {monthNames[month]} {year}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-3xl overflow-hidden p-6">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            <div className="grid grid-cols-7 gap-2.5">
              {/* Empty placeholder boxes before first day of month */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="aspect-square bg-zinc-950/20 rounded-xl" />
              ))}

              {/* Day numbers */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const dayEvents = getEventsForDay(dayNum);
                const hasEvents = dayEvents.length > 0;
                const isToday = dayNum === 18 && month === 6 && year === 2026; // Setting 18th July 2026 (matching additional metadata!) as today!
                const isSelected = selectedDayNum === dayNum;

                return (
                  <button
                    key={`day-${dayNum}`}
                    onClick={() => handleDayClick(dayNum, dayEvents)}
                    className={`aspect-square p-2 rounded-xl transition-all relative flex flex-col justify-between text-left border cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                        : isToday
                        ? 'bg-zinc-800/80 border-amber-500 text-white font-bold ring-2 ring-amber-500/30'
                        : hasEvents
                        ? 'bg-zinc-900 border-zinc-800/80 text-white hover:border-amber-500/40 hover:bg-zinc-850/80'
                        : 'bg-zinc-950/40 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:bg-zinc-900/20'
                    }`}
                  >
                    <span className="text-xs md:text-sm">{dayNum}</span>
                    {hasEvents && (
                      <div className="flex gap-1 flex-wrap mt-auto">
                        {dayEvents.map((e, eIdx) => (
                          <span
                            key={eIdx}
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400 shrink-0"
                            title={e.name}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Detail Expansion Panel */}
          {selectedDayNum && (
            <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h4 className="font-serif font-semibold text-white">
                  Schedule for {monthNames[month]} {selectedDayNum}, {year}
                </h4>
                <button
                  onClick={() => {
                    setSelectedDayNum(null);
                    setSelectedDayEvents(null);
                  }}
                  className="text-zinc-500 hover:text-white text-xs cursor-pointer"
                >
                  Clear Selection
                </button>
              </div>

              {selectedDayEvents ? (
                <div className="space-y-4">
                  {selectedDayEvents.map((event) => (
                    <div key={event.id} className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          {event.category}
                        </span>
                        <h5 className="font-bold text-white text-base font-serif">{event.name}</h5>
                        <p className="text-zinc-400 text-xs">{event.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-zinc-500 font-semibold shrink-0">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>{getEventTime(event.name)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-xs">No services or special outreaches scheduled on this day. Perfect day for quiet meditation and family devotion!</p>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Stateful Pagination Event Cards List View */
        <div className="max-w-4xl mx-auto space-y-8" id="calendar-list-view">
          <div className="grid gap-6">
            {paginatedEvents.map((event) => (
              <article
                key={event.id}
                className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between hover:border-zinc-700 transition-all duration-300"
              >
                <div className="space-y-2.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">
                      {event.category}
                    </span>
                    <span className="text-zinc-500 text-xs font-bold">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">{event.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{event.description}</p>
                </div>

                <div className="flex flex-col gap-2.5 shrink-0 w-full sm:w-auto pt-4 sm:pt-0 sm:border-l sm:border-zinc-800 sm:pl-6 text-xs text-zinc-400 font-semibold">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{getEventTime(event.name)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span>Pst. Maurice</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* List Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-4" id="calendar-list-pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-3 border rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
                  currentPage === 1
                    ? 'bg-zinc-900 border-zinc-850 text-zinc-600 opacity-50 pointer-events-none'
                    : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 font-bold rounded-xl text-sm transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-amber-500 text-black border border-amber-500'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-3 border rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
                  currentPage === totalPages
                    ? 'bg-zinc-900 border-zinc-850 text-zinc-600 opacity-50 pointer-events-none'
                    : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700'
                }`}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
