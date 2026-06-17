import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/admin-auth-server';
import { deleteProductState, resetProductsState, saveProductState } from '@/lib/admin-state-server';
import { toUserFacingGitHubError } from '@/lib/github-cms';
import { type Product } from '@/data/shop';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const maxDuration = 60;

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
    const body = (await request.json()) as { product?: Product; previousSlug?: string };
    if (!body.product?.slug || !body.product.title) {
      return NextResponse.json({ error: 'Invalid product.' }, { status: 400, headers: noStoreHeaders });
    }

    await saveProductState(body.product, body.previousSlug);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: toUserFacingGitHubError(error, 'Не вдалося зберегти товар') }, { status: 500, headers: noStoreHeaders });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthorizedRequest(request))) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const body = (await request.json()) as { slug?: string };
    if (!body.slug) {
      return NextResponse.json({ error: 'Invalid product slug.' }, { status: 400, headers: noStoreHeaders });
    }

    await deleteProductState(body.slug);
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: toUserFacingGitHubError(error, 'Не вдалося видалити товар') }, { status: 500, headers: noStoreHeaders });
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

    await resetProductsState();
    return NextResponse.json({ ok: true }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: toUserFacingGitHubError(error, 'Не вдалося скинути товари') }, { status: 500, headers: noStoreHeaders });
  }
}
