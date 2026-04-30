personal morning page to scroll on my phone after waking up, so i don't look at socials or world news first thing 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

notes: 

fetch Apple music playlist as json with: 

curl -v "https://api.music.apple.com/v1/catalog/us/playlists/<playlist_id>?include=tracks" \
  -H "Authorization: Bearer <Bearer token>" \
  -H "Origin: https://music.apple.com"

get the token from loggin in at: https://beta.music.apple.com/

## Environment Variables

Copy `.env.example` to `.env` (or `.env.local`) and fill in:

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key — used to generate modern reflections on each day's Tao Te Ching verse. Reflections are cached in Postgres so each verse is only generated once. Get one at [console.anthropic.com](https://console.anthropic.com). |
| `DATABASE_URL` | Neon Postgres connection string (pooled). |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
