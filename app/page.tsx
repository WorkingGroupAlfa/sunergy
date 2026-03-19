import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { cases, products } from '@/data/shop';
import { ProductCard } from '@/components/shop/product-card';
import { PowerCalculator } from '@/components/shop/power-calculator';
import { BrandCarousel } from '@/components/shop/brand-carousel';

const benefits = [
  'Готові рішення на 5, 15 і 30 кВт',
  'Обране та кошик між сторінками',
  'Окремі сторінки товару, прикладів і контактів',
];

export default function HomePage() {
  const featured = products.slice(0, 3);
  const sunergyBatteries = products.filter((item) => item.brand === 'SUNERGY').slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-grid-fade bg-[size:34px_34px] opacity-50" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="section-shell relative grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-blue-100">
              SUNERGY SHOP
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl md:leading-[1.05]">
              Енергетична вітрина для дому та бізнесу
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
              Сонячні панелі, інвертори, акумулятори та готові комплекти. Оберіть товар, відкрийте картку й додайте в обране або кошик.
            </p>

            <div className="mt-8 hidden flex-wrap gap-3 sm:flex">
              <Link href="/catalog" className="btn-primary bg-white text-ink hover:bg-frost">
                Перейти до каталогу
              </Link>
              <Link href="/examples" className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                Переглянути приклади
              </Link>
              <Link href="/contacts" className="btn-secondary border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                Контакти
              </Link>
            </div>

            <ul className="mt-7 space-y-2 text-sm text-blue-100">
              {benefits.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-card overflow-hidden border-white/15 bg-white/10">
            <Image
              src="/illustrations/hero-energy.svg"
              alt="Сонячна система"
              width={820}
              height={640}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="badge">Товари вітрини</span>
            <h2 className="section-title mt-3">Популярні позиції</h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-accent hover:text-ink">
            Увесь каталог <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell pb-14">
        <div className="rounded-[28px] border border-line bg-frost/70 p-6 md:p-8">
          <span className="badge">Власне виробництво SUNERGY</span>
          <h2 className="mt-4 text-3xl font-semibold text-ink">Акумулятори українського виробництва</h2>
          <p className="mt-3 max-w-3xl text-steel">
            У магазині доступна лінійка LiFePO4 акумуляторів SUNERGY. Виробляємо в Україні, адаптуємо під домашні та бізнес-сценарії, забезпечуємо сервіс і масштабування системи.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sunergyBatteries.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <PowerCalculator />

      <BrandCarousel />

      <section className="section-shell py-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="badge">Приклади</span>
            <h2 className="section-title mt-3">Виконані проєкти</h2>
          </div>
          <Link href="/examples" className="text-sm font-semibold text-accent hover:text-ink">
            Усі приклади
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {cases.slice(0, 2).map((item) => (
            <article key={item.slug} className="panel-card overflow-hidden">
              <Image src={item.image} alt={item.title} width={900} height={560} className="h-52 w-full object-cover" />
              <div className="p-6">
                <div className="text-sm text-accent">
                  {item.segment} - {item.location}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{item.result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
