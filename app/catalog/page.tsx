import { categoryOrder, products } from '@/data/shop';
import { ProductCard } from '@/components/shop/product-card';

export default function CatalogPage() {
  return (
    <main className="section-shell py-12">
      <span className="badge">Каталог товарів</span>
      

      <div className="mt-6 flex flex-wrap gap-2">
        {categoryOrder.map((category) => (
          <span key={category} className="rounded-full border border-line bg-white px-3 py-1 text-sm text-ink">
            {category}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
