'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Search, ShoppingCart, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { useShop } from '@/components/shop/shop-provider';
import { compareStableText } from '@/lib/utils';

const links = [
  { href: '/', label: 'Головна' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/examples', label: 'Приклади наших робіт' },
  { href: '/about', label: 'Про нас' },
  { href: '/contacts', label: 'Контакти' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { favoritesCount, cartCount, products } = useShop();
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    return products
      .map((product) => {
        const title = product.title.toLowerCase();
        const brand = product.brand.toLowerCase();
        const specs = product.specs.join(' ').toLowerCase();
        const score =
          title.startsWith(normalizedQuery)
            ? 0
            : brand.startsWith(normalizedQuery)
              ? 1
              : title.includes(normalizedQuery)
                ? 2
                : specs.includes(normalizedQuery)
                  ? 3
                  : 8;

        return { product, score };
      })
      .filter((item) => item.score < 8)
      .sort((a, b) => a.score - b.score || compareStableText(a.product.title, b.product.title))
      .slice(0, 4)
      .map((item) => item.product);
  }, [normalizedQuery, products]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      router.push('/catalog');
      return;
    }

    router.push(`/catalog?search=${encodeURIComponent(value)}`);
    setSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md shadow-[0_8px_24px_rgba(9,26,51,0.06)]">
      <div className="section-shell flex min-h-16 flex-wrap items-center justify-between gap-3 py-2">
        <Link href="/" className="inline-flex items-center" aria-label="SUNERGY.UA">
          <Image src="/logo-sunergy.svg" alt="SUNERGY.UA" width={260} height={60} className="h-11 w-auto sm:h-12" priority />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${isActive(pathname, link.href) ? 'text-ink' : 'text-steel hover:text-ink'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="relative hidden min-w-[220px] max-w-[360px] flex-1 lg:block">
          <div className="flex h-10 items-center rounded-full border border-line bg-white px-3 shadow-soft transition focus-within:border-accent">
            <Search className="h-4 w-4 flex-none text-steel" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
              placeholder="Пошук товарів"
              className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-steel/70"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')} className="rounded-full p-1 text-steel transition hover:bg-frost hover:text-ink" aria-label="Очистити пошук">
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {searchFocused && suggestions.length > 0 ? (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-line bg-white shadow-panel">
              {suggestions.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="block border-b border-line/70 px-4 py-3 transition last:border-b-0 hover:bg-frost"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setQuery('');
                    setSearchFocused(false);
                  }}
                >
                  <span className="block truncate text-sm font-semibold text-ink">{product.title}</span>
                  <span className="mt-1 block text-xs text-steel">
                    {product.brand} · {product.category}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </form>

        <div className="flex items-center gap-2">
          <Link href="/favorites" className="relative rounded-full border border-line p-2 text-steel hover:text-ink" aria-label="Обране">
            <Heart className="h-4 w-4" />
            {favoritesCount > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-ink px-1.5 text-[10px] text-white">{favoritesCount}</span>
            ) : null}
          </Link>
          <Link href="/cart" className="relative rounded-full border border-line p-2 text-steel hover:text-ink" aria-label="Кошик">
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-ink px-1.5 text-[10px] text-white">{cartCount}</span>
            ) : null}
          </Link>
        </div>

        <form onSubmit={handleSearch} className="relative order-last w-full lg:hidden">
          <div className="flex h-10 items-center rounded-full border border-line bg-white px-3 shadow-soft transition focus-within:border-accent">
            <Search className="h-4 w-4 flex-none text-steel" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
              placeholder="Пошук товарів"
              className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-steel/70"
            />
            {query ? (
              <button type="button" onClick={() => setQuery('')} className="rounded-full p-1 text-steel transition hover:bg-frost hover:text-ink" aria-label="Очистити пошук">
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {searchFocused && suggestions.length > 0 ? (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-line bg-white shadow-panel">
              {suggestions.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="block border-b border-line/70 px-4 py-3 transition last:border-b-0 hover:bg-frost"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setQuery('');
                    setSearchFocused(false);
                  }}
                >
                  <span className="block truncate text-sm font-semibold text-ink">{product.title}</span>
                  <span className="mt-1 block text-xs text-steel">
                    {product.brand} · {product.category}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </form>
      </div>
    </header>
  );
}
