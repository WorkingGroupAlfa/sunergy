'use client';

import { brandLogos } from '@/data/shop';

export function BrandCarousel() {
  const rows = [...brandLogos, ...brandLogos];

  return (
    <section className="border-y border-line bg-frost/60 py-10">
      <div className="section-shell">
        <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent">Працюємо з брендами</div>
        <div className="relative overflow-hidden">
          <div className="brand-track flex w-max items-center gap-8">
            {rows.map((brand, idx) => (
              <div key={`${brand.name}-${idx}`} className="flex h-16 w-40 items-center justify-center rounded-2xl border border-line bg-white px-4">
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="max-h-8 w-auto object-contain"
                  loading="lazy"
                  onError={(event) => {
                    const target = event.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span className="hidden text-sm font-semibold text-steel">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
