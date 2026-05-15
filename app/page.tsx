'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { ProductCard } from '@/components/shop/product-card';
import { PowerCalculator } from '@/components/shop/power-calculator';
import { BrandCarousel } from '@/components/shop/brand-carousel';
import { CasesCarousel } from '@/components/shop/cases-carousel';
import { useShop } from '@/components/shop/shop-provider';

export default function HomePage() {
  const { products, cases, homeContent, showCalculator } = useShop();
  const featured = products.slice(0, 3);
  const featuredStorage = products.filter((item) => item.category === 'Акумулятори' || item.category === 'Системи зберігання').slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-grid-fade bg-[size:34px_34px] opacity-50" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="section-shell relative grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl md:leading-[1.05]">
              {homeContent.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
              {homeContent.heroText}
            </p>

            <div className="mt-8 hidden flex-wrap gap-3 sm:flex">
              <Link href="/catalog" className="btn-primary bg-white text-ink hover:bg-frost">
                {homeContent.catalogButton}
              </Link>
              <Link href="/examples" className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                {homeContent.examplesButton}
              </Link>
              <Link href="/contacts" className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                {homeContent.contactsButton}
              </Link>
            </div>

            <ul className="mt-7 space-y-2 text-sm text-blue-100">
              {homeContent.benefits.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 overflow-hidden rounded-[24px] border border-white/15 bg-white/10 shadow-panel lg:order-2">
            <Image
              src="/images/hero-sunergy-showroom.jpg"
              alt="Сонячна система SUNERGY"
              width={820}
              height={640}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="rounded-[28px] border border-line bg-frost/70 p-6 md:p-8">
          <span className="badge">{homeContent.storageBadge}</span>
          <h2 className="mt-4 text-3xl font-semibold text-ink">{homeContent.storageTitle}</h2>
          <p className="mt-3 max-w-3xl text-steel">
            {homeContent.storageText}
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredStorage.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="badge">{homeContent.productsBadge}</span>
            <h2 className="section-title mt-3">{homeContent.productsTitle}</h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-accent hover:text-ink">
            {homeContent.productsLink} <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {showCalculator ? <PowerCalculator /> : null}

      <BrandCarousel title={homeContent.brandsTitle} />

      <section className="section-shell py-14">
        <div className="grid gap-8 rounded-[28px] border border-line bg-white p-6 shadow-soft md:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <span className="badge">{homeContent.guaranteeBadge}</span>
            <h2 className="mt-4 text-3xl font-semibold text-ink">{homeContent.guaranteeTitle}</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-steel md:text-base">
            <p>
              {homeContent.guaranteeTextOne}
            </p>
            <p>
              {homeContent.guaranteeTextTwo}
            </p>
          </div>
        </div>
      </section>

      <CasesCarousel cases={cases} badge={homeContent.casesBadge} title={homeContent.casesTitle} linkLabel={homeContent.casesLink} />
    </main>
  );
}
