'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Anchor, MapPin, Star, Check, Ship, Sparkles, ArrowRight, Shield, Clock } from 'lucide-react';
import { Yacht } from '@/types';
import { BookingData, setPendingBooking } from '@/lib/bookingStore';
import { useRouter } from 'next/navigation';

interface BookingModalProps {
  yacht: Yacht | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ yacht, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setStartDate('');
      setEndDate('');
      setGuests(2);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!yacht) return null;

  // Calculate days and price
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const subtotal = days * yacht.price;
  const serviceFee = subtotal * 0.1;
  const totalPrice = subtotal + serviceFee;

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get minimum end date (day after start)
  const getMinEndDate = () => {
    if (!startDate) return getMinDate();
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleContinue = () => {
    if (step === 1 && startDate && endDate && days > 0) {
      setStep(2);
    } else if (step === 2) {
      // Save booking data and navigate to checkout
      const bookingData: BookingData = {
        yacht,
        startDate,
        endDate,
        guests,
        totalPrice,
        days,
      };
      setPendingBooking(bookingData);
      onClose();
      router.push('/checkout');
    }
  };

  const canContinue = step === 1 ? (startDate && endDate && days > 0) : true;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-white/10 rounded-3xl shadow-2xl shadow-purple-500/20"
          >
            {/* Header with Image */}
            <div className="relative h-56 md:h-72 overflow-hidden rounded-t-3xl">
              <img
                src={yacht.image}
                alt={yacht.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Yacht Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xs text-white font-medium">
                    {yacht.category}
                  </span>
                  <div className="flex items-center gap-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm">4.9</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{yacht.name}</h2>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{yacht.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ship className="w-4 h-4" />
                    <span>{yacht.length} ft</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <motion.div 
                  className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-400' : 'text-white/40'}`}
                  animate={step === 1 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1, repeat: step === 1 ? Infinity : 0 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step >= 1 ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30' : 'bg-white/10'}`}>
                    {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                  </div>
                  <span className="hidden sm:inline font-medium">Select Dates</span>
                </motion.div>
                <motion.div 
                  className={`w-16 h-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-white/10'}`}
                  animate={step >= 2 ? { scaleX: [0, 1] } : {}}
                />
                <motion.div 
                  className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-400' : 'text-white/40'}`}
                  animate={step === 2 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1, repeat: step === 2 ? Infinity : 0 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step >= 2 ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30' : 'bg-white/10'}`}>
                    2
                  </div>
                  <span className="hidden sm:inline font-medium">Review & Confirm</span>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-6"
                  >
                    {/* Date Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        animate={focusedField === 'startDate' ? { scale: 1.02 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Check-in Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                              setStartDate(e.target.value);
                              if (endDate && new Date(e.target.value) >= new Date(endDate)) {
                                setEndDate('');
                              }
                            }}
                            onFocus={() => setFocusedField('startDate')}
                            onBlur={() => setFocusedField(null)}
                            min={getMinDate()}
                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none transition-all ${
                              focusedField === 'startDate' 
                                ? 'border-purple-500 ring-2 ring-purple-500/30' 
                                : 'border-white/10 hover:border-white/20'
                            }`}
                          />
                        </div>
                      </motion.div>
                      <motion.div
                        animate={focusedField === 'endDate' ? { scale: 1.02 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Check-out Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            onFocus={() => setFocusedField('endDate')}
                            onBlur={() => setFocusedField(null)}
                            min={getMinEndDate()}
                            disabled={!startDate}
                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                              focusedField === 'endDate' 
                                ? 'border-blue-500 ring-2 ring-blue-500/30' 
                                : 'border-white/10 hover:border-white/20'
                            }`}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Days Selected Indicator */}
                    {days > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl"
                      >
                        <Clock className="w-5 h-5 text-purple-400" />
                        <span className="text-white">
                          <strong>{days}</strong> {days === 1 ? 'day' : 'days'} selected
                        </span>
                        <span className="text-white/60">•</span>
                        <span className="text-purple-400 font-semibold">${(days * yacht.price).toLocaleString()}</span>
                      </motion.div>
                    )}

                    {/* Guests */}
                    <motion.div
                      animate={focusedField === 'guests' ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-sm text-white/60 mb-2 uppercase tracking-wider">Number of Guests</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          onFocus={() => setFocusedField('guests')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white focus:outline-none appearance-none transition-all cursor-pointer ${
                            focusedField === 'guests' 
                              ? 'border-cyan-500 ring-2 ring-cyan-500/30' 
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          {Array.from({ length: yacht.guests }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num} className="bg-gray-900">
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-white/40 text-sm mt-2 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Maximum capacity: {yacht.guests} guests
                      </p>
                    </motion.div>

                    {/* Yacht Quick Stats */}
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { icon: Ship, label: 'Length', value: `${yacht.length} ft`, color: 'text-purple-400' },
                        { icon: Users, label: 'Cabins', value: yacht.cabins, color: 'text-blue-400' },
                        { icon: Star, label: 'Crew', value: yacht.crew, color: 'text-yellow-400' },
                        { icon: Anchor, label: 'Year', value: '2023', color: 'text-cyan-400' },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -3 }}
                          className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                        >
                          <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                          <div className="text-white font-semibold">{stat.value}</div>
                          <div className="text-white/40 text-xs">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="space-y-6"
                  >
                    {/* Booking Summary Card */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Booking Summary
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <div className="text-white/60 text-sm">Check-in</div>
                              <div className="text-white font-medium">{new Date(startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <div className="text-white/60 text-sm">Check-out</div>
                              <div className="text-white font-medium">{new Date(endDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                              <Clock className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                              <div className="text-white/60 text-sm">Duration</div>
                              <div className="text-white font-medium">{days} {days === 1 ? 'day' : 'days'}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center">
                              <Users className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <div className="text-white/60 text-sm">Guests</div>
                              <div className="text-white font-medium">{guests} {guests === 1 ? 'guest' : 'guests'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-purple-500/20">
                      <h3 className="text-lg font-semibold text-white mb-4">Price Breakdown</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-white/70">
                          <span>${yacht.price.toLocaleString()} × {days} days</span>
                          <span className="text-white">${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-white/70">
                          <span>Service fee (10%)</span>
                          <span className="text-white">${serviceFee.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                          <span className="text-lg font-semibold text-white">Total</span>
                          <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            ${totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h4 className="text-sm text-white/60 uppercase tracking-wider mb-3">Included Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {yacht.amenities.map((amenity, index) => (
                          <motion.span
                            key={amenity}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/70 border border-white/10"
                          >
                            {amenity}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-6 py-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Check className="w-5 h-5 text-blue-400" />
                        <span>Free Cancellation</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                {step === 2 && (
                  <motion.button
                    onClick={() => setStep(1)}
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-white/70 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    Back
                  </motion.button>
                )}
                <div className={step === 1 ? 'w-full' : 'flex-1 ml-4'}>
                  <motion.button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    whileHover={canContinue ? { scale: 1.02, y: -2 } : {}}
                    whileTap={canContinue ? { scale: 0.98 } : {}}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 relative overflow-hidden group"
                  >
                    {/* Shine effect */}
                    <motion.div
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    <span className="relative z-10">{step === 1 ? 'Continue to Review' : 'Proceed to Payment'}</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
