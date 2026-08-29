# ❤️ Hikkaduwa Hikka Surf School

> **Surf • Snorkel • Explore Hikkaduwa & Sri Lanka**
> High-conversion, mobile-first website with full Content Management System (Admin Panel) and 100% SEO optimization.

---

## 🌊 Overview

Built specifically for **Hikkaduwa Hikka Surf School** ([Google Maps Location](https://maps.app.goo.gl/RP85syvqnwpCjrDE9)) to showcase surfing as the core service while generating high-margin WhatsApp bookings for coral reef snorkeling, giant sea turtle experiences, ocean fishing tours, lagoon boat trips, Mirissa whale watching, and private Sri Lanka day trips & airport transfers.

---

## 🚀 Key Features

### 1. High-Converting Frontend
- **Homepage Hero**: Vibrant oceanic tropical hero with direct WhatsApp booking CTA (`BOOK YOUR EXPERIENCE → WhatsApp`) and activity explorer.
- **8 Core Experiences Showcase**:
  - 🏄 **Surf Lessons**: Beginner, Private 1-on-1, Semi-Private couples, Kids & Family, Intermediate coaching, and surfboard rental.
  - 🤿 **Snorkeling Tours**: Hikkaduwa Coral Reef Sanctuary with equipment and guide.
  - 🐢 **Turtle Experiences**: Ethical wild sea turtle watching & snorkeling in shallow bay.
  - 🎣 **Fishing Tours**: Traditional coastal & deep-sea big game fishing *(partner notice)*.
  - 🚤 **Boat Tours**: Glass-bottom reef boat & Madu River mangrove safari *(partner notice)*.
  - 🐋 **Whale Watching**: Mirissa seasonal Blue Whale watching *(partner notice)*.
  - 🌴 **Sri Lanka Day Trips**: Galle Fort UNESCO, Bentota, Colombo, Kandy, Ella, Yala Safari.
  - 🚕 **Transfers & Transport**: 24/7 Colombo Airport (CMB) pickup/drop-off & private driver hire.
- **Core Surfing Spotlight**: Dedicated section establishing surfing as the main brand service.
- **Why Choose Us**: 6 Trust pillars with local experience, personal attention, and Google reviews.
- **Google Reviews**: Authentic 5.0-star traveler review cards with write-review trigger.
- **Photo & Video Gallery**: Interactive category filtering and modal lightbox.
- **Location & Beach Guide**: Embedded interactive Google Map and meeting point directions on Narigama Beach.
- **FAQ Accordion**: Categorized frequently asked questions.
- **Sticky Mobile Bar**: Bottom floating bar with 1-click WhatsApp chat & Quick-Book pop-up.
- **Dynamic WhatsApp Formatter**: Automatically pre-fills structured booking inquiries:
  ```text
  Hi Hikka Surf School! I'd like to book:
  Activity: Beginner Surf Lesson
  Date: 2026-08-30
  Number of people: 2
  Preferred time: 08:30 AM
  ```

---

### 2. Full-Featured Admin CMS (`/admin`)

The Admin Panel allows you to edit **EVERYTHING** on the website live from your browser:
- **General & Branding**: Business name, WhatsApp number, phone, email, address, Google Maps links, announcement banner, and social media URLs.
- **Hero & Homepage Content**: Headlines, subheadlines, descriptions, and hero background media.
- **Activities & Surf Lessons**: Add, edit, delete, reorder activities, adjust pricing (USD/LKR), durations, inclusions, and partner activity badge toggles.
- **Sri Lanka Day Trips & Tours**: Add/edit itineraries, highlights, pricing, and destinations.
- **Airport Transfers**: Manage vehicle types and pricing.
- **Google Reviews**: Add, edit, and feature traveler testimonials and photos.
- **Gallery**: Upload photos directly and tag categories.
- **FAQs**: Edit questions and answers.
- **100% SEO Meta Manager**: Customize Meta Titles, Meta Descriptions, and target Google keywords for every page.
- **Inquiries & Leads Tracker**: Logs all booking inquiries submitted by visitors.
- **Backup & GitHub Sync**: One-click **"Download JSON Backup"** and **"Import Backup"** buttons to commit data directly to your GitHub repository.

---

## 🔑 Admin Login Credentials

- **URL**: `http://localhost:3000/admin/login` (or `https://your-domain.com/admin/login`)
- **Default Password**: `admin123`
- *(You can change this password anytime inside the Admin Dashboard under the "Password & Auth" tab).*

---

## 🛠️ Local Development & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploying to GitHub & Hosting

### Option A: Deploy to Vercel (Recommended with GitHub)
1. Push this folder to your GitHub repository.
2. Go to [Vercel.com](https://vercel.com) and import your repository.
3. Vercel will automatically build and host the website with zero configuration. All API routes, CMS edits, and uploads will work out of the box!

### Option B: Deploy to Netlify / Render
1. Connect your GitHub repository to Netlify or Render.
2. Build command: `npm run build`
3. Output directory: `.next`

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout with fonts, SEO tags, Navbar & Footer
│   ├── page.tsx                  # Full Homepage with all 8 main sections
│   ├── globals.css               # Tailwind CSS & custom styles
│   ├── activities/[slug]/        # Dedicated SEO activity pages (Surf, Snorkel, Turtles, etc.)
│   ├── tours/                    # Sri Lanka Day Trips catalog & detail pages
│   ├── transfers/                # Airport transfers & private transport
│   ├── gallery/                  # Photo gallery with category filters
│   ├── reviews/                  # Google reviews page
│   ├── about/                    # Authentic local story
│   ├── contact/                  # Map, beach meeting point & contact form
│   ├── admin/                    # Full Content Management System (CMS)
│   │   ├── page.tsx              # Admin dashboard with 12 management tabs
│   │   └── login/page.tsx        # Secure admin login form
│   ├── api/
│   │   ├── auth/                 # Admin session authentication
│   │   ├── content/              # CMS live data CRUD endpoint
│   │   ├── inquiries/            # WhatsApp booking leads logger
│   │   └── upload/               # Image & media upload API
│   ├── sitemap.ts                # Automated XML sitemap for Google SEO
│   └── robots.ts                 # Automated robots.txt
├── components/
│   ├── Navbar.tsx                # Header with dropdowns and mobile drawer
│   ├── Footer.tsx                # Footer with links, contacts, and social icons
│   ├── Hero.tsx                  # Homepage hero with WhatsApp CTAs
│   ├── PopularExperiences.tsx    # 8-Card experience showcase
│   ├── LearnToSurfSection.tsx    # Core Surfing service focus section
│   ├── WhyChooseUs.tsx           # Trust pillars & credentials
│   ├── ReviewsSection.tsx        # Google style reviews
│   ├── GallerySection.tsx        # Photo gallery & lightbox
│   ├── LocationSection.tsx       # Map, landmarks, and beach directions
│   ├── FAQAccordion.tsx          # Categorized FAQs
│   ├── BookingModal.tsx          # Dynamic WhatsApp booking generator
│   ├── StickyMobileBar.tsx       # Mobile sticky WhatsApp / Book Now bar
│   └── JsonLd.tsx                # JSON-LD Structured schema markup (LocalBusiness, etc.)
├── data/
│   └── initial-data.json         # Pre-seeded database with rich authentic Hikkaduwa content
├── lib/
│   ├── types.ts                  # Complete TypeScript definitions
│   └── db.ts                     # JSON database engine with atomic writes
```

---

© 2026 ❤️ **Hikkaduwa Hikka Surf School** — Galle Road, Narigama Beach, Hikkaduwa, Sri Lanka.

Designed & Developed by [**Infinite Creative Web Design**](https://infiniteweb.dev/index.html).
