'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '@/components/shop/shop-provider';

export default function AboutPage() {
  const { aboutContent } = useShop();

  return (
    <main className="section-shell py-10 md:py-14">
      <section className="overflow-hidden rounded-[28px] border border-line bg-white shadow-soft">
        <div className="relative min-h-[260px] bg-frost md:min-h-[440px]">
          <Image
            src={aboutContent.image}
            alt={aboutContent.title}
            fill
            sizes="100vw"
            priority
            unoptimized={aboutContent.image.startsWith('data:image/')}
            className="object-cover"
          />
        </div>

        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="badge">{aboutContent.badge}</span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl">{aboutContent.title}</h1>
            <p className="mt-5 text-base leading-8 text-steel">{aboutContent.text}</p>
          </div>

          <aside className="rounded-2xl border border-line bg-frost/70 p-5">
            <h2 className="text-lg font-semibold text-ink">{aboutContent.socialsTitle}</h2>
            <div className="mt-5 grid gap-3">
              {aboutContent.socials
                .filter((item) => item.label.trim() && item.href.trim())
                .map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
