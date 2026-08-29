import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, addInquiry, updateInquiryStatus } from '@/lib/db';
import { cookies } from 'next/headers';

const ADMIN_TOKEN_KEY = 'hikka_admin_session';
const SECRET_TOKEN_VALUE = 'hikka_surf_admin_auth_token_secret_2026';

function checkAuth(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_TOKEN_KEY)?.value;
  return session === SECRET_TOKEN_VALUE;
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contactNumber, activity, date, guestsCount, preferredTime, notes, channel } = body;

    const newInquiry = addInquiry({
      name: name || 'Website Visitor',
      contactNumber: contactNumber || '',
      activity: activity || 'Surf Lesson',
      date: date || new Date().toISOString().split('T')[0],
      guestsCount: Number(guestsCount) || 1,
      preferredTime: preferredTime || 'Morning',
      notes: notes || '',
      channel: channel === 'WhatsApp' ? 'WhatsApp' : 'WebForm',
      status: 'new',
    });

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error('Error logging inquiry:', error);
    return NextResponse.json({ error: 'Failed to record inquiry' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const updated = updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
