'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, Eye, Home, LockKeyhole, RotateCcw, Save } from 'lucide-react';
import { defaultHomeContent, type HomeContent } from '@/data/home-content';
import { useShop } from '@/components/shop/shop-provider';

const ADMIN_PASSWORD = 'Vgz24';
const ADMIN_AUTH_KEY = 'sunergy_admin_authenticated';

function listToText(items: string[]) {
  return items.join('\n');
}

function textToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
};

function TextField({ label, value, onChange, textarea = false }: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      {textarea ? (
        <textarea className="input min-h-28 resize-y" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="input h-11" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

export default function AdminHomePage() {
  const { homeContent, saveHomeContent, resetHomeContent } = useShop();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState<HomeContent>(homeContent);
  const [benefitsText, setBenefitsText] = useState(listToText(homeContent.benefits));
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true');
  }, []);

  useEffect(() => {
    setForm(homeContent);
    setBenefitsText(listToText(homeContent.benefits));
  }, [homeContent]);

  const previewContent = { ...form, benefits: textToList(benefitsText) };

  const updateForm = <K extends keyof HomeContent>(key: K, value: HomeContent[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
    saveHomeContent(previewContent);
    setMessage('Текст головної збережено');
  };

  const handleReset = () => {
    if (!window.confirm('Скинути текст головної до базового?')) return;
    resetHomeContent();
    setForm(defaultHomeContent);
    setBenefitsText(listToText(defaultHomeContent.benefits));
    setMessage('Текст головної скинуто');
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
            <p className="mt-2 text-sm leading-6 text-steel">Введіть пароль, щоб редагувати головну сторінку.</p>
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
              <h1 className="text-xl font-semibold leading-tight text-ink">Головна сторінка</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {message ? <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{message}</span> : null}
            <button type="button" onClick={handleReset} className="btn-secondary">
              <RotateCcw className="h-4 w-4" />
              <span className="ml-2">Скинути</span>
            </button>
            <button type="submit" form="home-content-form" className="btn-primary">
              <Save className="h-4 w-4" />
              <span className="ml-2">Зберегти</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1760px] gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(440px,0.95fr)_1.05fr]">
        <form id="home-content-form" onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
            <Home className="h-4 w-4 text-accent" />
            Текстові блоки
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-ink">Hero</h2>
              <div className="mt-3 grid gap-3">
                <TextField label="Заголовок" value={form.heroTitle} onChange={(value) => updateForm('heroTitle', value)} textarea />
                <TextField label="Опис" value={form.heroText} onChange={(value) => updateForm('heroText', value)} textarea />
                <div className="grid gap-3 md:grid-cols-3">
                  <TextField label="Кнопка каталогу" value={form.catalogButton} onChange={(value) => updateForm('catalogButton', value)} />
                  <TextField label="Кнопка прикладів" value={form.examplesButton} onChange={(value) => updateForm('examplesButton', value)} />
                  <TextField label="Кнопка контактів" value={form.contactsButton} onChange={(value) => updateForm('contactsButton', value)} />
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-ink">Переваги, кожна з нового рядка</span>
                  <textarea className="input min-h-28 resize-y" value={benefitsText} onChange={(event) => setBenefitsText(event.target.value)} />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-ink">Блок акумуляторів</h2>
              <div className="mt-3 grid gap-3">
                <TextField label="Бейдж" value={form.storageBadge} onChange={(value) => updateForm('storageBadge', value)} />
                <TextField label="Заголовок" value={form.storageTitle} onChange={(value) => updateForm('storageTitle', value)} />
                <TextField label="Текст" value={form.storageText} onChange={(value) => updateForm('storageText', value)} textarea />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-ink">Товари, бренди, проєкти</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <TextField label="Бейдж товарів" value={form.productsBadge} onChange={(value) => updateForm('productsBadge', value)} />
                <TextField label="Заголовок товарів" value={form.productsTitle} onChange={(value) => updateForm('productsTitle', value)} />
                <TextField label="Посилання каталогу" value={form.productsLink} onChange={(value) => updateForm('productsLink', value)} />
                <TextField label="Заголовок брендів" value={form.brandsTitle} onChange={(value) => updateForm('brandsTitle', value)} />
                <TextField label="Бейдж проєктів" value={form.casesBadge} onChange={(value) => updateForm('casesBadge', value)} />
                <TextField label="Заголовок проєктів" value={form.casesTitle} onChange={(value) => updateForm('casesTitle', value)} />
                <TextField label="Посилання проєктів" value={form.casesLink} onChange={(value) => updateForm('casesLink', value)} />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold text-ink">Гарантія</h2>
              <div className="mt-3 grid gap-3">
                <TextField label="Бейдж" value={form.guaranteeBadge} onChange={(value) => updateForm('guaranteeBadge', value)} />
                <TextField label="Заголовок" value={form.guaranteeTitle} onChange={(value) => updateForm('guaranteeTitle', value)} />
                <TextField label="Перший абзац" value={form.guaranteeTextOne} onChange={(value) => updateForm('guaranteeTextOne', value)} textarea />
                <TextField label="Другий абзац" value={form.guaranteeTextTwo} onChange={(value) => updateForm('guaranteeTextTwo', value)} textarea />
              </div>
            </section>
          </div>
        </form>

        <aside className="sticky top-[84px] h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
            <Eye className="h-4 w-4 text-accent" />
            Live preview
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <section className="bg-ink p-6 text-white">
              <h2 className="text-3xl font-semibold leading-tight">{previewContent.heroTitle || 'Заголовок hero'}</h2>
              <p className="mt-4 text-sm leading-6 text-blue-100">{previewContent.heroText || 'Опис hero'}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink">{previewContent.catalogButton}</span>
                <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold">{previewContent.examplesButton}</span>
                <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold">{previewContent.contactsButton}</span>
              </div>
              <ul className="mt-5 space-y-2 text-xs text-blue-100">
                {previewContent.benefits.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </section>
            <section className="p-6">
              <span className="badge">{previewContent.storageBadge}</span>
              <h3 className="mt-3 text-2xl font-semibold text-ink">{previewContent.storageTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-steel">{previewContent.storageText}</p>
            </section>
            <section className="border-t border-slate-200 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="badge">{previewContent.productsBadge}</span>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{previewContent.productsTitle}</h3>
                  <p className="mt-2 text-sm font-semibold text-accent">{previewContent.productsLink}</p>
                </div>
                <div>
                  <span className="badge">{previewContent.guaranteeBadge}</span>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{previewContent.guaranteeTitle}</h3>
                </div>
              </div>
            </section>
            <section className="border-t border-slate-200 p-6">
              <div className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">{previewContent.brandsTitle}</div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <span className="badge">{previewContent.casesBadge}</span>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{previewContent.casesTitle}</h3>
                </div>
                <span className="text-sm font-semibold text-accent">{previewContent.casesLink}</span>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}
