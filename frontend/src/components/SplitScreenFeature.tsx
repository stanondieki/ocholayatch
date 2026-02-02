'use client'

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Shield, Award, Headphones, Compass } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SplitScreenFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All yachts undergo rigorous safety inspections and are equipped with state-of-the-art safety systems.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Hand-selected luxury yachts that meet our stringent quality standards for your ultimate comfort.',
    },
    {
      icon: Headphones,
      title: '24/7 Concierge',
      description: 'Round-the-clock dedicated support team ready to assist with any request during your journey.',
    },
    {
      icon: Compass,
      title: 'Expert Guidance',
      description: 'Professional crew members with extensive maritime experience to navigate any destination.',
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <div className="relative z-10 flex items-center py-24 lg:py-0">
          <div className="max-w-xl mx-auto px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-sm uppercase tracking-[0.3em] text-white/60 mb-6">
                The OcholaYachts Experience
              </div>
              <h2 className="text-5xl lg:text-6xl text-white mb-8 tracking-tight">
                Crafted for
                <br />
                Perfection
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Every detail is meticulously designed to deliver an unparalleled maritime experience that exceeds expectations.
              </p>

              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-2 group-hover:text-white/80 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden">
          <motion.div style={{ y: imageY }} className="h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80"
              alt="Luxury Yacht Interior"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent lg:from-black/50"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}