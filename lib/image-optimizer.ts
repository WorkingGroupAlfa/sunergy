'use client';

const MAX_UPLOAD_BYTES = 1.2 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1400;
const MIN_IMAGE_EDGE = 600;

function outputFileName(fileName: string) {
  const baseName = fileName.replace(/\.[^.]+$/, '').trim() || 'image';
  return `${baseName}.webp`;
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Не вдалося оптимізувати зображення.'));
        }
      },
      'image/webp',
      quality
    );
  });
}

export async function optimizeImageForUpload(file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Оберіть файл зображення.');
  }

  if (file.type === 'image/svg+xml') {
    if (file.size <= MAX_UPLOAD_BYTES) return file;
    throw new Error('SVG-файл занадто великий.');
  }

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) {
    if (file.size <= MAX_UPLOAD_BYTES) return file;
    throw new Error('Не вдалося прочитати зображення для оптимізації.');
  }

  let scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Браузер не підтримує оптимізацію зображень.');

  for (const quality of [0.82, 0.74, 0.66, 0.58]) {
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvasToBlob(canvas, quality);
    if (blob.size <= MAX_UPLOAD_BYTES) {
      bitmap.close();
      return new File([blob], outputFileName(file.name), { type: 'image/webp' });
    }

    if (Math.max(width, height) <= MIN_IMAGE_EDGE) break;
    scale *= 0.82;
  }

  bitmap.close();
  throw new Error('Фото занадто велике навіть після оптимізації. Спробуйте інше зображення.');
}
