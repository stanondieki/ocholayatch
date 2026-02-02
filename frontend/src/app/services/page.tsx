'use client'

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Anchor, Users, Briefcase, Heart, Ship, Star, CheckCircle, ArrowRight, Sparkles, Globe, Calendar, Shield } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function ServicesPage() {
  const router = useRouter();
  const services = [
    {
      icon: Anchor,
      title: 'Luxury Yacht Charter',
      description: 'Experience the ultimate in luxury with our premium yacht charter services. Choose from our handpicked fleet of world-class vessels.',
      features: [
        'Personalized itinerary planning',
        'Professional crew and captain',
        'Luxury amenities and equipment',
        'Gourmet dining experiences',
        '24/7 concierge service'
      ],
      image: 'https://images.unsplash.com/photo-1604771868982-003c36db0814?w=1200&h=800&fit=crop',
      color: 'from-purple-600 to-blue-600'
    },
    {
      icon: Users,
      title: 'Crewed Charters',
      description: 'Relax and enjoy while our experienced crew takes care of everything. Perfect for those seeking a fully catered luxury experience.',
      features: [
        'Experienced captain and crew',
        'Personalized service',
        'Professional chef onboard',
        'Water sports instruction',
        'Complete hospitality'
      ],
      image: 'https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?w=1200&h=800&fit=crop',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Ship,
      title: 'Bareboat Charters',
      description: 'For experienced sailors seeking freedom and adventure. Charter a yacht and captain it yourself through paradise.',
      features: [
        'Full yacht control',
        'Flexible itineraries',
        'Competitive pricing',
        'Comprehensive briefing',
        'Safety equipment included'
      ],
      image: 'https://images.unsplash.com/photo-1637585569991-b013294d8f26?w=1200&h=800&fit=crop',
      color: 'from-cyan-600 to-teal-600'
    },
    {
      icon: Briefcase,
      title: 'Corporate Events',
      description: 'Elevate your corporate events with exclusive yacht experiences. Perfect for team building, client entertainment, and conferences.',
      features: [
        'Meeting facilities onboard',
        'Team building activities',
        'Professional event planning',
        'Catering services',
        'Audio-visual equipment'
      ],
      image: 'https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?w=1200&h=800&fit=crop',
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Heart,
      title: 'Special Occasions',
      description: 'Make your special moments unforgettable. From weddings to anniversaries, we create magical experiences on the water.',
      features: [
        'Wedding ceremonies at sea',
        'Anniversary celebrations',
        'Birthday parties',
        'Proposal arrangements',
        'Custom decorations'
      ],
      image: 'https://images.unsplash.com/photo-1573717865061-202c78c4b414?w=1200&h=800&fit=crop',
      color: 'from-pink-600 to-purple-600'
    },
    {
      icon: Globe,
      title: 'Destination Planning',
      description: 'Expert guidance in choosing and exploring the world\'s most exclusive destinations. Let us curate your perfect voyage.',
      features: [
        'Destination recommendations',
        'Route planning',
        'Local expertise',
        'Shore excursions',
        'Cultural experiences'
      ],
      image: 'https://images.unsplash.com/photo-1735208073648-5f08ae9a8b29?w=1200&h=800&fit=crop',
      color: 'from-green-600 to-emerald-600'
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Share your vision and requirements with our expert team',
      icon: Users
    },
    {
      step: '02',
      title: 'Selection',
      description: 'Choose from our curated fleet of luxury yachts',
      icon: Ship
    },
    {
      step: '03',
      title: 'Customization',
      description: 'Tailor every detail to match your preferences',
      icon: Star
    },
    {
      step: '04',
      title: 'Embarkation',
      description: 'Begin your unforgettable journey at sea',
      icon: Anchor
    },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Trusted Excellence',
      description: '15+ years of delivering exceptional yacht charter experiences'
    },
    {
      icon: Star,
      title: 'Premium Fleet',
      description: 'Carefully selected luxury yachts with world-class amenities'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Professional crew and dedicated concierge service'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to 150+ exclusive destinations worldwide'
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
            <span className="text-sm uppercase tracking-[0.3em] text-white">Premium Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl lg:text-8xl text-white mb-8 tracking-tight"
          >
            Exceptional Yacht
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Charter Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive luxury yacht services tailored to your every need
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
                      {service.title}
                    </h2>
                    
                    <p className="text-xl text-white/70 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-6 h-6 text-purple-400 flex-shrink-0" />
                          <span className="text-white/80 text-lg">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/contact')}
                      className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${service.color} text-white rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg uppercase tracking-wider`}
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className={`relative rounded-3xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <div className="relative h-[500px]">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
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
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From consultation to embarkation, we ensure a seamless experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500">
                  {/* Step Number */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl shadow-xl">
                    {item.step}
                  </div>

                  <div className="inline-flex p-4 rounded-2xl bg-white/10 mb-6">
                    <item.icon className="w-8 h-8 text-purple-400" />
                  </div>

                  <h3 className="text-2xl text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </div>

                {/* Connector Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">OcholaYachts</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500">
                  <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-6">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
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
              Ready to Begin Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Adventure?</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Contact our team today to discuss your yacht charter needs
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/contact')}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/yachts')}
                className="bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                View Fleet
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}