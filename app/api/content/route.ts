import { NextRequest, NextResponse } from 'next/server';
import {
  getDatabase,
  saveDatabase,
  updateSiteSettings,
  saveActivity,
  deleteActivity,
  saveTour,
  deleteTour,
  saveTransfer,
  deleteTransfer,
  saveReview,
  deleteReview,
  saveGalleryItem,
  deleteGalleryItem,
  saveFAQ,
  deleteFAQ,
  saveSEOPage,
} from '@/lib/db';
import { cookies } from 'next/headers';

const ADMIN_TOKEN_KEY = 'hikka_admin_session';
const SECRET_TOKEN_VALUE = 'hikka_surf_admin_auth_token_secret_2026';

function checkAuth(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_TOKEN_KEY)?.value;
  return session === SECRET_TOKEN_VALUE;
}

export async function GET() {
  try {
    const db = getDatabase();
    // Exclude password hash from public response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { adminPasswordHash, ...safeData } = db;
    return NextResponse.json(safeData);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, action, data, id, path: pagePath } = body;

    switch (type) {
      case 'settings':
        const updatedSettings = updateSiteSettings(data);
        return NextResponse.json({ success: true, settings: updatedSettings });

      case 'activity':
        if (action === 'delete' && id) {
          deleteActivity(id);
          return NextResponse.json({ success: true });
        }
        const savedActivity = saveActivity(data);
        return NextResponse.json({ success: true, activity: savedActivity });

      case 'tour':
        if (action === 'delete' && id) {
          deleteTour(id);
          return NextResponse.json({ success: true });
        }
        const savedTour = saveTour(data);
        return NextResponse.json({ success: true, tour: savedTour });

      case 'transfer':
        if (action === 'delete' && id) {
          deleteTransfer(id);
          return NextResponse.json({ success: true });
        }
        const savedTransfer = saveTransfer(data);
        return NextResponse.json({ success: true, transfer: savedTransfer });

      case 'review':
        if (action === 'delete' && id) {
          deleteReview(id);
          return NextResponse.json({ success: true });
        }
        const savedReview = saveReview(data);
        return NextResponse.json({ success: true, review: savedReview });

      case 'gallery':
        if (action === 'delete' && id) {
          deleteGalleryItem(id);
          return NextResponse.json({ success: true });
        }
        const savedGallery = saveGalleryItem(data);
        return NextResponse.json({ success: true, galleryItem: savedGallery });

      case 'faq':
        if (action === 'delete' && id) {
          deleteFAQ(id);
          return NextResponse.json({ success: true });
        }
        const savedFaq = saveFAQ(data);
        return NextResponse.json({ success: true, faq: savedFaq });

      case 'seo':
        if (pagePath && data) {
          const savedSeo = saveSEOPage(pagePath, data);
          return NextResponse.json({ success: true, seo: savedSeo });
        }
        return NextResponse.json({ error: 'Missing path or data' }, { status: 400 });

      case 'full_sync':
        // Overwrite full DB with provided data (preserving password)
        const currentDb = getDatabase();
        const mergedDb = {
          ...data,
          adminPasswordHash: currentDb.adminPasswordHash,
        };
        saveDatabase(mergedDb);
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Unknown content type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
