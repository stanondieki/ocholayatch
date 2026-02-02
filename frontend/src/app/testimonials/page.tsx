'use client'

import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, CheckCircle, Users, Award, Sparkles, Play, X, ThumbsUp, MapPin, Ship, Calendar, ArrowRight, Filter, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function TestimonialsPage() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [likedTestimonials, setLikedTestimonials] = useState<number[]>([]);
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<typeof videoTestimonials[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const toggleLike = (id: number) => {
    setLikedTestimonials(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const testimonials = [
    {
      id: 1,
      name: 'James Anderson',
      role: 'CEO, Tech Innovations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 5,
      text: "An absolutely incredible experience! The Ocean Majesty exceeded all our expectations. The crew was professional, the yacht was immaculate, and the destinations were breathtaking. We've chartered yachts all over the world, but OcholaYachts stands in a class of its own.",
      yacht: 'Ocean Majesty',
      destination: 'Monaco',
      date: 'December 2024'
    },
    {
      id: 2,
      name: 'Sophie Laurent',
      role: 'Fashion Designer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      rating: 5,
      text: "Pure luxury from start to finish! Every detail was perfect. The personalized service made us feel like royalty. The Azure Dream is a floating paradise, and the crew anticipated our every need. This was the vacation of a lifetime!",
      yacht: 'Azure Dream',
      destination: 'Maldives',
      date: 'November 2024'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Investment Banker',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 5,
      text: "I've used many yacht charter services, but OcholaYachts is simply the best. The booking process was seamless, the yacht was pristine, and the itinerary was perfectly curated. Worth every penny!",
      yacht: 'Serenity Elite',
      destination: 'Caribbean',
      date: 'October 2024'
    },
    {
      id: 4,
      name: 'Isabella Martinez',
      role: 'Real Estate Developer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      rating: 5,
      text: "Extraordinary service and an unforgettable journey! Our family celebration aboard the Royal Sapphire was magical. OcholaYachts turned our dream into reality. The attention to detail was impeccable!",
      yacht: 'Royal Sapphire',
      destination: 'French Riviera',
      date: 'September 2024'
    },
    {
      id: 5,
      name: 'David Thompson',
      role: 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
      rating: 5,
      text: "The crew was phenomenal, the yacht was stunning, and the experience was truly once-in-a-lifetime. OcholaYachts has set the bar incredibly high. We're already planning our next charter!",
      yacht: 'Horizon Explorer',
      destination: 'Greek Islands',
      date: 'August 2024'
    },
    {
      id: 6,
      name: 'Emma Richardson',
      role: 'Lifestyle Influencer',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      rating: 5,
      text: "Absolutely stunning! Every moment was Instagram-worthy, but more importantly, it was genuinely unforgettable. The service, the yacht, the destinations - all perfect. Highly recommend!",
      yacht: 'Paradise Voyager',
      destination: 'Dubai',
      date: 'July 2024'
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Clients', icon: Users },
    { value: '4.9/5', label: 'Average Rating', icon: Star },
    { value: '98%', label: 'Satisfaction Rate', icon: CheckCircle },
    { value: '50+', label: 'Industry Awards', icon: Award },
  ];

  const trustBadges = [
    { title: 'Best Luxury Charter 2024', org: 'World Yacht Awards' },
    { title: 'Excellence in Service', org: 'Maritime Excellence' },
    { title: 'Top Rated Charter Company', org: 'TripAdvisor' },
    { title: 'Platinum Member', org: 'MYBA' },
  ];

  const videoTestimonials = [
    {
      name: 'Robert & Lisa Hamilton',
      thumbnail: 'https://images.unsplash.com/photo-1604771868982-003c36db0814?w=600&h=400&fit=crop',
      duration: '2:45',
      title: 'Mediterranean Adventure'
    },
    {
      name: 'The Morrison Family',
      thumbnail: 'https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?w=600&h=400&fit=crop',
      duration: '3:12',
      title: 'Caribbean Paradise'
    },
    {
      name: 'Sarah & Tom Williams',
      thumbnail: 'https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?w=600&h=400&fit=crop',
      duration: '2:28',
      title: 'Tropical Escape'
    },
  ];

  const destinations = ['All', 'Monaco', 'Maldives', 'Caribbean', 'French Riviera', 'Greek Islands', 'Dubai'];
  const ratings = [5, 4, 3];

  const filteredTestimonials = testimonials.filter(t => {
    const matchesRating = selectedRating === null || t.rating === selectedRating;
    const matchesDestination = selectedDestination === null || selectedDestination === 'All' || t.destination === selectedDestination;
    return matchesRating && matchesDestination;
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <motion.button
                onClick={() => setPlayingVideo(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
              <div className="relative rounded-3xl overflow-hidden bg-gray-900">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={playingVideo.thumbnail}
                    alt={playingVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center"
                    >
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4">
                        <Play className="w-10 h-10 text-white ml-2" />
                      </div>
                      <p className="text-white/70">Video preview - Full video coming soon</p>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-white/10 to-white/5">
                  <h3 className="text-2xl text-white mb-2">{playingVideo.title}</h3>
                  <p className="text-white/70">{playingVideo.name}</p>
                  <p className="text-purple-400 text-sm mt-2">Duration: {playingVideo.duration}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm uppercase tracking-[0.3em] text-white">Client Stories</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl lg:text-8xl text-white mb-8 tracking-tight"
          >
            What Our Clients
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Are Saying
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Real experiences from real people who've sailed with us
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 text-center overflow-hidden">
                  {/* Shine effect */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
                  />
                  <motion.div 
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-6"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-5xl text-white mb-3"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/60 uppercase tracking-wider text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Award-Winning <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Excellence</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-yellow-500/50 transition-all group cursor-pointer"
              >
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                  className="inline-block"
                >
                  <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-white text-lg mb-2 group-hover:text-yellow-400 transition-colors">{badge.title}</h3>
                <p className="text-white/60 text-sm">{badge.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Testimonials */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Client <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Experiences</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Hear directly from our satisfied clients about their unforgettable journeys
            </p>

            {/* Filters */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-full transition-all"
            >
              <Filter className="w-5 h-5 text-purple-400" />
              <span className="text-white">Filter Reviews</span>
              <motion.div animate={{ rotate: showFilters ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 text-white/60" />
              </motion.div>
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-12 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Rating Filter */}
                    <div>
                      <h4 className="text-white mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        Filter by Rating
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedRating(null)}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            selectedRating === null
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          All Ratings
                        </motion.button>
                        {ratings.map(rating => (
                          <motion.button
                            key={rating}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedRating(rating)}
                            className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 ${
                              selectedRating === rating
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            {rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Destination Filter */}
                    <div>
                      <h4 className="text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-cyan-400" />
                        Filter by Destination
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {destinations.map(dest => (
                          <motion.button
                            key={dest}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDestination(dest === 'All' ? null : dest)}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                              (dest === 'All' && selectedDestination === null) || selectedDestination === dest
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            {dest}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {(selectedRating !== null || selectedDestination !== null) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between"
                    >
                      <p className="text-white/60">
                        Showing {filteredTestimonials.length} of {testimonials.length} reviews
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setSelectedRating(null); setSelectedDestination(null); }}
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        Clear all filters
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                layout
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                  {/* Shine effect */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                  />

                  {/* Quote Icon */}
                  <motion.div 
                    className="absolute top-8 right-8 opacity-20"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <Quote className="w-16 h-16 text-purple-400" />
                  </motion.div>

                  {/* Like Button */}
                  <motion.button
                    onClick={() => toggleLike(testimonial.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center transition-all z-20 ${
                      likedTestimonials.includes(testimonial.id)
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${likedTestimonials.includes(testimonial.id) ? 'fill-current' : ''}`} />
                  </motion.button>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-white/80 text-lg leading-relaxed mb-8 relative z-10 cursor-pointer"
                    onClick={() => setExpandedTestimonial(expandedTestimonial === testimonial.id ? null : testimonial.id)}
                  >
                    &quot;{expandedTestimonial === testimonial.id ? testimonial.text : testimonial.text.slice(0, 150) + '...'}&quot;
                    {testimonial.text.length > 150 && (
                      <span className="text-purple-400 ml-2 text-sm">
                        {expandedTestimonial === testimonial.id ? 'Show less' : 'Read more'}
                      </span>
                    )}
                  </motion.p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 relative z-10">
                    <motion.div 
                      className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-500/50"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-white text-lg mb-1">{testimonial.name}</h4>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Charter Details */}
                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center relative z-10">
                    <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                        <Ship className="w-3 h-3" /> Yacht
                      </p>
                      <p className="text-white text-sm">{testimonial.yacht}</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      className="cursor-pointer"
                      onClick={() => setSelectedDestination(testimonial.destination)}
                    >
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" /> Location
                      </p>
                      <p className="text-white text-sm hover:text-cyan-400 transition-colors">{testimonial.destination}</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                        <Calendar className="w-3 h-3" /> Date
                      </p>
                      <p className="text-white text-sm">{testimonial.date}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-3xl text-white mb-4">No reviews found</h3>
              <p className="text-white/60 text-lg mb-6">
                Try adjusting your filters to see more reviews
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedRating(null); setSelectedDestination(null); }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Video <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Watch our clients share their incredible yacht charter experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setPlayingVideo(video)}
                className="group relative cursor-pointer"
              >
                <div className="relative rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      animate={{ boxShadow: ['0 0 0 0 rgba(168, 85, 247, 0.4)', '0 0 0 20px rgba(168, 85, 247, 0)', '0 0 0 0 rgba(168, 85, 247, 0.4)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:border-transparent transition-all"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="w-3 h-3" />
                    {video.duration}
                  </motion.div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl mb-2 group-hover:text-purple-400 transition-colors">{video.title}</h3>
                    <p className="text-white/80 text-sm">{video.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
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
              Ready to Create Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Own Story?</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Join thousands of satisfied clients and experience the OcholaYachts difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => router.push('/yachts')}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <span className="relative z-10">Browse Yachts</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => router.push('/contact')}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-3"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}