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

## Vercel Deployment

The project is designed to stay on Vercel Free. Published site content is stored as JSON and image files in GitHub:

- `content/*.json` stores products, categories, cases, home/about content and small settings.
- `public/uploads/admin/*` stores images uploaded from the admin panel.
- Admin saves write to the `admin-drafts` branch through the GitHub API.
- The public site reads only published content from `main`.
- Pressing "publish" in admin creates one commit on `main`, then Vercel deploys the new published version.

Required Vercel environment variables:

```bash
SUNERGY_ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
GITHUB_TOKEN=
GITHUB_REPO=owner/repository
GITHUB_BRANCH=main
GITHUB_DRAFT_BRANCH=admin-drafts
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Set Vercel's Ignored Build Step to:

```bash
node scripts/vercel-ignore-build.mjs
```

This skips preview builds for the draft branch, so frequent admin saves do not waste Vercel build minutes.

## Admin Notes

The admin login is validated on the server. The browser stores only a lightweight "authenticated" flag for the UI, while write requests are authorized by an HTTP-only session cookie.

Images are optimized in the browser before upload and converted to WebP when possible. This keeps upload requests under Vercel Function limits and avoids storing base64 photos in JSON state.
