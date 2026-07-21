import { useState } from 'react';
import { Calendar, MapPin, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { Event } from '../types';

const DEFAULT_EVENT_IMAGE = new URL('../assets/images/sunday service.jpeg', import.meta.url).href;

interface PageEventsProps {
  events: Event[];
}

export default function PageEvents({ events }: PageEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const categories = ['All', 'Easter', 'Youth', 'Weekend Challenge', 'Outreach', 'Prayer Night', 'General'];

  // Filter events based on selected category
  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(e => e.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-10">
      {/* Intro section */}
      <section className="text-center max-w-2xl mx-auto space-y-4" id="events-intro">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Upcoming Gatherings</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
          Join Our Special Church Events
        </h2>
        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
          We host gatherings for worship, prayer, teaching, and fellowship throughout the year. Come be a part of 
          what God is doing in our midst!
        </p>
      </section>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 pb-2" id="events-categories-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1); // Reset to first page
            }}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Listing Grid */}
      {paginatedEvents.length > 0 ? (
        <section className="grid md:grid-cols-3 gap-8" id="events-grid">
          {paginatedEvents.map((event) => (
            <article
              key={event.id}
              className="group bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-zinc-950 shrink-0">
                <img
                  src={event.imageUrl || DEFAULT_EVENT_IMAGE}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />
                <div className="absolute top-4 left-4 bg-zinc-950/85 backdrop-blur-md text-amber-400 border border-zinc-800 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                  {event.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-2.5 border-t border-zinc-800/60 pt-4 text-xs text-zinc-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="text-center py-12 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-sm">No special events found in this category.</p>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4" id="events-pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 border rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
              currentPage === 1
                ? 'bg-zinc-900 border-zinc-850 text-zinc-600 opacity-50 pointer-events-none'
                : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
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
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-3 border rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition-all ${
              currentPage === totalPages
                ? 'bg-zinc-900 border-zinc-850 text-zinc-600 opacity-50 pointer-events-none'
                : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700'
            }`}
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
