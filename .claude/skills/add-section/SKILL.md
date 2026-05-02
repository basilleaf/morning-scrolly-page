# Add a New Content Section

## Project conventions to know first

- `app/page.tsx` is `"use client"` — all sections live **inline** in this one file (not separate component files), except `NewsDigest.tsx` which is an external component due to complexity.
- **No Tailwind utility classes in JSX.** All styling is inline `style={{}}`. Tailwind is not reliably compiled for new class names. Use the existing color constants.
- Page width is capped at 430px, padded `"16px 26px 0"` per section.

---

## Color palette (defined at top of page.tsx)

```ts
const PEACH = "#FF8C6B";
const PEACH_SOFT = "#FFD4C2";
const LAVENDER = "#C5B8F5";
const LAVENDER_BG = "#F0ECFF";
const MINT = "#A8E6CF";
const MINT_BG = "#EDFAF4";
const BUTTER = "#FFE8A3";
const BUTTER_BG = "#FFFBEE";
const ROSE = "#F4A0A0";
const ROSE_BG = "#FFF0F0";
const PAGE_BG = "#FFF8F5";
```

Pick a theme color pair (`COLOR` + `COLOR_BG`) that isn't already dominant nearby.

---

## Step 1 — Add API route

Create `app/api/<name>/route.ts`. Put `{ next: { revalidate: N } }` on the upstream `fetch` call — not on the route itself.

```ts
export async function GET() {
  const res = await fetch("https://...", { next: { revalidate: 86400 } });
  if (!res.ok) return Response.json({ error: "Failed" }, { status: 502 });
  const data = await res.json();
  return Response.json({
    field: data.field ?? null,
    // ...only the fields the UI needs
  });
}
```

Use `revalidate: 86400` (daily) for content that changes daily. Use `604800` for weekly. If the API requires a secret key, read it from `process.env.YOUR_KEY` and return a 500 if missing.

---

## Step 2 — Add state to page.tsx

At the top of `MorningPage()`, alongside the other `useState` declarations:

```ts
type MyData = { field: string | null /* ... */ };
const [myData, setMyData] = useState<MyData | null>(null);
```

---

## Step 3 — Add fetch to the useEffect

Inside the single `useEffect(() => { ... }, [])` that runs all fetches on mount:

```ts
fetch("/api/<name>")
  .then((r) => r.json())
  .then((d) => !d.error && setMyData(d))
  .catch(() => {});
```

---

## Step 4 — Add section JSX

Find the `{/* SECTION ABOVE */}` comment for the desired position. Add after it:

```tsx
{/* MY SECTION */}
<div style={{ ...fade(0.XX), padding: "16px 26px 0" }}>
  <SectionLabel color={MINT} bg={MINT_BG}>My Label</SectionLabel>
  <div
    style={{
      borderRadius: 20,
      overflow: "hidden",
      background: "white",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
    }}
  >
    {/* Optional image with fallback */}
    {myData?.imageUrl ? (
      <img
        src={myData.imageUrl}
        alt={myData.title ?? ""}
        style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }}
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: 200,
          background: `linear-gradient(135deg, ${MINT}, ${MINT_BG})`,
        }}
      />
    )}

    {/* Text body */}
    <div style={{ padding: "14px 16px 16px" }}>
      <div style={{ fontSize: 10, color: MINT, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5 }}>
        Source Name
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#2D2D2D", marginBottom: 8 }}>
        {myData?.title ?? "Loading…"}
      </div>
      {myData?.body && (
        <div style={{ fontSize: 15, lineHeight: 1.6, color: "#666" }}>
          {myData.body}
        </div>
      )}
    </div>
  </div>
</div>
```

**Fade delay:** increment by `0.05`–`0.1` from the section above. Current last section uses `1.0`. Check the nearby sections' delays and pick the next value.

---

## Step 5 — Verify

1. Run `npm run dev` and open the page.
2. Confirm the section appears, the loading state (`"Loading…"`) shows briefly, then real data populates.
3. Confirm no console errors from the fetch.
4. If the section has an image, confirm the gradient fallback shows while loading.

---

## Common mistakes

| Mistake                                      | Fix                                                                              |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| Adding a Tailwind class to inline-styled JSX | Use inline `style={{}}` instead                                                  |
| Fetching outside the shared `useEffect`      | Add to the existing single `useEffect`                                           |
| No error guard on fetch result               | Check `!d.error` before `setState`                                               |
| Missing `revalidate` on upstream fetch       | Add `{ next: { revalidate: N } }` in the route, not on the Next.js route handler |
| TypeScript generic on Neon SQL tag           | Cast the result array instead: `result as MyType[]`                              |
