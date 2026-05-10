import { cookies } from "next/headers";

const COOKIE = "session";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE);
  const ok =
    !!process.env.ADMIN_PASSWORD &&
    session?.value === process.env.ADMIN_PASSWORD;
  return Response.json({ ok });
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const emailOk = !process.env.ADMIN_EMAIL || email === process.env.ADMIN_EMAIL;
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD || !emailOk) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
  return Response.json({ ok: true });
}
