import Link from 'next/link';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default async function ThankYouPage({ searchParams }: { searchParams?: Promise<{ order?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const orderId = params.order;

  return (
    <main className="section-shell py-12">
      <section className="panel-card overflow-hidden">
        <div className="bg-frost px-6 py-10 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="badge">Замовлення прийнято</span>
              <h1 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">Дякуємо за замовлення</h1>
              <p className="mt-3 max-w-2xl text-steel">
                Ми отримали вашу заявку. Менеджер SUNERGY зв'яжеться з вами найближчим часом, щоб уточнити деталі та підтвердити замовлення.
              </p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-accent shadow-panel">
              <CheckCircle2 className="h-10 w-10" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <div className="text-sm text-steel">Номер заявки</div>
            <div className="mt-1 text-xl font-semibold text-ink">{orderId || 'SUNERGY'}</div>
            <p className="mt-3 text-sm text-steel">Дані замовлення вже передані менеджеру для обробки.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary">
              <ShoppingBag className="h-4 w-4" />
              <span className="ml-2">Повернутися до каталогу</span>
            </Link>
            <Link href="/contacts" className="btn-secondary">
              Контакти
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
