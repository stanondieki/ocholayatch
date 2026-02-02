'use client'

import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, Send, Clock, Globe, MessageCircle, Sparkles, CheckCircle, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { contactApi } from '@/lib/api';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await contactApi.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || formData.interest,
        message: formData.message,
      });
      
      setIsSubmitted(true);
      
      // Reset form after showing success
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', interest: '' });
        setIsSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = [
    'Luxury Yacht Charter',
    'Corporate Event',
    'Wedding/Celebration',
    'Bareboat Charter',
    'Destination Planning',
    'General Inquiry',
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+377 98 06 36 36', '+1 (555) 123-4567'],
      color: 'from-blue-500 to-cyan-500',
      action: 'tel:+37798063636'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@ocholayachts.com', 'support@ocholayachts.com'],
      color: 'from-purple-500 to-pink-500',
      action: 'mailto:info@ocholayachts.com'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Marina Boulevard', 'Monaco, MC 98000'],
      color: 'from-orange-500 to-red-500',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 9AM - 6PM', 'Sat - Sun: 10AM - 4PM'],
      color: 'from-green-500 to-teal-500',
      action: '#'
    },
  ];

  const offices = [
    {
      city: 'Monaco',
      address: '123 Marina Boulevard, MC 98000',
      phone: '+377 98 06 36 36',
      email: 'monaco@ocholayachts.com',
      flag: '🇲🇨'
    },
    {
      city: 'Miami',
      address: '456 Ocean Drive, FL 33139',
      phone: '+1 (305) 555-0123',
      email: 'miami@ocholayachts.com',
      flag: '🇺🇸'
    },
    {
      city: 'Dubai',
      address: '789 Marina Walk, Dubai Marina',
      phone: '+971 4 555 0123',
      email: 'dubai@ocholayachts.com',
      flag: '🇦🇪'
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
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>
            <span className="text-sm uppercase tracking-[0.3em] text-white">Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl lg:text-8xl text-white mb-8 tracking-tight"
          >
            Let&apos;s Start Your
            <br />
            <motion.span 
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Next Adventure
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Our team of yacht experts is ready to help you plan the perfect charter experience
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                href={info.action}
                key={info.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative block cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-500 overflow-hidden">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  {/* Shine effect */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
                  />

                  <div className="relative">
                    <motion.div 
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${info.color} mb-6`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <info.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl text-white mb-4 uppercase tracking-wider">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-white/70 mb-2 group-hover:text-white transition-colors">{detail}</p>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative overflow-hidden">
                {/* Success Overlay */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-black/90 backdrop-blur-xl z-20 flex flex-col items-center justify-center rounded-3xl"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="w-12 h-12 text-white" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl text-white mb-4"
                      >
                        Message Sent!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/70 text-center max-w-sm"
                      >
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </motion.p>
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
                      className="mb-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3"
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

                <h2 className="text-4xl text-white mb-8">
                  Send Us a <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Message</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Interest Selection */}
                  <div>
                    <label className="text-white/80 mb-3 text-sm uppercase tracking-wider block">I&apos;m interested in</label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <motion.button
                          key={interest}
                          type="button"
                          onClick={() => setFormData({ ...formData, interest })}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            formData.interest === interest
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/30'
                          }`}
                        >
                          {interest}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Name Field */}
                  <motion.div
                    animate={focusedField === 'name' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-white/80 mb-3 text-sm uppercase tracking-wider block">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-white/40 focus:outline-none transition-all ${
                        focusedField === 'name' 
                          ? 'border-purple-500 ring-2 ring-purple-500/30' 
                          : 'border-white/10'
                      }`}
                      placeholder="John Doe"
                      required
                    />
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email Field */}
                    <motion.div
                      animate={focusedField === 'email' ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="text-white/80 mb-3 text-sm uppercase tracking-wider block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-white/40 focus:outline-none transition-all ${
                          focusedField === 'email' 
                            ? 'border-purple-500 ring-2 ring-purple-500/30' 
                            : 'border-white/10'
                        }`}
                        placeholder="john@example.com"
                        required
                      />
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                      animate={focusedField === 'phone' ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="text-white/80 mb-3 text-sm uppercase tracking-wider block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-6 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-white/40 focus:outline-none transition-all ${
                          focusedField === 'phone' 
                            ? 'border-purple-500 ring-2 ring-purple-500/30' 
                            : 'border-white/10'
                        }`}
                        placeholder="+1 (555) 000-0000"
                      />
                    </motion.div>
                  </div>

                  {/* Subject Field */}
                  <motion.div
                    animate={focusedField === 'subject' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-white/80 mb-3 text-sm uppercase tracking-wider block">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-white/40 focus:outline-none transition-all ${
                        focusedField === 'subject' 
                          ? 'border-purple-500 ring-2 ring-purple-500/30' 
                          : 'border-white/10'
                      }`}
                      placeholder="Yacht Charter Inquiry"
                      required
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    animate={focusedField === 'message' ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-white/80 mb-3 text-sm uppercase tracking-wider block">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className={`w-full px-6 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-white/40 focus:outline-none transition-all resize-none ${
                        focusedField === 'message' 
                          ? 'border-purple-500 ring-2 ring-purple-500/30' 
                          : 'border-white/10'
                      }`}
                      placeholder="Tell us about your dream yacht charter..."
                      required
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 rounded-2xl flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-lg uppercase tracking-wider relative overflow-hidden group disabled:opacity-70"
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <span className="relative z-10">Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Quick Contact & Offices */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <motion.div 
                className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10"
                whileHover={{ borderColor: 'rgba(168, 85, 247, 0.5)' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MessageCircle className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  <h3 className="text-3xl text-white">Quick Contact</h3>
                </div>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Need immediate assistance? Our team is available 24/7 to help you with urgent inquiries.
                </p>
                <div className="space-y-4">
                  <motion.a
                    href="tel:+37798063636"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-5 rounded-2xl flex items-center justify-center gap-3 transition-all group"
                  >
                    <Phone className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="uppercase tracking-wider">Call Now</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 text-white py-5 rounded-2xl flex items-center justify-center gap-3 transition-all group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    <MessageCircle className="w-5 h-5" />
                    <span className="uppercase tracking-wider">Live Chat - Online</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Office Locations */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-blue-400" />
                  <h3 className="text-3xl text-white">Our Offices</h3>
                </div>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <motion.div
                      key={office.city}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      className="pb-6 border-b border-white/10 last:border-0 rounded-xl p-4 -mx-4 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{office.flag}</span>
                        <h4 className="text-xl text-white">{office.city}</h4>
                      </div>
                      <p className="text-white/60 text-sm mb-2">{office.address}</p>
                      <p className="text-white/60 text-sm mb-2">{office.phone}</p>
                      <a href={`mailto:${office.email}`} className="text-purple-400 text-sm hover:text-purple-300 transition-colors">
                        {office.email}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl lg:text-6xl text-white mb-8 tracking-tight"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Set <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Sail?</span>
            </motion.h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Let our experts help you find the perfect yacht for your next adventure
            </p>
            <motion.button
              onClick={() => router.push('/yachts')}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-6 rounded-full text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all group"
            >
              <span className="flex items-center gap-3">
                Browse Our Fleet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
