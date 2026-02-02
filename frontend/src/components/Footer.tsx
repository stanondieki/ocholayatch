'use client'

import { motion } from 'motion/react';
import { Anchor, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  const handleNavClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Browse Yachts', page: 'yachts' },
    { label: 'Destinations', page: 'destinations' },
    { label: 'About Us', page: 'about' },
    { label: 'Testimonials', page: 'testimonials' },
    { label: 'Blog', page: 'blog' },
  ];

  const serviceLinks = [
    { label: 'All Services', page: 'services' },
    { label: 'Yacht Charter', page: 'services' },
    { label: 'Crewed Charters', page: 'services' },
    { label: 'Corporate Events', page: 'services' },
    { label: 'Special Occasions', page: 'services' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -30, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]"
        ></motion.div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-b border-white/10 py-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-5xl lg:text-6xl text-white mb-5 tracking-tight">
                  Stay <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Updated</span>
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Subscribe to our newsletter for exclusive deals, new yacht launches, and travel inspiration
                </p>
              </motion.div>
            </div>
            <motion.form
              onSubmit={handleSubscribe}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <div className="flex-1 relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-14 pr-5 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all hover:bg-white/10"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-3 overflow-hidden group"
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                ></motion.div>
                <Send className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
                <span className="hidden sm:inline relative z-10 uppercase tracking-wider">Subscribe</span>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600"
                >
                  <Anchor className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl uppercase tracking-wider">OcholaYachts</span>
              </div>
              <p className="text-white/60 mb-6 leading-relaxed">
                Your gateway to unforgettable yacht charter experiences in the world's most exclusive destinations.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, link: '#' },
                  { icon: Instagram, link: '#' },
                  { icon: Twitter, link: '#' },
                  { icon: Youtube, link: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all border border-white/10"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl text-white mb-6 uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.li key={link.label} whileHover={{ x: 5 }}>
                    <button 
                      onClick={() => handleNavClick(link.page)}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl text-white mb-6 uppercase tracking-wider">Services</h3>
              <ul className="space-y-4">
                {serviceLinks.map((service, index) => (
                  <motion.li key={service.label} whileHover={{ x: 5 }}>
                    <button 
                      onClick={() => handleNavClick(service.page)}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{service.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl text-white mb-6 uppercase tracking-wider">Contact Us</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-white/60 leading-relaxed">
                    123 Marina Boulevard<br />Monaco, MC 98000
                  </div>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-white/60">+377 98 06 36 36</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-blue-600 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-white/60">info@ocholayachts.com</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-8 pb-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/60 text-sm">
              © {currentYear} OcholaYachts. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}