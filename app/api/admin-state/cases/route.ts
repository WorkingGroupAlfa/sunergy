import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/admin-auth-server';
import { deleteCaseState, resetCasesState, saveCaseState } from '@/lib/admin-state-server';
import { type CaseItem } from '@/data/shop';

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
    const body = (await request.json()) as { item?: CaseItem; previousSlug?: string };
    if (!body.item?.slug || !body.item.title) {
      return NextResponse.json({ error: 'Invalid case item.' }, { status: 400, headers: noStoreHeaders });
    }

    await saveCaseState(body.item, body.previousSlug);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося зберегти роботу' }, { status: 500, headers: noStoreHeaders });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorizedRequest(request))) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = (await request.json()) as { slug?: string };
    if (!body.slug) {
      return NextResponse.json({ error: 'Invalid case slug.' }, { status: 400, headers: noStoreHeaders });
    }

    await deleteCaseState(body.slug);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося видалити роботу' }, { status: 500, headers: noStoreHeaders });
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

    await resetCasesState();
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося скинути роботи' }, { status: 500, headers: noStoreHeaders });
  }
}
