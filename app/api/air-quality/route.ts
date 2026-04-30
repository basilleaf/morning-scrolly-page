const ZIP = "94546";

const CATEGORY_EMOJI: Record<number, string> = {
  1: "🟢",
  2: "🟡",
  3: "🟠",
  4: "🔴",
  5: "🟣",
  6: "⚫",
};

export async function GET() {
  const apiKey = process.env.AIRNOW_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Missing API key" }, { status: 500 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const url =
    `https://www.airnowapi.org/aq/forecast/zipCode/` +
    `?format=application/json` +
    `&zipCode=${ZIP}` +
    `&date=${today}` +
    `&distance=20` +
    `&API_KEY=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return Response.json({ error: "AirNow unavailable" }, { status: 502 });
  }

  const data = await res.json();
  type Entry = {
    DateForecast: string;
    AQI: number;
    Category: { Number: number; Name: string };
    ParameterName: string;
  };

  const valid: Entry[] = (data as Entry[]).filter((d) => d.AQI >= 0);
  if (!valid.length) {
    return Response.json({ error: "No forecast available" }, { status: 404 });
  }

  // Prefer today's entries; fall back to the soonest available date
  const todayEntries = valid.filter((d) => d.DateForecast?.trim() === today);
  const pool = todayEntries.length ? todayEntries : valid;

  // Pick the entry with the highest AQI (worst condition)
  const worst = pool.reduce((a, b) => (b.AQI > a.AQI ? b : a));

  return Response.json({
    aqi: worst.AQI,
    category: worst.Category.Name,
    categoryNumber: worst.Category.Number,
    parameter: worst.ParameterName,
    emoji: CATEGORY_EMOJI[worst.Category.Number] ?? "⚪",
  });
}
