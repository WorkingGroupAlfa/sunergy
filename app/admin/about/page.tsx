'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, Eye, LockKeyhole, RotateCcw, Save } from 'lucide-react';
import { defaultAboutContent, type AboutContent } from '@/data/about-content';
import { useShop } from '@/components/shop/shop-provider';
import { ImageDropzone } from '@/components/admin/image-dropzone';
import { ADMIN_AUTH_KEY, ADMIN_PASSWORD, ADMIN_PASSWORD_KEY } from '@/lib/admin-auth';

function socialsToText(items: AboutContent['socials']) {
  return items.map((item) => `${item.label}|${item.href}`).join('\n');
}

function textToSocials(value: string): AboutContent['socials'] {
  return value
    .split('\n')
    .map((line) => {
      const [label = '', href = ''] = line.split('|');
      return { label: label.trim(), href: href.trim() };
    })
    .filter((item) => item.label || item.href);
}

function TextField({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      {textarea ? (
        <textarea className="input min-h-32 resize-y" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="input h-11" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

export default function AdminAboutPage() {
  const { aboutContent, saveAboutContent, resetAboutContent } = useShop();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState<AboutContent>(aboutContent);
  const [socialsText, setSocialsText] = useState(socialsToText(aboutContent.socials));
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true');
  }, []);

  useEffect(() => {
    setForm(aboutContent);
    setSocialsText(socialsToText(aboutContent.socials));
  }, [aboutContent]);

  const preview = { ...form, socials: textToSocials(socialsText) };

  const updateForm = <K extends keyof AboutContent>(key: K, value: AboutContent[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setMessage('');
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
      setIsAuthenticated(true);
      setLoginError('');
      setPassword('');
      return;
    }

    setLoginError('Невірний пароль');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAboutContent(preview);
    setMessage('Сторінку “Про нас” збережено');
  };

  const handleReset = () => {
    if (!window.confirm('Скинути сторінку “Про нас” до базового тексту?')) return;
    resetAboutContent();
    setForm(defaultAboutContent);
    setSocialsText(socialsToText(defaultAboutContent.socials));
    setMessage('Сторінку скинуто');
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 text-ink">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
          <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-steel hover:text-ink" aria-label="На сайт">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.18em] text-accent">SUNERGY CRM</div>
            <h1 className="mt-2 text-2xl font-semibold text-ink">Вхід в адмінку</h1>
            <p className="mt-2 text-sm leading-6 text-steel">Введіть пароль, щоб редагувати сторінку “Про нас”.</p>
          </div>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Пароль</span>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setLoginError('');
                }}
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-accent focus:bg-white"
                autoComplete="current-password"
                autoFocus
              />
            </label>
            {loginError ? <p className="text-sm font-medium text-red-600">{loginError}</p> : null}
            <button type="submit" className="btn-primary h-12 w-full">
              Увійти
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-ink">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1760px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-steel hover:text-ink" aria-label="До товарів">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-accent">SUNERGY CRM</div>
              <h1 className="text-xl font-semibold leading-tight text-ink">Про нас</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {message ? <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</span> : null}
            <button type="button" onClick={handleReset} className="btn-secondary">
              <RotateCcw className="h-4 w-4" />
              <span className="ml-2">Скинути</span>
            </button>
            <button type="submit" form="about-content-form" className="btn-primary">
              <Save className="h-4 w-4" />
              <span className="ml-2">Зберегти</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1760px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(440px,0.95fr)_1.05fr]">
        <form id="about-content-form" onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="grid gap-4">
            <ImageDropzone inputId="about-image" label="Фото вгорі сторінки" value={form.image} fallback="/images/hero-sunergy-showroom.jpg" onChange={(value) => updateForm('image', value)} />
            <TextField label="Бейдж" value={form.badge} onChange={(value) => updateForm('badge', value)} />
            <TextField label="Заголовок" value={form.title} onChange={(value) => updateForm('title', value)} textarea />
            <TextField label="Опис" value={form.text} onChange={(value) => updateForm('text', value)} textarea />
            <TextField label="Заголовок соцмереж" value={form.socialsTitle} onChange={(value) => updateForm('socialsTitle', value)} />
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink">Соцмережі: назва|посилання, кожна з нового рядка</span>
              <textarea className="input min-h-32 resize-y" value={socialsText} onChange={(event) => setSocialsText(event.target.value)} />
            </label>
          </div>
        </form>

        <aside className="sticky top-[84px] h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
            <Eye className="h-4 w-4 text-accent" />
            Live preview
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="relative h-56 bg-frost">
              <Image src={preview.image || '/images/hero-sunergy-showroom.jpg'} alt={preview.title || 'Про нас'} fill unoptimized={preview.image.startsWith('data:image/')} className="object-cover" />
            </div>
            <div className="p-5">
              <span className="badge">{preview.badge}</span>
              <h2 className="mt-3 text-2xl font-semibold text-ink">{preview.title}</h2>
              <p className="mt-3 text-sm leading-7 text-steel">{preview.text}</p>
              <div className="mt-6 rounded-2xl bg-frost p-4">
                <h3 className="font-semibold text-ink">{preview.socialsTitle}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {preview.socials.map((item) => (
                    <span key={`${item.label}-${item.href}`} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-accent ring-1 ring-line">
                      {item.label || item.href}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
