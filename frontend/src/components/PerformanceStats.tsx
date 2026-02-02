'use client'

import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { TrendingUp, Users, Star, Globe } from 'lucide-react';

export function PerformanceStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: Users,
      end: 10000,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Worldwide',
    },
    {
      icon: Star,
      end: 500,
      suffix: '+',
      label: 'Luxury Yachts',
      description: 'In Fleet',
    },
    {
      icon: Globe,
      end: 150,
      suffix: '+',
      label: 'Destinations',
      description: 'Available',
    },
    {
      icon: TrendingUp,
      end: 98,
      suffix: '%',
      label: 'Satisfaction',
      description: 'Rating',
    },
  ];

  return (
    <section ref={ref} className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-32 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-white/60 mb-6">
            Performance Excellence
          </div>
          <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Numbers That Speak
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Our commitment to excellence is reflected in every metric
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: {
    icon: any;
    end: number;
    suffix: string;
    label: string;
    description: string;
  };
  index: number;
  isInView: boolean;
}

function StatCard({ stat, index, isInView }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.end) {
        setCount(stat.end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 h-full">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <stat.icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Number */}
        <div className="mb-4">
          <div className="text-5xl text-white mb-1">
            {count.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-xl text-white/90">{stat.label}</div>
        </div>

        {/* Description */}
        <div className="text-sm text-white/60 uppercase tracking-wider">
          {stat.description}
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-500"></div>
      </div>
    </motion.div>
  );
}
