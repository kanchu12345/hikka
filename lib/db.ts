import fs from 'fs';
import path from 'path';
import {
  SiteDatabase,
  SiteSettings,
  Activity,
  Tour,
  Transfer,
  Review,
  GalleryItem,
  FAQItem,
  SEOPageData,
  LeadInquiry,
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const INITIAL_DATA_FILE = path.join(DATA_DIR, 'initial-data.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function initializeDatabase(): SiteDatabase {
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(fileData);
    }
    
    if (fs.existsSync(INITIAL_DATA_FILE)) {
      const initial = fs.readFileSync(INITIAL_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(initial);
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
      return parsed;
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }

  // Fallback if initial file fails
  const emptyDb: SiteDatabase = {
    settings: {
      businessName: 'Hikkaduwa Hikka Surf School',
      brandHeart: '❤️',
      tagline: 'Surf • Snorkel • Explore Hikkaduwa & Sri Lanka',
      heroHeadline: '❤️ Hikkaduwa Hikka Surf School',
      heroSubheadline: 'Surf • Snorkel • Explore Hikkaduwa & Sri Lanka',
      heroDescription: 'Discover Hikkaduwa with local instructors and guides.',
      whatsappNumber: '+94771234567',
      phoneNumber: '+94 77 123 4567',
      email: 'info@hikkasurfschool.com',
      address: 'Galle Road, Narigama Beach, Hikkaduwa 80240, Sri Lanka',
      googleMapsUrl: 'https://maps.app.goo.gl/RP85syvqnwpCjrDE9',
      googleMapsEmbedIframe: '',
      coordinates: { lat: 6.136423, lng: 80.098485 },
      tripadvisorUrl: '',
      instagramUrl: '',
      facebookUrl: '',
      googleBusinessUrl: 'https://maps.app.goo.gl/RP85syvqnwpCjrDE9',
      announcementBanner: {
        enabled: true,
        text: '🌊 Welcome to Hikkaduwa! Surf Season is ON!',
        linkText: 'Book on WhatsApp',
        linkUrl: 'https://wa.me/94771234567'
      },
      heroMedia: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=80'
      },
      whyChooseUs: {
        title: 'Why Choose Hikka Surf School?',
        subtitle: 'Your Trusted Local Ocean Guides in Hikkaduwa',
        pillars: []
      },
      aboutStory: {
        title: 'Our Story',
        subtitle: 'Local Hikkaduwa Ocean Guides',
        content: ['Hikka Surf School is a local Hikkaduwa surf school...'],
        highlightQuote: 'Authentic surf and ocean culture in Sri Lanka.',
        instructorExperienceYears: 12,
        stats: [],
        imageUrl: ''
      }
    },
    activities: [],
    tours: [],
    transfers: [],
    reviews: [],
    gallery: [],
    faqs: [],
    seoPages: {},
    inquiries: [],
    adminPasswordHash: 'admin123'
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(emptyDb, null, 2), 'utf-8');
  return emptyDb;
}

export function getDatabase(): SiteDatabase {
  if (!fs.existsSync(DB_FILE)) {
    return initializeDatabase();
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read db.json, returning initialized default:', err);
    return initializeDatabase();
  }
}

export function saveDatabase(data: SiteDatabase): boolean {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (error) {
    console.error('Failed to write database file:', error);
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (fallbackError) {
      console.error('Direct write failed:', fallbackError);
      return false;
    }
  }
}

// Helpers
export function getSiteSettings(): SiteSettings {
  const db = getDatabase();
  return db.settings;
}

export function updateSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...settings };
  saveDatabase(db);
  return db.settings;
}

export function getActivities(): Activity[] {
  const db = getDatabase();
  return db.activities || [];
}

export function getActivityBySlug(slug: string): Activity | undefined {
  const activities = getActivities();
  return activities.find((a) => a.slug === slug || a.id === slug);
}

export function saveActivity(activity: Activity): Activity {
  const db = getDatabase();
  const index = db.activities.findIndex((a) => a.id === activity.id);
  if (index >= 0) {
    db.activities[index] = activity;
  } else {
    db.activities.push(activity);
  }
  saveDatabase(db);
  return activity;
}

export function deleteActivity(id: string): boolean {
  const db = getDatabase();
  db.activities = db.activities.filter((a) => a.id !== id);
  return saveDatabase(db);
}

export function getTours(): Tour[] {
  const db = getDatabase();
  return db.tours || [];
}

export function getTourBySlug(slug: string): Tour | undefined {
  const tours = getTours();
  return tours.find((t) => t.slug === slug || t.id === slug);
}

export function saveTour(tour: Tour): Tour {
  const db = getDatabase();
  const index = db.tours.findIndex((t) => t.id === tour.id);
  if (index >= 0) {
    db.tours[index] = tour;
  } else {
    db.tours.push(tour);
  }
  saveDatabase(db);
  return tour;
}

export function deleteTour(id: string): boolean {
  const db = getDatabase();
  db.tours = db.tours.filter((t) => t.id !== id);
  return saveDatabase(db);
}

export function getTransfers(): Transfer[] {
  const db = getDatabase();
  return db.transfers || [];
}

export function saveTransfer(transfer: Transfer): Transfer {
  const db = getDatabase();
  const index = db.transfers.findIndex((t) => t.id === transfer.id);
  if (index >= 0) {
    db.transfers[index] = transfer;
  } else {
    db.transfers.push(transfer);
  }
  saveDatabase(db);
  return transfer;
}

export function deleteTransfer(id: string): boolean {
  const db = getDatabase();
  db.transfers = db.transfers.filter((t) => t.id !== id);
  return saveDatabase(db);
}

export function getReviews(): Review[] {
  const db = getDatabase();
  return db.reviews || [];
}

export function saveReview(review: Review): Review {
  const db = getDatabase();
  const index = db.reviews.findIndex((r) => r.id === review.id);
  if (index >= 0) {
    db.reviews[index] = review;
  } else {
    db.reviews.unshift(review);
  }
  saveDatabase(db);
  return review;
}

export function deleteReview(id: string): boolean {
  const db = getDatabase();
  db.reviews = db.reviews.filter((r) => r.id !== id);
  return saveDatabase(db);
}

export function getGallery(): GalleryItem[] {
  const db = getDatabase();
  return db.gallery || [];
}

export function saveGalleryItem(item: GalleryItem): GalleryItem {
  const db = getDatabase();
  const index = db.gallery.findIndex((g) => g.id === item.id);
  if (index >= 0) {
    db.gallery[index] = item;
  } else {
    db.gallery.unshift(item);
  }
  saveDatabase(db);
  return item;
}

export function deleteGalleryItem(id: string): boolean {
  const db = getDatabase();
  db.gallery = db.gallery.filter((g) => g.id !== id);
  return saveDatabase(db);
}

export function getFAQs(): FAQItem[] {
  const db = getDatabase();
  return (db.faqs || []).sort((a, b) => a.order - b.order);
}

export function saveFAQ(faq: FAQItem): FAQItem {
  const db = getDatabase();
  const index = db.faqs.findIndex((f) => f.id === faq.id);
  if (index >= 0) {
    db.faqs[index] = faq;
  } else {
    db.faqs.push(faq);
  }
  saveDatabase(db);
  return faq;
}

export function deleteFAQ(id: string): boolean {
  const db = getDatabase();
  db.faqs = db.faqs.filter((f) => f.id !== id);
  return saveDatabase(db);
}

export function getSEOPage(path: string): SEOPageData | undefined {
  const db = getDatabase();
  return db.seoPages?.[path] || db.seoPages?.['/'];
}

export function saveSEOPage(path: string, data: SEOPageData): SEOPageData {
  const db = getDatabase();
  if (!db.seoPages) db.seoPages = {};
  db.seoPages[path] = data;
  saveDatabase(db);
  return data;
}

export function getInquiries(): LeadInquiry[] {
  const db = getDatabase();
  return (db.inquiries || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addInquiry(inquiry: Omit<LeadInquiry, 'id' | 'createdAt'>): LeadInquiry {
  const db = getDatabase();
  if (!db.inquiries) db.inquiries = [];
  const newInquiry: LeadInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  db.inquiries.unshift(newInquiry);
  saveDatabase(db);
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: LeadInquiry['status']): boolean {
  const db = getDatabase();
  const inquiry = db.inquiries.find((i) => i.id === id);
  if (inquiry) {
    inquiry.status = status;
    return saveDatabase(db);
  }
  return false;
}

export function verifyAdminPassword(password: string): boolean {
  const db = getDatabase();
  const currentPass = db.adminPasswordHash || 'admin123';
  return password === currentPass;
}

export function changeAdminPassword(newPassword: string): boolean {
  const db = getDatabase();
  db.adminPasswordHash = newPassword;
  return saveDatabase(db);
}
