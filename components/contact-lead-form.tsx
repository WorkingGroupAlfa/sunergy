'use client';

import { FormEvent, useState } from 'react';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export function ContactLeadForm() {
  const [status, setStatus] = useState<SubmitState>('idle');
  const [error, setError] = useState('');

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
          source: 'contacts_page',
          name: String(formData.get('name') ?? ''),
          phone: String(formData.get('phone') ?? ''),
          email: String(formData.get('email') ?? ''),
          requestType: String(formData.get('requestType') ?? ''),
          message: String(formData.get('message') ?? ''),
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error || 'Не вдалося відправити заявку.');
      }

      form.reset();
      setStatus('success');
    } catch (submitError) {
      setStatus('error');
      setError(submitError instanceof Error ? submitError.message : 'Не вдалося відправити заявку.');
    }
  }

  return (
    <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
      <input
        className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
        name="name"
        placeholder="Ваше імʼя"
        autoComplete="name"
        required
      />
      <input
        className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
        name="phone"
        placeholder="Телефон"
        autoComplete="tel"
        required
      />
      <input
        className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
      />
      <select
        className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
        name="requestType"
        defaultValue="solution"
      >
        <option value="solution">Підібрати рішення</option>
        <option value="equipment">Підібрати обладнання</option>
        <option value="business">Рішення для бізнесу</option>
        <option value="support">Консультація</option>
      </select>
      <textarea
        className="min-h-32 rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent"
        name="message"
        placeholder="Коротко опишіть задачу"
      />
      <button type="submit" className="btn-primary w-fit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Відправляємо...' : 'Надіслати'}
      </button>

      {status === 'success' ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Дякуємо. Заявку відправлено, менеджер скоро звʼяжеться з вами.
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    </form>
  );
}
