"use client";

import { useState } from "react";

const PEACH = "#FF8C6B";
const PEACH_SOFT = "#FFD4C2";
const PAGE_BG = "#FFF8F5";
const FONT_DISPLAY = "var(--font-righteous), sans-serif";
const FONT_BODY = "var(--font-jakarta), sans-serif";

export default function TonightPage() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, trimmed]);
    setInput("");
  };

  const remove = (i: number) => setTodos((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div style={{
      minHeight: "100vh",
      background: PAGE_BG,
      fontFamily: FONT_BODY,
      maxWidth: 430,
      margin: "0 auto",
      padding: "48px 26px 80px",
    }}>
      <div style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 42, lineHeight: 1,
        marginBottom: 8,
      }}>
        <span style={{ color: "#2D2D2D" }}>to</span>
        <span style={{ color: PEACH }}>night</span>
      </div>
      <div style={{ fontSize: 14, color: "#AAA", marginBottom: 36, fontWeight: 400 }}>
        What&apos;s on your list for tomorrow?
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a todo..."
          style={{
            flex: 1,
            border: `2px solid ${PEACH_SOFT}`,
            borderRadius: 99,
            padding: "12px 18px",
            fontSize: 15,
            fontFamily: FONT_BODY,
            outline: "none",
            background: "white",
            color: "#2D2D2D",
          }}
        />
        <button
          onClick={add}
          style={{
            background: PEACH,
            color: "white",
            border: "none",
            borderRadius: 99,
            padding: "12px 20px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: FONT_BODY,
            flexShrink: 0,
          }}
        >
          Add
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {todos.map((todo, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "white",
            borderRadius: 14,
            padding: "14px 18px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: "#2D2D2D" }}>{todo}</span>
            <button
              onClick={() => remove(i)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#CCC", fontSize: 18, lineHeight: 1, padding: 4,
              }}
            >×</button>
          </div>
        ))}
      </div>

      {todos.length > 0 && (
        <button
          style={{
            marginTop: 32,
            width: "100%",
            background: PEACH,
            color: "white",
            border: "none",
            borderRadius: 99,
            padding: "16px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: FONT_BODY,
            opacity: 0.9,
          }}
        >
          Save for tomorrow
        </button>
      )}
    </div>
  );
}
