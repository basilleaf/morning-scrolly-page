import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function initTodos() {
  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id        SERIAL PRIMARY KEY,
      text      TEXT    NOT NULL,
      done      BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export async function initTaoReflections() {
  await sql`
    CREATE TABLE IF NOT EXISTS tao_reflections (
      verse       INT  PRIMARY KEY,
      reflection  TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export async function getTaoReflection(verse: number): Promise<string | null> {
  const rows = await sql`SELECT reflection FROM tao_reflections WHERE verse = ${verse}`;
  return rows[0]?.reflection ?? null;
}

export async function saveTaoReflection(verse: number, reflection: string) {
  await sql`
    INSERT INTO tao_reflections (verse, reflection) VALUES (${verse}, ${reflection})
    ON CONFLICT (verse) DO NOTHING
  `;
}

export async function initNewsCache() {
  await sql`
    CREATE TABLE IF NOT EXISTS news_cache (
      id         INT PRIMARY KEY DEFAULT 1,
      result     JSONB NOT NULL,
      fetched_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export async function getNewsCache(maxAgeMinutes = 60) {
  const rows = await sql`
    SELECT result FROM news_cache
    WHERE id = 1
      AND fetched_at > now() - (${maxAgeMinutes} || ' minutes')::interval
  `;
  return rows[0]?.result ?? null;
}

export async function saveNewsCache(result: unknown) {
  await sql`
    INSERT INTO news_cache (id, result, fetched_at) VALUES (1, ${JSON.stringify(result)}, now())
    ON CONFLICT (id) DO UPDATE SET result = EXCLUDED.result, fetched_at = EXCLUDED.fetched_at
  `;
}

export async function initArtworkStories() {
  await sql`
    CREATE TABLE IF NOT EXISTS artwork_stories (
      artwork_id  INT  PRIMARY KEY,
      story       TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export async function getArtworkStory(artworkId: number): Promise<string | null> {
  const rows = await sql`SELECT story FROM artwork_stories WHERE artwork_id = ${artworkId}`;
  return rows[0]?.story ?? null;
}

export async function saveArtworkStory(artworkId: number, story: string) {
  await sql`
    INSERT INTO artwork_stories (artwork_id, story) VALUES (${artworkId}, ${story})
    ON CONFLICT (artwork_id) DO NOTHING
  `;
}

export type TodoRow = { id: number; text: string; done: boolean };

export async function getTodos(): Promise<TodoRow[]> {
  const rows = await sql`SELECT id, text, done FROM todos ORDER BY created_at ASC`;
  return rows as TodoRow[];
}

export async function addTodo(text: string): Promise<TodoRow> {
  const rows = await sql`INSERT INTO todos (text) VALUES (${text}) RETURNING id, text, done`;
  return rows[0] as TodoRow;
}

export async function toggleTodo(id: number, done: boolean) {
  await sql`UPDATE todos SET done = ${done} WHERE id = ${id}`;
}

export async function deleteTodo(id: number) {
  await sql`DELETE FROM todos WHERE id = ${id}`;
}
