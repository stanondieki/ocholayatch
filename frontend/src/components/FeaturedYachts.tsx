'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { YachtCard } from './YachtCard';
import { Yacht } from '@/types';
import { Filter, X } from 'lucide-react';

const yachts: Yacht[] = [
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
    description: "Experience unparalleled luxury aboard the Ocean Majesty. This magnificent superyacht combines classic elegance with modern amenities, perfect for exploring the Mediterranean in style.",
    amenities: ["Jacuzzi", "Helipad", "Gym", "Cinema", "Jet Ski", "Water Toys", "WiFi", "Chef"],
    images: [
      "https://images.unsplash.com/photo-1604771868982-003c36db0814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRlY2slMjBzdW5zZXR8ZW58MXx8fHwxNzY0ODY2NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1573717865061-202c78c4b414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NDc2Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
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
    description: "Sail through crystal-clear waters aboard Azure Dream. Perfect for intimate gatherings and tropical adventures in the Indian Ocean's most stunning locations.",
    amenities: ["Jacuzzi", "Diving Equipment", "Paddleboards", "Gym", "WiFi", "Chef", "Water Toys"],
    images: [
      "https://images.unsplash.com/photo-1637585569991-b013294d8f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNhaWxpbmclMjBibHVlJTIwd2F0ZXJ8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NDc2Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
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
    description: "The ultimate in maritime luxury, Serenity Elite offers an unforgettable Caribbean experience with world-class amenities and exceptional service.",
    amenities: ["Helipad", "Jacuzzi", "Cinema", "Gym", "Spa", "Beach Club", "Jet Ski", "WiFi", "Chef", "Water Toys"],
    images: [
      "https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdhJTIweWFjaHQlMjBhZXJpYWx8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1573717865061-202c78c4b414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
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
    description: "Discover the magic of the Aegean Sea aboard Horizon Explorer. Ideal for island hopping and experiencing authentic Greek hospitality.",
    amenities: ["Jacuzzi", "Paddleboards", "Snorkeling Gear", "WiFi", "Chef", "Water Toys"],
    images: [
      "https://images.unsplash.com/photo-1735208073648-5f08ae9a8b29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMG1hcmluYSUyMGhhcmJvcnxlbnwxfHx8fDE3NjQ4NjY1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1637585569991-b013294d8f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNhaWxpbmclMjBibHVlJTIwd2F0ZXJ8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
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
    description: "A crown jewel of yacht charters, Royal Sapphire embodies sophistication and grandeur, perfect for the most discerning travelers on the Côte d'Azur.",
    amenities: ["Helipad", "Jacuzzi", "Cinema", "Gym", "Spa", "Beach Club", "Jet Ski", "WiFi", "Chef", "Water Toys", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NDc2Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1573717865061-202c78c4b414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1604771868982-003c36db0814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRlY2slMjBzdW5zZXR8ZW58MXx8fHwxNzY0ODY2NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
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
    description: "Modern luxury meets Arabian hospitality on Paradise Voyager. Explore the stunning coastline of Dubai and the UAE in absolute comfort.",
    amenities: ["Jacuzzi", "Gym", "Cinema", "Jet Ski", "Diving Equipment", "WiFi", "Chef", "Water Toys"],
    images: [
      "https://images.unsplash.com/photo-1573717865061-202c78c4b414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdhJTIweWFjaHQlMjBhZXJpYWx8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ]
  }
];

interface FeaturedYachtsProps {
  onYachtClick?: (yacht: Yacht) => void;
}

export function FeaturedYachts({ onYachtClick }: FeaturedYachtsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Mediterranean', 'Caribbean', 'Tropical', 'Middle East'];

  const filteredYachts = selectedCategory === 'All'
    ? yachts
    : yachts.filter(yacht => yacht.category === selectedCategory);

  return (
    <section id="yachts" className="relative bg-gradient-to-b from-black via-gray-950 to-black py-32 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px]"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-5 py-2.5 rounded-full mb-8"
          >
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
              Our Premium Collection
            </motion.span>
          </motion.div>
          <h2 className="text-5xl lg:text-7xl text-white mb-6 tracking-tight">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mr-4"
            >
              Featured
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent inline-block relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.3 }}
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
                Yachts
              </motion.span>
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full origin-left"
              >
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                ></motion.div>
              </motion.div>
            </motion.span>
          </h2>
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {["Handpicked", "luxury", "yachts,", "each", "offering", "unique", "experiences", "and", "world-class", "amenities"].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.04 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <div className="flex items-center gap-2 text-white/60">
            <Filter className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Filter:</span>
          </div>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-8 py-3.5 rounded-full text-sm uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
              {selectedCategory === category && (
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Yachts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredYachts.map((yacht, index) => (
              <motion.div
                key={yacht.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <YachtCard yacht={yacht} onClick={() => onYachtClick?.(yacht)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full text-lg hover:bg-white/20 transition-all"
          >
            Explore Full Fleet
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}