'use client'

import { motion } from 'motion/react';
import { MapPin, Sparkles, Sun, Palmtree, Waves, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState } from 'react';

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');

  const destinations = [
    {
      id: 1,
      name: 'French Riviera',
      region: 'Mediterranean',
      country: 'France',
      description: 'Experience the glamour and sophistication of the Côte d\'Azur, from Monaco to Saint-Tropez.',
      image: 'https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?w=1200&h=800&fit=crop',
      highlights: ['Monte Carlo', 'Cannes', 'Saint-Tropez', 'Antibes'],
      bestSeason: 'May - September',
      activities: ['Beach Clubs', 'Fine Dining', 'Shopping', 'Nightlife'],
      gradient: 'from-pink-600 to-purple-600'
    },
    {
      id: 2,
      name: 'Greek Islands',
      region: 'Mediterranean',
      country: 'Greece',
      description: 'Discover ancient ruins, whitewashed villages, and crystal-clear turquoise waters.',
      image: 'https://images.unsplash.com/photo-1735208073648-5f08ae9a8b29?w=1200&h=800&fit=crop',
      highlights: ['Santorini', 'Mykonos', 'Crete', 'Rhodes'],
      bestSeason: 'April - October',
      activities: ['Island Hopping', 'Historical Sites', 'Beach Relaxation', 'Water Sports'],
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 3,
      name: 'Maldives',
      region: 'Tropical',
      country: 'Maldives',
      description: 'Paradise on Earth with pristine beaches, luxury resorts, and unparalleled marine life.',
      image: 'https://images.unsplash.com/photo-1637585569991-b013294d8f26?w=1200&h=800&fit=crop',
      highlights: ['Male Atoll', 'Baa Atoll', 'Ari Atoll', 'Private Islands'],
      bestSeason: 'November - April',
      activities: ['Diving', 'Snorkeling', 'Spa Retreats', 'Water Villas'],
      gradient: 'from-cyan-600 to-teal-600'
    },
    {
      id: 4,
      name: 'Caribbean',
      region: 'Caribbean',
      country: 'Multiple',
      description: 'Tropical paradise with white sand beaches, vibrant culture, and endless sunshine.',
      image: 'https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?w=1200&h=800&fit=crop',
      highlights: ['St. Barts', 'Virgin Islands', 'Antigua', 'St. Lucia'],
      bestSeason: 'December - May',
      activities: ['Beach Hopping', 'Snorkeling', 'Local Cuisine', 'Water Sports'],
      gradient: 'from-orange-600 to-pink-600'
    },
    {
      id: 5,
      name: 'Amalfi Coast',
      region: 'Mediterranean',
      country: 'Italy',
      description: 'Stunning coastal scenery, charming villages, and authentic Italian luxury.',
      image: 'https://images.unsplash.com/photo-1604771868982-003c36db0814?w=1200&h=800&fit=crop',
      highlights: ['Positano', 'Capri', 'Amalfi', 'Ravello'],
      bestSeason: 'May - September',
      activities: ['Coastal Cruising', 'Fine Dining', 'Wine Tasting', 'Historic Tours'],
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      id: 6,
      name: 'Dubai & UAE',
      region: 'Middle East',
      country: 'United Arab Emirates',
      description: 'Modern luxury meets Arabian hospitality in the world\'s most ambitious destinations.',
      image: 'https://images.unsplash.com/photo-1573717865061-202c78c4b414?w=1200&h=800&fit=crop',
      highlights: ['Dubai Marina', 'Palm Jumeirah', 'Abu Dhabi', 'Musandam'],
      bestSeason: 'November - March',
      activities: ['Luxury Shopping', 'Desert Safari', 'Fine Dining', 'Modern Architecture'],
      gradient: 'from-amber-600 to-red-600'
    },
    {
      id: 7,
      name: 'Seychelles',
      region: 'Tropical',
      country: 'Seychelles',
      description: 'Untouched natural beauty with granite boulders, lush jungles, and pristine beaches.',
      image: 'https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?w=1200&h=800&fit=crop',
      highlights: ['Mahé', 'Praslin', 'La Digue', 'Private Islands'],
      bestSeason: 'April - May, October - November',
      activities: ['Nature Exploration', 'Diving', 'Beach Relaxation', 'Island Hopping'],
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      id: 8,
      name: 'Bahamas',
      region: 'Caribbean',
      country: 'Bahamas',
      description: 'Crystal-clear waters, secluded cays, and world-class marinas await.',
      image: 'https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?w=1200&h=800&fit=crop',
      highlights: ['Nassau', 'Exumas', 'Harbor Island', 'Eleuthera'],
      bestSeason: 'December - May',
      activities: ['Swimming with Pigs', 'Diving', 'Fishing', 'Beach Clubs'],
      gradient: 'from-blue-600 to-indigo-600'
    },
  ];

  const regions = ['All', 'Mediterranean', 'Caribbean', 'Tropical', 'Middle East'];

  const filteredDestinations = selectedRegion === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.region === selectedRegion);

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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm uppercase tracking-[0.3em] text-white">Explore the World</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl lg:text-8xl text-white mb-8 tracking-tight"
          >
            Discover Paradise
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Destinations
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Sail to the world's most breathtaking locations with our expert guidance
          </motion.p>
        </div>
      </section>

      {/* Region Filters */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {regions.map((region, index) => (
              <motion.button
                key={region}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedRegion(region)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full text-sm uppercase tracking-wider transition-all ${
                  selectedRegion === region
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-xl shadow-purple-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {region}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="relative py-20 overflow-hidden" id="destinations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
              >
                <div className="relative rounded-3xl overflow-hidden h-[600px]">
                  {/* Image */}
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${destination.gradient} opacity-60 mix-blend-multiply`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Region Badge */}
                    <div className="absolute top-8 left-8">
                      <div className="bg-black/60 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                        <span className="text-white text-sm uppercase tracking-wider">{destination.region}</span>
                      </div>
                    </div>

                    {/* Best Season Badge */}
                    <div className="absolute top-8 right-8">
                      <div className="bg-black/60 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 flex items-center gap-2">
                        <Sun className="w-4 h-4 text-yellow-400" />
                        <span className="text-white text-sm">{destination.bestSeason}</span>
                      </div>
                    </div>

                    {/* Main Info */}
                    <div className="transform group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-cyan-400" />
                        <span className="text-white/80 text-sm uppercase tracking-wider">{destination.country}</span>
                      </div>

                      <h2 className="text-4xl lg:text-5xl text-white mb-4 tracking-tight">
                        {destination.name}
                      </h2>

                      <p className="text-white/90 text-lg leading-relaxed mb-6">
                        {destination.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Top Highlights</h3>
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                              <span className="text-white text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      <div className="mb-6">
                        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Activities</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {destination.activities.map((activity, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Waves className="w-4 h-4 text-cyan-400" />
                              <span className="text-white/80 text-sm">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${destination.gradient} text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:shadow-2xl transition-all text-lg uppercase tracking-wider`}
                      >
                        Explore Destination
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-8 tracking-tight">
              Ready to Set <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Sail?</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Let our experts help you plan the perfect yacht charter in your dream destination
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                Plan Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                View Yachts
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
