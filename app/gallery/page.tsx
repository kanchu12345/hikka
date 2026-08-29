import React from 'react';
import { Metadata } from 'next';
import { getGallery, getSiteSettings } from '@/lib/db';
import GallerySection from '@/components/GallerySection';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title: `Photo & Video Gallery | ${settings.businessName}`,
    description: 'Explore high-definition photos of surfing lessons, coral reef snorkeling, wild giant sea turtles, and happy travelers in Hikkaduwa, Sri Lanka.',
    keywords: ['Hikkaduwa surfing photos', 'Hikka surf school gallery', 'Sri Lanka surf pictures'],
  };
}

export default function GalleryPage() {
  const gallery = getGallery();
  const settings = getSiteSettings();

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="home"
        canonicalUrl="https://hikkasurfschool.com/gallery"
      />

      <section className="relative py-16 bg-ocean-950 text-white overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-3">
            📷 Ocean & Surf Photo Gallery
          </h1>
          <p className="text-cyan-200 text-sm sm:text-lg max-w-xl mx-auto">
            Real snapshots from daily surf coaching, wild turtle encounters, and Sri Lankan coastal adventures.
          </p>
        </div>
      </section>

      <GallerySection gallery={gallery} />
    </>
  );
}
