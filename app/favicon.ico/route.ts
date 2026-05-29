const faviconSvg = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#ffffff"/>
  <path d="M13 39L25 18L37 39H13Z" fill="#0C2B56"/>
  <path d="M28 39L42 14L56 39H28Z" fill="#173F73"/>
  <path d="M15 45H54" stroke="#173F73" stroke-width="5" stroke-linecap="round"/>
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': 'image/svg+xml',
    },
  });
}
