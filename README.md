# SUNERGY.UA Showcase

Production-ready showcase and catalogue for SUNERGY.UA built with Next.js, TypeScript and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` after the dev server starts.

## Build

```bash
npm run build
```

## Notes

Product data is stored in `data/shop.ts`. Product images are served from `public/images`, and fallback illustrations are stored in `public/illustrations`.

Admin edits are synced through `/api/admin-state`. On Vercel, connect Upstash Redis/Vercel KV so `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL` + `KV_REST_API_TOKEN`) are available. Without Redis, the app falls back to `data/admin-state.json`; set `SUNERGY_ADMIN_DATA_FILE` to point at another writable JSON file on a persistent server.
