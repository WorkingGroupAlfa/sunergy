'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { products } from '@/data/shop';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/components/shop/shop-provider';

export function FavoritesClientPage() {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const items = products.filter((product) => favorites.includes(product.slug));

  if (items.length === 0) {
    return (
      <section className="section-shell py-12">
        <h1 className="text-3xl font-semibold text-ink">Обране</h1>
        <p className="mt-3 text-steel">Поки порожньо. Додайте товари з каталогу.</p>
        <Link href="/catalog" className="btn-primary mt-6 inline-flex">Перейти до каталогу</Link>
      </section>
    );
  }

  return (
    <section className="section-shell py-12">
      <h1 className="text-3xl font-semibold text-ink">Обране</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <article key={product.slug} className="panel-card overflow-hidden">
            <Link href={`/product/${product.slug}`} className="block border-b border-line bg-frost">
              <Image src={product.image} alt={product.title} width={700} height={500} className="h-44 w-full object-cover" />
            </Link>
            <div className="p-5">
              <Link href={`/product/${product.slug}`} className="text-lg font-semibold text-ink hover:text-accent">
                {product.title}
              </Link>
              <div className="mt-3 text-xl font-semibold text-ink">{formatPrice(product.price)}</div>
              <div className="mt-4 flex gap-2">
                <button type="button" className="btn-primary flex-1" onClick={() => addToCart(product.slug)}>
                  <ShoppingCart className="h-4 w-4" />
                  <span className="ml-2">У кошик</span>
                </button>
                <button type="button" className="btn-secondary" onClick={() => toggleFavorite(product.slug)} aria-label="Прибрати з обраного">
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

