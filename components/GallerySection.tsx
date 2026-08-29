'use client';

import React, { useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { Camera, X, ZoomIn, Eye, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Surfing',
    'Ocean',
    'Snorkeling',
    'Turtles',
    'Fishing',
    'Boats',
    'Hikkaduwa',
    'Sri Lanka',
    'Happy Customers',
  ];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surf-100 text-surf-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-surf-600" />
            <span>Visual Story</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-gray-900 tracking-tight">
            Photo & Ocean Moments
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Real snapshots of surfing sessions, coral reefs, sea turtle encounters, and smiling friends on Hikkaduwa Beach.
          </p>
        </div>

        {/* Category Filter Pills (Horizontal scroll on mobile) */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-surf-600 text-white shadow-md shadow-surf-600/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sand-300">
                  {item.category}
                </span>
                <p className="text-sm font-bold leading-snug">{item.title}</p>
                {item.caption && (
                  <p className="text-xs text-gray-300 mt-0.5 line-clamp-2">{item.caption}</p>
                )}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-6 bg-gradient-to-t from-black via-black/90 to-transparent text-white">
              <span className="text-xs font-bold text-sand-300 uppercase tracking-wider">
                {selectedPhoto.category}
              </span>
              <h3 className="text-xl font-bold font-heading mt-1">{selectedPhoto.title}</h3>
              {selectedPhoto.caption && (
                <p className="text-sm text-gray-300 mt-1">{selectedPhoto.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
