'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, Bitcoin, Check, Lock, Calendar, Users, Copy, CheckCircle, ArrowRight, Shield, Sparkles, Ship, Clock, AlertCircle } from 'lucide-react';
import { BookingData, getPendingBooking, clearPendingBooking, saveBooking, generateBookingId } from '@/lib/bookingStore';
import { bookingApi, paymentApi } from '@/lib/api';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Stripe Payment Form Component
function StripePaymentForm({ 
  booking, 
  onSuccess, 
  onError 
}: { 
  booking: BookingData; 
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/my-bookings`,
        },
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Create booking in backend
        try {
          await bookingApi.createBooking({
            yachtId: booking.yacht.id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            guests: booking.guests,
            totalPrice: booking.totalPrice,
            paymentMethod: 'card',
            guestInfo: {
              firstName: 'Guest',
              lastName: 'User',
              email: 'guest@example.com',
              phone: '',
            },
          });
        } catch (bookingError) {
          console.error('Booking creation error:', bookingError);
        }

        // Save completed booking locally
        saveBooking({
          ...booking,
          id: paymentIntent.id || generateBookingId(),
          paymentMethod: 'card',
          bookingDate: new Date().toISOString(),
          status: 'confirmed',
        });

        clearPendingBooking();
        onSuccess();
      }
    } catch (err: any) {
      onError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: 'tabs',
        }}
      />
      <motion.button
        type="submit"
        disabled={!stripe || processing}
        whileHover={!processing ? { scale: 1.02, y: -2 } : {}}
        whileTap={!processing ? { scale: 0.98 } : {}}
        className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-lg rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 relative overflow-hidden"
      >
        <motion.div
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />
        {processing ? (
          <>
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
            <span className="relative z-10">Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Pay ${booking.totalPrice.toLocaleString()}</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Crypto Payment
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: '₿', color: 'from-orange-500 to-yellow-500' },
    { symbol: 'ETH', name: 'Ethereum', address: '0x742d35Cc6634C0532925a3b844Bc454', icon: 'Ξ', color: 'from-blue-500 to-purple-500' },
    { symbol: 'USDT', name: 'Tether', address: '0x742d35Cc6634C0532925a3b844Bc454', icon: '₮', color: 'from-green-500 to-emerald-500' },
  ];

  // Load booking from localStorage on mount
  useEffect(() => {
    const pendingBooking = getPendingBooking();
    if (pendingBooking) {
      setBooking(pendingBooking);
    }
  }, []);

  // Create Stripe PaymentIntent when card payment is selected
  useEffect(() => {
    if (booking && paymentMethod === 'card' && !clientSecret) {
      createPaymentIntent();
    }
  }, [booking, paymentMethod]);

  const createPaymentIntent = async () => {
    if (!booking) return;

    setLoadingPayment(true);
    try {
      const response = await paymentApi.createPaymentIntent({
        amount: booking.totalPrice,
        currency: 'usd',
        metadata: {
          yachtName: booking.yacht.name,
          yachtId: String(booking.yacht.id),
        },
      });
      setClientSecret(response.clientSecret);
    } catch (err: any) {
      console.error('Error creating payment intent:', err);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleCryptoPayment = async () => {
    if (!booking) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      await bookingApi.createBooking({
        yachtId: booking.yacht.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        paymentMethod: 'crypto',
        cryptoDetails: {
          currency: selectedCrypto,
          address: cryptoOptions.find(c => c.symbol === selectedCrypto)?.address || '',
        },
        guestInfo: {
          firstName: 'Guest',
          lastName: 'User',
          email: 'guest@example.com',
          phone: '',
        },
      });

      saveBooking({
        ...booking,
        id: generateBookingId(),
        paymentMethod: 'crypto',
        bookingDate: new Date().toISOString(),
        status: 'pending',
      });

      clearPendingBooking();
      setCompleted(true);

      setTimeout(() => {
        router.push('/my-bookings');
      }, 3000);
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    setCompleted(true);
    setTimeout(() => {
      router.push('/my-bookings');
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // No booking found
  if (!booking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-8"
          >
            🛥️
          </motion.div>
          <h1 className="text-4xl text-white mb-4">No Booking Found</h1>
          <p className="text-white/60 mb-8 text-lg">Please select a yacht to start your booking</p>
          <motion.button
            onClick={() => router.push('/yachts')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2 mx-auto"
          >
            Browse Yachts
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Booking completed
  if (completed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative inline-block mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full blur-xl"
            />
            <div className="relative p-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full">
              <Check className="w-20 h-20 text-white" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white mb-4"
          >
            {paymentMethod === 'card' ? 'Payment Successful!' : 'Booking Submitted!'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/70 mb-8"
          >
            {paymentMethod === 'card' 
              ? 'Your luxury yacht experience is confirmed. Redirecting to your bookings...'
              : 'Your booking is pending crypto payment confirmation. Redirecting...'}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden">
                <img src={booking.yacht.image} alt={booking.yacht.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl text-white">{booking.yacht.name}</h3>
                <p className="text-white/60">{booking.yacht.location}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Check-in</div>
                <div className="text-white font-medium">{new Date(booking.startDate).toLocaleDateString()}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Check-out</div>
                <div className="text-white font-medium">{new Date(booking.endDate).toLocaleDateString()}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Guests</div>
                <div className="text-white font-medium">{booking.guests}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Total</div>
                <div className="text-white font-bold text-lg">${booking.totalPrice.toLocaleString()}</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm uppercase tracking-wider text-white">Final Step</span>
          </motion.div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Secure <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Checkout</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>256-bit SSL Encrypted</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Secure Payment</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Ship className="w-5 h-5 text-purple-400" />
                Booking Summary
              </h2>
              
              {/* Yacht Image */}
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group">
                <img
                  src={booking.yacht.image}
                  alt={booking.yacht.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-xs text-white font-medium mb-2 inline-block">
                    {booking.yacht.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{booking.yacht.name}</h3>
                  <p className="text-white/70 text-sm">{booking.yacht.location}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <motion.div 
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/50 uppercase tracking-wider">Check-in</div>
                    <div className="text-white font-medium">{new Date(booking.startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/50 uppercase tracking-wider">Check-out</div>
                    <div className="text-white font-medium">{new Date(booking.endDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/50 uppercase tracking-wider">Guests</div>
                    <div className="text-white font-medium">{booking.guests} People</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-600/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/50 uppercase tracking-wider">Duration</div>
                    <div className="text-white font-medium">{booking.days} Days</div>
                  </div>
                </motion.div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex justify-between text-white/60">
                  <span>${booking.yacht.price.toLocaleString()} × {booking.days} days</span>
                  <span className="text-white">${(booking.yacht.price * booking.days).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Service fee (10%)</span>
                  <span className="text-white">${(booking.yacht.price * booking.days * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-2xl">
                    ${booking.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-400" />
                Payment Method
              </h2>

              {/* Payment Method Toggle */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.button
                  onClick={() => setPaymentMethod('card')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <CreditCard className={`w-8 h-8 mx-auto mb-3 ${paymentMethod === 'card' ? 'text-purple-400' : 'text-white/60'}`} />
                  <div className={`font-semibold text-lg ${paymentMethod === 'card' ? 'text-white' : 'text-white/60'}`}>
                    Credit Card
                  </div>
                  <p className={`text-sm mt-1 ${paymentMethod === 'card' ? 'text-white/70' : 'text-white/40'}`}>
                    Powered by Stripe
                  </p>
                </motion.button>
                <motion.button
                  onClick={() => setPaymentMethod('crypto')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'crypto'
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <Bitcoin className={`w-8 h-8 mx-auto mb-3 ${paymentMethod === 'crypto' ? 'text-purple-400' : 'text-white/60'}`} />
                  <div className={`font-semibold text-lg ${paymentMethod === 'crypto' ? 'text-white' : 'text-white/60'}`}>
                    Cryptocurrency
                  </div>
                  <p className={`text-sm mt-1 ${paymentMethod === 'crypto' ? 'text-white/70' : 'text-white/40'}`}>
                    BTC, ETH, USDT
                  </p>
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {/* Card Payment with Stripe */}
                {paymentMethod === 'card' && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {loadingPayment ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                        <span className="ml-3 text-white/60">Initializing secure payment...</span>
                      </div>
                    ) : clientSecret ? (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: 'night',
                            variables: {
                              colorPrimary: '#9333ea',
                              colorBackground: '#1a1a2e',
                              colorText: '#ffffff',
                              colorDanger: '#ef4444',
                              fontFamily: 'system-ui, sans-serif',
                              borderRadius: '12px',
                            },
                            rules: {
                              '.Input': {
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '16px 20px',
                              },
                              '.Input:focus': {
                                borderColor: '#9333ea',
                                boxShadow: '0 0 0 2px rgba(147, 51, 234, 0.3)',
                              },
                              '.Label': {
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                              },
                            },
                          },
                        }}
                      >
                        <StripePaymentForm
                          booking={booking}
                          onSuccess={handlePaymentSuccess}
                          onError={(err) => setError(err)}
                        />
                      </Elements>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-white/60">Failed to initialize payment. Please refresh the page.</p>
                        <button
                          onClick={createPaymentIntent}
                          className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Crypto Payment */}
                {paymentMethod === 'crypto' && (
                  <motion.div
                    key="crypto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      {cryptoOptions.map((crypto) => (
                        <motion.button
                          key={crypto.symbol}
                          onClick={() => setSelectedCrypto(crypto.symbol)}
                          whileHover={{ scale: 1.05, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            selectedCrypto === crypto.symbol
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-white/10 hover:border-white/20 bg-white/5'
                          }`}
                        >
                          <div className={`text-3xl mb-2 bg-gradient-to-r ${crypto.color} bg-clip-text text-transparent`}>
                            {crypto.icon}
                          </div>
                          <div className={`text-sm font-medium ${selectedCrypto === crypto.symbol ? 'text-white' : 'text-white/60'}`}>
                            {crypto.name}
                          </div>
                          <div className={`text-xs ${selectedCrypto === crypto.symbol ? 'text-white/70' : 'text-white/40'}`}>
                            {crypto.symbol}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/20">
                      <div className="text-sm text-white/60 mb-3">
                        Send exactly <span className="text-white font-bold text-lg">${booking.totalPrice.toLocaleString()}</span> worth of {selectedCrypto} to:
                      </div>
                      <div className="flex items-center gap-3">
                        <code className="flex-1 p-4 bg-black/30 rounded-xl text-white/80 text-sm break-all font-mono">
                          {cryptoOptions.find(c => c.symbol === selectedCrypto)?.address}
                        </code>
                        <motion.button
                          onClick={() => copyToClipboard(cryptoOptions.find(c => c.symbol === selectedCrypto)?.address || '')}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl transition-colors"
                        >
                          {copied ? <CheckCircle className="w-6 h-6 text-white" /> : <Copy className="w-6 h-6 text-white" />}
                        </motion.button>
                      </div>
                      <p className="text-xs text-white/40 mt-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Payment will be confirmed within 30 minutes after blockchain confirmation
                      </p>
                    </div>

                    <motion.button
                      onClick={handleCryptoPayment}
                      disabled={processing}
                      whileHover={!processing ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!processing ? { scale: 0.98 } : {}}
                      className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-lg rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-purple-500/30 relative overflow-hidden"
                    >
                      <motion.div
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      />
                      {processing ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                          <span className="relative z-10">Processing...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 relative z-10" />
                          <span className="relative z-10">I&apos;ve Sent the Payment</span>
                          <ArrowRight className="w-5 h-5 relative z-10" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                    <button
                      type="button"
                      onClick={() => setError(null)}
                      className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                    >
                      ×
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mt-8 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>Free cancellation</span>
                </div>
              </div>

              <p className="text-center text-white/40 text-sm mt-4">
                By completing this purchase you agree to our Terms of Service
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
