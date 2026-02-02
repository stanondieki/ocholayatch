'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Grid, List, Search, Sliders, SlidersHorizontal, Sparkles } from 'lucide-react';
import { YachtCard } from '@/components/YachtCard';
import { Yacht } from '@/types';

const allYachts: Yacht[] = [
  {
    id: 1,
    name: "Ocean Majesty",
    location: "Monaco",
    image: "https://images.unsplash.com/photo-1604771868982-003c36db0814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRlY2slMjBzdW5zZXR8ZW58MXx8fHwxNzY0ODY2NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 15000,
    guests: 12,
    cabins: 6,
    length: 150,
    crew: 8,
    category: 'Mediterranean',
    description: "Experience unparalleled luxury aboard the Ocean Majesty.",
    amenities: ["Jacuzzi", "Helipad", "Gym", "Cinema"],
    images: []
  },
  {
    id: 2,
    name: "Azure Dream",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1637585569991-b013294d8f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNhaWxpbmclMjBibHVlJTIwd2F0ZXJ8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 12000,
    guests: 10,
    cabins: 5,
    length: 130,
    crew: 6,
    category: 'Tropical',
    description: "Sail through crystal-clear waters aboard Azure Dream.",
    amenities: ["Jacuzzi", "Diving Equipment", "Paddleboards"],
    images: []
  },
  {
    id: 3,
    name: "Serenity Elite",
    location: "Caribbean",
    image: "https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdhJTIweWFjaHQlMjBhZXJpYWx8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 18000,
    guests: 14,
    cabins: 7,
    length: 180,
    crew: 10,
    category: 'Caribbean',
    description: "The ultimate in maritime luxury.",
    amenities: ["Helipad", "Jacuzzi", "Cinema", "Gym"],
    images: []
  },
  {
    id: 4,
    name: "Horizon Explorer",
    location: "Greek Islands",
    image: "https://images.unsplash.com/photo-1735208073648-5f08ae9a8b29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMG1hcmluYSUyMGhhcmJvcnxlbnwxfHx8fDE3NjQ4NjY1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 10000,
    guests: 8,
    cabins: 4,
    length: 110,
    crew: 5,
    category: 'Mediterranean',
    description: "Discover the magic of the Aegean Sea.",
    amenities: ["Jacuzzi", "Paddleboards", "Snorkeling Gear"],
    images: []
  },
  {
    id: 5,
    name: "Royal Sapphire",
    location: "French Riviera",
    image: "https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NDc2Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 20000,
    guests: 16,
    cabins: 8,
    length: 200,
    crew: 12,
    category: 'Mediterranean',
    description: "A crown jewel of yacht charters.",
    amenities: ["Helipad", "Jacuzzi", "Cinema", "Gym", "Spa"],
    images: []
  },
  {
    id: 6,
    name: "Paradise Voyager",
    location: "Dubai",
    image: "https://images.unsplash.com/photo-1573717865061-202c78c4b414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 16000,
    guests: 12,
    cabins: 6,
    length: 160,
    crew: 9,
    category: 'Middle East',
    description: "Modern luxury meets Arabian hospitality.",
    amenities: ["Jacuzzi", "Gym", "Cinema", "Jet Ski"],
    images: []
  },
];

interface YachtsPageProps {
  onYachtClick?: (yacht: Yacht) => void;
}

export default function YachtsPage({ onYachtClick }: YachtsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [guestCount, setGuestCount] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Mediterranean', 'Caribbean', 'Tropical', 'Middle East'];

  const filteredYachts = allYachts.filter(yacht => {
    const matchesSearch = yacht.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yacht.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || yacht.category === selectedCategory;
    const matchesPrice = yacht.price >= priceRange[0] && yacht.price <= priceRange[1];
    const matchesGuests = guestCount === 0 || yacht.guests >= guestCount;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesGuests;
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black"></div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm uppercase tracking-[0.3em] text-white">Premium Fleet</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl lg:text-8xl text-white mb-8 tracking-tight"
          >
            Explore Our
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Luxury Yachts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl text-white/70 max-w-3xl mb-12 leading-relaxed"
          >
            Browse our curated collection of the world's finest yachts
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full text-white hover:bg-white/20 transition-all"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="uppercase tracking-wider text-sm">Filters</span>
              </motion.button>

              <div className="text-white/60">
                <span className="text-white">{filteredYachts.length}</span> yachts found
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-full transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-full transition-all ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-12 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-white mb-4 text-sm uppercase tracking-wider">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm uppercase tracking-wider transition-all ${
                              selectedCategory === category
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-white mb-4 text-sm uppercase tracking-wider">
                        Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="25000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="block text-white mb-4 text-sm uppercase tracking-wider">
                        Minimum Guests
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        placeholder="Any"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                        setPriceRange([0, 25000]);
                        setGuestCount(0);
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full uppercase tracking-wider text-sm transition-all"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Yachts Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchTerm}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-8'
              }
            >
              {filteredYachts.map((yacht, index) => (
                <motion.div
                  key={yacht.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <YachtCard yacht={yacht} onClick={() => onYachtClick?.(yacht)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredYachts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-3xl text-white mb-4">No yachts found</h3>
              <p className="text-white/60 text-lg">
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
