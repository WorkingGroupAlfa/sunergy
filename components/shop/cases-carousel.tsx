'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { type CaseItem } from '@/data/shop';

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function CasesCarousel({
  cases,
  badge = 'Приклади',
  title = 'Виконані проєкти',
  linkLabel = 'Усі приклади',
}: {
  cases: CaseItem[];
  badge?: string;
  title?: string;
  linkLabel?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (cases.length === 0) return null;

  const activeCase = cases[wrapIndex(activeIndex, cases.length)];

  const goTo = (direction: number) => {
    setActiveIndex((index) => wrapIndex(index + direction, cases.length));
  };

  return (
    <section className="pb-3 pt-10 md:py-14">
      <div className="section-shell">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="badge">{badge}</span>
            <h2 className="section-title mt-3">{title}</h2>
          </div>
          <Link href="/examples" className="text-sm font-semibold text-accent hover:text-ink">
            {linkLabel}
          </Link>
        </div>
      </div>

      <div className="section-shell mt-8">
        <article
          className="panel-card grid min-h-[430px] overflow-hidden md:grid-cols-[1.15fr_0.85fr]"
          onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchStart === null) return;
            const delta = (event.changedTouches[0]?.clientX ?? touchStart) - touchStart;
            if (Math.abs(delta) > 42) goTo(delta > 0 ? -1 : 1);
            setTouchStart(null);
          }}
        >
          <div className="relative min-h-[260px] bg-frost md:min-h-[430px]">
            <Image
              src={activeCase.image}
              alt={activeCase.title}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              unoptimized={activeCase.image.startsWith('data:image/')}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <div className="text-sm font-semibold text-accent">
              {activeCase.segment} - {activeCase.location}
            </div>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink md:text-4xl">{activeCase.title}</h3>
            <p className="mt-5 text-sm leading-7 text-steel md:text-base">{activeCase.result}</p>
            <div className="mt-6 rounded-2xl bg-frost p-4 text-sm font-medium leading-6 text-ink">Система: {activeCase.system}</div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="text-sm font-semibold text-steel">
                {wrapIndex(activeIndex, cases.length) + 1} / {cases.length}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => goTo(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-accent hover:text-accent" aria-label="Попередній проєкт">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => goTo(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-accent hover:text-accent" aria-label="Наступний проєкт">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
