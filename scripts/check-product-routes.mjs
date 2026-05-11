import fs from 'node:fs';

const source = fs.readFileSync('data/shop.ts', 'utf8');
const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
const concurrency = Number(process.env.ROUTE_CHECK_CONCURRENCY || 12);
const baseUrl = process.env.ROUTE_CHECK_BASE_URL || 'http://localhost:3000';

const bad = [];
let cursor = 0;

async function checkOne(slug) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(`${baseUrl}/product/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
    });

    await response.arrayBuffer();

    if (response.status !== 200) {
      bad.push({ slug, status: response.status });
    }
  } catch (error) {
    bad.push({ slug, status: 'ERR', reason: error instanceof Error ? error.message : String(error) });
  } finally {
    clearTimeout(timeout);
  }
}

async function worker() {
  while (cursor < slugs.length) {
    const slug = slugs[cursor];
    cursor += 1;
    await checkOne(slug);
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));

console.log(`checked=${slugs.length}`);
console.log(`bad=${bad.length}`);

if (bad.length > 0) {
  console.log(JSON.stringify(bad, null, 2));
  process.exit(1);
}
