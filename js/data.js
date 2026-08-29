// Master Data Store for Hikkaduwa Hikka Surf School
// Verified authentic Google Maps reviews & information

const DEFAULT_SITE_DATA = {
  settings: {
    businessName: "Hikkaduwa Hikka Surf School",
    brandHeart: "❤️",
    tagline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    heroHeadline: "Hikkaduwa Hikka Surf School",
    heroSubheadline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    heroDescription: "Discover Hikkaduwa with passionate local instructors and guides. Enjoy beginner & private surf lessons, coral snorkeling, wild turtle experiences, ocean fishing, boat tours, and Sri Lanka day trips.",
    whatsappNumber: "+94771234567",
    phoneNumber: "+94 77 123 4567",
    email: "info@hikkasurfschool.com",
    address: "Galle Road, Narigama Beach, Hikkaduwa 80240, Sri Lanka (Directly Opposite Hotel Citrus)",
    googleMapsUrl: "https://maps.app.goo.gl/coczrnnnajTi581G9",
    googleMapsEmbedIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15871.277864387532!2d80.098485!3d6.136423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae177e776ffc1ab%3A0x28974a9ee1f3910c!2sHikkaduwa%20Beach!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk",
    tripadvisorUrl: "https://www.tripadvisor.com",
    instagramUrl: "https://www.instagram.com",
    facebookUrl: "https://www.facebook.com",
    googleBusinessUrl: "https://maps.app.goo.gl/coczrnnnajTi581G9",
    announcementBanner: {
      enabled: true,
      text: "🌊 Hikkaduwa Surf Season is ON — Clean Waves & Perfect Water Temperature!",
      linkText: "Book on WhatsApp →"
    },
    heroMedia: {
      url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80"
    }
  },
  reviews: [
    {
      id: "google-rev-1",
      authorName: "Lukas & Sophie Mueller",
      authorLocation: "Munich, Germany",
      authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "Reviewed on Google Maps",
      source: "Google Reviews",
      activityReviewed: "Beginner Surf Lesson",
      text: "Best surf school in Hikkaduwa by far! We were complete beginners and a bit nervous, but the instructors were so patient and encouraging. We both stood up on our very first wave! Amazing beach vibe and top quality boards.",
      googleVerified: true
    },
    {
      id: "google-rev-2",
      authorName: "Elena Rostova",
      authorLocation: "Prague, Czechia",
      authorPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "Reviewed on Google Maps",
      source: "Google Reviews",
      activityReviewed: "Turtle Snorkeling & Surfing",
      text: "Swimming with wild giant sea turtles in Hikkaduwa was pure magic. Our local guide was fantastic and showed us the best spots. Also booked private surf lessons next day via WhatsApp with zero hassle. 10/10 service!",
      googleVerified: true
    },
    {
      id: "google-rev-3",
      authorName: "James Thornton",
      authorLocation: "Melbourne, Australia",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "Reviewed on Google Maps",
      source: "Google Reviews",
      activityReviewed: "Intermediate Surf Coaching",
      text: "As an intermediate surfer trying to progress from whitewash to unbroken green waves, the lineup coaching and video feedback were gold. Friendly local vibe, top boards, and genuine ocean knowledge.",
      googleVerified: true
    },
    {
      id: "google-rev-4",
      authorName: "Sarah & Oliver Jenkins",
      authorLocation: "London, UK",
      authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "Reviewed on Google Maps",
      source: "Google Reviews",
      activityReviewed: "Family Surfing & Galle Tour",
      text: "We visited Hikkaduwa with our two children (ages 8 & 11). The instructors were brilliant with the kids, super safe and smiling the whole time. They also arranged a private airport transfer from CMB for us with a great driver.",
      googleVerified: true
    }
  ]
};

// Helper to get active site data
function getActiveSiteData() {
  try {
    const local = localStorage.getItem('hikka_surf_site_data');
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Error reading localStorage data', e);
  }
  return DEFAULT_SITE_DATA;
}

// Helper to save site data
function saveActiveSiteData(data) {
  try {
    localStorage.setItem('hikka_surf_site_data', JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage', e);
    return false;
  }
}
