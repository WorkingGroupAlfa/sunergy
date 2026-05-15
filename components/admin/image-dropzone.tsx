'use client';

import Image from 'next/image';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { ImageIcon, UploadCloud, X } from 'lucide-react';

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
  const [error, setError] = useState('');
  const imageSrc = value.trim() || fallback;

  const readFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Оберіть файл зображення.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? '');
      if (!isDataImage(result)) {
        setError('Не вдалося прочитати зображення.');
        return;
      }

      setError('');
      onChange(result);
    };
    reader.onerror = () => setError('Не вдалося прочитати файл.');
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    readFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    readFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="md:col-span-2 xl:col-span-3">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-xs font-semibold text-ink" htmlFor={inputId}>
          {label}
        </label>
        {isDataImage(value) ? (
          <button type="button" onClick={() => onChange('')} className="inline-flex items-center gap-1 text-xs font-semibold text-steel hover:text-red-600">
            <X className="h-3.5 w-3.5" />
            Очистити файл
          </button>
        ) : null}
      </div>

      <input
        id={inputId}
        className="input h-11"
        value={isDataImage(value) ? 'Локальне зображення збережено в адмінці' : value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={fallback}
        readOnly={isDataImage(value)}
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
            {isDataImage(value) ? <ImageIcon className="h-4 w-4 text-accent" /> : <UploadCloud className="h-4 w-4 text-accent" />}
            Перетягніть зображення сюди
          </div>
          <p className="mt-1 text-xs leading-5 text-steel">Або виберіть файл з пристрою. Він збережеться в адмінці разом із записом.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-secondary h-10 px-4">
              <UploadCloud className="h-4 w-4" />
              <span className="ml-2">Обрати файл</span>
            </button>
          </div>
          {error ? <p className="mt-2 text-xs font-medium text-red-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
