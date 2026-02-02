import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function VideoTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative bg-black py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale, opacity }}
          className="relative"
        >
          {/* Main Text */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-7xl text-white mb-6 tracking-tight"
            >
              Experience Unmatched
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Luxury & Performance
              </span>
            </motion.h2>
          </div>

          {/* Three Column Features */}
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group cursor-pointer"
            >
              <div className="mb-6">
                <div className="text-6xl text-white/20 group-hover:text-white/40 transition-colors">
                  01
                </div>
              </div>
              <h3 className="text-2xl text-white mb-4">Superior Design</h3>
              <p className="text-white/60 leading-relaxed">
                Every yacht in our collection represents the pinnacle of naval architecture and interior design excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group cursor-pointer"
            >
              <div className="mb-6">
                <div className="text-6xl text-white/20 group-hover:text-white/40 transition-colors">
                  02
                </div>
              </div>
              <h3 className="text-2xl text-white mb-4">Cutting-Edge Tech</h3>
              <p className="text-white/60 leading-relaxed">
                State-of-the-art navigation systems, stabilization technology, and entertainment amenities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center group cursor-pointer"
            >
              <div className="mb-6">
                <div className="text-6xl text-white/20 group-hover:text-white/40 transition-colors">
                  03
                </div>
              </div>
              <h3 className="text-2xl text-white mb-4">Bespoke Service</h3>
              <p className="text-white/60 leading-relaxed">
                Tailored experiences crafted by our expert team to match your unique preferences and desires.
              </p>
            </motion.div>
          </div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-20 origin-center"
          ></motion.div>
        </motion.div>
      </div>
    </div>
  );
}
