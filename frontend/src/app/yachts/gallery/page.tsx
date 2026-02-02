'use client'

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Users, Bed, Ruler, Anchor, ChevronRight, Star } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export default function YachtGalleryPage() {
  const router = useRouter();

  const yachts = [
    {
      id: 1,
      name: 'Ocean Majesty',
      location: 'Monaco',
      price: 15000,
      guests: 12,
      cabins: 6,
      length: 150,
      crew: 8,
      category: 'Superyacht',
      description: 'Experience unparalleled luxury aboard the Ocean Majesty. This magnificent superyacht combines cutting-edge technology with timeless elegance.',
      rating: 5.0,
      reviews: 47,
      images: [
        'https://images.unsplash.com/photo-1686868245180-d5c984a984f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcnlhY2h0JTIwbW9uYWNvfGVufDF8fHx8MTc2NTI2NDc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1652013019474-a4be53c6e8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRlY2slMjBwb29sfGVufDF8fHx8MTc2NTI2NDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1598448056086-307e98ef5c4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc2NTE4MDI2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1515058214004-89ec7e9a4200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzY1MjY0NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
    {
      id: 2,
      name: 'Azure Dream',
      location: 'Maldives',
      price: 12000,
      guests: 10,
      cabins: 5,
      length: 130,
      crew: 7,
      category: 'Luxury Yacht',
      description: 'The Azure Dream offers an intimate luxury experience perfect for exploring tropical paradises in style and comfort.',
      rating: 4.9,
      reviews: 38,
      images: [
        'https://images.unsplash.com/photo-1740482881430-53d0e1c04fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHlhY2h0JTIwYmx1ZSUyMHdhdGVyfGVufDF8fHx8MTc2NTI2NDc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1630520615328-b825b27f1966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGFuY2hvcmVkJTIwdHVycXVvaXNlfGVufDF8fHx8MTc2NTI2NDc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1604915668596-b3052a8406f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGx1eHVyeSUyMGNhYmlufGVufDF8fHx8MTc2NTI2NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1724117271157-1c67ce5596b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNlYSUyMGhvcml6b258ZW58MXx8fHwxNzY1MjY0NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
    {
      id: 3,
      name: 'Royal Sapphire',
      location: 'French Riviera',
      price: 18000,
      guests: 14,
      cabins: 7,
      length: 165,
      crew: 10,
      category: 'Megayacht',
      description: 'The epitome of maritime luxury. Royal Sapphire features world-class amenities including a helipad, spa, and cinema.',
      rating: 5.0,
      reviews: 52,
      images: [
        'https://images.unsplash.com/photo-1678122878191-79b60410779f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdheWFjaHQlMjBtYXJpbmF8ZW58MXx8fHwxNzY1MjY0NzY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1759793431168-ab4f211308c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMG5pZ2h0JTIwbGlnaHRzfGVufDF8fHx8MTc2NTI2NDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1562522454-a15ac076bbfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGRlc2lnbnxlbnwxfHx8fDE3NjUyNjQ3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NTI1NDU5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
    {
      id: 4,
      name: 'Serenity Elite',
      location: 'Caribbean',
      price: 13500,
      guests: 11,
      cabins: 5,
      length: 140,
      crew: 8,
      category: 'Luxury Yacht',
      description: 'Discover tranquility and sophistication on the Serenity Elite. Perfect for Caribbean adventures with family and friends.',
      rating: 4.8,
      reviews: 41,
      images: [
        'https://images.unsplash.com/photo-1642266351423-efa1b7ffe527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHN1bnNldCUyMHNlYXxlbnwxfHx8fDE3NjUxNzY0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1599922868695-afceda9c51be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNhaWxpbmclMjBzdW5zZXR8ZW58MXx8fHwxNzY1MjY0NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1604915666686-93382bae0c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGJvdyUyMHdhdmVzfGVufDF8fHx8MTc2NTI2NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1686868245180-d5c984a984f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcnlhY2h0JTIwbW9uYWNvfGVufDF8fHx8MTc2NTI2NDc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
    {
      id: 5,
      name: 'Horizon Explorer',
      location: 'Greek Islands',
      price: 11000,
      guests: 8,
      cabins: 4,
      length: 120,
      crew: 6,
      category: 'Explorer Yacht',
      description: 'Built for adventure seekers. Horizon Explorer combines luxury with capability to reach the most remote destinations.',
      rating: 4.9,
      reviews: 35,
      images: [
        'https://images.unsplash.com/photo-1648483593512-b166c9f79b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWlsaW5nJTIweWFjaHQlMjBtZWRpdGVycmFuZWFufGVufDF8fHx8MTc2NTI2NDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1740482881430-53d0e1c04fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHlhY2h0JTIwYmx1ZSUyMHdhdGVyfGVufDF8fHx8MTc2NTI2NDc3MHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1515058214004-89ec7e9a4200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzY1MjY0NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1562522454-a15ac076bbfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB5YWNodCUyMGRlc2lnbnxlbnwxfHx8fDE3NjUyNjQ3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
    {
      id: 6,
      name: 'Stellar Wave',
      location: 'Dubai',
      price: 16000,
      guests: 12,
      cabins: 6,
      length: 155,
      crew: 9,
      category: 'Superyacht',
      description: 'Modern elegance meets Arabian luxury. Stellar Wave features contemporary design and state-of-the-art facilities.',
      rating: 5.0,
      reviews: 44,
      images: [
        'https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFufGVufDF8fHx8MTc2NTI1NDU5MHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1678122878191-79b60410779f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWdheWFjaHQlMjBtYXJpbmF8ZW58MXx8fHwxNzY1MjY0NzY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1652013019474-a4be53c6e8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGRlY2slMjBwb29sfGVufDF8fHx8MTc2NTI2NDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1759793431168-ab4f211308c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMG5pZ2h0JTIwbGlnaHRzfGVufDF8fHx8MTc2NTI2NDc2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
    {
      id: 7,
      name: 'Crystal Voyager',
      location: 'Mediterranean',
      price: 14000,
      guests: 10,
      cabins: 5,
      length: 135,
      crew: 7,
      category: 'Luxury Yacht',
      description: 'Sail the Mediterranean in style aboard Crystal Voyager. Designed for those who appreciate refined luxury and comfort.',
      rating: 4.9,
      reviews: 39,
      images: [
        'https://images.unsplash.com/photo-1630520615328-b825b27f1966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGFuY2hvcmVkJTIwdHVycXVvaXNlfGVufDF8fHx8MTc2NTI2NDc3MXww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1642266351423-efa1b7ffe527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHN1bnNldCUyMHNlYXxlbnwxfHx8fDE3NjUxNzY0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1598448056086-307e98ef5c4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGludGVyaW9yJTIwbHV4dXJ5fGVufDF8fHx8MTc2NTE4MDI2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1724117271157-1c67ce5596b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNlYSUyMGhvcml6b258ZW58MXx8fHwxNzY1MjY0NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
    {
      id: 8,
      name: 'Diamond Legacy',
      location: 'Miami',
      price: 17000,
      guests: 14,
      cabins: 7,
      length: 160,
      crew: 10,
      category: 'Megayacht',
      description: 'The ultimate party yacht with nightclub, beach club, and infinity pool. Diamond Legacy redefines luxury entertainment at sea.',
      rating: 5.0,
      reviews: 56,
      images: [
        'https://images.unsplash.com/photo-1686868245180-d5c984a984f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcnlhY2h0JTIwbW9uYWNvfGVufDF8fHx8MTc2NTI2NDc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1599922868695-afceda9c51be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMHNhaWxpbmclMjBzdW5zZXR8ZW58MXx8fHwxNzY1MjY0NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1604915668596-b3052a8406f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGx1eHVyeSUyMGNhYmlufGVufDF8fHx8MTc2NTI2NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1604915666686-93382bae0c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWNodCUyMGJvdyUyMHdhdmVzfGVufDF8fHx8MTc2NTI2NDc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black"></div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl lg:text-8xl text-white mb-6 sm:mb-8 tracking-tight"
          >
            Select Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Dream Yacht
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg sm:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Choose from our exclusive collection of world-class luxury yachts
          </motion.p>
        </div>
      </section>

      {/* Yacht Gallery */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yachts.map((yacht, index) => (
              <motion.div
                key={yacht.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => router.push(`/yacht/${yacht.id}`)}
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500">
                  {/* Main Image */}
                  <div className="relative h-80 overflow-hidden">
                    <ImageWithFallback
                      src={yacht.images[0]}
                      alt={yacht.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full text-white text-sm uppercase tracking-wider">
                      {yacht.category}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{yacht.rating}</span>
                      <span className="text-white/60 text-sm">({yacht.reviews})</span>
                    </div>

                    {/* Mini Gallery Preview */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      {yacht.images.slice(1, 4).map((img, i) => (
                        <div key={i} className="flex-1 h-16 rounded-lg overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity">
                          <ImageWithFallback
                            src={img}
                            alt={`${yacht.name} ${i + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-3xl text-white mb-2">{yacht.name}</h3>
                    <p className="text-purple-400 mb-4 flex items-center gap-2">
                      <Anchor className="w-4 h-4" />
                      {yacht.location}
                    </p>

                    <p className="text-white/70 mb-6 line-clamp-2">{yacht.description}</p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-white/60">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span>{yacht.guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Bed className="w-5 h-5 text-blue-400" />
                        <span>{yacht.cabins} Cabins</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Ruler className="w-5 h-5 text-cyan-400" />
                        <span>{yacht.length}ft</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Users className="w-5 h-5 text-pink-400" />
                        <span>{yacht.crew} Crew</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white/60 text-sm">From</div>
                        <div className="text-3xl text-white">
                          ${yacht.price.toLocaleString()}
                          <span className="text-lg text-white/60">/day</span>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300"
                      >
                        <span className="uppercase tracking-wider text-sm">View Details</span>
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white mb-6 sm:mb-8 tracking-tight">
              Need Help Choosing?
            </h2>
            <p className="text-lg sm:text-xl text-white/70 mb-8 sm:mb-12 leading-relaxed">
              Our yacht specialists are available 24/7 to help you find the perfect vessel for your journey
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-base sm:text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
            >
              Contact Our Experts
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}