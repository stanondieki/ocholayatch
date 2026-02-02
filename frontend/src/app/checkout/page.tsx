'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { CreditCard, Bitcoin, Check, Lock, Calendar, Users, Anchor, Copy, CheckCircle } from 'lucide-react';
import { BookingData, getPendingBooking, clearPendingBooking, saveBooking, generateBookingId } from '@/lib/bookingStore';

export default function CheckoutPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Card Payment Form
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Crypto Payment
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');

  // Load booking from localStorage on mount
  useEffect(() => {
    const pendingBooking = getPendingBooking();
    if (pendingBooking) {
      setBooking(pendingBooking);
    }
  }, []);

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: '₿', color: 'from-orange-500 to-yellow-500' },
    { symbol: 'ETH', name: 'Ethereum', address: '0x742d35Cc6634C0532925a3b844Bc454', icon: 'Ξ', color: 'from-blue-500 to-purple-500' },
    { symbol: 'USDT', name: 'Tether', address: '0x742d35Cc6634C0532925a3b844Bc454', icon: '₮', color: 'from-green-500 to-emerald-500' },
  ];

  const handlePayment = async () => {
    if (!booking) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Save completed booking
    saveBooking({
      ...booking,
      id: generateBookingId(),
      paymentMethod,
      bookingDate: new Date().toISOString(),
      status: paymentMethod === 'card' ? 'confirmed' : 'pending',
    });
    
    // Clear pending booking
    clearPendingBooking();
    
    setProcessing(false);
    setCompleted(true);
    
    // Redirect after showing success
    setTimeout(() => {
      router.push('/my-bookings');
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = paymentMethod === 'crypto' || 
    (cardNumber.replace(/\s/g, '').length === 16 && cardName && expiryDate && cvv.length >= 3);

  // No booking found
  if (!booking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-6">🛥️</div>
          <h1 className="text-4xl text-white mb-4">No Booking Found</h1>
          <p className="text-white/60 mb-8">Please select a yacht first</p>
          <button
            onClick={() => router.push('/book')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            Browse Yachts
          </button>
        </div>
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
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex p-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-8"
          >
            <Check className="w-20 h-20 text-white" />
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-white/70 mb-8">
            Your luxury yacht experience is secured. Redirecting to your bookings...
          </p>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-2xl text-white mb-4">{booking.yacht.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-white/60 text-sm">Check-in</div>
                <div className="text-white">{new Date(booking.startDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Check-out</div>
                <div className="text-white">{new Date(booking.endDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Guests</div>
                <div className="text-white">{booking.guests}</div>
              </div>
              <div>
                <div className="text-white/60 text-sm">Total</div>
                <div className="text-white font-bold">${booking.totalPrice.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </motion.div>
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
            Secure <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Checkout</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Lock className="w-4 h-4" />
            <span>256-bit SSL Encrypted</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">Booking Summary</h2>
              
              {/* Yacht Image */}
              <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                <img
                  src={booking.yacht.image}
                  alt={booking.yacht.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-lg font-semibold text-white">{booking.yacht.name}</h3>
                  <p className="text-white/60 text-sm">{booking.yacht.location}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/70">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <div className="flex-1">
                    <div className="text-xs text-white/50">Check-in</div>
                    <div className="text-white">{new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-xs text-white/50">Check-out</div>
                    <div className="text-white">{new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <div className="flex-1">
                    <div className="text-xs text-white/50">Guests</div>
                    <div className="text-white">{booking.guests} People</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Anchor className="w-4 h-4 text-pink-400" />
                  <div className="flex-1">
                    <div className="text-xs text-white/50">Duration</div>
                    <div className="text-white">{booking.days} Days</div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>${booking.yacht.price.toLocaleString()} × {booking.days} days</span>
                  <span>${(booking.yacht.price * booking.days).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Service fee (10%)</span>
                  <span>${(booking.yacht.price * booking.days * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    ${booking.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>

              {/* Payment Method Toggle */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <CreditCard className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-purple-400' : 'text-white/60'}`} />
                  <div className={`font-medium ${paymentMethod === 'card' ? 'text-white' : 'text-white/60'}`}>
                    Credit Card
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'crypto'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Bitcoin className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === 'crypto' ? 'text-purple-400' : 'text-white/60'}`} />
                  <div className={`font-medium ${paymentMethod === 'crypto' ? 'text-white' : 'text-white/60'}`}>
                    Cryptocurrency
                  </div>
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setExpiryDate(value);
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Crypto Payment */}
              {paymentMethod === 'crypto' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-3 gap-3">
                    {cryptoOptions.map((crypto) => (
                      <button
                        key={crypto.symbol}
                        onClick={() => setSelectedCrypto(crypto.symbol)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedCrypto === crypto.symbol
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`text-2xl mb-1 bg-gradient-to-r ${crypto.color} bg-clip-text text-transparent`}>
                          {crypto.icon}
                        </div>
                        <div className={`text-sm font-medium ${selectedCrypto === crypto.symbol ? 'text-white' : 'text-white/60'}`}>
                          {crypto.symbol}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="text-sm text-white/60 mb-2">
                      Send exactly <span className="text-white font-bold">${booking.totalPrice.toLocaleString()}</span> worth of {selectedCrypto} to:
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-3 bg-black/30 rounded-lg text-white/80 text-sm break-all">
                        {cryptoOptions.find(c => c.symbol === selectedCrypto)?.address}
                      </code>
                      <button
                        onClick={() => copyToClipboard(cryptoOptions.find(c => c.symbol === selectedCrypto)?.address || '')}
                        className="p-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
                      >
                        {copied ? <CheckCircle className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                      </button>
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                      Payment will be confirmed within 30 minutes after blockchain confirmation
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={processing || !isFormValid}
                className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    {paymentMethod === 'card' ? 'Pay' : 'Confirm Payment'} ${booking.totalPrice.toLocaleString()}
                  </>
                )}
              </button>

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
