export async function GET() {
  // TODO: proxy Open-Meteo for Santa Clara, CA (37.3541, -121.9552)
  // https://api.open-meteo.com/v1/forecast?latitude=37.3541&longitude=-121.9552&current=temperature_2m,weathercode&temperature_unit=fahrenheit&timezone=America/Los_Angeles
  return Response.json({ summary: "72°F · Sunny" });
}
