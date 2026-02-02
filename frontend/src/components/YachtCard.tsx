'use client'

import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Bed, Ruler, MapPin, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Yacht } from '@/types';

interface YachtCardProps {
  yacht: Yacht;
  onClick: () => void;
}

export function YachtCard({ yacht, onClick }: YachtCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Card Container */}
      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={yacht.image}
              alt={yacht.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isHovered ? 1 : 0.9, x: 0 }}
            className="absolute top-6 left-6"
          >
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-white text-sm">{yacht.location}</span>
            </div>
          </motion.div>

          {/* Price Tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0.9, x: 0 }}
            className="absolute top-6 right-6"
          >
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="text-black">
                <span className="text-xl">${yacht.price.toLocaleString()}</span>
                <span className="text-sm text-black/60 ml-1">/day</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Info - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-3xl text-white mb-4 tracking-tight">{yacht.name}</h3>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Guests</span>
                  </div>
                  <div className="text-white text-xl">{yacht.guests}</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Bed className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Cabins</span>
                  </div>
                  <div className="text-white text-xl">{yacht.cabins}</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Ruler className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Length</span>
                  </div>
                  <div className="text-white text-xl">{yacht.length}ft</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hover Details Section */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden bg-gradient-to-b from-black to-black/95 border-t border-white/10"
        >
          <div className="p-6">
            <p className="text-white/70 mb-6 leading-relaxed line-clamp-2">
              {yacht.description}
            </p>
            
            {/* Amenities Preview */}
            <div className="flex flex-wrap gap-2 mb-6">
              {yacht.amenities.slice(0, 4).map((amenity) => (
                <div
                  key={amenity}
                  className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs border border-white/20"
                >
                  {amenity}
                </div>
              ))}
              {yacht.amenities.length > 4 && (
                <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/60 text-xs border border-white/20">
                  +{yacht.amenities.length - 4} more
                </div>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all group/btn"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <span className="text-sm uppercase tracking-wider">View Details</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-2xl blur-xl -z-10"
      ></motion.div>
    </motion.div>
  );
}