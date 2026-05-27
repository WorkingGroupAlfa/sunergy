import { NextResponse } from 'next/server';
import { readAdminState } from '@/lib/admin-state-server';
import { formatPrice } from '@/lib/utils';

type OrderRequest = {
  customer?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  items?: Array<{
    slug?: string;
    qty?: number;
  }>;
};

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function createOrderId() {
  const date = new Date();
  const stamp = date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SUN-${stamp}-${suffix}`;
}

function buildTelegramMessage(orderId: string, payload: Required<OrderRequest>, orderItems: Array<{ title: string; qty: number; price: number }>, total: number) {
  const itemLines = orderItems
    .map((item, index) => `${index + 1}. ${item.title}\n   Кількість: ${item.qty}\n   Сума: ${formatPrice(item.price * item.qty)}`)
    .join('\n\n');

  return [
    `Нове замовлення ${orderId}`,
    '',
    `Клієнт: ${payload.customer.firstName} ${payload.customer.lastName}`,
    `Телефон: ${payload.customer.phone}`,
    '',
    'Товари:',
    itemLines,
    '',
    `Разом: ${formatPrice(total)}`,
  ].join('\n');
}

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram is not configured.');
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${body}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequest;
    const { products } = await readAdminState();
    const productsBySlug = new Map(products.map((product) => [product.slug, product]));
    const customer = {
      firstName: cleanText(body.customer?.firstName),
      lastName: cleanText(body.customer?.lastName),
      phone: cleanText(body.customer?.phone),
    };

    if (!customer.firstName || !customer.lastName || !customer.phone) {
      return NextResponse.json({ error: 'Заповніть ім’я, прізвище та телефон.' }, { status: 400 });
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Кошик порожній.' }, { status: 400 });
    }

    const orderItems = body.items
      .map((item) => {
        const product = item.slug ? productsBySlug.get(item.slug) : undefined;
        const qty = Number.isFinite(item.qty) ? Math.max(1, Math.floor(Number(item.qty))) : 1;
        return product ? { title: product.title, qty, price: product.price } : null;
      })
      .filter((item): item is { title: string; qty: number; price: number } => item !== null);

    if (orderItems.length === 0) {
      return NextResponse.json({ error: 'У кошику немає актуальних товарів.' }, { status: 400 });
    }

    const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const orderId = createOrderId();
    const message = buildTelegramMessage(orderId, { customer, items: body.items }, orderItems, total);

    await sendTelegramMessage(message);

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося відправити замовлення. Спробуйте ще раз або зателефонуйте нам.' }, { status: 500 });
  }
}
