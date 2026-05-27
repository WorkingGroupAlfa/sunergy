import { NextResponse } from 'next/server';
import { DEFAULT_ADMIN_PASSWORD } from '@/lib/admin-auth';
import { readAdminState, writeAdminState } from '@/lib/admin-state-server';
import { type AdminState } from '@/lib/admin-state';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

function isAuthorized(request: Request) {
  const expectedPassword = process.env.SUNERGY_ADMIN_PASSWORD || process.env.NEXT_PUBLIC_SUNERGY_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  return request.headers.get('x-admin-password') === expectedPassword;
}

export async function GET() {
  const state = await readAdminState();
  return NextResponse.json(state, { headers: noStoreHeaders });
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = (await request.json()) as Partial<AdminState>;
    const state = await writeAdminState(body);
    return NextResponse.json(state, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to save admin state' }, { status: 500, headers: noStoreHeaders });
  }
}
