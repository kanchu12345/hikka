export interface SiteSettings {
  businessName: string;
  brandHeart: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  googleMapsEmbedIframe: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tripadvisorUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  googleBusinessUrl: string;
  announcementBanner: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  heroMedia: {
    type: 'image' | 'video';
    url: string;
    posterUrl?: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    pillars: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  aboutStory: {
    title: string;
    subtitle: string;
    content: string[];
    highlightQuote: string;
    instructorExperienceYears: number;
    stats: {
      label: string;
      value: string;
    }[];
    imageUrl: string;
  };
}

export interface ActivityPackage {
  id: string;
  title: string;
  subtitle?: string;
  duration: string;
  priceUSD: number;
  priceLKR: number;
  badge?: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Activity {
  id: string;
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  category: 'surf' | 'ocean' | 'tours' | 'transport';
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  galleryImages: string[];
  isPartnerActivity: boolean;
  partnerDisclaimer?: string;
  buttonText: string;
  suitableFor: string[];
  included: string[];
  whatToBring: string[];
  meetingPoint: string;
  safetyInfo: string;
  packages: ActivityPackage[];
  faqs: {
    question: string;
    answer: string;
  }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  priceFromUSD: number;
  priceFromLKR: number;
  badge?: string;
  shortDescription: string;
  itinerary: {
    time?: string;
    stop: string;
    description: string;
  }[];
  highlights: string[];
  included: string[];
  heroImage: string;
  isPartnerActivity: boolean;
  partnerDisclaimer?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface Transfer {
  id: string;
  title: string;
  route: string;
  vehicleType: string;
  duration: string;
  priceUSD: number;
  priceLKR: number;
  features: string[];
  description: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorLocation: string;
  authorPhoto?: string;
  rating: number;
  date: string;
  source: 'Google' | 'TripAdvisor';
  activityReviewed: string;
  text: string;
  verified: boolean;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Surfing' | 'Ocean' | 'Snorkeling' | 'Turtles' | 'Fishing' | 'Boats' | 'Hikkaduwa' | 'Sri Lanka' | 'Happy Customers';
  imageUrl: string;
  thumbnailUrl?: string;
  caption?: string;
}

export interface FAQItem {
  id: string;
  category: 'Surfing' | 'Snorkeling & Wildlife' | 'Booking & Payments' | 'Day Trips & Transport' | 'General';
  question: string;
  answer: string;
  order: number;
}

export interface SEOPageData {
  pagePath: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}

export interface LeadInquiry {
  id: string;
  createdAt: string;
  name: string;
  contactNumber: string;
  activity: string;
  date: string;
  guestsCount: number;
  preferredTime: string;
  notes?: string;
  channel: 'WhatsApp' | 'WebForm';
  status: 'new' | 'contacted' | 'booked' | 'cancelled';
}

export interface SiteDatabase {
  settings: SiteSettings;
  activities: Activity[];
  tours: Tour[];
  transfers: Transfer[];
  reviews: Review[];
  gallery: GalleryItem[];
  faqs: FAQItem[];
  seoPages: Record<string, SEOPageData>;
  inquiries: LeadInquiry[];
  adminPasswordHash?: string;
}
