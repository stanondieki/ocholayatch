'use client'

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Award, Users, Anchor, TrendingUp, Heart, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function AboutPage() {
  const router = useRouter();
  
  const stats = [
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '500+', label: 'Luxury Yachts', icon: Anchor },
    { value: '10K+', label: 'Happy Clients', icon: Users },
    { value: '150+', label: 'Destinations', icon: TrendingUp },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'We are driven by our love for the sea and commitment to delivering unforgettable experiences.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety is our priority. All our yachts meet the highest international standards.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We handpick every yacht in our fleet to ensure world-class luxury and comfort.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Personalized Service',
      description: 'Every charter is tailored to your unique preferences and desires.',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  const team = [
    {
      name: 'Alexander Sterling',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop',
      bio: '20+ years in luxury yacht industry'
    },
    {
      name: 'Isabella Martinez',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop',
      bio: 'Expert in maritime logistics'
    },
    {
      name: 'Marcus Chen',
      role: 'Chief Experience Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop',
      bio: 'Curating unforgettable journeys'
    },
    {
      name: 'Sophia Anderson',
      role: 'Director of Client Relations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop',
      bio: 'Dedicated to exceptional service'
    },
  ];

  const timeline = [
    { year: '2008', title: 'The Beginning', description: 'Started with a vision to revolutionize yacht chartering' },
    { year: '2012', title: 'Global Expansion', description: 'Extended services to Mediterranean and Caribbean' },
    { year: '2016', title: 'Industry Recognition', description: 'Won Best Luxury Yacht Charter Company award' },
    { year: '2020', title: 'Digital Innovation', description: 'Launched cutting-edge booking platform' },
    { year: '2024', title: 'Leading the Future', description: 'Setting new standards in luxury yachting' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NDc2Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury yacht"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative h-full flex items-center justify-center pt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm uppercase tracking-[0.3em] text-white">Our Story</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl lg:text-8xl text-white mb-8 tracking-tight"
            >
              Redefining Luxury
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Yachting Experience
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              For over 15 years, we've been crafting extraordinary maritime adventures that transcend expectations
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-[1px] bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                  ></motion.div>
                  
                  <div className="relative">
                    <stat.icon className="w-12 h-12 text-purple-400 mb-6" />
                    <div className="text-5xl text-white mb-3">{stat.value}</div>
                    <div className="text-white/60 uppercase tracking-wider text-sm">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl text-white mb-8 tracking-tight">
                Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-white/70 mb-6 leading-relaxed">
                What started as a passion for the sea has evolved into one of the world's most trusted luxury yacht charter companies. We believe that every journey should be an unforgettable experience.
              </p>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Our commitment to excellence, attention to detail, and personalized service has earned us the trust of discerning clients worldwide. From intimate getaways to grand celebrations, we make dreams come true on the water.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Certified Excellence', 'Award Winning', 'Global Coverage', '24/7 Support'].map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-5 py-3 rounded-full"
                  >
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span className="text-white text-sm uppercase tracking-wider">{badge}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573717865061-202c78c4b414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Luxury yacht interior"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Our Core <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-white/30 transition-all duration-500">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl text-white mb-4">{value.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Milestone</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-purple-600 transform -translate-x-1/2"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <div className="text-4xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">{item.year}</div>
                    <h3 className="text-2xl text-white mb-3">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 border-4 border-black"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-32 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Meet Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The passionate experts behind your unforgettable experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl text-white mb-2">{member.name}</h3>
                    <p className="text-purple-400 mb-2 uppercase tracking-wider text-sm">{member.role}</p>
                    <p className="text-white/70 text-sm">{member.bio}</p>
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-8 tracking-tight">
              Ready to Experience <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Luxury?</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Join thousands of satisfied clients who have trusted us with their yacht charter dreams
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/yachts')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                Explore Our Fleet
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/contact')}
                className="bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:bg-white/20 transition-all"
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
