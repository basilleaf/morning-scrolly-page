// Step 2: Insert met-artworks-filtered.json → Neon met_artworks table
// Run with: node --env-file=.env scripts/import-met-artworks.mjs

import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const JSON_PATH = new URL("./met-artworks-filtered.json", import.meta.url)
  .pathname;
const BATCH_SIZE = 100;

async function main() {
  const sql = neon(process.env.DATABASE_URL);

  console.log("Reading filtered JSON…");
  const rows = JSON.parse(readFileSync(JSON_PATH, "utf-8"));
  console.log(`${rows.length} rows to insert`);

  await sql`
    CREATE TABLE IF NOT EXISTS met_artworks (
      id              SERIAL PRIMARY KEY,
      object_id       INT  NOT NULL UNIQUE,
      title           TEXT NOT NULL,
      artist          TEXT,
      artist_bio      TEXT,
      date            TEXT,
      medium          TEXT,
      classification  TEXT,
      department      TEXT,
      description     TEXT NOT NULL,
      image_url       TEXT,
      image_url_small TEXT,
      artwork_url     TEXT
    )
  `;

  console.log("Table ready. Inserting…");
  const total = rows.length;

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    await sql.transaction(
      batch.map(
        (r) => sql`
        INSERT INTO met_artworks
          (object_id, title, artist, artist_bio, date, medium, classification, department, description, image_url, image_url_small, artwork_url)
        VALUES (
          ${r.object_id},
          ${r.title},
          ${r.artist},
          ${r.artist_bio},
          ${r.date},
          ${r.medium},
          ${r.classification},
          ${r.department},
          ${r.description},
          ${r.image_url},
          ${r.image_url_small},
          ${r.artwork_url}
        )
        ON CONFLICT (object_id) DO NOTHING
      `,
      ),
    );
    process.stdout.write(`\r  ${Math.min(i + BATCH_SIZE, total)}/${total}`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
