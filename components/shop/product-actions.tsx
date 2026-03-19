'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '@/components/shop/shop-provider';

export function ProductActions({ slug }: { slug: string }) {
  const { isFavorite, toggleFavorite, addToCart } = useShop();
  const liked = isFavorite(slug);

  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={() => addToCart(slug)} className="btn-primary">
        <ShoppingCart className="h-4 w-4" />
        <span className="ml-2">Додати в кошик</span>
      </button>
      <button
        type="button"
        onClick={() => toggleFavorite(slug)}
        className={`btn-secondary ${liked ? 'border-accent text-accent' : ''}`}
      >
        <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
        <span className="ml-2">В обране</span>
      </button>
    </div>
  );
}
