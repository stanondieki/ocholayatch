'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Anchor, MapPin, CreditCard, Bitcoin, CheckCircle, Clock, XCircle, Eye, Trash2, X } from 'lucide-react';
import { SavedBooking, getBookings, updateBookingStatus, deleteBooking } from '@/lib/bookingStore';

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<SavedBooking[]>([]);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<SavedBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedBookings = getBookings();
    setBookings(loadedBookings);
    setIsLoading(false);
  }, []);

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  );

  const handleCancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
    setBookings(getBookings());
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (bookingId: string) => {
    deleteBooking(bookingId);
    setBookings(getBookings());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-500/20 text-gray-400';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Bookings</span>
          </h1>
          <p className="text-white/60">
            Manage your yacht reservations
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2 mb-8"
        >
          {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === status
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && (
                <span className="ml-2 text-xs opacity-60">
                  ({bookings.filter(b => b.status === status).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🛥️</div>
            <h3 className="text-2xl text-white mb-4">No bookings yet</h3>
            <p className="text-white/60 mb-8">
              Start your luxury yacht adventure today
            </p>
            <button
              onClick={() => router.push('/book')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Browse Yachts
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                      <img
                        src={booking.yacht.image}
                        alt={booking.yacht.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:bg-gradient-to-t" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {booking.yacht.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/60">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.yacht.location}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusBadge(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-white/50 text-xs mb-1">Check-in</div>
                          <div className="text-white text-sm">{new Date(booking.startDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs mb-1">Check-out</div>
                          <div className="text-white text-sm">{new Date(booking.endDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs mb-1">Guests</div>
                          <div className="text-white text-sm flex items-center gap-1">
                            <Users className="w-3 h-3" /> {booking.guests}
                          </div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs mb-1">Payment</div>
                          <div className="text-white text-sm flex items-center gap-1">
                            {booking.paymentMethod === 'card' ? <CreditCard className="w-3 h-3" /> : <Bitcoin className="w-3 h-3" />}
                            {booking.paymentMethod === 'card' ? 'Card' : 'Crypto'}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          ${booking.totalPrice.toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          {booking.status === 'cancelled' && (
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedBooking(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl z-50 overflow-hidden"
            >
              {/* Header Image */}
              <div className="relative h-48">
                <img
                  src={selectedBooking.yacht.image}
                  alt={selectedBooking.yacht.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">{selectedBooking.yacht.name}</h2>
                  <p className="text-white/70">{selectedBooking.yacht.location}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6 ${getStatusBadge(selectedBooking.status)}`}>
                  {getStatusIcon(selectedBooking.status)}
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white/50 text-xs mb-1">Check-in</div>
                    <div className="text-white">{new Date(selectedBooking.startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white/50 text-xs mb-1">Check-out</div>
                    <div className="text-white">{new Date(selectedBooking.endDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white/50 text-xs mb-1">Duration</div>
                    <div className="text-white">{selectedBooking.days} days</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white/50 text-xs mb-1">Guests</div>
                    <div className="text-white">{selectedBooking.guests} people</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-500/20 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Total Paid</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      ${selectedBooking.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-white/40">
                  Booked on {new Date(selectedBooking.bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  <br />
                  Booking ID: {selectedBooking.id}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
