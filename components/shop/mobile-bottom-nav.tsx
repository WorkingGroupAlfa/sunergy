'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Grid2x2, Home, Phone } from 'lucide-react';

const links = [
  { href: '/', label: 'Головна', icon: Home },
  { href: '/catalog', label: 'Каталог', icon: Grid2x2 },
  { href: '/examples', label: 'Приклади', icon: BookOpen },
  { href: '/contacts', label: 'Контакти', icon: Phone },
];

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[60] border-t border-line/90 bg-white/95 shadow-[0_-8px_30px_rgba(9,26,51,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-4 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
        {links.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center rounded-xl px-1 py-1.5 text-[11px] transition ${
                active ? 'bg-frost text-ink' : 'text-steel'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="mt-1 leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
