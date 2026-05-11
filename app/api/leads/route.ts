import { NextResponse } from 'next/server';

type LeadRequest = {
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  requestType?: string;
  message?: string;
  pageUrl?: string;
};

const requestTypeLabels: Record<string, string> = {
  solution: 'Підібрати рішення',
  equipment: 'Підібрати обладнання',
  business: 'Рішення для бізнесу',
  support: 'Консультація',
  home: 'Рішення для дому',
  battery: 'LiFePO4 акумулятор',
  consultation: 'Консультація',
};

const sourceLabels: Record<string, string> = {
  contacts_page: 'Сторінка контактів',
  lead_popup: 'Попап швидкого зв’язку',
};

function cleanText(value: unknown, maxLength = 1200) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, maxLength) : '';
}

function createLeadId() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LEAD-${stamp}-${suffix}`;
}

function buildTelegramMessage(leadId: string, payload: Required<Pick<LeadRequest, 'source' | 'name' | 'phone'>> & LeadRequest) {
  const requestType = payload.requestType ? requestTypeLabels[payload.requestType] ?? payload.requestType : 'Не вказано';
  const source = sourceLabels[payload.source] ?? payload.source;

  return [
    `Нова заявка ${leadId}`,
    '',
    `Джерело: ${source}`,
    `Ім’я: ${payload.name}`,
    `Телефон: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    `Тип запиту: ${requestType}`,
    payload.message ? `Повідомлення: ${payload.message}` : null,
    payload.pageUrl ? `Сторінка: ${payload.pageUrl}` : null,
  ]
    .filter(Boolean)
    .join('\n');
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
    const body = (await request.json()) as LeadRequest;
    const payload = {
      source: cleanText(body.source, 80) || 'site',
      name: cleanText(body.name, 160),
      phone: cleanText(body.phone, 80),
      email: cleanText(body.email, 160),
      requestType: cleanText(body.requestType, 80),
      message: cleanText(body.message, 1200),
      pageUrl: cleanText(body.pageUrl, 300),
    };

    if (!payload.name || !payload.phone) {
      return NextResponse.json({ error: 'Заповніть ім’я та телефон.' }, { status: 400 });
    }

    const leadId = createLeadId();
    const message = buildTelegramMessage(leadId, payload);

    await sendTelegramMessage(message);

    return NextResponse.json({ ok: true, leadId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Не вдалося відправити заявку. Спробуйте ще раз або зателефонуйте нам.' }, { status: 500 });
  }
}
