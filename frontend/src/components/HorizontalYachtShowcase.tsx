'use client'

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Gauge, Waves, Anchor } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShowcaseYacht {
  id: number;
  name: string;
  tagline: string;
  image: string;
  specs: {
    speed: string;
    length: string;
    power: string;
  };
}

export function HorizontalYachtShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const showcaseYachts: ShowcaseYacht[] = [
    {
      id: 1,
      name: 'Aqua Phantom',
      tagline: 'Where Speed Meets Elegance',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
      specs: {
        speed: '45 knots',
        length: '120 ft',
        power: '4000 HP',
      },
    },
    {
      id: 2,
      name: 'Ocean Sovereign',
      tagline: 'Redefining Luxury at Sea',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
      specs: {
        speed: '38 knots',
        length: '150 ft',
        power: '5200 HP',
      },
    },
    {
      id: 3,
      name: 'Azure Legacy',
      tagline: 'Engineering Excellence',
      image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80',
      specs: {
        speed: '42 knots',
        length: '135 ft',
        power: '4800 HP',
      },
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-black">
      {showcaseYachts.map((yacht, index) => (
        <div key={yacht.id} className="h-screen sticky top-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={yacht.image}
                alt={yacht.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="text-sm uppercase tracking-[0.3em] text-white/60 mb-4">
                      Yacht {String(index + 1).padStart(2, '0')}
                    </div>
                    <h2 className="text-6xl lg:text-8xl text-white mb-6 tracking-tight">
                      {yacht.name}
                    </h2>
                    <p className="text-2xl text-white/80 mb-12 italic">
                      {yacht.tagline}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-8 mb-12">
                      <div className="border-l-2 border-white/30 pl-4">
                        <div className="flex items-center gap-2 text-white/60 mb-2">
                          <Gauge className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-wider">Top Speed</span>
                        </div>
                        <div className="text-3xl text-white">{yacht.specs.speed}</div>
                      </div>
                      <div className="border-l-2 border-white/30 pl-4">
                        <div className="flex items-center gap-2 text-white/60 mb-2">
                          <Anchor className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-wider">Length</span>
                        </div>
                        <div className="text-3xl text-white">{yacht.specs.length}</div>
                      </div>
                      <div className="border-l-2 border-white/30 pl-4">
                        <div className="flex items-center gap-2 text-white/60 mb-2">
                          <Waves className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-wider">Power</span>
                        </div>
                        <div className="text-3xl text-white">{yacht.specs.power}</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ x: 10 }}
                      className="group flex items-center gap-3 text-white text-lg border-b-2 border-white/0 hover:border-white transition-all pb-2"
                    >
                      Explore Details
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Yacht Number Indicator */}
            <div className="absolute bottom-8 right-8">
              <div className="text-8xl text-white/10 font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
