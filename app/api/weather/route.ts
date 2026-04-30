const LAT = 37.6941;
const LON = -122.0858;

const WMO: Record<number, { label: string; emoji: string }> = {
  0:  { label: "Clear sky",      emoji: "☀️" },
  1:  { label: "Mainly clear",   emoji: "🌤️" },
  2:  { label: "Partly cloudy",  emoji: "⛅" },
  3:  { label: "Overcast",       emoji: "☁️" },
  45: { label: "Foggy",          emoji: "🌫️" },
  48: { label: "Foggy",          emoji: "🌫️" },
  51: { label: "Light drizzle",  emoji: "🌦️" },
  53: { label: "Drizzle",        emoji: "🌦️" },
  55: { label: "Heavy drizzle",  emoji: "🌧️" },
  61: { label: "Light rain",     emoji: "🌧️" },
  63: { label: "Rain",           emoji: "🌧️" },
  65: { label: "Heavy rain",     emoji: "🌧️" },
  71: { label: "Light snow",     emoji: "🌨️" },
  73: { label: "Snow",           emoji: "❄️" },
  75: { label: "Heavy snow",     emoji: "❄️" },
  80: { label: "Rain showers",   emoji: "🌦️" },
  81: { label: "Rain showers",   emoji: "🌦️" },
  82: { label: "Heavy showers",  emoji: "⛈️" },
  95: { label: "Thunderstorm",   emoji: "⛈️" },
  96: { label: "Thunderstorm",   emoji: "⛈️" },
  99: { label: "Thunderstorm",   emoji: "⛈️" },
};

export async function GET() {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${LAT}&longitude=${LON}` +
    `&current=temperature_2m,weather_code` +
    `&daily=temperature_2m_max,sunrise,sunset` +
    `&temperature_unit=fahrenheit` +
    `&timezone=America%2FLos_Angeles` +
    `&forecast_days=1`;

  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) {
    return Response.json({ summary: "Weather unavailable", emoji: "🌡️" }, { status: 502 });
  }

  const data = await res.json();
  const temp = Math.round(data.current.temperature_2m);
  const code = data.current.weather_code as number;
  const high = Math.round(data.daily.temperature_2m_max[0]);
  const { label, emoji } = WMO[code] ?? { label: "Unknown", emoji: "🌡️" };

  const fmt = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };
  const sunrise = fmt(data.daily.sunrise[0]);
  const sunset = fmt(data.daily.sunset[0]);

  return Response.json({
    summary: `${temp}°F · ${label} · High ${high}°`,
    emoji,
    sunrise,
    sunset,
  });
}
