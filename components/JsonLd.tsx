import React from 'react';
import { SiteSettings, Activity, Tour, Review, FAQItem } from '@/lib/types';

interface JsonLdProps {
  settings: SiteSettings;
  pageType?: 'home' | 'activity' | 'tour' | 'reviews' | 'faq' | 'contact';
  activity?: Activity;
  tour?: Tour;
  reviews?: Review[];
  faqs?: FAQItem[];
  canonicalUrl?: string;
}

export default function JsonLd({
  settings,
  pageType = 'home',
  activity,
  tour,
  reviews = [],
  faqs = [],
  canonicalUrl = 'https://hikkasurfschool.com',
}: JsonLdProps) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['SportsActivityLocation', 'TouristInformationCenter', 'LocalBusiness'],
    '@id': 'https://hikkasurfschool.com/#organization',
    name: settings.businessName,
    alternateName: 'Hikka Surf School Hikkaduwa',
    description: settings.heroDescription,
    url: canonicalUrl,
    telephone: settings.phoneNumber,
    email: settings.email,
    priceRange: '$$',
    currenciesAccepted: 'USD, LKR, EUR, GBP',
    paymentAccepted: 'Cash, Bank Transfer, WhatsApp Pay',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Galle Road, Narigama Beach',
      addressLocality: 'Hikkaduwa',
      addressRegion: 'Southern Province',
      postalCode: '80240',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: settings.coordinates.lat,
      longitude: settings.coordinates.lng,
    },
    hasMap: settings.googleMapsUrl,
    image: [
      settings.heroMedia.url,
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:30',
        closes: '18:30',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: reviews.length > 0 ? reviews.length : '84',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      settings.googleBusinessUrl,
      settings.tripadvisorUrl,
      settings.instagramUrl,
      settings.facebookUrl,
    ].filter(Boolean),
  };

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  let activitySchema = null;
  if (activity) {
    activitySchema = {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: activity.title,
      description: activity.shortDescription,
      image: activity.heroImage,
      touristType: activity.suitableFor,
      isAccessibleForFree: false,
      offers: activity.packages.map((pkg) => ({
        '@type': 'Offer',
        name: pkg.title,
        price: pkg.priceUSD,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: pkg.description,
      })),
      provider: {
        '@id': 'https://hikkasurfschool.com/#organization',
      },
    };
  }

  let tourSchema = null;
  if (tour) {
    tourSchema = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: tour.title,
      description: tour.shortDescription,
      image: tour.heroImage,
      touristType: ['Travelers', 'Couples', 'Families'],
      offers: {
        '@type': 'Offer',
        price: tour.priceFromUSD,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      itinerary: {
        '@type': 'ItemList',
        itemListElement: tour.itinerary.map((step, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: step.stop,
          description: step.description,
        })),
      },
      provider: {
        '@id': 'https://hikkasurfschool.com/#organization',
      },
    };
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hikkasurfschool.com',
      },
      ...(activity
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Activities',
              item: 'https://hikkasurfschool.com/#activities',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: activity.title,
              item: `https://hikkasurfschool.com/activities/${activity.slug}`,
            },
          ]
        : tour
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Sri Lanka Tours',
              item: 'https://hikkasurfschool.com/tours',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: tour.title,
              item: `https://hikkasurfschool.com/tours/${tour.slug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {activitySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(activitySchema) }}
        />
      )}
      {tourSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
