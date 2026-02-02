'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Anchor, MapPin, CreditCard, Bitcoin, CheckCircle, Clock, XCircle, Eye, Trash2, X, Ship, Sparkles, Download, Share2, MoreVertical, ArrowRight, RefreshCw } from 'lucide-react';
import { SavedBooking, getBookings, updateBookingStatus, deleteBooking } from '@/lib/bookingStore';

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<SavedBooking[]>([]);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<SavedBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadedBookings = getBookings();
    setBookings(loadedBookings);
    setIsLoading(false);
  }, []);

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setBookings(getBookings());
    setRefreshing(false);
  };

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateBookingStatus(bookingId, 'cancelled');
    setBookings(getBookings());
    setSelectedBooking(null);
    setCancellingId(null);
  };

  const handleDeleteBooking = async (bookingId: string) => {
    setDeletingId(bookingId);
    await new Promise(resolve => setTimeout(resolve, 500));
    deleteBooking(bookingId);
    setBookings(getBookings());
    setDeletingId(null);
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

  // Stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    totalSpent: bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.totalPrice, 0),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-3 border-purple-500/30 border-t-purple-500 rounded-full"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/60"
          >
            Loading your bookings...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full mb-6"
          >
            <Ship className="w-4 h-4 text-purple-400" />
            <span className="text-sm uppercase tracking-wider text-white">Your Voyages</span>
          </motion.div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Bookings</span>
          </h1>
          <p className="text-white/60 text-lg">
            Manage your yacht reservations and track upcoming adventures
          </p>
        </motion.div>

        {/* Stats Cards */}
        {bookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
              <div className="text-white/60 text-sm">Total Bookings</div>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-green-600/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{stats.confirmed}</div>
              <div className="text-green-400/70 text-sm">Confirmed</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-600/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">{stats.pending}</div>
              <div className="text-yellow-400/70 text-sm">Pending</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                ${stats.totalSpent.toLocaleString()}
              </div>
              <div className="text-white/60 text-sm">Total Spent</div>
            </div>
          </motion.div>
        )}

        {/* Filter Tabs & Refresh */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <div className="flex gap-2 bg-white/5 backdrop-blur-xl rounded-full p-1">
            {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilter(status)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all relative ${
                  filter === status
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {filter === status && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      filter === status ? 'bg-white/20' : 'bg-white/10'
                    }`}>
                      {bookings.filter(b => b.status === status).length}
                    </span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={refreshing}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <RefreshCw className={`w-5 h-5 text-white ${refreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </motion.div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🛥️
            </motion.div>
            <h3 className="text-3xl text-white mb-4 font-semibold">
              {filter === 'all' ? 'No bookings yet' : `No ${filter} bookings`}
            </h3>
            <p className="text-white/60 mb-8 text-lg max-w-md mx-auto">
              {filter === 'all' 
                ? 'Start your luxury yacht adventure today and create unforgettable memories'
                : `You don't have any ${filter} bookings at the moment`
              }
            </p>
            <motion.button
              onClick={() => router.push('/book')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Browse Yachts
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  whileHover={{ y: -4 }}
                  className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all hover:shadow-xl hover:shadow-purple-500/10 ${
                    deletingId === booking.id ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-72 h-52 md:h-auto flex-shrink-0 group">
                      <img
                        src={booking.yacht.image}
                        alt={booking.yacht.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 md:bg-gradient-to-r" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xs text-white font-medium">
                          {booking.yacht.category}
                        </span>
                      </div>
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
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusBadge(booking.status)}`}
                        >
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </motion.div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                            <Calendar className="w-3 h-3" />
                            Check-in
                          </div>
                          <div className="text-white font-medium text-sm">{new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                            <Calendar className="w-3 h-3" />
                            Check-out
                          </div>
                          <div className="text-white font-medium text-sm">{new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                            <Users className="w-3 h-3" />
                            Guests
                          </div>
                          <div className="text-white font-medium text-sm">{booking.guests} People</div>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                            {booking.paymentMethod === 'card' ? <CreditCard className="w-3 h-3" /> : <Bitcoin className="w-3 h-3" />}
                            Payment
                          </div>
                          <div className="text-white font-medium text-sm">{booking.paymentMethod === 'card' ? 'Card' : 'Crypto'}</div>
                        </motion.div>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <div>
                          <div className="text-xs text-white/40 mb-1">{booking.days} days voyage</div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            ${booking.totalPrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => setSelectedBooking(booking)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-purple-500/30 text-white rounded-xl text-sm transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Details
                          </motion.button>
                          {booking.status !== 'cancelled' && (
                            <motion.button
                              onClick={() => handleCancelBooking(booking.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={cancellingId === booking.id}
                              className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                              {cancellingId === booking.id ? (
                                <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                              Cancel
                            </motion.button>
                          )}
                          {booking.status === 'cancelled' && (
                            <motion.button
                              onClick={() => handleDeleteBooking(booking.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={deletingId === booking.id}
                              className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                              {deletingId === booking.id ? (
                                <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                              Delete
                            </motion.button>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20"
            >
              {/* Header Image */}
              <div className="relative h-56 group">
                <img
                  src={selectedBooking.yacht.image}
                  alt={selectedBooking.yacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                
                <motion.button
                  onClick={() => setSelectedBooking(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-xl rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                {/* Action Buttons */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-xl rounded-full transition-colors"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-xl rounded-full transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xs text-white font-medium mb-2 inline-block">
                    {selectedBooking.yacht.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{selectedBooking.yacht.name}</h2>
                  <p className="text-white/70 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedBooking.yacht.location}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6 ${getStatusBadge(selectedBooking.status)}`}
                >
                  {getStatusIcon(selectedBooking.status)}
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </motion.div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-600/10 border border-purple-500/20 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 text-purple-400/70 text-xs mb-1">
                      <Calendar className="w-4 h-4" />
                      Check-in
                    </div>
                    <div className="text-white font-semibold">{new Date(selectedBooking.startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-600/10 border border-blue-500/20 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 text-blue-400/70 text-xs mb-1">
                      <Calendar className="w-4 h-4" />
                      Check-out
                    </div>
                    <div className="text-white font-semibold">{new Date(selectedBooking.endDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-gradient-to-br from-cyan-600/20 to-cyan-600/10 border border-cyan-500/20 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 text-cyan-400/70 text-xs mb-1">
                      <Clock className="w-4 h-4" />
                      Duration
                    </div>
                    <div className="text-white font-semibold">{selectedBooking.days} days</div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-4 bg-gradient-to-br from-pink-600/20 to-pink-600/10 border border-pink-500/20 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 text-pink-400/70 text-xs mb-1">
                      <Users className="w-4 h-4" />
                      Guests
                    </div>
                    <div className="text-white font-semibold">{selectedBooking.guests} people</div>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20 mb-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-white/50 text-sm">Total Paid</span>
                      <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
                        {selectedBooking.paymentMethod === 'card' ? <CreditCard className="w-3 h-3" /> : <Bitcoin className="w-3 h-3" />}
                        via {selectedBooking.paymentMethod === 'card' ? 'Credit Card' : 'Cryptocurrency'}
                      </div>
                    </div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      ${selectedBooking.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </motion.div>

                <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-4">
                  <div>
                    <div className="mb-1">Booked on {new Date(selectedBooking.bookingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <div className="font-mono">ID: {selectedBooking.id}</div>
                  </div>
                  {selectedBooking.status !== 'cancelled' && (
                    <motion.button
                      onClick={() => handleCancelBooking(selectedBooking.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={cancellingId === selectedBooking.id}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {cancellingId === selectedBooking.id ? (
                        <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      Cancel Booking
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
