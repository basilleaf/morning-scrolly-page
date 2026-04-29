import { initTodos, getTodos, addTodo } from "@/app/_lib/db";

export async function GET() {
  await initTodos();
  const todos = await getTodos();
  return Response.json(todos);
}

export async function POST(request: Request) {
  const { text } = await request.json();
  if (!text?.trim()) {
    return Response.json({ error: "text required" }, { status: 400 });
  }
  await initTodos();
  const todo = await addTodo(text.trim());
  return Response.json(todo, { status: 201 });
}
