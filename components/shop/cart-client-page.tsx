'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/shop';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/components/shop/shop-provider';

export function CartClientPage() {
  const { cart, setCartQty, removeFromCart, clearCart } = useShop();

  const items = Object.entries(cart)
    .map(([slug, qty]) => {
      const product = products.find((item) => item.slug === slug);
      return product ? { product, qty } : null;
    })
    .filter((item): item is { product: (typeof products)[number]; qty: number } => item !== null);

  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);

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
              <Image src={product.image} alt={product.title} width={180} height={140} className="h-24 w-28 rounded-xl object-cover" />
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
              <div className="font-semibold text-ink">{formatPrice(product.price * qty)}</div>
            </article>
          ))}
        </div>

        <aside className="panel-card h-fit p-5">
          <div className="text-steel">Разом</div>
          <div className="mt-2 text-2xl font-semibold text-ink">{formatPrice(total)}</div>
          <p className="mt-4 text-sm text-steel">Це вітрина. Оформлення замовлення вимкнене за вимогою.</p>
        </aside>
      </div>
    </section>
  );
}

