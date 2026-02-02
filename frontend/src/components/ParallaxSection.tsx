'use client'

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Parallax Image */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=2000&q=80"
          alt="Luxury Yacht"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl lg:text-8xl text-white mb-8 tracking-tight">
              Beyond the
              <br />
              Horizon
            </h2>
            <p className="text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Embark on journeys that transcend the ordinary. Where luxury meets adventure on the open seas.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg hover:bg-white/90 transition-all"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
