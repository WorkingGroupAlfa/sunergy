import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/admin-auth-server';
import { readAdminState, writeAdminState } from '@/lib/admin-state-server';
import { type AdminState } from '@/lib/admin-state';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60;

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET(request: Request) {
  const state = await readAdminState({ draft: isAuthorizedRequest(request) });
  return NextResponse.json(state, { headers: noStoreHeaders });
}

export async function PUT(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = (await request.json()) as Partial<AdminState>;
    const state = await writeAdminState(body);
    return NextResponse.json(state, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося зберегти зміни' }, { status: 500, headers: noStoreHeaders });
  }
}
