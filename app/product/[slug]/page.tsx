import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductActions } from '@/components/shop/product-actions';
import { ProductCard } from '@/components/shop/product-card';
import { products, type Product } from '@/data/shop';
import { formatPrice } from '@/lib/utils';

const availabilityLabel: Record<NonNullable<Product['availability']>, string> = {
  available: 'Є в наявності',
  preorder: 'Під замовлення',
  out_of_stock: 'Немає в наявності',
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === decodeURIComponent(slug));

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  const showFullImage = product.slug === 'sunergy-home-5kwh-lfp';
  const hasRasterProductImage = !product.image.startsWith('/illustrations/');

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
          <Image
            src={product.image}
            alt={product.title}
            width={900}
            height={680}
            priority
            className={showFullImage || hasRasterProductImage ? 'h-full w-full object-contain' : 'h-full w-full object-cover'}
          />
        </article>

        <article className="panel-card p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-accent">{product.category}</span>
            <span className="rounded-full bg-frost px-2.5 py-1 text-xs text-ink">{availabilityLabel[product.availability ?? 'available']}</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-ink">{product.title}</h1>
          <div className="mt-5 text-3xl font-semibold text-ink">{formatPrice(product.price)}</div>
          <p className="mt-4 text-steel">{product.description}</p>

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
