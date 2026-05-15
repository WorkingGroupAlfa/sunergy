'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Phone, X, Zap } from 'lucide-react';

const POPUP_STORAGE_KEY = 'sunergy_lead_popup_closed';
const POPUP_DELAY_MS = 60_000;
const CONTACT_PHONE_DISPLAY = '093 000 00 00';
const CONTACT_PHONE_HREF = 'tel:+380930000000';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SubmitState>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_STORAGE_KEY) === 'true') {
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const openPopup = () => {
    setStatus('idle');
    setError('');
    setIsOpen(true);
  };

  const closePopup = () => {
    sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'lead_popup',
          name: String(formData.get('name') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          requestType: String(formData.get('requestType') ?? ''),
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || 'Не вдалося відправити заявку.');
      }

      form.reset();
      setStatus('success');
      sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
    } catch (submitError) {
      setStatus('error');
      setError(submitError instanceof Error ? submitError.message : 'Не вдалося відправити заявку.');
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPopup}
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-panel transition hover:bg-ink md:inline-flex"
        aria-label="Відкрити швидкий зв'язок"
      >
        <Phone className="h-4 w-4" />
        <span>Швидкий зв'язок</span>
      </button>

      <button
        type="button"
        onClick={openPopup}
        className="fixed bottom-24 right-4 z-40 inline-flex rounded-full bg-accent p-4 text-white shadow-panel transition hover:bg-ink md:hidden"
        aria-label="Відкрити швидкий зв'язок"
      >
        <Phone className="h-5 w-5" />
      </button>

      {isOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 px-4 py-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
          >
            <div className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-panel">
              <button
                type="button"
                onClick={closePopup}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/15 p-2 text-white transition hover:bg-white/25"
                aria-label="Закрити попап"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="bg-[linear-gradient(140deg,#0b1f3d,#1f6fb8)] p-6 text-white md:p-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/15 p-3">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-blue-100">SUNERGY консультація</span>
                </div>
                <h2 id="lead-popup-title" className="mt-5 text-2xl font-semibold md:text-3xl">
                  Залиште заявку на підбір енергорішення
                </h2>
                <p className="mt-3 text-sm leading-7 text-blue-100">
                  Менеджер уточнить навантаження, бюджет і підбере комплект для дому або бізнесу.
                </p>
                <a
                  href={CONTACT_PHONE_HREF}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  Подзвонити: {CONTACT_PHONE_DISPLAY}
                </a>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-ink">Ваше ім'я</span>
                    <input className="input" name="name" placeholder="Вкажіть ім'я" autoComplete="name" required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-ink">Телефон</span>
                    <input className="input" name="phone" placeholder="+380" autoComplete="tel" required />
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="mb-2 block text-sm font-medium text-ink">Що потрібно підібрати</span>
                  <select className="input" name="requestType" defaultValue="home">
                    <option value="home">Рішення для дому</option>
                    <option value="business">Рішення для бізнесу</option>
                    <option value="battery">LiFePO4 акумулятор</option>
                    <option value="consultation">Консультація</option>
                  </select>
                </label>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                    <Phone className="h-4 w-4" />
                    <span className="ml-2">{status === 'sending' ? 'Відправляємо...' : 'Залишити заявку'}</span>
                  </button>
                  <button type="button" onClick={closePopup} className="btn-secondary">
                    Пізніше
                  </button>
                </div>

                {status === 'success' ? (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
                    <span>Дякуємо. Заявку відправлено, менеджер SUNERGY зв'яжеться з вами найближчим часом.</span>
                  </div>
                ) : null}

                {status === 'error' ? (
                  <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        ) : null}
    </>
  );
}
