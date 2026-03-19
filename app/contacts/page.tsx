import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactsPage() {
  return (
    <main className="section-shell py-12">
      <span className="badge">Контакти</span>
      <h1 className="section-title mt-4">Звʼяжіться з SUNERGY SHOP</h1>
      <p className="section-copy">Допоможемо підібрати рішення, розрахувати бюджет і підготувати конфігурацію під ваш обʼєкт.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="panel-card p-6">
          <h2 className="text-xl font-semibold text-ink">Контактна інформація</h2>
          <div className="mt-4 space-y-3 text-sm text-steel">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +38 (099) 999-99-88</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> info@mail.ua</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Україна, Київ</div>
          </div>
          <div className="mt-5 text-sm text-steel">Працюємо з домашніми та комерційними обʼєктами по всій Україні.</div>
          <Link href="/catalog" className="btn-primary mt-6 inline-flex">Перейти до каталогу</Link>
        </section>

        <section className="panel-card p-6">
          <h2 className="text-xl font-semibold text-ink">Швидкий запит</h2>
          <form className="mt-4 grid gap-4">
            <input className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Ваше імʼя" />
            <input className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Телефон" />
            <input className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Email" />
            <textarea className="min-h-32 rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Коротко опишіть задачу" />
            <button type="button" className="btn-primary w-fit">Надіслати</button>
          </form>
        </section>
      </div>
    </main>
  );
}
