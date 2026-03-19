import Image from 'next/image';
import { cases } from '@/data/shop';

export default function ExamplesPage() {
  return (
    <main className="section-shell py-12">
      <span className="badge">Приклади</span>
      <h1 className="section-title mt-4">Окрема сторінка реалізованих проєктів</h1>
      <p className="section-copy">Приклади рішень для будинку, квартири, комерції та бізнесу.</p>

      <div className="mt-8 space-y-6">
        {cases.map((item) => (
          <article key={item.slug} className="panel-card grid overflow-hidden md:grid-cols-[1fr_1.1fr]">
            <Image src={item.image} alt={item.title} width={920} height={600} className="h-full w-full object-cover" />
            <div className="p-6 md:p-7">
              <div className="text-sm text-accent">{item.segment} - {item.location}</div>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-steel">{item.result}</p>
              <div className="mt-4 rounded-xl bg-frost p-3 text-sm text-ink">Система: {item.system}</div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
