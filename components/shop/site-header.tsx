'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useShop } from '@/components/shop/shop-provider';

const links = [
  { href: '/', label: 'Головна' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/examples', label: 'Приклади' },
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
  const { favoritesCount, cartCount } = useShop();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-md shadow-[0_8px_24px_rgba(9,26,51,0.06)]">
      <div className="section-shell flex h-16 items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center" aria-label="SUNERGY.UA">
          <Image src="/logo-sunergy.svg" alt="SUNERGY.UA" width={210} height={46} className="h-9 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
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
      </div>
    </header>
  );
}
