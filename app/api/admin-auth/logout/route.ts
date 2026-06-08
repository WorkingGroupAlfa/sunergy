import { NextResponse } from 'next/server';
import { getClearAdminSessionCookieHeader } from '@/lib/admin-auth-server';

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function POST() {
  const response = NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  response.headers.append('Set-Cookie', getClearAdminSessionCookieHeader());
  return response;
}
