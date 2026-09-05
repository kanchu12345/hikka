// Master Data Store for Hikkaduwa Hikka Surf School
// Dynamic schema matching Firebase Firestore collections

const DEFAULT_SITE_DATA = {
  settings: {
    businessName: "Hikkaduwa Hikka Surf School",
    brandHeart: "❤️",
    tagline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    heroHeadline: "Hikkaduwa Hikka\nSurf School",
    heroSubheadline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    heroDescription: "Discover Hikkaduwa with local instructors and guides. Enjoy surf lessons, snorkeling, turtle experiences, fishing, boat tours, day trips and more.",
    whatsappNumber: "+94771234567",
    phoneNumber: "+94 77 123 4567",
    email: "info@hikkasurfschool.com",
    address: "Turtle Beach, Galle Road, Hikkaduwa (Near Hikka Tranz by Cinnamon), Sri Lanka",
    googleMapsUrl: "https://maps.app.goo.gl/coczrnnnajTi581G9",
    googleMapsEmbedIframe: "https://maps.google.com/maps?q=6.132555056990897,80.10058769999999&hl=en&z=18&output=embed",
    tripadvisorUrl: "https://www.tripadvisor.com",
    instagramUrl: "https://www.instagram.com/hikkasurf",
    facebookUrl: "https://web.facebook.com/profile.php?id=100088255598601",
    googleBusinessUrl: "https://maps.app.goo.gl/coczrnnnajTi581G9",
    liveSurfReport: {
      waves: "2–4 ft Clean",
      waterTemp: "28°C (No Wetsuit)",
      condition: "Glassy Morning",
      isLive: true,
      lastUpdated: "Today 06:30 AM"
    },
    autoSwapInterval: 4500, // ms per hero slide
    hero_images: [
      {
        url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80",
        caption: "Clean Morning Waves on Narigama Beach, Hikkaduwa"
      },
      {
        url: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1920&q=80",
        caption: "Golden Sunset Surfing in Tropical 28°C Waters"
      },
      {
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80",
        caption: "Hikkaduwa Coral Reef & Marine Sanctuary"
      },
      {
        url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1920&q=80",
        caption: "Wild Sea Turtle Encounters in Shallow Lagoons"
      }
    ]
  },
  destinations: [
    {
      id: "galle-fort",
      name: "Galle Dutch Fort",
      highlight: "UNESCO Ramparts & Lighthouse",
      duration: "25 Mins from Hikka",
      icon: "🏰",
      imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80",
      description: "Historic 16th-century fortress, lighthouse walk, colonial Dutch architecture, boutiques, and sunset ramparts."
    },
    {
      id: "mirissa-coast",
      name: "Mirissa & Weligama",
      highlight: "Whale Watching & Coconut Tree Hill",
      duration: "50 Mins from Hikka",
      icon: "🐋",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      description: "Blue whale & spinner dolphin boat safaris, iconic Coconut Tree Hill headland, and gentle beginner surf bays."
    },
    {
      id: "madu-river",
      name: "Madu River Mangroves",
      highlight: "64 Islands & Cinnamon Isle",
      duration: "25 Mins from Hikka",
      icon: "🚤",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      description: "Serene boat safari through mangrove tunnels, cinnamon peeling demonstration, fish therapy, and island temples."
    },
    {
      id: "yala-safari",
      name: "Yala & Udawalawe Safari",
      highlight: "Wild Leopards & Ceylon Elephants",
      duration: "Full Day / 2.5 Hrs",
      icon: "🐆",
      imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80",
      description: "High-density leopard territory, wild mother & calf elephant herds, sloth bears, and crocodiles in 4x4 safari jeeps."
    }
  ],
  activities: [
    {
      id: "surf-lessons",
      category: "surfing",
      title: "🏄 Surf Lessons",
      tagline: "Main Core Service • Narigama Beach",
      price_from: 25,
      duration: "1.5 Hours",
      images: [
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Beginner Surf Lessons",
        "Private 1:1 Surf Lessons",
        "Semi-Private & Couples",
        "Kids & Family Surfing",
        "Intermediate Coaching",
        "Surfboard Rental"
      ],
      description: "Learn to surf on sandy-bottom waves with patient local instructors. 100% stand up guarantee.",
      pageUrl: "surf-lessons.html",
      is_partner_activity: false,
      order: 1
    },
    {
      id: "snorkeling",
      category: "snorkeling",
      title: "🤿 Snorkeling",
      tagline: "Coral Reef & Marine Life",
      price_from: 20,
      duration: "1.5 - 2 Hours",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Hikkaduwa Coral Reef",
        "Turtle Snorkeling Tours",
        "Private Snorkeling Trips",
        "Family Shallow Snorkel"
      ],
      description: "Explore crystal-clear waters, live coral formations, colorful fish, and marine life with mask, fins, and guide.",
      pageUrl: "snorkeling.html",
      is_partner_activity: false,
      order: 2
    },
    {
      id: "turtle-experiences",
      category: "turtles",
      title: "🐢 Turtle Experiences",
      tagline: "Wild Ocean Wildlife",
      price_from: 20,
      duration: "1.5 Hours",
      images: [
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Wild Turtle Watching",
        "Turtle Snorkeling",
        "Responsible Wildlife Tours",
        "Natural Habitat Protection"
      ],
      description: "Meet friendly wild green sea turtles in their natural feeding lagoon with ethical guidance.",
      pageUrl: "turtle-experiences.html",
      is_partner_activity: false,
      order: 3
    },
    {
      id: "fishing-tours",
      category: "fishing",
      title: "🎣 Fishing Tours",
      tagline: "Traditional & Deep Sea",
      price_from: 70,
      duration: "3 - 4 Hours",
      images: [
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Traditional Local Fishing",
        "Deep-Sea Game Fishing",
        "Private Fishing Charters",
        "Sunset Reef Fishing"
      ],
      description: "Catch Tuna, Mahi Mahi, and Wahoo with experienced boat captains. All rods and tackle provided.",
      pageUrl: "fishing-tours.html",
      is_partner_activity: true,
      order: 4
    },
    {
      id: "boat-tours",
      category: "boat",
      title: "🚤 Boat Tours",
      tagline: "Madu River & Coastline",
      price_from: 30,
      duration: "1.5 - 2 Hours",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Private Boat Trips",
        "Lagoon & River Safaris",
        "Sunset Boat Tours",
        "Coastal Glass-Bottom Boats"
      ],
      description: "Scenic boat journeys along coral reefs and the lush mangrove maze of the Madu Ganga.",
      pageUrl: "boat-tours.html",
      is_partner_activity: true,
      order: 5
    },
    {
      id: "whale-watching",
      category: "whale_watching",
      title: "🐋 Whale Watching",
      tagline: "Mirissa Blue Whales",
      price_from: 55,
      duration: "Early Morning Tour",
      images: [
        "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Hikkaduwa → Mirissa Tour",
        "Blue Whales & Dolphins",
        "Private & Group Options",
        "Seasonal Prime Viewing"
      ],
      description: "Witness the largest mammals on earth with return AC transport from your Hikkaduwa hotel.",
      pageUrl: "whale-watching.html",
      is_partner_activity: true,
      order: 6
    },
    {
      id: "day-trips",
      category: "day_trips",
      title: "🌴 Sri Lanka Day Trips",
      tagline: "Galle, Ella, Yala & Kandy",
      price_from: 35,
      duration: "Half / Full Day",
      images: [
        "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Galle Fort UNESCO Heritage",
        "Bentota River Safari",
        "Ella Scenic Highlands & Tea",
        "Yala Wildlife Leopard Safari"
      ],
      description: "Explore the island in air-conditioned private vehicles with trusted local drivers.",
      pageUrl: "tours.html",
      is_partner_activity: true,
      order: 7
    },
    {
      id: "transfers",
      category: "transfers",
      title: "🚕 Transfers & Transport",
      tagline: "Colombo Airport (CMB) ⇄ Hikka",
      price_from: 45,
      duration: "Expressway Highway",
      images: [
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
      ],
      included_items: [
        "Airport Pickup CMB ⇄ Hikka",
        "Intercity Private Driver",
        "Day-Trip Transportation",
        "Modern AC Vans & Cars"
      ],
      description: "Reliable, comfortable 24/7 door-to-door airport pickup with flight tracking and highway tolls included.",
      pageUrl: "transfers.html",
      is_partner_activity: true,
      order: 8
    }
  ],
  why_choose_us: [
    {
      title: "Local Experience",
      description: "Local instructors who grew up in Hikkaduwa with profound knowledge of tides, sandbars, and wave timing.",
      icon: "🏄‍♂️"
    },
    {
      title: "Personal Attention",
      description: "Private 1:1 and small-group experiences ensuring you get feedback and support on every single wave.",
      icon: "👥"
    },
    {
      title: "More Than Surfing",
      description: "Explore the ocean, wildlife, beaches, and Sri Lanka's cultural heritage with welcoming local friends.",
      icon: "🌴"
    },
    {
      title: "Easy Booking",
      description: "Simple and fast WhatsApp booking with zero advance deposit required. Free weather rescheduling.",
      icon: "⚡"
    },
    {
      title: "Trusted by Travelers",
      description: "Consistent 5.0 Google Reviews from guests across Europe, UK, Australia, and worldwide.",
      icon: "⭐"
    },
    {
      title: "Local Connections",
      description: "Activities arranged seamlessly with trusted, safety-verified local boat captains and licensed tourist drivers.",
      icon: "🤝"
    }
  ],
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
      text: "Best surf school in Hikkaduwa by far! We were complete beginners and a bit nervous, but the instructors were so patient and encouraging. We both stood up on our very first wave!",
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
      text: "Swimming with wild giant sea turtles in Hikkaduwa was pure magic. Our local guide was fantastic and showed us the best spots. Also booked private surf lessons next day via WhatsApp.",
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
      text: "As an intermediate surfer trying to progress from whitewash to unbroken green waves, the lineup coaching and video feedback were gold. Friendly local vibe and top boards.",
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
      text: "We visited Hikkaduwa with our two children. The instructors were brilliant with the kids, super safe and smiling the whole time. They also arranged an airport transfer from CMB.",
      googleVerified: true
    }
  ],
  gallery: [
    {
      id: "g1",
      category: "Surfing",
      imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80",
      title: "Surfing Narigama Beach",
      caption: "Catching clean waves on Narigama beach with Hikka Surf coaches."
    },
    {
      id: "g2",
      category: "Surfing",
      imageUrl: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1000&q=80",
      title: "Happy Surf Students",
      caption: "Big smiles after standing up on tropical waves."
    },
    {
      id: "g3",
      category: "Turtles",
      imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1000&q=80",
      title: "Sea Turtles in Hikkaduwa",
      caption: "Swimming with wild giant sea turtles in shallow lagoons."
    },
    {
      id: "g4",
      category: "Snorkeling",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
      title: "Coral Reef Sanctuary",
      caption: "Tropical fish and colorful coral gardens."
    },
    {
      id: "g5",
      category: "Boats",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
      title: "Madu River Safari",
      caption: "Cruising through mangrove tunnels and cinnamon islands."
    },
    {
      id: "g6",
      category: "Sri Lanka",
      imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80",
      title: "Galle Fort Heritage",
      caption: "Historic ramparts and colonial streets on our day trips."
    }
  ],
  faqs: [
    {
      question: "Do I need previous surfing experience?",
      answer: "No. Beginners are welcome! Over 80% of our guests have never touched a surfboard before. We guide you step-by-step from beach theory to riding gentle waves."
    },
    {
      question: "Do you provide surfboards and rash guards?",
      answer: "Yes, high-float soft-top boards, progression hardboards, leashes, and UV sun protection rash guards are all included free with your lessons."
    },
    {
      question: "Can children and families join?",
      answer: "Yes, kids from 5 years and up can safely join with dedicated 1-on-1 shallow-water instruction."
    },
    {
      question: "Can I book privately?",
      answer: "Yes, we offer dedicated Private 1-on-1 coaching for personalized progression and video review."
    },
    {
      question: "How do I book?",
      answer: "Contact us through WhatsApp with your date, time, and number of people for instant confirmation. No deposit needed."
    },
    {
      question: "Can you arrange snorkeling and other activities?",
      answer: "Yes, coral snorkeling, sea turtle tours, deep-sea fishing, lagoon safaris, and whale watching can all be arranged directly through our WhatsApp."
    },
    {
      question: "Can you arrange Sri Lanka day trips & airport transfers?",
      answer: "Yes, we provide comfortable AC cars and vans with trusted tourist drivers for Galle Fort, Bentota, Yala, Ella, and CMB airport pickups."
    }
  ]
};

// Data Store Accessor with dual-layer fallback
function getActiveSiteData() {
  try {
    const local = localStorage.getItem('hikka_surf_site_data');
    if (local) {
      const parsed = JSON.parse(local);
      return Object.assign({}, DEFAULT_SITE_DATA, parsed);
    }
  } catch (e) {
    console.error('Error reading localStorage data', e);
  }
  return DEFAULT_SITE_DATA;
}

function saveActiveSiteData(data) {
  try {
    localStorage.setItem('hikka_surf_site_data', JSON.stringify(data));
    // Trigger custom event so open tabs or live views update immediately
    window.dispatchEvent(new CustomEvent('hikkaDataUpdated', { detail: data }));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage', e);
    return false;
  }
}
