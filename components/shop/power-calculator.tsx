'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { generatorPacks, products, type GeneratorPackKey } from '@/data/shop';
import { formatPrice } from '@/lib/utils';

export function PowerCalculator() {
  const [packKey, setPackKey] = useState<GeneratorPackKey>('house');
  const [backup, setBackup] = useState(true);
  const [autonomy, setAutonomy] = useState(true);

  const result = useMemo(() => {
    const pack = generatorPacks.find((item) => item.key === packKey) ?? generatorPacks[1];

    const baseTotal = pack.composition.reduce((sum, row) => {
      const product = products.find((item) => item.slug === row.slug);
      return product ? sum + product.price * row.qty : sum;
    }, 0);

    const backupBoost = backup ? baseTotal * 0.08 : 0;
    const autonomyBoost = autonomy ? baseTotal * 0.12 : 0;
    const minPrice = Math.round(baseTotal + backupBoost + autonomyBoost);
    const maxPrice = Math.round(minPrice * 1.18);

    return {
      pack,
      minPrice,
      maxPrice,
    };
  }, [autonomy, backup, packKey]);

  return (
    <section className="section-shell py-16">
      <div className="rounded-[28px] bg-ink p-6 text-white md:p-8">
        <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-blue-200">
          Калькулятор комплекту
        </span>
        <h2 className="mt-4 text-3xl font-semibold">Підбір генерації за готовими картками</h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <div className="text-sm text-blue-100">Тип обʼєкта і потужність</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {generatorPacks.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setPackKey(item.key)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    packKey === item.key ? 'border-white bg-white/15 text-white' : 'border-white/15 bg-white/5 text-blue-100'
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.16em]">{item.objectLabel}</div>
                  <div className="mt-1 text-lg font-semibold">{item.generationPower} кВт</div>
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setBackup((v) => !v)}
                className={`rounded-2xl border px-4 py-3 text-left ${backup ? 'border-white bg-white/15' : 'border-white/15 bg-white/5'}`}
              >
                <div className="text-sm font-semibold">Резерв</div>
                <div className="mt-1 text-sm text-blue-100">{backup ? 'Увімкнено' : 'Вимкнено'}</div>
              </button>
              <button
                type="button"
                onClick={() => setAutonomy((v) => !v)}
                className={`rounded-2xl border px-4 py-3 text-left ${autonomy ? 'border-white bg-white/15' : 'border-white/15 bg-white/5'}`}
              >
                <div className="text-sm font-semibold">Автономність</div>
                <div className="mt-1 text-sm text-blue-100">{autonomy ? 'Підвищена' : 'Базова'}</div>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5">
            <div className="text-sm uppercase tracking-[0.16em] text-blue-200">Результат</div>
            <h3 className="mt-3 text-2xl font-semibold">{result.pack.title}</h3>
            <p className="mt-2 text-sm text-blue-100">{result.pack.summary}</p>

            <ul className="mt-4 space-y-2 text-sm text-blue-50">
              {result.pack.composition.map((item) => {
                const product = products.find((row) => row.slug === item.slug);
                if (!product) return null;
                return (
                  <li key={item.slug} className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <span>{product.title}</span>
                    <span>x{item.qty}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 text-sm text-blue-100">Орієнтир бюджету</div>
            <div className="mt-2 text-2xl font-semibold">{formatPrice(result.minPrice)} - {formatPrice(result.maxPrice)}</div>

            <Link href="/catalog" className="btn-primary mt-5 inline-flex bg-white text-ink hover:bg-frost">
              Відкрити товари
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


