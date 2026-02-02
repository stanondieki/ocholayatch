'use client'

import { motion } from 'motion/react';
import { Star, Quote, CheckCircle, Users, Award, TrendingUp, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState } from 'react';

export default function TestimonialsPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

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
            className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Real experiences from real people who've sailed with us
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-6">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl text-white mb-3">{stat.value}</div>
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center"
              >
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-white text-lg mb-2">{badge.title}</h3>
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
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Hear directly from our satisfied clients about their unforgettable journeys
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500">
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 opacity-20">
                    <Quote className="w-16 h-16 text-purple-400" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-white/80 text-lg leading-relaxed mb-8 relative z-10">
                    "{testimonial.text}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-lg mb-1">{testimonial.name}</h4>
                      <p className="text-white/60 text-sm">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Charter Details */}
                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center relative z-10">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Yacht</p>
                      <p className="text-white text-sm">{testimonial.yacht}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                      <p className="text-white text-sm">{testimonial.destination}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Date</p>
                      <p className="text-white text-sm">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                className="group relative cursor-pointer"
              >
                <div className="relative rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:bg-purple-600 transition-all"
                    >
                      <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                    {video.duration}
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl mb-2">{video.title}</h3>
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
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}