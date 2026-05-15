'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BriefcaseBusiness, ImageIcon, LockKeyhole, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { type CaseItem } from '@/data/shop';
import { useShop } from '@/components/shop/shop-provider';
import { ImageDropzone } from '@/components/admin/image-dropzone';

type CaseFormState = CaseItem;

const ADMIN_PASSWORD = 'Vgz24';
const ADMIN_AUTH_KEY = 'sunergy_admin_authenticated';

const emptyCase: CaseFormState = {
  slug: '',
  title: '',
  segment: '',
  location: '',
  result: '',
  system: '',
  image: '/illustrations/case-home.svg',
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яіїєґё]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminWorksPage() {
  const { cases, saveCase, deleteCase, resetCases } = useShop();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState<CaseFormState>(emptyCase);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true');
  }, []);

  const filteredCases = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return cases;

    return cases.filter((item) => `${item.title} ${item.segment} ${item.location} ${item.system}`.toLowerCase().includes(normalized));
  }, [cases, query]);

  const updateForm = <K extends keyof CaseFormState>(key: K, value: CaseFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const startCreate = () => {
    setEditingSlug(null);
    setForm(emptyCase);
    setMessage('');
  };

  const startEdit = (item: CaseItem) => {
    setEditingSlug(item.slug);
    setForm(item);
    setMessage('');
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
      setPassword('');
      return;
    }

    setLoginError('Невірний пароль');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextCase: CaseItem = {
      slug: form.slug.trim() || slugify(form.title),
      title: form.title.trim(),
      segment: form.segment.trim(),
      location: form.location.trim(),
      result: form.result.trim(),
      system: form.system.trim(),
      image: form.image.trim() || '/illustrations/case-home.svg',
    };

    saveCase(nextCase, editingSlug ?? undefined);
    setEditingSlug(nextCase.slug);
    setForm(nextCase);
    setMessage('Роботу збережено');
  };

  const handleDelete = (slug: string) => {
    if (!window.confirm('Видалити роботу зі списку?')) return;
    deleteCase(slug);
    if (editingSlug === slug) startCreate();
    setMessage('Роботу видалено');
  };

  const handleReset = () => {
    if (!window.confirm('Скинути “Наші роботи” до базового списку?')) return;
    resetCases();
    startCreate();
    setMessage('Список скинуто');
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
            <p className="mt-2 text-sm leading-6 text-steel">Введіть пароль, щоб редагувати “Наші роботи”.</p>
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
              <h1 className="text-xl font-semibold leading-tight text-ink">Наші роботи</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {message ? <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</span> : null}
            <button type="button" onClick={startCreate} className="btn-primary">
              <Plus className="h-4 w-4" />
              <span className="ml-2">Нова робота</span>
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              <RotateCcw className="h-4 w-4" />
              <span className="ml-2">Скинути</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1760px] gap-4 px-4 py-4 sm:px-6 lg:h-[calc(100vh-65px)] lg:grid-cols-[minmax(340px,430px)_1fr]">
        <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft lg:flex lg:min-h-0 lg:flex-col">
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-ink">Статті</h2>
                <p className="mt-1 text-xs text-steel">{cases.length} матеріалів</p>
              </div>
              <BriefcaseBusiness className="h-5 w-5 text-accent" />
            </div>
            <input
              className="mt-3 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-accent focus:bg-white"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Пошук за назвою, містом, типом..."
            />
          </div>

          <div className="divide-y divide-slate-100 overflow-auto lg:min-h-0">
            {filteredCases.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => startEdit(item)}
                className={`grid w-full grid-cols-[64px_1fr] gap-3 p-3 text-left transition hover:bg-slate-50 ${editingSlug === item.slug ? 'bg-blue-50/70' : 'bg-white'}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={96}
                  height={96}
                  unoptimized={item.image.startsWith('data:image/')}
                  className="h-16 w-16 rounded-xl border border-slate-200 bg-frost object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block text-xs text-steel">
                    {item.segment} - {item.location}
                  </span>
                  <span className="mt-2 line-clamp-2 block text-xs leading-5 text-steel">{item.result}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft lg:flex lg:min-h-0 lg:flex-col">
          <div className="border-b border-slate-200 p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-[0.18em] text-accent">{editingSlug ? 'Редагування' : 'Створення'}</div>
                <h2 className="mt-1 truncate text-xl font-semibold text-ink">{form.title || 'Нова робота'}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {editingSlug ? (
                  <button
                    type="button"
                    onClick={() => handleDelete(editingSlug)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Видалити</span>
                  </button>
                ) : null}
                <button type="submit" className="btn-primary">
                  <Save className="h-4 w-4" />
                  <span className="ml-2">Зберегти</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 overflow-auto p-4 lg:min-h-0 xl:grid-cols-[1fr_320px]">
            <section className="grid min-w-0 gap-3 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-ink">Назва</span>
                <input className="input h-11" value={form.title} onChange={(event) => updateForm('title', event.target.value)} required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink">Slug</span>
                <input className="input h-11" value={form.slug} onChange={(event) => updateForm('slug', slugify(event.target.value))} placeholder="auto-from-title" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink">Тип</span>
                <input className="input h-11" value={form.segment} onChange={(event) => updateForm('segment', event.target.value)} required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink">Локація</span>
                <input className="input h-11" value={form.location} onChange={(event) => updateForm('location', event.target.value)} required />
              </label>
              <ImageDropzone
                inputId="case-image"
                label="Зображення"
                value={form.image}
                fallback="/illustrations/case-home.svg"
                onChange={(value) => updateForm('image', value)}
              />
              <label className="block md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-ink">Результат</span>
                <textarea className="input min-h-32 resize-y" value={form.result} onChange={(event) => updateForm('result', event.target.value)} required />
              </label>
              <label className="block md:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-ink">Система</span>
                <textarea className="input min-h-24 resize-y" value={form.system} onChange={(event) => updateForm('system', event.target.value)} required />
              </label>
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <ImageIcon className="h-4 w-4 text-accent" />
                Прев'ю
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Image
                  src={form.image || '/illustrations/case-home.svg'}
                  alt={form.title || 'Робота'}
                  width={420}
                  height={280}
                  unoptimized={form.image.startsWith('data:image/')}
                  className="h-44 w-full bg-frost object-cover"
                />
                <div className="p-4">
                  <div className="text-sm text-accent">
                    {form.segment || 'Тип'} - {form.location || 'Локація'}
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-ink">{form.title || 'Назва роботи'}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-6 text-steel">{form.result || 'Опис результату буде тут.'}</p>
                  <div className="mt-4 rounded-xl bg-frost p-3 text-sm text-ink">Система: {form.system || 'Комплектація'}</div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
