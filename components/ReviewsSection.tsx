'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, CheckCircle, Quote, MessageSquare, ExternalLink, ThumbsUp } from 'lucide-react';
import { Review, SiteSettings } from '@/lib/types';

interface ReviewsSectionProps {
  reviews: Review[];
  settings: SiteSettings;
}

export default function ReviewsSection({ reviews, settings }: ReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'surf' | 'tours'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'surf') return r.activityReviewed.toLowerCase().includes('surf');
    if (activeFilter === 'tours') return !r.activityReviewed.toLowerCase().includes('surf');
    return true;
  });

  return (
    <section id="reviews" className="py-20 bg-ocean-950 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-surf-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Google Rating Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sand-300 text-xs font-bold uppercase tracking-wider mb-3 border border-white/15">
            <Star className="w-3.5 h-3.5 fill-sand-300 text-sand-300" />
            <span>Verified Customer Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            ⭐ Google Reviews & Testimonials
          </h2>

          {/* Rating Summary Box */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-extrabold text-white">5.0 / 5.0</span>
            <span className="text-gray-400 text-sm">on Google Business</span>
          </div>

          <p className="text-gray-300 mt-4 text-base">
            Read real traveler stories from guests who learned to surf and explored Sri Lanka with our local team.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 hover:border-white/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={
                      review.authorPhoto ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
                    }
                    alt={review.authorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-surf-400"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-heading font-bold text-white text-base flex items-center gap-1.5">
                      <span>{review.authorName}</span>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{review.authorLocation}</div>
                  </div>
                </div>

                {/* Rating Stars & Activity */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
                    {review.activityReviewed}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-200 text-sm leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Footer with date and Google icon */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                <span>{review.date}</span>
                <span className="flex items-center gap-1 text-white font-medium">
                  <span className="text-blue-400 font-bold">G</span>oogle Review
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reviews"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>READ MORE REVIEWS</span>
            <ExternalLink className="w-4 h-4" />
          </Link>

          <a
            href={settings.googleBusinessUrl || settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl border border-white/20 transition-all text-sm flex items-center justify-center gap-2"
          >
            <span>Leave a Google Review</span>
            <ThumbsUp className="w-4 h-4 text-sand-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
