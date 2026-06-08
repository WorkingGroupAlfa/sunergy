import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/admin-auth-server';
import { deleteCategoryState, resetCategoriesState, saveCategoryState } from '@/lib/admin-state-server';
import { type ProductCategory } from '@/data/shop';

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
    const body = (await request.json()) as { category?: ProductCategory; previousCategory?: ProductCategory };
    if (!body.category?.trim()) {
      return NextResponse.json({ error: 'Invalid category.' }, { status: 400, headers: noStoreHeaders });
    }

    await saveCategoryState(body.category, body.previousCategory);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося зберегти категорію' }, { status: 500, headers: noStoreHeaders });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorizedRequest(request))) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = (await request.json()) as { category?: ProductCategory };
    if (!body.category) {
      return NextResponse.json({ error: 'Invalid category.' }, { status: 400, headers: noStoreHeaders });
    }

    await deleteCategoryState(body.category);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося видалити категорію' }, { status: 500, headers: noStoreHeaders });
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

    await resetCategoriesState();
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося скинути категорії' }, { status: 500, headers: noStoreHeaders });
  }
}
