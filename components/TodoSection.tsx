"use client";

import { useState, useEffect } from "react";
import { PEACH, PEACH_SOFT, MINT, FONT_BODY, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

export type Todo = { id: number; text: string; done: boolean };

type Props = { visible: boolean };

function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: 99,
        border: checked ? "none" : `2px solid ${PEACH_SOFT}`,
        background: checked ? PEACH : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.25s ease",
        boxShadow: checked ? `0 2px 8px ${PEACH}55` : "none",
      }}
    >
      {checked && (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path
            d="M1 4.5L4.5 8L11 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export default function TodoSection({ visible }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then(setTodos)
      .catch(() => {});
  }, []);

  const toggleTodo = async (todo: Todo) => {
    const next = !todo.done;
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, done: next } : t)),
    );
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: next }),
    });
  };

  const deleteTodo = async (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
  };

  const addTodo = async () => {
    const text = newTodo.trim();
    if (!text) return;
    setNewTodo("");
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) {
      const todo = await res.json();
      setTodos((prev) => [...prev, todo]);
    }
  };

  return (
    <div style={{ ...fade(visible, 0.3), padding: "16px 26px 0" }}>
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: "20px 22px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}
      >
        <SectionLabel color="#5B8A6F" bg={MINT + "66"}>
          Today
        </SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div
                onClick={() => toggleTodo(todo)}
                style={{ cursor: "pointer" }}
              >
                <CheckIcon checked={todo.done} />
              </div>
              <span
                onClick={() => toggleTodo(todo)}
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: 500,
                  color: todo.done ? "#C0C0C0" : "#2D2D2D",
                  textDecoration: todo.done ? "line-through" : "none",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#DDD",
                  fontSize: 16,
                  padding: "0 2px",
                  lineHeight: 1,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#DDD")}
                aria-label="Delete"
              >
                ×
              </button>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 4,
            }}
          >
            <div style={{ width: 26, height: 26, flexShrink: 0 }} />
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a task…"
              style={{
                flex: 1,
                border: "none",
                borderBottom: `1.5px solid ${PEACH_SOFT}`,
                outline: "none",
                background: "transparent",
                fontSize: 15,
                color: "#2D2D2D",
                fontFamily: FONT_BODY,
                padding: "3px 0",
              }}
            />
            {newTodo.trim() && (
              <button
                onClick={addTodo}
                style={{
                  background: PEACH,
                  border: "none",
                  borderRadius: 99,
                  color: "white",
                  fontSize: 15,
                  fontWeight: 600,
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                }}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
