import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return NextResponse.json({
      status: 'error',
      message: 'Redis env vars not found',
      vars: {
        UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
        KV_REST_API_URL: !!process.env.KV_REST_API_URL,
        UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
        KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
      },
    });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['PING']),
      cache: 'no-store',
    });

    const body = await response.json() as { result?: string; error?: string };

    return NextResponse.json({
      status: body.result === 'PONG' ? 'ok' : 'error',
      ping: body.result,
      error: body.error ?? null,
      urlPrefix: url.slice(0, 30) + '...',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: String(error),
    });
  }
}
