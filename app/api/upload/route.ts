import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { cookies } from 'next/headers';

const ADMIN_TOKEN_KEY = 'hikka_admin_session';
const SECRET_TOKEN_VALUE = 'hikka_surf_admin_auth_token_secret_2026';

function checkAuth(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_TOKEN_KEY)?.value;
  return session === SECRET_TOKEN_VALUE;
}

export async function POST(req: NextRequest) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanFileName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl, filename });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
