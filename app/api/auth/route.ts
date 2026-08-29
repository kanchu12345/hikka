import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, changeAdminPassword } from '@/lib/db';
import { cookies } from 'next/headers';

const ADMIN_TOKEN_KEY = 'hikka_admin_session';
const SECRET_TOKEN_VALUE = 'hikka_surf_admin_auth_token_secret_2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, password, newPassword } = body;

    if (action === 'change_password') {
      const cookieStore = cookies();
      const session = cookieStore.get(ADMIN_TOKEN_KEY)?.value;
      if (session !== SECRET_TOKEN_VALUE) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      if (!newPassword || newPassword.length < 4) {
        return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 });
      }

      changeAdminPassword(newPassword);
      return NextResponse.json({ success: true, message: 'Password updated successfully' });
    }

    // Default: Login action
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid admin password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
    response.cookies.set({
      name: ADMIN_TOKEN_KEY,
      value: SECRET_TOKEN_VALUE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_TOKEN_KEY)?.value;
  const isAuthenticated = session === SECRET_TOKEN_VALUE;
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(ADMIN_TOKEN_KEY);
  return response;
}
