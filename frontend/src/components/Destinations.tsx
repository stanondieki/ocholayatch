'use client'

import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef } from 'react';

const destinations = [
  {
    name: "Mediterranean",
    description: "Explore the stunning coastlines of Monaco, Italy, and Greece",
    image: "https://images.unsplash.com/photo-1735208073648-5f08ae9a8b29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMG1hcmluYSUyMGhhcmJvcnxlbnwxfHx8fDE3NjQ4NjY1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    yachts: 45,
    color: "from-purple-500/80 via-blue-500/60"
  },
  {
    name: "Caribbean",
    description: "Crystal-clear waters and pristine beaches await",
    image: "https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdhJTIweWFjaHQlMjBhZXJpYWx8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    yachts: 38,
    color: "from-cyan-500/80 via-teal-500/60"
  },
  {
    name: "French Riviera",
    description: "Experience the glamour of the Côte d'Azur",
    image: "https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NDc2Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    yachts: 52,
    color: "from-pink-500/80 via-purple-500/60"
  },
  {
    name: "Maldives",
    description: "Tropical paradise in the Indian Ocean",
    image: "https://images.unsplash.com/photo-1637585569991-b013294d8f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNhaWxpbmclMjBibHVlJTIwd2F0ZXJ8ZW58MXx8fHwxNzY0ODY2NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    yachts: 28,
    color: "from-blue-500/80 via-indigo-500/60"
  }
];

export function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={containerRef} id="destinations" className="relative py-32 overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px]"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -50, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-cyan-600 rounded-full blur-[150px]"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-purple-500/30 px-5 py-2.5 rounded-full mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <motion.span 
              className="text-sm uppercase tracking-[0.3em] text-white/90"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(34,211,238,1) 25%, rgba(168,85,247,1) 50%, rgba(34,211,238,1) 75%, rgba(255,255,255,0.9) 100%)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Discover Paradise
            </motion.span>
          </motion.div>
          <h2 className="text-5xl lg:text-7xl text-white mb-6 tracking-tight">
            <motion.span
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block mr-4"
            >
              Exclusive
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent inline-block relative"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.4 }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #22d3ee, #a855f7, #06b6d4, #a855f7, #22d3ee)',
                  backgroundSize: '200% auto',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Destinations
              </motion.span>
              {/* Animated double underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full origin-center"
              >
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
                ></motion.div>
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/50 to-purple-400/50 rounded-full origin-center"
              ></motion.div>
            </motion.span>
          </h2>
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {["Sail", "to", "the", "world's", "most", "breathtaking", "locations", "with", "our", "handpicked", "collection", "of", "luxury", "yachts"].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.03 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard key={destination.name} destination={destination} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col items-center gap-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <h3 className="text-3xl text-white">Can't Find Your Destination?</h3>
            <p className="text-white/70 max-w-md">
              We operate in over 150 destinations worldwide. Contact our team to plan your custom route.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-5 rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all text-lg"
            >
              Plan Custom Route
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface DestinationCardProps {
  destination: {
    name: string;
    description: string;
    image: string;
    yachts: number;
    color: string;
  };
  index: number;
}

function DestinationCard({ destination, index }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -12 }}
      className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="self-start"
        >
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-sm uppercase tracking-wider">{destination.yachts} Yachts</span>
          </div>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <h3 className="text-5xl text-white mb-4 tracking-tight">{destination.name}</h3>
          <p className="text-white/90 text-lg mb-6 leading-relaxed">{destination.description}</p>
          
          <motion.div
            className="inline-flex items-center gap-3 text-white group-hover:gap-5 transition-all"
            whileHover={{ x: 10 }}
          >
            <span className="text-lg uppercase tracking-wider">Explore Now</span>
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Number */}
      <div className="absolute top-8 right-8 text-8xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Shine Effect on Hover */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
      ></motion.div>
    </motion.div>
  );
}