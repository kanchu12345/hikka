import React from 'react';
import { Metadata } from 'next';
import { getReviews, getSiteSettings } from '@/lib/db';
import ReviewsSection from '@/components/ReviewsSection';
import JsonLd from '@/components/JsonLd';
import { Star, MessageSquare, ThumbsUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title: `Google Reviews & Customer Testimonials | ${settings.businessName}`,
    description: 'Read real 5-star traveler experiences and reviews for surf lessons, coral snorkeling, and tours with Hikkaduwa Hikka Surf School.',
    keywords: ['Hikkaduwa surf reviews', 'Hikka surf school reviews', 'Best surf school Hikkaduwa Google reviews'],
  };
}

export default function ReviewsPage() {
  const reviews = getReviews();
  const settings = getSiteSettings();

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="reviews"
        reviews={reviews}
        canonicalUrl="https://hikkasurfschool.com/reviews"
      />

      <section className="relative py-20 bg-ocean-950 text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-400/20 text-sand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-sand-300/30">
            <Star className="w-3.5 h-3.5 fill-sand-300" />
            <span>100% Genuine Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">
            ⭐ Traveler Testimonials
          </h1>

          <p className="text-cyan-100 text-base sm:text-xl max-w-xl mx-auto">
            Honest feedback from surf students, families, and ocean explorers in Hikkaduwa.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-left border-l border-white/20 pl-4">
              <span className="font-heading font-extrabold text-xl">5.0 Star Rating</span>
              <p className="text-xs text-gray-300">Verified on Google Maps</p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection reviews={reviews} settings={settings} />
    </>
  );
}
