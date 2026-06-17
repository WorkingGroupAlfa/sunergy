'use client';

function getCloudinaryConfig() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim();
  if (!cloudName || !uploadPreset) return null;
  return { cloudName, uploadPreset };
}

export function isCloudinaryConfigured() {
  return getCloudinaryConfig() !== null;
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const config = getCloudinaryConfig();
  if (!config) throw new Error('Cloudinary не налаштовано.');

  const formData = new FormData();
  formData.set('file', file);
  formData.set('upload_preset', config.uploadPreset);
  formData.set('folder', 'sunergy-admin');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new Error(body?.error?.message || `Cloudinary: помилка ${response.status}`);
  }

  const result = (await response.json()) as { secure_url?: string };
  if (!result.secure_url) throw new Error('Cloudinary не повернув посилання на зображення.');

  return result.secure_url;
}
