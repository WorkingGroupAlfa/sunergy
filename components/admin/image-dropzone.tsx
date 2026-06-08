'use client';

import Image from 'next/image';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { ImageIcon, UploadCloud, X } from 'lucide-react';
import { uploadAdminAsset } from '@/lib/admin-client';
import { optimizeImageForUpload } from '@/lib/image-optimizer';

type ImageDropzoneProps = {
  label: string;
  value: string;
  fallback: string;
  onChange: (value: string) => void;
  inputId: string;
};

function isDataImage(value: string) {
  return value.startsWith('data:image/');
}

export function ImageDropzone({ label, value, fallback, onChange, inputId }: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const imageSrc = value.trim() || fallback;

  const uploadFile = async (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Оберіть файл зображення.');
      return;
    }

    setIsUploading(true);
    try {
      const optimizedFile = await optimizeImageForUpload(file);
      const url = await uploadAdminAsset(optimizedFile);
      setError('');
      onChange(url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Не вдалося завантажити файл.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void uploadFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void uploadFile(event.dataTransfer.files?.[0]);
  };

  const isLegacyDataImage = isDataImage(value);

  return (
    <div className="md:col-span-2 xl:col-span-3">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-xs font-semibold text-ink" htmlFor={inputId}>
          {label}
        </label>
        {isLegacyDataImage ? (
          <button type="button" onClick={() => onChange('')} className="inline-flex items-center gap-1 text-xs font-semibold text-steel hover:text-red-600">
            <X className="h-3.5 w-3.5" />
            Очистити файл
          </button>
        ) : null}
      </div>

      <input
        id={inputId}
        className="input h-11"
        value={isLegacyDataImage ? 'Локальне base64-зображення. Завантажте файл ще раз, щоб отримати URL.' : value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={fallback}
        readOnly={isLegacyDataImage}
      />

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`mt-3 grid gap-3 rounded-2xl border border-dashed p-3 transition md:grid-cols-[180px_1fr] ${
          isDragging ? 'border-accent bg-blue-50' : 'border-slate-300 bg-slate-50'
        }`}
      >
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <Image src={imageSrc} alt={label} width={360} height={240} unoptimized={isDataImage(imageSrc)} className="h-32 w-full object-cover" />
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            {isLegacyDataImage ? <ImageIcon className="h-4 w-4 text-accent" /> : <UploadCloud className="h-4 w-4 text-accent" />}
            {isUploading ? 'Завантаження...' : 'Перетягніть зображення сюди'}
          </div>
          <p className="mt-1 text-xs leading-5 text-steel">
            Або виберіть файл з пристрою. У записі буде збережено коротке посилання на зображення.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="btn-secondary h-10 px-4 disabled:cursor-not-allowed disabled:opacity-60">
              <UploadCloud className="h-4 w-4" />
              <span className="ml-2">{isUploading ? 'Завантажуємо' : 'Обрати файл'}</span>
            </button>
          </div>
          {error ? <p className="mt-2 text-xs font-medium text-red-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
