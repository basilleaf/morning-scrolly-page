# Morning Dashboard — Project Spec

## Overview
A personal morning ritual page, designed to be read on a phone in bed before getting up. Two zones: functional intel at the top, contemplative content below. Bright, pastel, cute. No anxiety. No rejection letters.

---

## Design Direction
- **Fonts:** Righteous (display/headers) + Plus Jakarta Sans (body)
- **Palette:** Warm white base (`#FFF8F5`), peach accent (`#FF8C6B`), soft lavender, mint, butter yellow — each soul zone section has its own tinted card
- **Feel:** Bright, cheerful, wakes you up. Mobile-first portrait. Rounded cards, pill labels, satisfying tap interactions.
- **Reference:** `morning.jsx` in repo root — use this as the visual starting point

---

## Architecture

### Public Vercel App (Next.js)
- Displays all content
- Reads from Vercel Postgres — no secrets, no sensitive data
- Anyone could visit it but it's just a pretty page

### Local Script (runs on Raspberry Pi via cron)
- Wakes at 6am daily via cron: `0 6 * * * node /home/pi/morning-brief.js`
- Reads Gmail (readonly OAuth token stored in Pi env vars)
- Calls Claude API to generate the morning brief summary
- Writes summary directly to Vercel Postgres (connection string in Pi env vars)
- Not a server — no open ports, no incoming connections, purely outgoing
- Gmail token and Claude API key never leave the house

### Security
- Gmail scope: `https://www.googleapis.com/auth/gmail.readonly` only
- Pi connects directly to Vercel Postgres via connection string
- No API route needed for the brief — Pi writes to DB directly
- Vercel app only reads from DB, never writes

---

## Data Sources

### Zone 1 — Functional
| Source | Notes |
|--------|-------|
| **Time + Date** | Client-side |
| **Weather** | Open-Meteo API — free, no key needed. Render as a single sentence, not a widget |
| **Song of the day** | Apple Music via MusicKit JS — random track from a designated playlist. Falls back to deep link if auth unavailable |
| **Morning brief** | Claude-generated summary written to DB by Pi cron. Filtered Gmail (job pipeline only) + news digest |
| **Todos** | Entered night before via `/tonight` route, saved to Vercel Postgres, pulled into morning page |

### Zone 2 — Soul
| Source | Notes |
|--------|-------|
| **Daily image** | Rotating: The Met Open Access API, Rijksmuseum API, Wikimedia Featured Images. Full artist/photographer credit displayed prominently. No AI image generation. |
| **Tao Te Ching** | Full text embedded as JSON, seeded random by date |
| **Buddhist teaching** | Curated list embedded, seeded random by date |
| **Affirmation** | Curated list embedded, seeded random by date |
| **NASA APOD** | Appears lower in Zone 2 — not the hero. Free API, requires NASA API key |

### Seeded Random
All randomized content uses the same date string as seed so content stays consistent on refresh throughout the day:
```js
function seededRandom(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13; h ^= h >> 7; h ^= h << 17;
    return (h >>> 0) / 0xffffffff;
  };
}
const rng = seededRandom(new Date().toDateString());
```

---

## Gmail Filtering (Pi script)
```js
// Gmail search query — surgical filtering
"from:recruiter OR subject:interview OR subject:callback OR subject:(follow up)
 NOT subject:unfortunately
 NOT subject:(we've decided)
 NOT subject:(other candidates)
 NOT subject:(keep your resume)
 NOT subject:(moving forward with other)"
```
Filtered thread list passed to Claude API with prompt:
> "Summarize any job pipeline emails that need attention today. Be brief and calm. Do not mention or allude to any rejections or negative outcomes."

---

## Database Schema (Vercel Postgres)

```sql
-- Daily brief written by Pi, read by app
CREATE TABLE daily_brief (
  date DATE PRIMARY KEY,
  summary TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Todos entered night before
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  text TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Morning page — the main thing |
| `/tonight` | Simple todo entry form for the night before |
| `/api/weather` | Proxies Open-Meteo for Santa Clara, CA |
| `/api/image` | Fetches daily image from rotating art sources |
| `/api/apod` | Fetches NASA APOD |

---

## Pi Script Outline (`morning-brief.js`)
```js
// 1. Connect to Gmail (googleapis, readonly)
// 2. Fetch threads matching filter query from last 24h
// 3. Extract subject lines + snippets
// 4. Call Claude API (claude-sonnet-4-20250514) with filtered content
// 5. Upsert summary to Vercel Postgres
//    INSERT INTO daily_brief (date, summary)
//    VALUES ($today, $summary)
//    ON CONFLICT (date) DO UPDATE SET summary = $summary
```

---

## Build Order (suggested)
1. Scaffold Next.js app, deploy to Vercel, set up Postgres tables
2. Wire up static content — Tao, Buddhist, Affirmations (already in morning.jsx)
3. Weather API route
4. Daily image rotation (Met API first, then Rijksmuseum, then Wikimedia)
5. NASA APOD
6. Todos + `/tonight` entry page
7. Gmail Pi script + Claude summarization
8. Apple Music / MusicKit JS
9. Polish — filters, loading states, error fallbacks

---

## Environment Variables

### Vercel
```
POSTGRES_URL=
NASA_API_KEY=
RIJKSMUSEUM_API_KEY=
```

### Pi (local only, never in repo)
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
ANTHROPIC_API_KEY=
POSTGRES_URL=
```

---

## Notes
- No AI image generation anywhere — ethical stance, intentional
- No rejection emails ever surface — Gmail filter is strict
- APOD is present but not the hero image — personal preference
- This is a single-user app, no multi-user auth needed
- Run locally via Tailscale if you ever want it off Vercel entirely
