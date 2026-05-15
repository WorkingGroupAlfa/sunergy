'use client';

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { type Product, type ProductCategory } from '@/data/shop';
import { ProductCard } from '@/components/shop/product-card';
import { useShop } from '@/components/shop/shop-provider';

type CategoryFilter = ProductCategory | 'all';

const PAGE_SIZE = 18;

function buildSearchText(product: Product) {
  return [
    product.title,
    product.brand,
    product.category,
    product.shortDescription,
    product.description,
    ...product.specs,
    ...product.badges,
  ]
    .join(' ')
    .toLowerCase();
}

function ProductCardSkeleton() {
  return (
    <article className="panel-card overflow-hidden">
      <div className="h-48 animate-pulse bg-frost" />
      <div className="space-y-4 p-5">
        <div className="flex gap-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-frost" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-frost" />
        </div>
        <div className="h-6 w-4/5 animate-pulse rounded-lg bg-frost" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-frost" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-frost" />
        </div>
        <div className="h-7 w-28 animate-pulse rounded-lg bg-frost" />
        <div className="h-10 w-full animate-pulse rounded-full bg-frost" />
      </div>
    </article>
  );
}

export default function CatalogPage() {
  const { products, categories } = useShop();
  const categoryRailRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [categoryScroll, setCategoryScroll] = useState({ left: 0, max: 0, client: 1, scroll: 1 });
  const deferredQuery = useDeferredValue(query);

  const availableCategories = useMemo(
    () => categories.filter((category) => products.some((product) => product.category === category)),
    [categories, products]
  );

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const categoryProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const indexedProducts = useMemo(
    () => categoryProducts.map((product) => ({ product, searchText: buildSearchText(product) })),
    [categoryProducts]
  );

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return categoryProducts;
    return indexedProducts.filter((item) => item.searchText.includes(normalizedQuery)).map((item) => item.product);
  }, [categoryProducts, indexedProducts, normalizedQuery]);

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    return categoryProducts
      .map((product) => {
        const title = product.title.toLowerCase();
        const brand = product.brand.toLowerCase();
        const specs = product.specs.join(' ').toLowerCase();
        const score =
          title === normalizedQuery
            ? 0
            : title.startsWith(normalizedQuery)
              ? 1
              : brand.startsWith(normalizedQuery)
                ? 2
                : title.includes(normalizedQuery)
                  ? 3
                  : specs.includes(normalizedQuery)
                    ? 4
                    : 8;

        return { product, score };
      })
      .filter((item) => item.score < 8)
      .sort((a, b) => a.score - b.score || a.product.title.localeCompare(b.product.title))
      .slice(0, 3)
      .map((item) => item.product);
  }, [categoryProducts, normalizedQuery]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setLoadingMore(false);
  }, [selectedCategory, normalizedQuery]);

  const updateCategoryScroll = useCallback(() => {
    const rail = categoryRailRef.current;
    if (!rail) return;

    setCategoryScroll({
      left: rail.scrollLeft,
      max: Math.max(rail.scrollWidth - rail.clientWidth, 0),
      client: rail.clientWidth,
      scroll: rail.scrollWidth,
    });
  }, []);

  useEffect(() => {
    const rail = categoryRailRef.current;
    if (!rail) return;

    updateCategoryScroll();
    rail.addEventListener('scroll', updateCategoryScroll, { passive: true });
    window.addEventListener('resize', updateCategoryScroll);

    return () => {
      rail.removeEventListener('scroll', updateCategoryScroll);
      window.removeEventListener('resize', updateCategoryScroll);
    };
  }, [availableCategories, updateCategoryScroll]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredProducts.length;
  const showSuggestions = searchFocused && suggestions.length > 0;
  const categoryThumbWidth = categoryScroll.max === 0 ? 100 : Math.max(20, (categoryScroll.client / categoryScroll.scroll) * 100);
  const categoryThumbLeft = categoryScroll.max === 0 ? 0 : (categoryScroll.left / categoryScroll.max) * (100 - categoryThumbWidth);

  const handleCategoryTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = categoryRailRef.current;
    const track = event.currentTarget;
    if (!rail || categoryScroll.max === 0) return;

    const moveTo = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      const thumbPx = (categoryThumbWidth / 100) * rect.width;
      const available = rect.width - thumbPx;
      const x = Math.min(Math.max(clientX - rect.left - thumbPx / 2, 0), available);
      rail.scrollLeft = (x / available) * categoryScroll.max;
    };

    moveTo(event.clientX);

    const handlePointerMove = (moveEvent: PointerEvent) => moveTo(moveEvent.clientX);
    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });
  };

  const loadMore = () => {
    setLoadingMore(true);
    window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredProducts.length));
      setLoadingMore(false);
    }, 180);
  };

  return (
    <main className="section-shell py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="badge">Каталог товарів</span>
          <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">Товари SUNERGY</h1>
          <p className="mt-3 text-sm text-steel">
            Показано {visibleProducts.length} з {filteredProducts.length} позицій
          </p>
        </div>
      </div>

      <div className="mt-6 grid max-w-[1064px] gap-4 md:grid-cols-[minmax(280px,520px)_minmax(280px,520px)] md:items-start">
        <div className="relative">
          <div className="flex h-12 items-center rounded-2xl border border-line bg-white px-4 shadow-soft transition focus-within:border-accent">
            <Search className="h-4 w-4 flex-none text-steel" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
              placeholder="Пошук за назвою, брендом або моделлю"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-steel/70"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')} className="rounded-full p-1 text-steel transition hover:bg-frost hover:text-ink" aria-label="Очистити пошук">
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {showSuggestions ? (
            <div className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-2xl border border-line bg-white shadow-panel">
              {suggestions.map((product) => (
                <button
                  key={product.slug}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setQuery(product.title);
                    setSearchFocused(false);
                  }}
                  className="block w-full border-b border-line/70 px-4 py-3 text-left transition last:border-b-0 hover:bg-frost"
                >
                  <span className="block truncate text-sm font-semibold text-ink">{product.title}</span>
                  <span className="mt-1 block text-xs text-steel">
                    {product.brand} · {product.category}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          <div ref={categoryRailRef} className="scrollbar-hide flex h-12 gap-2 overflow-x-auto overflow-y-hidden rounded-2xl border border-blue-100 bg-[#f7fbff] p-1.5 shadow-soft">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`h-9 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${
                selectedCategory === 'all'
                  ? 'border-ink bg-ink text-white shadow-soft'
                  : 'border-blue-100 bg-white text-ink hover:border-accent hover:bg-blue-50 hover:text-accent'
              }`}
            >
              Усі
            </button>
            {availableCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`h-9 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'border-ink bg-ink text-white shadow-soft'
                    : 'border-blue-100 bg-white text-ink hover:border-accent hover:bg-blue-50 hover:text-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {categoryScroll.max > 0 ? (
            <div
              role="scrollbar"
              aria-label="Прокрутити категорії"
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={Math.round(categoryScroll.max)}
              aria-valuenow={Math.round(categoryScroll.left)}
              onPointerDown={handleCategoryTrackPointerDown}
              className="relative mt-2 h-2 cursor-grab rounded-full bg-blue-50 active:cursor-grabbing"
            >
              <div
                className="absolute top-0 h-full rounded-full bg-accent shadow-[0_0_0_1px_rgba(45,77,122,0.12)] transition-[left,width] duration-150"
                style={{
                  left: `${categoryThumbLeft}%`,
                  width: `${categoryThumbWidth}%`,
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} priority={index < 3} />
            ))}
            {loadingMore ? Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />) : null}
          </div>

          {canLoadMore ? (
            <div className="mt-8 flex justify-center">
              <button type="button" onClick={loadMore} disabled={loadingMore} className="btn-primary min-w-44 disabled:cursor-wait disabled:opacity-70">
                {loadingMore ? 'Завантаження...' : `Показати ще ${Math.min(PAGE_SIZE, filteredProducts.length - visibleCount)}`}
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-8 rounded-[24px] border border-line bg-frost/70 p-8 text-center">
          <h2 className="text-xl font-semibold text-ink">Нічого не знайдено</h2>
          <p className="mt-2 text-sm text-steel">Спробуйте змінити запит або вибрати іншу категорію.</p>
        </div>
      )}
    </main>
  );
}
