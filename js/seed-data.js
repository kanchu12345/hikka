// Default Seed Data for Hikka Surf School Firestore Database
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { db } from "./firebase-init.js";

export const DEFAULT_SEED_DATA = {
  settings_general: {
    businessName: "Hikka Surf School",
    brandHeart: "❤️",
    tagline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    whatsappNumber: "+94781739128",
    phoneNumber: "+94 78 173 9128",
    email: "info@hikkasurfschool.com",
    address: "Turtle Beach, Galle Road, Hikkaduwa (Near Hikka Tranz by Cinnamon), Sri Lanka",
    googleMapsUrl: "https://maps.app.goo.gl/coczrnnnajTi581G9",
    googleMapsEmbedIframe: "https://maps.google.com/maps?q=6.132555056990897,80.10058769999999&hl=en&z=18&output=embed",
    tripadvisorUrl: "https://www.tripadvisor.com",
    instagramUrl: "https://www.instagram.com/hikkasurf",
    facebookUrl: "https://web.facebook.com/profile.php?id=100088255598601",
    liveSurfReport: {
      waves: "2–4 ft Clean",
      waterTemp: "28°C (No Wetsuit)",
      condition: "Glassy Morning",
      lastUpdated: "Today 06:30 AM",
      isLive: true
    }
  },

  page_index: {
    heroHeadline: "Hikkaduwa Hikka\nSurf School",
    heroSubheadline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    heroDescription: "Discover Hikkaduwa with local instructors and guides. Enjoy surf lessons, snorkeling, turtle experiences, fishing, boat tours, day trips and more.",
    autoSwapInterval: 4500,
    heroImages: [
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

  page_surflessons: {
    rates: [
      {
        id: "beginner",
        name: "Beginner Surf Lesson",
        badge: "★ Most Popular",
        priceUsd: 25,
        unit: "USD / Person",
        duration: "1.5 Hours in Water",
        popular: true,
        features: [
          "Beginner-friendly coaching with step-by-step guidance",
          "Soft-top foam board & leash included",
          "UV rash guard & zinc sunblock provided",
          "Max 1:4 instructor to student ratio",
          "Free HD Action Photos included"
        ]
      },
      {
        id: "intermediate",
        name: "Intermediate Surf Coaching",
        badge: "Level 2 • Progression",
        priceUsd: 40,
        unit: "USD / Person",
        duration: "2.0 Hours in Water",
        popular: false,
        features: [
          "Paddling past the break & timing unbroken green waves",
          "Angled take-offs & establishing proper trim line",
          "Bottom turns, cutbacks & speed generation",
          "Hardboard progression (custom fiberglass/epoxy boards)",
          "In-depth video review & technique breakdown"
        ]
      },
      {
        id: "private",
        name: "Private 1:1 VIP Coaching",
        badge: "Fastest Progress",
        priceUsd: 35,
        unit: "USD / Person",
        duration: "1.5 Hours in Water",
        popular: false,
        features: [
          "Dedicated 1-on-1 personal surf coach",
          "Personalized ocean safety & wave selection",
          "Immediate feedback on every wave",
          "GoPro HD video analysis included"
        ]
      },
      {
        id: "couple",
        name: "Couple & Semi-Private (2 Persons)",
        badge: "Shared Value",
        priceUsd: 45,
        unit: "USD Total (2 Persons)",
        duration: "1.5 Hours in Water",
        popular: false,
        features: [
          "Private coach shared between 2 friends or couple",
          "Includes 2 surfboards, rash guards & leashes",
          "Fun, relaxed pace with joint photo package"
        ]
      },
      {
        id: "kids",
        name: "Kids & Family Surfing (Ages 5+)",
        badge: "Family Safe",
        priceUsd: 30,
        unit: "USD / Child",
        duration: "1.5 Hours in Water",
        popular: false,
        features: [
          "Patient 1-on-1 shallow water instruction",
          "Ultra-safe high-float foam surfboards",
          "Fun confidence-building ocean games"
        ]
      },
      {
        id: "package3",
        name: "3-Day Progressive Surf Course",
        badge: "Best Value",
        priceUsd: 70,
        unit: "USD (3 Lessons)",
        duration: "3 x 1.5 Hour Sessions",
        popular: false,
        features: [
          "Complete beginner to green-wave independent rider",
          "Paddling, positioning, trim lines & safety",
          "Daily video review with certificate of completion"
        ]
      },
      {
        id: "rental",
        name: "Surfboard Rental Only",
        badge: "50+ Board Quiver",
        priceUsd: 10,
        unit: "USD / Full Day",
        duration: "Full Day",
        popular: false,
        features: [
          "Choice of soft-tops, funboards, fish & shortboards",
          "Leash & wax included free",
          "Swap boards anytime during the day"
        ]
      }
    ],

    spots: [
      {
        id: "narigama",
        name: "Narigama Beach Break",
        badge: "Beginner / Improver",
        icon: "🏄 Sand Break",
        description: "Our home school base! 100% soft sandy bottom with waist-deep gentle peeling white water and clean shoulder-high green waves.",
        waveType: "Left & Right Beach Break",
        idealFor: "1st Timers, Beginners & Kids",
        seabed: "100% Soft Sand (No Rocks)"
      },
      {
        id: "main-reef",
        name: "Hikkaduwa Main Reef",
        badge: "Intermediate / Pro",
        icon: "🏄 Coral Reef",
        description: "Famous A-frame wave offering fast hollow right-handers and long peeling lefts. Great for speed generation and cutbacks.",
        waveType: "Powerful A-Frame Peak",
        idealFor: "Intermediate & Advanced",
        seabed: "Deep Coral Reef"
      },
      {
        id: "bennys",
        name: "Benny's Reef",
        badge: "Advanced Only",
        icon: "⚡ Fast Hollow Wave",
        description: "Fast, shallow, and hollow left-hand reef break for experienced surfers seeking heavy drops and barrel sections.",
        waveType: "Fast Peeling Left",
        idealFor: "Advanced & Tube Riders",
        seabed: "Shallow Coral Shelf"
      },
      {
        id: "inside-reef",
        name: "Inside Reef / North Jetty",
        badge: "Beginner / Longboard",
        icon: "🌴 Mellow Waves",
        description: "Sheltered harbor-wall break with peeling gentle rollers, ideal for cruisers and longboard styling.",
        waveType: "Mellow Rolling Waves",
        idealFor: "Longboarders & Cruisers",
        seabed: "Sand & Coral Mix"
      }
    ],

    quiver: {
      introTitle: "Find Your Perfect Surfboard",
      introDesc: "Select your experience level and body weight to get an instant recommendation from our 50+ board quiver.",
      rentalPricePerDay: 10,
      boardCount: "50+"
    },

    guidelines: [
      {
        id: "safety",
        title: "1. Safety & Wipeout Rules",
        icon: "🛡️",
        rules: [
          "Always Cover Your Head: When wiping out, protect your head with both arms before surfacing to avoid hitting your board or fins.",
          "Fall Flat (Starfish Fall): Always fall flat on the surface like a starfish. Never dive headfirst or jump straight down.",
          "Never Ditch Your Board: Hold firmly onto your board or use the leash. Never let go if other swimmers or surfers are behind you.",
          "Riptide Awareness: If you feel a seaward current, stay calm on your board and paddle parallel to the beach, not straight against it."
        ]
      },
      {
        id: "etiquette",
        title: "2. Lineup Priority & Surfing Etiquette",
        icon: "🤝",
        rules: [
          "Surfer Closest to the Peak Has Priority: The surfer paddling nearest the curling pocket has right of way. Never drop in.",
          "Do Not Snake: Wait your turn in the lineup patiently. Paddling around someone to steal priority is disrespectful.",
          "Paddle Wide: When paddling back out, take the channel or whitewater shoulder rather than cutting through the takeoff zone.",
          "Communicate Clearly: If a wave peaks in both directions, call 'Going Left' or 'Going Right' to avoid collisions."
        ]
      },
      {
        id: "sun-ocean",
        title: "3. Ocean & Sun Protection",
        icon: "☀️",
        rules: [
          "Reef-Safe Sunscreen & Zinc: Sri Lanka's tropical sun is intense. Use SPF 50+ water-resistant zinc on face, lips, and neck.",
          "Wear a UV Rash Guard: Protects your chest from wax rash and shields your shoulders from direct UV exposure.",
          "Stay Hydrated: Drink fresh king coconut water and electrolytes before and after every surf session.",
          "Know Your Limits: If conditions look bigger or rougher than your skill level, ask our local instructors for guidance."
        ]
      }
    ]
  },

  page_destinations: {
    destinations: [
      {
        id: "galle-fort",
        name: "Galle Dutch Fort",
        highlight: "UNESCO Ramparts & Lighthouse",
        duration: "25 Mins from Hikka",
        icon: "🏰",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        description: "Historic 16th-century fortress, lighthouse walk, colonial Dutch architecture, boutiques, and sunset ramparts."
      },
      {
        id: "mirissa-coast",
        name: "Mirissa & Weligama",
        highlight: "Whale Watching & Coconut Tree Hill",
        duration: "50 Mins from Hikka",
        icon: "🐋",
        imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
        description: "Blue whale & spinner dolphin boat safaris, iconic Coconut Tree Hill headland, and gentle beginner surf bays."
      },
      {
        id: "madu-river",
        name: "Madu River Mangroves",
        highlight: "64 Islands & Cinnamon Isle",
        duration: "25 Mins from Hikka",
        icon: "🚤",
        imageUrl: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80",
        description: "Serene boat safari through mangrove tunnels, cinnamon peeling demonstration, fish therapy, and island temples."
      },
      {
        id: "yala-safari",
        name: "Yala & Udawalawe Safari",
        highlight: "Wild Leopards & Ceylon Elephants",
        duration: "Full Day / 2.5 Hrs",
        icon: "🐆",
        imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
        description: "High-density leopard territory, wild mother & calf elephant herds, sloth bears, and crocodiles in 4x4 safari jeeps."
      }
    ]
  },

  page_activities: {
    activities: [
      {
        id: "surf-lessons",
        category: "surfing",
        title: "🏄 Surf Lessons",
        tagline: "Main Core Service • Narigama Beach",
        price_from: 25,
        duration: "1.5 Hours",
        description: "Learn to surf on sandy-bottom waves with certified local instructors. Beginner-friendly coaching with step-by-step guidance.",
        imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "snorkeling",
        category: "snorkeling",
        title: "🤿 Snorkeling",
        tagline: "Coral Reef & Marine Sanctuary",
        price_from: 20,
        duration: "1.5 - 2 Hours",
        description: "Explore crystal-clear waters, live coral formations, colorful tropical fish, and marine life with mask, snorkel, fins & guide.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "turtle-experiences",
        category: "turtles",
        title: "🐢 Turtle Experiences",
        tagline: "Wild Ocean Wildlife Lagoon",
        price_from: 20,
        duration: "1.5 Hours",
        description: "Meet friendly wild green sea turtles in their natural feeding lagoon on Hikkaduwa Beach with ethical guidance.",
        imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fishing-tours",
        category: "fishing",
        title: "🎣 Fishing Tours",
        tagline: "Deep Sea & Traditional",
        price_from: 70,
        duration: "3 - 4 Hours",
        description: "Catch Tuna, Mahi Mahi, and Wahoo with experienced boat captains. All rods, lures, safety equipment, and tackle provided.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "boat-tours",
        category: "boat",
        title: "🚤 Boat Tours",
        tagline: "Madu River & Coastal Cruises",
        price_from: 30,
        duration: "1.5 - 2 Hours",
        description: "Scenic boat journeys along coral reefs and the lush mangrove maze of the Madu Ganga with cinnamon island stop.",
        imageUrl: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "whale-watching",
        category: "whale_watching",
        title: "🐋 Whale Watching",
        tagline: "Mirissa Blue Whales & Dolphins",
        price_from: 55,
        duration: "Early Morning Tour",
        description: "Witness the largest mammals on earth with return AC transport from your Hikkaduwa hotel.",
        imageUrl: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },

  page_faq: {
    faqs: [
      {
        category: "Surfing",
        question: "Do I need previous surfing experience?",
        answer: "No. Beginners are welcome! Many of our guests are complete beginners trying surfing for the first time. We guide you step-by-step from beach theory to riding gentle waves."
      },
      {
        category: "Equipment",
        question: "Do you provide surfboards and rash guards?",
        answer: "Yes, high-float soft-top boards, progression hardboards, leashes, and UV sun protection rash guards are all included free with your lessons."
      },
      {
        category: "Family",
        question: "Can children and families join?",
        answer: "Yes, kids from 5 years and up can safely join with dedicated 1-on-1 shallow-water instruction."
      },
      {
        category: "Lessons",
        question: "Can I book private 1-on-1 coaching?",
        answer: "Yes, we offer dedicated Private 1-on-1 coaching for personalized progression and video review."
      },
      {
        category: "Booking",
        question: "How do I book?",
        answer: "Contact us through WhatsApp with your date, time, and number of people for instant confirmation. No deposit needed."
      },
      {
        category: "Tours",
        question: "Can you arrange snorkeling and ocean tours?",
        answer: "Yes, coral snorkeling, sea turtle tours, deep-sea fishing, lagoon safaris, and whale watching can all be arranged directly through our WhatsApp."
      },
      {
        category: "Transfers",
        question: "Can you arrange Sri Lanka day trips & airport transfers?",
        answer: "Yes, we provide comfortable AC cars and vans with trusted tourist drivers for Galle Fort, Bentota, Yala, Ella, and CMB airport pickups."
      }
    ]
  },

  page_about: {
    story: "Founded by lifelong Hikkaduwa surfers, Hikka Surf School is dedicated to sharing the joy of wave riding with travelers from all corners of the globe. Located directly on the golden sands of Narigama Beach, our certified local instructors combine deep ocean knowledge with patient, friendly coaching.",
    tagline: "Local Ocean Roots • Certified Coaches • 100% Passion",
    stats: [
      { label: "Happy Students", value: "15,000+" },
      { label: "Local Surf Coaches", value: "8+ Certified" },
      { label: "Board Quiver", value: "50+ Boards" },
      { label: "Years in Hikkaduwa", value: "12+ Years" }
    ],
    values: [
      { title: "Safety First", desc: "Shallow sandy bottom coaching with 100% focus on student security." },
      { title: "Ocean Preservation", desc: "Reef-safe practices, beach cleanups, and wild turtle habitat protection." },
      { title: "Authentic Local Heart", desc: "True Sri Lankan hospitality, community empowerment, and genuine passion." }
    ],
    coaches: [
      {
        name: "Kanchana & Team",
        role: "Lead Instructor & Founder",
        badge: "Head Coach",
        bio: "10+ years coaching thousands of travelers on Narigama Beach. ISA Level 1 Certified Surf Coach, expert wave forecaster, and certified SLSF beach lifeguard with advanced CPR training.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        tags: ["🏄 10+ Yrs Surfing", "🛡️ ISA Certified", "🛟 Lifeguard"]
      },
      {
        name: "Local Senior Coaches",
        role: "Beginner & Kids Coaching Pro",
        badge: "Beginner Specialist",
        bio: "Patient, encouraging, and specialized in helping complete beginners and young children stand up with confidence on their very first wave in safe, shallow sandy water.",
        imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80",
        tags: ["👶 Kids Safe", "🌊 Shallow Water", "💯 100% Stand Up"]
      },
      {
        name: "Turtle & Snorkel Captains",
        role: "Reef Sanctuary & Snorkel Guide",
        badge: "Ocean & Wildlife",
        bio: "Born in Hikkaduwa with innate knowledge of the coral sanctuary, tide patterns, and sea turtle behavior. Dedicated to respectful, eco-friendly marine interactions.",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
        tags: ["🐢 Turtle Safe", "🤿 Marine Guide", "🌿 Eco Certified"]
      }
    ]
  },

  page_contact: {
    address: "Turtle Beach, Galle Road, Hikkaduwa (Near Hikka Tranz by Cinnamon), Sri Lanka",
    phone: "+94 78 173 9128",
    whatsapp: "+94781739128",
    email: "info@hikkasurfschool.com",
    openingHours: "06:00 AM – 07:00 PM (Monday – Sunday, 7 Days a Week)",
    mapIframeUrl: "https://maps.google.com/maps?q=6.132555056990897,80.10058769999999&hl=en&z=18&output=embed",
    directionsNote: "Located right on the beach next to Hikka Tranz by Cinnamon hotel. Look for our surfboards and Hikka Surf School flags on the sand."
  },

  page_gallery: {
    items: [
      {
        id: "g1",
        category: "Surfing",
        imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80",
        title: "Surfing Narigama Beach",
        caption: "Catching clean morning waves on Narigama sandbars with Hikka Surf coaches."
      },
      {
        id: "g2",
        category: "Surfing",
        imageUrl: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1000&q=80",
        title: "Happy Surf Students",
        caption: "Big smiles after standing up and catching their first tropical wave."
      },
      {
        id: "g3",
        category: "Turtles",
        imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1000&q=80",
        title: "Sea Turtles in Hikkaduwa",
        caption: "Swimming with wild giant green turtles in shallow lagoon waters."
      },
      {
        id: "g4",
        category: "Snorkeling",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
        title: "Coral Reef Snorkeling",
        caption: "Vibrant coral gardens and exotic tropical reef fish in marine sanctuary."
      },
      {
        id: "g5",
        category: "Day Tours",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
        title: "Galle Dutch Fort Heritage",
        caption: "Exploring historic ramparts, lighthouse, and cobblestone colonial streets."
      },
      {
        id: "g6",
        category: "Day Tours",
        imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80",
        title: "Yala National Park Safari",
        caption: "Witnessing wild leopards and Asian elephants in their natural habitat."
      }
    ]
  }
};

// Seeder execution function
export async function seedInitialFirestoreData() {
  console.log("🌱 Seeding initial Firestore database documents...");
  await setDoc(doc(db, "settings", "general"), DEFAULT_SEED_DATA.settings_general, { merge: true });
  await setDoc(doc(db, "pages", "index"), DEFAULT_SEED_DATA.page_index, { merge: true });
  await setDoc(doc(db, "pages", "surf-lessons"), DEFAULT_SEED_DATA.page_surflessons, { merge: true });
  await setDoc(doc(db, "pages", "destinations"), DEFAULT_SEED_DATA.page_destinations, { merge: true });
  await setDoc(doc(db, "pages", "activities"), DEFAULT_SEED_DATA.page_activities, { merge: true });
  await setDoc(doc(db, "pages", "faq"), DEFAULT_SEED_DATA.page_faq, { merge: true });
  await setDoc(doc(db, "pages", "about"), DEFAULT_SEED_DATA.page_about, { merge: true });
  await setDoc(doc(db, "pages", "contact"), DEFAULT_SEED_DATA.page_contact, { merge: true });
  await setDoc(doc(db, "pages", "gallery"), DEFAULT_SEED_DATA.page_gallery, { merge: true });
  console.log("✅ Seeding complete! All pages, gallery, and settings are populated in Firestore.");
  return true;
}
