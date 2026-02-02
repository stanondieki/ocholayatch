'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Anchor, MapPin, Star, Check } from 'lucide-react';
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

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setStartDate('');
      setEndDate('');
      setGuests(2);
    }
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl z-50"
          >
            {/* Header */}
            <div className="relative h-48 overflow-hidden rounded-t-3xl">
              <img
                src={yacht.image}
                alt={yacht.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="text-2xl font-bold text-white">{yacht.name}</h2>
                <div className="flex items-center gap-2 text-white/70 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{yacht.location}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-400' : 'text-white/40'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600' : 'bg-white/10'}`}>
                    {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <span className="hidden sm:inline">Select Dates</span>
                </div>
                <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-purple-600' : 'bg-white/10'}`} />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-400' : 'text-white/40'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600' : 'bg-white/10'}`}>
                    2
                  </div>
                  <span className="hidden sm:inline">Confirm</span>
                </div>
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Date Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Check-in Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            if (endDate && new Date(e.target.value) >= new Date(endDate)) {
                              setEndDate('');
                            }
                          }}
                          min={getMinDate()}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Check-out Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={getMinEndDate()}
                          disabled={!startDate}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none appearance-none"
                      >
                        {Array.from({ length: yacht.guests }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num} className="bg-gray-900">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-white/40 text-sm mt-1">Maximum capacity: {yacht.guests} guests</p>
                  </div>

                  {/* Yacht Info */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="text-center">
                      <Anchor className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">{yacht.length} ft</div>
                      <div className="text-white/40 text-xs">Length</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">{yacht.cabins}</div>
                      <div className="text-white/40 text-xs">Cabins</div>
                    </div>
                    <div className="text-center">
                      <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">{yacht.crew}</div>
                      <div className="text-white/40 text-xs">Crew</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Booking Summary */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Booking Summary</h3>
                    
                    <div className="space-y-3 p-4 bg-white/5 rounded-xl">
                      <div className="flex justify-between text-white/70">
                        <span>Check-in</span>
                        <span className="text-white">{new Date(startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Check-out</span>
                        <span className="text-white">{new Date(endDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Duration</span>
                        <span className="text-white">{days} {days === 1 ? 'day' : 'days'}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Guests</span>
                        <span className="text-white">{guests}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 p-4 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/20">
                    <div className="flex justify-between text-white/70">
                      <span>${yacht.price.toLocaleString()} × {days} days</span>
                      <span className="text-white">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Service fee (10%)</span>
                      <span className="text-white">${serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between">
                      <span className="text-lg font-semibold text-white">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {yacht.amenities.slice(0, 5).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 text-white/70 hover:text-white transition-colors"
                  >
                    Back
                  </button>
                )}
                <div className={step === 1 ? 'w-full' : 'flex-1 ml-4'}>
                  <button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step === 1 ? 'Continue to Review' : 'Proceed to Payment'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
