import { NextResponse } from 'next/server';
import { createAdminSessionToken, getAdminSessionCookieHeader, getExpectedAdminPassword } from '@/lib/admin-auth-server';

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!body?.password || body.password !== getExpectedAdminPassword()) {
    return NextResponse.json({ error: 'Неправильний пароль' }, { status: 401, headers: noStoreHeaders });
  }

  const response = NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  response.headers.append('Set-Cookie', getAdminSessionCookieHeader(createAdminSessionToken()));
  return response;
}
