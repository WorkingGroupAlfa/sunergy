'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/components/shop/shop-provider';

export function CartClientPage() {
  const { cart, products, setCartQty, removeFromCart, clearCart } = useShop();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const items = Object.entries(cart)
    .map(([slug, qty]) => {
      const product = products.find((item) => item.slug === slug);
      return product ? { product, qty } : null;
    })
    .filter((item): item is { product: (typeof products)[number]; qty: number } => item !== null);

  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { firstName, lastName, phone },
          items: items.map(({ product, qty }) => ({ slug: product.slug, qty })),
        }),
      });
      const result = (await response.json()) as { orderId?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Не вдалося оформити замовлення.');
      }

      clearCart();
      router.push(`/thank-you${result.orderId ? `?order=${encodeURIComponent(result.orderId)}` : ''}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не вдалося оформити замовлення.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="section-shell py-12">
        <h1 className="text-3xl font-semibold text-ink">Кошик</h1>
        <p className="mt-3 text-steel">Кошик порожній. Додайте товари з каталогу.</p>
        <Link href="/catalog" className="btn-primary mt-6 inline-flex">Перейти до каталогу</Link>
      </section>
    );
  }

  return (
    <section className="section-shell py-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-ink">Кошик</h1>
        <button type="button" onClick={clearCart} className="text-sm text-steel underline">Очистити</button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <article key={product.slug} className="panel-card flex gap-4 p-4">
              <Image
                src={product.image}
                alt={product.title}
                width={180}
                height={140}
                unoptimized={product.image.startsWith('data:image/')}
                className={product.image.startsWith('/illustrations/') ? 'h-24 w-28 rounded-xl object-cover' : 'h-24 w-28 rounded-xl bg-frost object-contain'}
              />
              <div className="flex-1">
                <Link href={`/product/${product.slug}`} className="font-semibold text-ink hover:text-accent">
                  {product.title}
                </Link>
                <div className="mt-2 text-steel">{formatPrice(product.price)}</div>
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" className="rounded border border-line px-2" onClick={() => setCartQty(product.slug, qty - 1)}>-</button>
                  <span className="w-8 text-center">{qty}</span>
                  <button type="button" className="rounded border border-line px-2" onClick={() => setCartQty(product.slug, qty + 1)}>+</button>
                  <button type="button" className="ml-3 text-sm text-steel underline" onClick={() => removeFromCart(product.slug)}>
                    Видалити
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="panel-card h-fit p-5">
          <div className="text-steel">Разом</div>
          <div className="mt-2 text-2xl font-semibold text-ink">{formatPrice(total)}</div>
          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="text-sm font-medium text-ink">
                Ім'я
              </label>
              <input
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                minLength={2}
                autoComplete="given-name"
                className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium text-ink">
                Прізвище
              </label>
              <input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                minLength={2}
                autoComplete="family-name"
                className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-ink">
                Телефон
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+38 (___) ___-__-__"
                className="mt-1 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-accent"
              />
            </div>
            {submitError ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p> : null}
            <button type="submit" disabled={isSubmitting} className="btn-primary h-11 w-full disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Відправляємо...' : 'Замовити'}
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}

