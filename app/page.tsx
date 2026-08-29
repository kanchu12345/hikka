import React from 'react';
import {
  getSiteSettings,
  getActivities,
  getTours,
  getReviews,
  getGallery,
  getFAQs,
  getSEOPage,
} from '@/lib/db';
import Hero from '@/components/Hero';
import PopularExperiences from '@/components/PopularExperiences';
import LearnToSurfSection from '@/components/LearnToSurfSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ReviewsSection from '@/components/ReviewsSection';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import FAQAccordion from '@/components/FAQAccordion';
import JsonLd from '@/components/JsonLd';

export const revalidate = 0; // Dynamic server rendering for live CMS updates

export default function HomePage() {
  const settings = getSiteSettings();
  const activities = getActivities();
  const tours = getTours();
  const reviews = getReviews();
  const gallery = getGallery();
  const faqs = getFAQs();
  const surfActivity = activities.find((a) => a.slug === 'surf-lessons');

  return (
    <>
      <JsonLd
        settings={settings}
        pageType="home"
        reviews={reviews}
        faqs={faqs}
        canonicalUrl="https://hikkasurfschool.com"
      />

      {/* 1. Hero Section */}
      <Hero settings={settings} />

      {/* 2. Popular Experiences 8-Card Showcase */}
      <PopularExperiences
        activities={activities}
        tours={tours}
        settings={settings}
      />

      {/* 3. Core Surfing Section */}
      <LearnToSurfSection
        settings={settings}
        surfActivity={surfActivity}
      />

      {/* 4. Why Choose Hikka Surf School */}
      <WhyChooseUs settings={settings} />

      {/* 5. Google Reviews */}
      <ReviewsSection
        reviews={reviews}
        settings={settings}
      />

      {/* 6. Photo & Video Gallery */}
      <GallerySection gallery={gallery} />

      {/* 7. Location & Beach Map */}
      <LocationSection settings={settings} />

      {/* 8. FAQ Accordion */}
      <FAQAccordion
        faqs={faqs}
        whatsappNumber={settings.whatsappNumber}
      />
    </>
  );
}
