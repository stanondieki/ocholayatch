'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Bed, Ruler, User, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Yacht } from '@/types';

interface YachtDetailModalProps {
  yacht: Yacht;
  onClose: () => void;
}

export function YachtDetailModal({ yacht, onClose }: YachtDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % yacht.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + yacht.images.length) % yacht.images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Gallery */}
          <div className="relative h-96">
            <ImageWithFallback
              src={yacht.images[currentImageIndex]}
              alt={yacht.name}
              className="w-full h-full object-cover"
            />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>

            {/* Navigation Arrows */}
            {yacht.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {yacht.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {yacht.images.length}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl text-gray-900 mb-2">{yacht.name}</h2>
                <p className="text-xl text-gray-600">{yacht.location}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">${yacht.price.toLocaleString()}</div>
                <div className="text-gray-500">per day</div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl text-gray-900">{yacht.guests}</div>
                <div className="text-sm text-gray-600">Guests</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-2">
                  <Bed className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl text-gray-900">{yacht.cabins}</div>
                <div className="text-sm text-gray-600">Cabins</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-2">
                  <Ruler className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl text-gray-900">{yacht.length}ft</div>
                <div className="text-sm text-gray-600">Length</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-2">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl text-gray-900">{yacht.crew}</div>
                <div className="text-sm text-gray-600">Crew</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{yacht.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-2xl text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {yacht.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all animate-gradient"
            >
              Request Booking
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}