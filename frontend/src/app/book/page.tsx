'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Ruler, MapPin, Anchor, Search, Filter, Loader2 } from 'lucide-react';
import { Yacht } from '@/types';
import { BookingModal } from '@/components/BookingModal';
import { yachtApi } from '@/lib/api';

export default function BookPage() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Fetch yachts from API
  useEffect(() => {
    const fetchYachts = async () => {
      try {
        setLoading(true);
        const response = await yachtApi.getYachts({});
        
        // Transform API data to match Yacht type
        const transformedYachts = response.data.map((yacht: any) => ({
          id: yacht._id,
          name: yacht.name,
          description: yacht.description,
          price: yacht.price,
          location: yacht.location,
          category: yacht.category,
          image: yacht.image,
          images: yacht.images || [yacht.image],
          guests: yacht.capacity,
          cabins: yacht.cabins,
          length: typeof yacht.length === 'string' ? parseInt(yacht.length) : yacht.length,
          crew: yacht.crew || 5,
          amenities: yacht.amenities || [],
        }));
        
        setYachts(transformedYachts);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching yachts:', err);
        setError(err.message || 'Failed to load yachts');
      } finally {
        setLoading(false);
      }
    };

    fetchYachts();
  }, []);

  // Get unique locations
  const locations = ['all', ...Array.from(new Set(yachts.map(y => y.location)))];

  // Filter yachts
  const filteredYachts = yachts.filter(yacht => {
    const matchesSearch = yacht.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          yacht.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || yacht.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleBookNow = (yacht: Yacht) => {
    setSelectedYacht(yacht);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Book Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Dream Yacht</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Choose from our exclusive collection of luxury yachts and create unforgettable memories on the sea.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-16"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search yachts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full sm:w-48 pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none appearance-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-gray-900">
                    {loc === 'all' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Yacht Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
              <p className="text-white/70">Loading available yachts...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredYachts.map((yacht, index) => (
              <motion.div
                key={yacht.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={yacht.image}
                      alt={yacht.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                        {yacht.category}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                        <span className="text-lg font-bold text-white">${yacht.price.toLocaleString()}</span>
                        <span className="text-white/60 text-sm">/day</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                          {yacht.name}
                        </h3>
                        <div className="flex items-center gap-1 text-white/60 mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{yacht.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-white/10">
                      <div className="text-center">
                        <Users className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                        <div className="text-white font-medium">{yacht.guests}</div>
                        <div className="text-white/40 text-xs">Guests</div>
                      </div>
                      <div className="text-center">
                        <Anchor className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-white font-medium">{yacht.cabins}</div>
                        <div className="text-white/40 text-xs">Cabins</div>
                      </div>
                      <div className="text-center">
                        <Ruler className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                        <div className="text-white font-medium">{yacht.length}ft</div>
                        <div className="text-white/40 text-xs">Length</div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {yacht.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-white/5 rounded text-xs text-white/60"
                        >
                          {amenity}
                        </span>
                      ))}
                      {yacht.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">
                          +{yacht.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => handleBookNow(yacht)}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && filteredYachts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl text-white mb-4">No yachts found</h3>
              <p className="text-white/60">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        yacht={selectedYacht}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
