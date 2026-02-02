'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Anchor, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get current page from location
  const getCurrentPage = () => {
    const path = pathname;
    if (path === '/') return 'home';
    return path.slice(1);
  };

  const currentPage = getCurrentPage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: string }[] = [
    { label: 'Yachts', page: 'yachts' },
    { label: 'Destinations', page: 'destinations' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'Testimonials', page: 'testimonials' },
    { label: 'Blog', page: 'blog' },
    { label: 'Services', page: 'services' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/10' 
          : 'bg-black/30 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg ${
                isScrolled ? 'shadow-purple-500/30' : 'shadow-purple-500/20'
              }`}
            >
              <Anchor className="text-white w-6 h-6" />
            </motion.div>
            <span className="text-xl text-white uppercase tracking-wider">
              OcholaYachts
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-white/90 hover:text-white transition-all relative group text-xs uppercase tracking-[0.15em] py-2 whitespace-nowrap ${
                  currentPage === link.page ? 'text-white' : ''
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${
                  currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/my-bookings')}
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/20"
              title="My Bookings"
            >
              <User className="w-5 h-5" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/book')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-full hover:shadow-xl hover:shadow-purple-500/50 transition-all text-xs uppercase tracking-wider relative overflow-hidden group whitespace-nowrap"
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              ></motion.div>
              <span className="relative z-10">Book Now</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <motion.button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  whileHover={{ x: 5 }}
                  className={`block w-full text-left text-white/90 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10 uppercase tracking-wider text-sm ${
                    currentPage === link.page ? 'bg-white/10 text-white' : ''
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  router.push('/my-bookings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-full transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                My Bookings
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  router.push('/book');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/50 transition-all uppercase tracking-wider text-sm"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}