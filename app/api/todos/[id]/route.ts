import { toggleTodo, deleteTodo } from "@/app/_lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { done } = await request.json();
  await toggleTodo(Number(id), done);
  return new Response(null, { status: 204 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await deleteTodo(Number(id));
  return new Response(null, { status: 204 });
}
