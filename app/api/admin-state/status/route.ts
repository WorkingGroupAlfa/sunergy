import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/admin-auth-server';
import { readAdminDraftStatus } from '@/lib/admin-state-server';

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET(request: Request) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const status = await readAdminDraftStatus();
    return NextResponse.json(status, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося перевірити зміни' }, { status: 500, headers: noStoreHeaders });
  }
}
