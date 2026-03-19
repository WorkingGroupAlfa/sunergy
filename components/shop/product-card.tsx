'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/shop';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/components/shop/shop-provider';

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite, addToCart } = useShop();
  const liked = isFavorite(product.slug);

  return (
    <article className="panel-card overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block border-b border-line bg-frost">
        <Image src={product.image} alt={product.title} width={760} height={540} className="h-48 w-full object-cover" />
      </Link>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span key={badge} className="rounded-full bg-frost px-2.5 py-1 text-xs text-accent">
              {badge}
            </span>
          ))}
        </div>

        <Link href={`/product/${product.slug}`} className="text-lg font-semibold text-ink hover:text-accent">
          {product.title}
        </Link>

        <p className="mt-2 text-sm text-steel">{product.shortDescription}</p>

        <div className="mt-4 flex items-end gap-3">
          <div className="text-xl font-semibold text-ink">{formatPrice(product.price)}</div>
          {product.oldPrice ? <div className="text-sm text-steel line-through">{formatPrice(product.oldPrice)}</div> : null}
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => addToCart(product.slug)} className="btn-primary flex-1">
            <ShoppingCart className="h-4 w-4" />
            <span className="ml-2">У кошик</span>
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(product.slug)}
            className={`rounded-full border px-3 ${liked ? 'border-accent text-accent' : 'border-line text-steel'}`}
            aria-label="Додати в обране"
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
}
