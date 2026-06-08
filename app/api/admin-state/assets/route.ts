import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/admin-auth-server';
import { uploadAdminAsset } from '@/lib/admin-assets-server';

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

const userFriendlyUploadErrors = new Set([
  'Збереження ще не налаштовано.',
  'Можна завантажувати лише зображення.',
  'Фото все ще завелике. Оберіть менше зображення.',
]);

function getUploadErrorMessage(error: unknown) {
  if (error instanceof Error && userFriendlyUploadErrors.has(error.message)) return error.message;
  return 'Не вдалося завантажити фото';
}

export async function POST(request: Request) {
  if (!(await isAuthorizedRequest(request))) {
    return NextResponse.json({ error: 'Потрібно увійти знову' }, { status: 401, headers: noStoreHeaders });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Оберіть фото для завантаження' }, { status: 400, headers: noStoreHeaders });
    }

    const url = await uploadAdminAsset(file);
    return NextResponse.json({ url }, { headers: noStoreHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: getUploadErrorMessage(error) }, { status: 500, headers: noStoreHeaders });
  }
}
