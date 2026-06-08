import { createHmac, timingSafeEqual } from 'node:crypto';
import { ADMIN_SESSION_COOKIE, DEFAULT_ADMIN_PASSWORD } from '@/lib/admin-auth';

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUNERGY_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

export function getExpectedAdminPassword() {
  return process.env.SUNERGY_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

function base64Url(value: string | Buffer) {
  return Buffer.from(value).toString('base64url');
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function parseCookie(header: string | null) {
  if (!header) return new Map<string, string>();

  return new Map(
    header.split(';').map((part) => {
      const [name, ...value] = part.trim().split('=');
      return [name, decodeURIComponent(value.join('='))] as const;
    })
  );
}

export function createAdminSessionToken() {
  const payload = JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  });
  const encodedPayload = base64Url(payload);
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;

  try {
    const body = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    return typeof body.exp === 'number' && body.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function getAdminSessionCookieHeader(token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`;
}

export function getClearAdminSessionCookieHeader() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export function isAuthorizedRequest(request: Request) {
  const cookies = parseCookie(request.headers.get('cookie'));
  return verifyAdminSessionToken(cookies.get(ADMIN_SESSION_COOKIE));
}
