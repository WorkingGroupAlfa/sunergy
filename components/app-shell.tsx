'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ShopProvider } from '@/components/shop/shop-provider';
import { SiteHeader } from '@/components/shop/site-header';
import { MobileBottomNav } from '@/components/shop/mobile-bottom-nav';
import { LeadPopup } from '@/components/lead-popup';

function PublicFooter() {
  return (
    <footer className="mt-0 border-t border-white/10 bg-[linear-gradient(140deg,#0b1f3d,#0f2e54)] text-blue-100 md:mt-14">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <div className="text-lg font-semibold text-white">SUNERGY SHOP</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-blue-100/90">
            Вітрина рішень для дому та бізнесу: сонячні панелі, інвертори, акумулятори й готові енергетичні комплекти.
          </p>
        </div>

        <div>
          <div className="text-sm uppercase tracking-[0.16em] text-blue-200">Навігація</div>
          <div className="mt-4 grid gap-2 text-sm">
            <Link href="/" className="hover:text-white">Головна</Link>
            <Link href="/catalog" className="hover:text-white">Каталог</Link>
            <Link href="/examples" className="hover:text-white">Приклади</Link>
            <Link href="/contacts" className="hover:text-white">Контакти</Link>
            <Link href="/favorites" className="hover:text-white">Обране</Link>
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-[0.16em] text-blue-200">Зв'язок</div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +38 (099) 999-99-88</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@mail.ua</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Київ, Україна</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="section-shell text-xs text-blue-200/90">© 2026 SUNERGY SHOP. Усі права захищено.</div>
      </div>
    </footer>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <ShopProvider>
      {isAdmin ? (
        children
      ) : (
        <>
          <SiteHeader />
          <div className="pb-20 md:pb-0">{children}</div>
          <PublicFooter />
          <MobileBottomNav />
          <LeadPopup />
        </>
      )}
    </ShopProvider>
  );
}
