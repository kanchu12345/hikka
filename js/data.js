// Master Data Store for Hikkaduwa Hikka Surf School
// Editable via Admin Panel (admin.html) and stored in localStorage

const DEFAULT_SITE_DATA = {
  settings: {
    businessName: "Hikkaduwa Hikka Surf School",
    brandHeart: "❤️",
    tagline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    heroHeadline: "❤️ Hikkaduwa Hikka Surf School",
    heroSubheadline: "Surf • Snorkel • Explore Hikkaduwa & Sri Lanka",
    heroDescription: "Discover Hikkaduwa with local instructors and guides. Enjoy surf lessons, snorkeling, turtle experiences, fishing, boat tours, day trips and more.",
    whatsappNumber: "+94771234567",
    phoneNumber: "+94 77 123 4567",
    email: "info@hikkasurfschool.com",
    address: "Galle Road, Narigama Beach, Hikkaduwa 80240, Sri Lanka (Opposite Hotel Citrus)",
    googleMapsUrl: "https://maps.app.goo.gl/RP85syvqnwpCjrDE9",
    googleMapsEmbedIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15871.277864387532!2d80.098485!3d6.136423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae177e776ffc1ab%3A0x28974a9ee1f3910c!2sHikkaduwa%20Beach!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk",
    tripadvisorUrl: "https://www.tripadvisor.com",
    instagramUrl: "https://www.instagram.com",
    facebookUrl: "https://www.facebook.com",
    googleBusinessUrl: "https://maps.app.goo.gl/RP85syvqnwpCjrDE9",
    announcementBanner: {
      enabled: true,
      text: "🌊 Hikkaduwa Surf Season is ON — Clean Waves & Perfect Water Temperature!",
      linkText: "Book on WhatsApp →"
    },
    heroMedia: {
      url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80"
    },
    aboutStory: {
      title: "Born on Hikkaduwa Beach",
      subtitle: "Authentic local surfers sharing Sri Lanka's ocean spirit.",
      content: [
        "Hikka Surf School is a local Hikkaduwa surf school founded by ocean lovers who grew up riding the legendary waves of Sri Lanka's southern coast. Our focus is simple: helping travelers enjoy the ocean safely, learn the genuine art of surfing, and discover our hometown through authentic local experiences.",
        "Whether it is your very first time standing up on a surfboard in gentle white-water, improving your cutback on green waves, or snorkeling alongside gentle giant sea turtles on the Hikkaduwa reef, we treat every guest like family.",
        "We believe in honest, grounded hospitality. All gear, rash guards, and safety briefings are provided, and all tours outside our direct school are coordinated transparently with respected local community partners."
      ],
      highlightQuote: "We don't just teach surfing; we share our deep connection to the ocean and the friendly warmth of Sri Lankan beach culture.",
      stats: [
        { label: "Years Coaching", value: "12+" },
        { label: "Beginners Stood Up", value: "3,500+" },
        { label: "Google Rating", value: "5.0 ★" },
        { label: "Local Ocean Guides", value: "100% Local" }
      ],
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    }
  },
  activities: [
    {
      id: "surf-lessons",
      slug: "surf-lessons.html",
      icon: "🏄",
      title: "Surf Lessons in Hikkaduwa",
      tagline: "Learn to Surf with Passionate Local Instructors",
      category: "surf",
      badge: "Core Main Service",
      badgeColor: "bg-amber-500",
      shortDescription: "Beginner to intermediate surf coaching for all ages. Individual 1-on-1 attention, soft-top boards, and guaranteed standing on your first lesson.",
      fullDescription: "Hikkaduwa offers some of Sri Lanka's finest wave setups, from gentle sandy beach breaks ideal for first-timers to peeling reef breaks for improving surfers. Our certified local surf coaches provide in-depth ocean safety, paddling technique, wave reading, and pop-up coaching in the water right beside you.",
      heroImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
      isPartnerActivity: false,
      buttonText: "View Surf Lessons",
      suitableFor: ["Complete Beginners", "Solo Travelers", "Couples", "Kids & Families (Ages 5+)", "Intermediate Surfers"],
      included: [
        "Top-grade surfboard (Soft-top beginner boards or hardboards)",
        "UV protective rash guard",
        "1-on-1 or small group instructor in the water at all times",
        "Beach theory & ocean safety briefing",
        "Fresh drinking water & photos upon request"
      ],
      whatToBring: ["Swimwear / boardshorts", "Sunscreen (reef-safe zinc recommended)", "Towel", "Dry change of clothes"],
      meetingPoint: "Hikka Surf School Beach Hut, Narigama Beach, Hikkaduwa (Opposite Hotel Citrus)",
      safetyInfo: "All lessons include a 15-minute beach safety session covering currents, sandbanks, board control, and wipeout protocols.",
      packages: [
        {
          id: "beginner-lesson",
          title: "Beginner Surf Lesson",
          subtitle: "Most Popular for First Timers",
          duration: "1.5 Hours",
          priceUSD: 25,
          priceLKR: 8000,
          badge: "Popular",
          description: "Comprehensive introduction to surfing covering pop-up technique, paddling, water safety, and coached wave-catching.",
          features: [
            "1.5 Hours in-water & beach coaching",
            "Surfboard & rash guard included",
            "Guaranteed standing up on board",
            "Photos & videos during lesson upon request"
          ],
          popular: true
        },
        {
          id: "private-surf-lesson",
          title: "Private 1-on-1 Lesson",
          subtitle: "Maximum Attention & Fast Progress",
          duration: "1.5 Hours",
          priceUSD: 35,
          priceLKR: 11000,
          badge: "VIP",
          description: "Dedicated private coach focused solely on your stance, wave timing, and technique refinement.",
          features: [
            "Dedicated private instructor 1:1",
            "Customized drills for your fitness and goals",
            "Personalized video feedback review",
            "Premium board selection"
          ]
        },
        {
          id: "semi-private-couple",
          title: "Semi-Private / Couple Lesson",
          subtitle: "Perfect for 2 Friends or Couples",
          duration: "1.5 Hours",
          priceUSD: 45,
          priceLKR: 14500,
          badge: "Best Value",
          description: "Two surfers with one dedicated private coach for fun, personalized learning together.",
          features: [
            "2 Participants with 1 Instructor",
            "All equipment & rash vests provided",
            "Action photos included",
            "Relaxed, fun beach atmosphere"
          ]
        },
        {
          id: "kids-family-surfing",
          title: "Kids & Family Surfing",
          subtitle: "Safe, Fun & Supportive",
          duration: "1.5 Hours",
          priceUSD: 30,
          priceLKR: 9500,
          badge: "Family",
          description: "Gentle, patient instruction tailored for children with extra safety supervision in shallow water.",
          features: [
            "Super-safe shallow water coaching",
            "High buoyancy soft boards",
            "Patient, child-friendly instructors",
            "Fun balance building"
          ]
        },
        {
          id: "intermediate-guiding",
          title: "Intermediate Coaching & Guiding",
          subtitle: "Lineup Navigation & Green Waves",
          duration: "2 Hours",
          priceUSD: 40,
          priceLKR: 13000,
          badge: "Progression",
          description: "Take your surfing past the white water into the lineup, learning bottom turns, cutbacks, and priority.",
          features: [
            "Lineup navigation & wave selection",
            "Turning & trim line technique",
            "Local secret reef & point breaks",
            "Detailed video analysis session"
          ]
        },
        {
          id: "surfboard-rental",
          title: "Surfboard Rental",
          subtitle: "Shortboards, Longboards & Foamies",
          duration: "Hourly / Full Day",
          priceUSD: 10,
          priceLKR: 3000,
          badge: "Rental",
          description: "Rent top-quality NSP, Torq, soft-tops, and epoxy boards with leash and wax.",
          features: [
            "Wide selection of 6'0 to 9'2 boards",
            "Includes leash, wax & fins",
            "Swap boards as conditions change",
            "Discounted multi-day rates"
          ]
        }
      ]
    },
    {
      id: "snorkeling",
      slug: "snorkeling.html",
      icon: "🤿",
      title: "Snorkeling in Hikkaduwa Coral Reef",
      tagline: "Explore Vibrant Coral Gardens & Marine Life",
      category: "ocean",
      badge: "Top Rated",
      badgeColor: "bg-cyan-600",
      shortDescription: "Discover Hikkaduwa National Marine Sanctuary. Clear waters, tropical fish, live corals, and gentle ocean currents with expert local snorkel guides.",
      fullDescription: "The Hikkaduwa Coral Reef is Sri Lanka's first marine national park, famous for its shallow lagoon shelter, colorful coral formations, angelfish, parrotfish, butterflyfish, and resident sea turtles. We provide sanitized masks, snorkels, fins, life jackets, and a local guide who knows where the clearest visibility and marine life gather.",
      heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      isPartnerActivity: false,
      buttonText: "Explore Snorkeling",
      suitableFor: ["Beginners & Non-Swimmers (with lifejackets)", "Families with Kids", "Couples", "Snorkel Enthusiasts"],
      included: ["Sanitized mask & dry snorkel", "Fins / flippers", "Life jacket / buoyancy aid", "Local guide in the water", "Safety briefing"],
      whatToBring: ["Swimwear", "Sunscreen (Reef-safe)", "Waterproof phone pouch or GoPro", "Towel"],
      meetingPoint: "Hikkaduwa Coral Reef Beach Entrance, Marine Sanctuary Road",
      safetyInfo: "We follow strict reef protection guidelines: never step on living corals, maintain safe distance from marine life.",
      packages: [
        {
          id: "guided-reef-snorkeling",
          title: "Guided Coral Reef Snorkeling",
          duration: "1.5 Hours",
          priceUSD: 20,
          priceLKR: 6500,
          badge: "Popular",
          description: "Guided snorkeling inside the calm Hikkaduwa Coral Sanctuary with colorful tropical reef fish.",
          features: ["All snorkel gear + lifejacket", "Local guide in the water", "Fish identification", "Small group size"],
          popular: true
        },
        {
          id: "private-family-snorkeling",
          title: "Private Family Snorkeling",
          duration: "2 Hours",
          priceUSD: 35,
          priceLKR: 11000,
          badge: "Family",
          description: "Private experience for your family with dedicated guide assistance for children and non-swimmers.",
          features: ["Private guide assistance", "Child-sized gear available", "Underwater photos upon request", "Safety ring available"]
        }
      ]
    },
    {
      id: "turtle-experiences",
      slug: "turtle-experiences.html",
      icon: "🐢",
      title: "Turtle Experiences & Snorkeling",
      tagline: "Meet Wild Giant Green Turtles in Their Natural Habitat",
      category: "ocean",
      badge: "Must Do",
      badgeColor: "bg-emerald-600",
      shortDescription: "Swim alongside friendly giant green sea turtles in Hikkaduwa's calm shallows. Ethical, non-intrusive wildlife encounters with local ocean guardians.",
      fullDescription: "Hikkaduwa is famous worldwide for the wild giant sea turtles that visit the shallow bay right in front of the beach every day. Observe these majestic creatures grazing on seaweed in crystal-clear water. We emphasize respectful, ethical wildlife interactions with zero feeding or disturbing.",
      heroImage: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80",
      isPartnerActivity: false,
      buttonText: "Explore Turtle Experiences",
      suitableFor: ["All Ages", "Children & Families", "Wildlife Lovers", "Couples"],
      included: ["Snorkel mask & life jacket", "Local turtle guide", "Responsible wildlife briefing", "Guidance to best viewing points"],
      whatToBring: ["Swimsuit", "GoPro / camera", "Towel", "Reef-safe sunscreen"],
      meetingPoint: "Hikkaduwa Turtle Beach Point, Hikkaduwa Beach",
      safetyInfo: "We practice 100% ethical viewing: never touch, ride, or corner turtles, maintaining at least 2 meters distance.",
      packages: [
        {
          id: "turtle-watching-snorkeling",
          title: "Turtle Snorkeling & Beach Walk",
          duration: "1.5 Hours",
          priceUSD: 20,
          priceLKR: 6500,
          badge: "Top Choice",
          description: "Snorkel with wild sea turtles in the shallow lagoon with expert guidance on turtle behavior and conservation.",
          features: ["Mask, snorkel & life jacket", "Ethical observation guide", "Great photo opportunities", "Morning best viewing time"],
          popular: true
        }
      ]
    },
    {
      id: "fishing-tours",
      slug: "fishing-tours.html",
      icon: "🎣",
      title: "Hikkaduwa Fishing Tours",
      tagline: "Traditional Coastal & Deep-Sea Ocean Adventures",
      category: "ocean",
      badge: "Local Captains",
      badgeColor: "bg-blue-600",
      shortDescription: "Experience authentic Sri Lankan ocean fishing. Traditional hand-line fishing, sunset trips, and deep-sea trolling arranged with veteran local captains.",
      fullDescription: "Join experienced Hikkaduwa fishermen aboard specialized local boats for an unforgettable angling trip. Target Tuna, Mahi-Mahi, Wahoo, Barracuda, and Trevally while taking in dramatic Indian Ocean coastal views.",
      heroImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      isPartnerActivity: true,
      partnerDisclaimer: "Available on request — arranged with trusted local licensed fishing boat partners.",
      buttonText: "Explore Fishing Tours",
      suitableFor: ["Fishing Enthusiasts", "Families", "Groups of Friends", "Couples"],
      included: ["Licensed fishing boat & captain", "All rods, lines, reels & bait", "Life vests & safety gear", "Bottled water & refreshments"],
      whatToBring: ["Sun hat & sunglasses", "Sunscreen", "Camera", "Light jacket"],
      meetingPoint: "Hikkaduwa Fishery Harbour / Beach Launching Point",
      safetyInfo: "All boats equipped with life vests, emergency communications, and operated by licensed captains.",
      packages: [
        {
          id: "coastal-fishing",
          title: "Traditional Coastal & Sunset Fishing",
          duration: "2.5 Hours",
          priceUSD: 50,
          priceLKR: 16000,
          badge: "Popular",
          description: "Authentic near-shore handline and bottom fishing using local techniques during sunset or sunrise.",
          features: ["All equipment & fresh bait", "Great sunset coastal views", "Catch reef fish & snappers", "Up to 3 persons included"],
          popular: true
        },
        {
          id: "deep-sea-fishing",
          title: "Deep-Sea Big Game Fishing",
          duration: "4 Hours",
          priceUSD: 130,
          priceLKR: 42000,
          badge: "Adventure",
          description: "Head 5 to 15 nautical miles offshore for trolling targeting pelagic game fish with modern rods and lures.",
          features: ["Professional trolling gear", "Experienced deep-sea crew", "Cold drinks & snacks", "Private boat for up to 4 persons"]
        }
      ]
    },
    {
      id: "boat-tours",
      slug: "boat-tours.html",
      icon: "🚤",
      title: "Hikkaduwa & Lagoon Boat Tours",
      tagline: "Scenic Mangrove Lagoons, Glass Bottom Boats & Ocean Cruises",
      category: "ocean",
      badge: "Scenic & Relaxing",
      badgeColor: "bg-indigo-600",
      shortDescription: "Glide through the tranquil Madu Ganga mangrove river or take a glass-bottom boat ride over Hikkaduwa's coral reef gardens.",
      fullDescription: "Discover the incredible biodiversity of Sri Lanka's waterways. From glass-bottom boat excursions over the shallow reefs of Hikkaduwa to peaceful river safaris through mangrove tunnels, cinnamon islands, and birdwatching sanctuaries on the Madu Ganga River.",
      heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      isPartnerActivity: true,
      partnerDisclaimer: "Available on request — arranged with trusted local boat operators.",
      buttonText: "Explore Boat Tours",
      suitableFor: ["Families with Kids", "Couples", "Seniors", "Nature Lovers"],
      included: ["Private or semi-private boat", "Experienced boat driver/guide", "Life jackets for all passengers", "Island visits (cinnamon, temple)"],
      whatToBring: ["Camera", "Sun protection", "Cash for island tips/cinnamon"],
      meetingPoint: "Hikkaduwa Harbour / Balapitiya Madu River Jetty (transport arranged)",
      safetyInfo: "Standard life vests provided. Boats operate on tranquil flat-water lagoons and sheltered bays.",
      packages: [
        {
          id: "glass-bottom-boat",
          title: "Glass-Bottom Coral Boat Tour",
          duration: "1 Hour",
          priceUSD: 20,
          priceLKR: 6500,
          badge: "Easy & Fun",
          description: "Peer through crystal-clear glass viewing panels to see live corals, sea turtles, and colorful marine fish.",
          features: ["Comfortable shaded boat", "Great for young kids & seniors", "Turtle viewing spot stop", "Direct beach departure"],
          popular: true
        },
        {
          id: "madu-river-safari",
          title: "Madu Ganga Mangrove River Safari",
          duration: "2.5 Hours",
          priceUSD: 45,
          priceLKR: 14500,
          badge: "Eco Tour",
          description: "Cruise through 64 islands, explore ancient Buddhist island temples, watch cinnamon peeling demonstrations, and enjoy natural fish therapy.",
          features: ["Mangrove cave exploration", "Cinnamon island demonstration", "Historic island temple visit", "Fish therapy spa experience"]
        }
      ]
    },
    {
      id: "whale-watching",
      slug: "whale-watching.html",
      icon: "🐋",
      title: "Mirissa Whale Watching from Hikkaduwa",
      tagline: "Witness Blue Whales & Dolphins in the Wild",
      category: "ocean",
      badge: "Seasonal (Nov-Apr)",
      badgeColor: "bg-sky-700",
      shortDescription: "Comfortable day trip from Hikkaduwa to Mirissa for seasonal Blue Whale and Spinner Dolphin watching aboard licensed passenger vessels.",
      fullDescription: "Sri Lanka's southern coast is one of the world's premier destinations to spot Blue Whales (the largest animal on Earth), Sperm Whales, and acrobatic pods of Spinner Dolphins. We arrange your early morning transfer from Hikkaduwa directly to Mirissa harbour with trusted, safety-inspected marine operators.",
      heroImage: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1200&q=80",
      isPartnerActivity: true,
      partnerDisclaimer: "Available on request (Nov - April season) — arranged with certified coast-guard registered Mirissa boat partners.",
      buttonText: "View Whale Watching",
      suitableFor: ["Wildlife Enthusiasts", "Families", "Couples", "Photographers"],
      included: ["Return AC transport from Hikkaduwa to Mirissa Harbour", "Coast Guard approved passenger boat ticket", "Breakfast pack & water onboard", "Life jackets & insurance"],
      whatToBring: ["Seasickness medication (recommended)", "Camera with zoom lens", "Sun hat & shades", "Light windbreaker jacket"],
      meetingPoint: "Pick-up directly from your hotel/villa in Hikkaduwa (approx 5:30 AM)",
      safetyInfo: "Boats adhere to wildlife observation protocols maintaining distance and slowing down near whale pods.",
      packages: [
        {
          id: "mirissa-whale-tour",
          title: "Mirissa Whale Watching Package",
          duration: "6-7 Hours Total",
          priceUSD: 65,
          priceLKR: 21000,
          badge: "Seasonal",
          description: "Early morning pickup from Hikkaduwa, fast coastal drive to Mirissa, 3-4 hour ocean cruise with 90%+ whale sighting rate in peak season.",
          features: ["Hotel pickup & drop-off in Hikkaduwa", "Coast guard inspected vessel", "Snack breakfast onboard", "Nov - Apr peak season"],
          popular: true
        }
      ]
    }
  ],
  tours: [
    {
      id: "galle-fort",
      title: "Galle Fort & Southern Heritage Tour",
      destination: "Galle, Sri Lanka (25 mins from Hikkaduwa)",
      duration: "Half Day or Full Day (4-6 Hours)",
      priceFromUSD: 35,
      priceFromLKR: 11500,
      badge: "UNESCO Heritage",
      shortDescription: "Explore the 16th-century Dutch colonial fortress, historic lighthouse, quaint cobblestone boutique alleys, and Japanese Peace Pagoda.",
      highlights: ["UNESCO World Heritage Ramparts", "Galle Lighthouse & Flag Rock", "Art galleries, cafes & colonial architecture", "Japanese Peace Pagoda view"],
      included: ["Private AC vehicle with English-speaking driver", "Fuel & parking charges", "Hotel pickup & drop-off", "Flexible itinerary stops"],
      heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "bentota-day-trip",
      title: "Bentota River Safari & Turtle Conservation",
      destination: "Bentota & Kosgoda (30 mins north)",
      duration: "Half Day (4-5 Hours)",
      priceFromUSD: 45,
      priceFromLKR: 14500,
      badge: "Family Favorite",
      shortDescription: "Visit Kosgoda Turtle Conservation Hatchery, explore Brief Garden by Bevis Bawa, and cruise the Bentota river.",
      highlights: ["Turtle conservation sanctuary", "Mangrove wildlife river cruise", "Traditional mask museum visit in Ambalangoda"],
      included: ["Private AC vehicle & driver", "All fuel & tolls", "Flexible timing"],
      heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "yala-safari",
      title: "Yala National Park Wildlife Safari",
      destination: "Yala National Park (approx 2.5 hrs)",
      duration: "Full Day (10-12 Hours)",
      priceFromUSD: 120,
      priceFromLKR: 39000,
      badge: "Wildlife Adventure",
      shortDescription: "Search for leopards, wild elephants, sloth bears, and crocodiles on an exciting 4x4 open-top jeep safari.",
      highlights: ["Highest leopard density in the world", "Wild elephant herds", "4x4 rugged open-top safari jeep", "Experienced local wildlife tracker"],
      included: ["Return private AC car transfer from Hikkaduwa", "4x4 Safari Jeep hire with driver", "Park entrance permit arrangements", "Highway tolls & fuel"],
      heroImage: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "ella-highlands",
      title: "Ella, Tea Plantations & Scenic Highlands",
      destination: "Ella / Nuwara Eliya / Kandy",
      duration: "1 Day or 2 Day Overnight Tour",
      priceFromUSD: 140,
      priceFromLKR: 45000,
      badge: "Hill Country",
      shortDescription: "Nine Arch Bridge, Little Adam's Peak, majestic Ravana Falls, lush green Ceylon tea estates, and misty mountain vistas.",
      highlights: ["Nine Arch Bridge train crossing", "Little Adam's Peak scenic viewpoint", "Ravana Falls & tea plantations", "Customizable overnight options"],
      included: ["Private dedicated AC vehicle & driver", "All fuel, parking & toll fees", "Luggage assistance & flexible stops"],
      heroImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80"
    }
  ],
  transfers: [
    {
      id: "airport-pickup",
      title: "Colombo Airport (CMB) ↔ Hikkaduwa Transfer",
      route: "Bandaranaike International Airport (CMB) to Hikkaduwa",
      vehicleType: "Modern AC Sedan Car (1-3 Pax) or AC Van (4-8 Pax)",
      duration: "Approx. 1.5 - 2 Hours via Southern Expressway",
      priceUSD: 45,
      priceLKR: 14500,
      features: [
        "Door-to-door direct highway transfer",
        "Flight tracking & complimentary waiting time",
        "Meet & greet with nameboard at arrivals gate",
        "Highway express tolls & fuel included",
        "Child seat available on prior request",
        "Luggage space for surfboards"
      ],
      description: "Start your Sri Lankan surf trip stress-free with our reliable 24/7 airport pickup. Our friendly driver meets you inside the arrivals hall."
    },
    {
      id: "private-driver-islandwide",
      title: "Private Driver & Vehicle Hire across Sri Lanka",
      route: "Custom multi-day routes (Hikkaduwa, Mirissa, Weligama, Kandy, Ella, Sigiriya)",
      vehicleType: "Comfortable AC Car / KDH High-Roof Van",
      duration: "Daily / Multi-Day Hire",
      priceUSD: 60,
      priceLKR: 19500,
      features: [
        "English-speaking professional tourist driver",
        "Clean, fully air-conditioned vehicles",
        "Flexible stops for photos, coconut stands, and food",
        "Surfboard roof racks available",
        "Daily rate includes driver accommodation"
      ],
      description: "Travel across Sri Lanka in comfort and total freedom with your own private driver. Perfect for surf trips hopping between south and east coast spots."
    }
  ],
  reviews: [
    {
      id: "rev-1",
      authorName: "Lukas & Sophie Mueller",
      authorLocation: "Munich, Germany",
      authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "2 weeks ago",
      source: "Google",
      activityReviewed: "Beginner Surf Lesson",
      text: "Best surf school in Hikkaduwa by far! My partner and I were complete beginners and honestly a bit nervous about the ocean waves. The instructors were so patient, encouraging, and made us feel 100% safe. We both stood up on our very first wave! Unforgettable experience.",
      verified: true
    },
    {
      id: "rev-2",
      authorName: "Elena Rostova",
      authorLocation: "Prague, Czech Republic",
      authorPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "1 month ago",
      source: "Google",
      activityReviewed: "Turtle Snorkeling",
      text: "Swimming with the giant wild sea turtles in Hikkaduwa was a dream come true. Our local guide was fantastic — he showed us the clearest spots and made sure we respected the animals. Also booked a surf lesson the next day through WhatsApp in seconds. 10/10 service!",
      verified: true
    },
    {
      id: "rev-3",
      authorName: "James Thornton",
      authorLocation: "Melbourne, Australia",
      authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "3 weeks ago",
      source: "Google",
      activityReviewed: "Intermediate Surf Coaching",
      text: "As an intermediate surfer trying to progress from whitewash to unbroken green waves, the video debrief and lineup positioning coaching were gold. Friendly local vibe, top quality boards, and zero BS. Don't look anywhere else in Hikkaduwa.",
      verified: true
    },
    {
      id: "rev-4",
      authorName: "Sarah & Oliver Jenkins",
      authorLocation: "London, UK",
      authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      date: "2 months ago",
      source: "Google",
      activityReviewed: "Family Surfing & Galle Trip",
      text: "We visited Hikkaduwa with our two kids (ages 8 and 11). The guys at Hikka Surf School were brilliant with the children. Super safe, huge smiles all round! They also organized an airport pickup and Galle Fort tour for us with a great driver.",
      verified: true
    }
  ],
  gallery: [
    { id: "gal-1", title: "Surfing in Hikkaduwa Waves", category: "Surfing", imageUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80", caption: "Catching morning clean waves at Narigama beach break." },
    { id: "gal-2", title: "Giant Sea Turtle Encounter", category: "Turtles", imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1000&q=80", caption: "Swimming alongside a wild green sea turtle in Hikkaduwa bay." },
    { id: "gal-3", title: "Coral Reef Snorkeling", category: "Snorkeling", imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80", caption: "Vibrant tropical fish inside the marine sanctuary." },
    { id: "gal-4", title: "Sunset Surfing Vibes", category: "Surfing", imageUrl: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1000&q=80", caption: "Golden hour surf session in Hikkaduwa." },
    { id: "gal-5", title: "Happy Surf Students", category: "Happy Customers", imageUrl: "https://images.unsplash.com/photo-1507525428033-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", caption: "Smiles all around after catching their first waves." },
    { id: "gal-6", title: "Traditional Coastal Fishing", category: "Fishing", imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80", caption: "Sunset coastal fishing expedition on the Indian Ocean." },
    { id: "gal-7", title: "Scenic Boat Cruise", category: "Boats", imageUrl: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=1000&q=80", caption: "Exploring tranquil mangrove river waterways." },
    { id: "gal-8", title: "Galle Fort Lighthouse", category: "Sri Lanka", imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80", caption: "Historic UNESCO lighthouse just 25 minutes from Hikkaduwa." },
    { id: "gal-9", title: "Hikkaduwa Golden Beach", category: "Hikkaduwa", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", caption: "Pristine palm-lined coastline of Hikkaduwa." }
  ],
  faqs: [
    {
      id: "faq-1",
      category: "Surfing",
      question: "Do I need previous surfing experience?",
      answer: "No previous experience is needed! Our beginner lessons are specifically designed for first-timers of all fitness levels. We begin with a safe beach theory briefing before guiding you into easy, waist-deep white water waves."
    },
    {
      id: "faq-2",
      category: "Surfing",
      question: "Do you provide surfboards and rash guards?",
      answer: "Yes! All beginner soft-top boards, high-performance epoxy boards, leashes, and UV protective rash guards are included free of charge with all lesson packages."
    },
    {
      id: "faq-3",
      category: "Surfing",
      question: "Can children join surf lessons?",
      answer: "Yes! Children from 5 years and older can safely join our kids surf lessons. Our instructors provide 1-on-1 supervision in shallow water to ensure complete comfort, safety, and confidence."
    },
    {
      id: "faq-4",
      category: "Surfing",
      question: "Can I book a private 1-on-1 lesson?",
      answer: "Yes! We offer dedicated private lessons with your own coach for maximum personal attention, accelerated learning, and tailored wave analysis."
    },
    {
      id: "faq-5",
      category: "Booking & Payments",
      question: "How do I book an activity or surf lesson?",
      answer: "Booking is quick and simple via WhatsApp! Just click any 'Book Now' button on our website to send us your date, group size, and preferred time. We will confirm your slot instantly with no complicated advance paperwork."
    },
    {
      id: "faq-6",
      category: "Snorkeling & Wildlife",
      question: "Can you arrange snorkeling, turtle experiences, and boat tours?",
      answer: "Yes! We organize snorkeling at Hikkaduwa Coral Reef, wild turtle encounters, glass bottom boat trips, fishing tours, and river safaris daily."
    },
    {
      id: "faq-7",
      category: "Day Trips & Transport",
      question: "Can you arrange Sri Lanka day trips and airport transfers?",
      answer: "Yes! We arrange reliable private AC transport with friendly English-speaking drivers for Galle Fort, Bentota, Yala Safari, Ella, Kandy, and 24/7 Colombo Airport (CMB) pickups."
    },
    {
      id: "faq-8",
      category: "General",
      question: "Where is Hikka Surf School located?",
      answer: "We are located right on Narigama Beach, Galle Road, Hikkaduwa, Sri Lanka — directly opposite Hotel Citrus and right on the beach where the best beginner and intermediate waves break."
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
