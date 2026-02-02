'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, useParams } from 'next/navigation';
import { Users, Bed, Ruler, Anchor, Star, Wifi, Tv, Waves, Wine, Dumbbell, Sparkles, Calendar, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

import { Yacht } from '@/types';

interface ExtendedYacht extends Yacht {
  rating?: number;
  reviews?: number;
}

export default function YachtDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  // Demo yacht data - in production, this would be fetched from an API
  const yacht: ExtendedYacht | null = {
    id: Number(id) || 1,
    name: 'Azure Dream',
    location: 'Mediterranean Sea',
    image: '/yachts/yacht-1.jpg',
    price: 15000,
    guests: 12,
    cabins: 6,
    length: 85,
    crew: 8,
    category: 'Luxury',
    description: 'Experience the pinnacle of luxury on the Azure Dream, a masterpiece of maritime engineering that redefines opulence at sea.',
    amenities: ['Spa', 'Pool', 'Helipad', 'Cinema', 'WiFi', 'Water Sports'],
    images: ['/yachts/yacht-1.jpg', '/yachts/yacht-2.jpg', '/yachts/yacht-3.jpg'],
    rating: 4.9,
    reviews: 128,
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [guests, setGuests] = useState(2);

  if (!yacht) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Yacht Not Found</h1>
          <button
            onClick={() => router.push('/book')}
            className="text-purple-400 hover:text-purple-300"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const amenities = [
    { icon: Wifi, name: 'WiFi & Satellite' },
    { icon: Tv, name: 'Entertainment System' },
    { icon: Waves, name: 'Water Sports' },
    { icon: Wine, name: 'Premium Bar' },
    { icon: Dumbbell, name: 'Gym & Spa' },
    { icon: Sparkles, name: 'Luxury Amenities' },
  ];

  const calculateTotalPrice = () => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return days > 0 ? days * yacht.price : 0;
  };

  const handleBookNow = () => {
    if (!selectedStartDate || !selectedEndDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    const bookingDetails = {
      yacht,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      guests,
      totalPrice: calculateTotalPrice(),
      days: Math.ceil((new Date(selectedEndDate).getTime() - new Date(selectedStartDate).getTime()) / (1000 * 3600 * 24))
    };
    
    // Store booking in sessionStorage for checkout page
    sessionStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));
    router.push('/checkout');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % yacht.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + yacht.images.length) % yacht.images.length);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Image Gallery Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={yacht.images[currentImageIndex]}
              alt={`${yacht.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Image Thumbnails */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4">
          {yacht.images.map((img: string, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-purple-500 scale-110'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <ImageWithFallback
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Yacht Title Overlay */}
        <div className="absolute bottom-32 left-8 z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-full inline-block mb-4">
              <span className="text-white text-sm uppercase tracking-wider">{yacht.category}</span>
            </div>
            <h1 className="text-6xl lg:text-8xl text-white mb-4 tracking-tight">{yacht.name}</h1>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span className="text-xl">{yacht.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-xl">{yacht.rating} ({yacht.reviews} reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details and Booking Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl text-white mb-6">About This Yacht</h2>
                <p className="text-xl text-white/70 leading-relaxed">{yacht.description}</p>
              </motion.div>

              {/* Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl text-white mb-6">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-xl">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Guests</div>
                      <div className="text-2xl text-white">{yacht.guests} People</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-xl">
                      <Bed className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Cabins</div>
                      <div className="text-2xl text-white">{yacht.cabins} Rooms</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-4 rounded-xl">
                      <Ruler className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Length</div>
                      <div className="text-2xl text-white">{yacht.length} Feet</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                    <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-4 rounded-xl">
                      <Anchor className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Crew</div>
                      <div className="text-2xl text-white">{yacht.crew} Members</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl text-white mb-6">Amenities</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {amenities.map((amenity, index) => (
                    <motion.div
                      key={amenity.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all"
                    >
                      <div className="inline-flex p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mb-4">
                        <amenity.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-white">{amenity.name}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="sticky top-24"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="mb-8">
                    <div className="text-white/60 mb-2">Price per day</div>
                    <div className="text-5xl text-white">
                      ${yacht.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Date Selection */}
                    <div>
                      <label className="text-white/80 mb-2 block flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        value={selectedStartDate}
                        onChange={(e) => setSelectedStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 mb-2 block flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        value={selectedEndDate}
                        onChange={(e) => setSelectedEndDate(e.target.value)}
                        min={selectedStartDate || new Date().toISOString().split('T')[0]}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
                      />
                    </div>

                    {/* Guests Selection */}
                    <div>
                      <label className="text-white/80 mb-2 block flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(Math.min(yacht.guests, Math.max(1, parseInt(e.target.value) || 1)))}
                        min="1"
                        max={yacht.guests}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
                      />
                      <div className="text-white/60 text-sm mt-1">Maximum: {yacht.guests} guests</div>
                    </div>

                    {/* Price Breakdown */}
                    {selectedStartDate && selectedEndDate && calculateTotalPrice() > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-white/10 pt-6 space-y-3"
                      >
                        <div className="flex justify-between text-white/70">
                          <span>${yacht.price.toLocaleString()} x {Math.ceil((new Date(selectedEndDate).getTime() - new Date(selectedStartDate).getTime()) / (1000 * 3600 * 24))} days</span>
                          <span>${calculateTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-white/70">
                          <span>Service fee</span>
                          <span>${(calculateTotalPrice() * 0.1).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-2xl text-white pt-3 border-t border-white/10">
                          <span>Total</span>
                          <span>${(calculateTotalPrice() * 1.1).toLocaleString()}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Book Now Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBookNow}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Proceed to Checkout
                    </motion.button>

                    <div className="text-center text-white/60 text-sm">
                      You won{"'"}t be charged yet
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
