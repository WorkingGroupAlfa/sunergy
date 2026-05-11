'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/shop';
import { formatPrice } from '@/lib/utils';
import { useShop } from '@/components/shop/shop-provider';

const availabilityLabel: Record<NonNullable<Product['availability']>, string> = {
  available: 'Є в наявності',
  preorder: 'Під замовлення',
  out_of_stock: 'Немає в наявності',
};

const availabilityClass: Record<NonNullable<Product['availability']>, string> = {
  available: 'bg-green-50 text-green-700',
  preorder: 'bg-amber-50 text-amber-700',
  out_of_stock: 'bg-slate-100 text-slate-600',
};

export const ProductCard = memo(function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { isFavorite, toggleFavorite, addToCart } = useShop();
  const [isPortraitImage, setIsPortraitImage] = useState(false);
  const liked = isFavorite(product.slug);
  const availability = product.availability ?? 'available';
  const visibleBadges = product.badges.filter((badge, index, badges) => {
    const normalizedBadge = badge.trim().toLowerCase();
    return normalizedBadge !== availabilityLabel[availability].toLowerCase() && badges.findIndex((item) => item.trim().toLowerCase() === normalizedBadge) === index;
  });
  const hasSunergyPhoto =
    product.slug === 'sunergy-home-5kwh-lfp' ||
    product.slug === 'sunergy-pro-10kwh-lfp' ||
    product.slug === 'sunergy-business-15kwh-lfp';
  const hasMatchedPhotoFrame = product.slug === 'sunergy-home-5kwh-lfp' || product.slug === 'sunergy-pro-10kwh-lfp';
  const hasRasterProductImage = !product.image.startsWith('/illustrations/');
  const imageFrameClass = hasMatchedPhotoFrame
    ? 'block aspect-[910/763] overflow-hidden border-b border-line bg-frost'
    : hasRasterProductImage
      ? 'block aspect-[16/11] overflow-hidden border-b border-line bg-frost'
      : 'block border-b border-line bg-frost';
  const imageClass = hasMatchedPhotoFrame
    ? 'h-full w-full object-cover object-top'
    : hasRasterProductImage
      ? isPortraitImage
        ? 'h-full w-full object-contain object-center'
        : 'h-full w-full object-cover object-center'
      : hasSunergyPhoto
        ? 'h-auto w-full'
        : 'h-48 w-full object-cover';

  return (
    <article className="product-card panel-card flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-panel">
      <Link href={`/product/${product.slug}`} className={imageFrameClass}>
        <Image
          src={product.image}
          alt={product.title}
          width={760}
          height={540}
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 46vw, 92vw"
          priority={priority}
          className={imageClass}
          onLoad={(event) => {
            const image = event.currentTarget;
            setIsPortraitImage(hasRasterProductImage && image.naturalHeight > image.naturalWidth);
          }}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex min-h-[56px] content-start flex-wrap gap-2 overflow-hidden">
          <span className={`rounded-full px-2.5 py-1 text-xs ${availabilityClass[availability]}`}>
            {availabilityLabel[availability]}
          </span>
          {visibleBadges.map((badge) => (
            <span key={badge} className="rounded-full bg-frost px-2.5 py-1 text-xs text-accent">
              {badge}
            </span>
          ))}
        </div>

        <Link href={`/product/${product.slug}`} className="line-clamp-2 min-h-[56px] text-lg font-semibold leading-7 text-ink hover:text-accent">
          {product.title}
        </Link>

        <p className="mt-2 line-clamp-3 min-h-[66px] text-sm leading-[22px] text-steel">{product.shortDescription}</p>

        <div className="mt-auto flex min-h-[32px] items-end gap-3 pt-4">
          <div className="text-xl font-semibold text-ink">{formatPrice(product.price)}</div>
          {product.oldPrice ? <div className="text-sm text-steel line-through">{formatPrice(product.oldPrice)}</div> : null}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button type="button" onClick={() => addToCart(product.slug)} className="btn-primary h-10 flex-1">
            <ShoppingCart className="h-4 w-4" />
            <span className="ml-2">У кошик</span>
          </button>
          <button
            type="button"
            onClick={() => toggleFavorite(product.slug)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition hover:border-accent hover:text-accent ${liked ? 'border-accent text-accent' : 'border-line text-steel'}`}
            aria-label="Додати в обране"
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
});
