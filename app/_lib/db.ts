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
