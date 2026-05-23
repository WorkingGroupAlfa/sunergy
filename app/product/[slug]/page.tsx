'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ProductActions } from '@/components/shop/product-actions';
import { ProductCard } from '@/components/shop/product-card';
import { useShop } from '@/components/shop/shop-provider';
import { type Product } from '@/data/shop';
import { formatPrice } from '@/lib/utils';

const availabilityLabel: Record<NonNullable<Product['availability']>, string> = {
  available: 'Є в наявності',
  preorder: 'Під замовлення',
  out_of_stock: 'Немає в наявності',
};

function getSlugFromParams(slug: string | string[] | undefined) {
  const rawSlug = Array.isArray(slug) ? slug[0] : slug;
  return rawSlug ? decodeURIComponent(rawSlug) : '';
}

function getProductImages(product: Product) {
  const gallery = Array.isArray(product.images) ? product.images : [];
  return Array.from(new Set([product.image, ...gallery].map((image) => image?.trim()).filter(Boolean)));
}

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const slug = getSlugFromParams(params.slug);
  const { products, storageReady } = useShop();
  const product = products.find((item) => item.slug === slug);
  const images = useMemo(() => (product ? getProductImages(product) : []), [product]);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage((current) => (images.includes(current) ? current : images[0]));
    }
  }, [images]);

  if (!product) {
    return (
      <main className="section-shell py-12">
        <div className="panel-card p-8 text-center">
          <h1 className="text-2xl font-semibold text-ink">{storageReady ? 'Товар не знайдено' : 'Завантажуємо товар'}</h1>
          <p className="mt-3 text-sm leading-6 text-steel">
            {storageReady ? 'Перевірте посилання або поверніться до каталогу.' : 'Підтягуємо дані з адмінки.'}
          </p>
          {storageReady ? (
            <Link href="/catalog" className="btn-primary mt-6 inline-flex">
              До каталогу
            </Link>
          ) : null}
        </div>
      </main>
    );
  }

  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  const visibleImage = activeImage || product.image;
  const hasRasterProductImage = !visibleImage.startsWith('/illustrations/');
  const descriptionBlocks = product.description
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <main className="section-shell py-12">
      <div className="text-sm text-steel">
        <Link href="/catalog" className="hover:text-accent">
          Каталог
        </Link>{' '}
        / {product.title}
      </div>

      <section className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <article className="panel-card overflow-hidden">
          <div className="bg-frost">
            <Image
              src={visibleImage}
              alt={product.title}
              width={900}
              height={680}
              priority
              unoptimized={visibleImage.startsWith('data:image/')}
              className={hasRasterProductImage ? 'h-full max-h-[680px] w-full object-contain' : 'h-full w-full object-cover'}
            />
          </div>

          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-3 border-t border-line bg-white p-4 sm:grid-cols-5 md:grid-cols-6">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`aspect-square overflow-hidden rounded-xl border bg-frost transition ${
                    image === visibleImage ? 'border-accent ring-2 ring-accent/20' : 'border-line hover:border-accent'
                  }`}
                  aria-label={`Фото ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    width={140}
                    height={140}
                    unoptimized={image.startsWith('data:image/')}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </article>

        <article className="panel-card p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-accent">{product.category}</span>
            <span className="rounded-full bg-frost px-2.5 py-1 text-xs text-ink">{availabilityLabel[product.availability ?? 'available']}</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-ink">{product.title}</h1>
          <div className="mt-5 text-3xl font-semibold text-ink">{formatPrice(product.price)}</div>
          {product.shortDescription ? <p className="mt-4 text-base leading-7 text-steel">{product.shortDescription}</p> : null}

          <ul className="mt-5 space-y-2 text-sm text-graphite">
            {product.specs.map((spec) => (
              <li key={spec} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <ProductActions slug={product.slug} />
          </div>
        </article>
      </section>

      {descriptionBlocks.length > 0 ? (
        <section className="mt-8 panel-card p-6">
          <h2 className="text-2xl font-semibold text-ink">Опис товару</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-steel">
            {descriptionBlocks.map((block, index) => (
              <p key={index} className="whitespace-pre-line">
                {block}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-ink">Схожі товари</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
