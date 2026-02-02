'use client'

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function SearchSection() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section className="relative z-20 py-32 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]"
      ></motion.div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-5 py-2.5 rounded-full mb-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>
            <motion.span 
              className="text-sm uppercase tracking-[0.3em] text-white/90"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(168,85,247,1) 25%, rgba(59,130,246,1) 50%, rgba(168,85,247,1) 75%, rgba(255,255,255,0.9) 100%)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Find Your Perfect Yacht
            </motion.span>
          </motion.div>
          <h2 className="text-5xl lg:text-6xl text-white mb-4 tracking-tight">
            {["Start", "Your"].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.3 }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4, #3b82f6, #a855f7)',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Journey
              </motion.span>
            </motion.span>
          </h2>
          <motion.p 
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {["Discover", "extraordinary", "yachts", "in", "the", "world's", "most", "exclusive", "destinations"].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-2xl rounded-3xl shadow-2xl shadow-purple-900/20 p-8 sm:p-10 border border-white/10 overflow-hidden group">
            {/* Animated Border Glow */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-700"></div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Destination */}
              <motion.div 
                className="relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs text-white/80 mb-3 uppercase tracking-[0.2em]">Destination</label>
                <div className="relative group/input">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    focusedField === 'destination' ? 'text-purple-400 scale-110' : 'text-white/60'
                  }`} />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setFocusedField('destination')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all text-white placeholder:text-white/40"
                  />
                </div>
              </motion.div>

              {/* Check In */}
              <motion.div 
                className="relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs text-white/80 mb-3 uppercase tracking-[0.2em]">Check In</label>
                <div className="relative group/input">
                  <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-all duration-300 ${
                    focusedField === 'checkIn' ? 'text-purple-400 scale-110' : 'text-white/60'
                  }`} />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    onFocus={() => setFocusedField('checkIn')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all text-white [color-scheme:dark]"
                  />
                </div>
              </motion.div>

              {/* Check Out */}
              <motion.div 
                className="relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs text-white/80 mb-3 uppercase tracking-[0.2em]">Check Out</label>
                <div className="relative group/input">
                  <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-all duration-300 ${
                    focusedField === 'checkOut' ? 'text-purple-400 scale-110' : 'text-white/60'
                  }`} />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    onFocus={() => setFocusedField('checkOut')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all text-white [color-scheme:dark]"
                  />
                </div>
              </motion.div>

              {/* Guests */}
              <motion.div 
                className="relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs text-white/80 mb-3 uppercase tracking-[0.2em]">Guests</label>
                <div className="relative group/input">
                  <Users className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    focusedField === 'guests' ? 'text-purple-400 scale-110' : 'text-white/60'
                  }`} />
                  <input
                    type="number"
                    placeholder="How many?"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    onFocus={() => setFocusedField('guests')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all text-white placeholder:text-white/40"
                  />
                </div>
              </motion.div>
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white py-6 rounded-2xl flex items-center justify-center gap-3 overflow-hidden group/button shadow-lg shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              ></motion.div>
              <Search className="w-5 h-5 relative z-10 group-hover/button:rotate-90 transition-transform duration-300" />
              <span className="relative z-10 text-lg uppercase tracking-[0.2em]">Search Yachts</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}