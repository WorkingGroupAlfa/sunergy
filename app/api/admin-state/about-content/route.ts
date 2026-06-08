import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/admin-auth-server';
import { resetAboutContentState, saveAboutContentState } from '@/lib/admin-state-server';
import { type AboutContent } from '@/data/about-content';

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function PUT(request: Request) {
  if (!(await isAuthorizedRequest(request))) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = (await request.json()) as { content?: AboutContent };
    if (!body.content) {
      return NextResponse.json({ error: 'Invalid about content.' }, { status: 400, headers: noStoreHeaders });
    }

    await saveAboutContentState(body.content);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося зберегти сторінку' }, { status: 500, headers: noStoreHeaders });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthorizedRequest(request))) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = (await request.json().catch(() => null)) as { action?: string } | null;
    if (body?.action !== 'reset') {
      return NextResponse.json({ error: 'Unsupported action.' }, { status: 400, headers: noStoreHeaders });
    }

    await resetAboutContentState();
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося скинути сторінку' }, { status: 500, headers: noStoreHeaders });
  }
}
