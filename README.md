Personalized morning page to scroll on my phone after waking up, so i don't look at socials or world news first thing 🌞 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Features

- live weather, sunrise + sunset times, and AQI
- Song of the Day - random selection from a hard coded copy of my apple Awaken playlist
- Morning Brief - urgent news scanner via Claude web search - limited allowed - threat monitoring only - ideally "Nothing notable"
- Todo list - small one mainly for household chores
- Astronomy Picture of the Day
- Random Thic Nhat Hanh quote - selected from a large static list
- Art of the Day - random selection from The Met api plus AI generated story about it
- Random Tao Te Ching selection from [json-ified public domain translation](https://github.com/basilleaf/tau-te-ching-json) with AI generated "what does it mean" summary
- A few different Quotes of the Day sections
- Stories from Good News Network via their RSS Feed
- Stories from Yoga Journal via their RSS Feed



### Notes

News section is hyper local and/or only major news I would want to know about, which is very little and mostly nothing. 

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

<img width="1330" height="13473" alt="image" src="https://github.com/user-attachments/assets/8493f2b0-4cad-4698-86f5-a1742cb2f27e" />

