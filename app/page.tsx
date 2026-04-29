"use client";

import { useState, useEffect } from "react";
import { TAO, BUDDHIST, AFFIRMATIONS, seededRandom } from "./_lib/content";

const PEACH = "#FF8C6B";
const PEACH_SOFT = "#FFD4C2";
const LAVENDER = "#C5B8F5";
const LAVENDER_BG = "#F0ECFF";
const MINT = "#A8E6CF";
const MINT_BG = "#EDFAF4";
const BUTTER = "#FFE8A3";
const BUTTER_BG = "#FFFBEE";
const PAGE_BG = "#FFF8F5";

const FONT_DISPLAY = "var(--font-righteous), sans-serif";
const FONT_BODY = "var(--font-jakarta), sans-serif";


function Pill({
  children,
  color,
  bg,
}: {
  children: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        borderRadius: 99,
        padding: "3px 10px",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

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

function SectionLabel({
  children,
  color = PEACH,
  bg = PEACH_SOFT + "55",
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Pill color={color} bg={bg}>
        {children}
      </Pill>
    </div>
  );
}

export default function MorningPage() {
  const now = new Date();
  const dateStr = now.toDateString();
  const rng = seededRandom(dateStr);

  const tao = TAO[Math.floor(rng() * TAO.length)];
  const buddhist = BUDDHIST[Math.floor(rng() * BUDDHIST.length)];
  const affirmation = AFFIRMATIONS[Math.floor(rng() * AFFIRMATIONS.length)];

  type Todo = { id: number; text: string; done: boolean };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [visible, setVisible] = useState(false);
  const [weather, setWeather] = useState<{ summary: string; emoji: string } | null>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    fetch("/api/weather")
      .then((r) => r.json())
      .then(setWeather)
      .catch(() => {});
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

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PAGE_BG,
        fontFamily: FONT_BODY,
        maxWidth: 430,
        margin: "0 auto",
        paddingBottom: 80,
      }}
    >
      {/* HERO DATE */}
      <div
        style={{
          ...fade(0),
          padding: "44px 26px 28px",
          background: `linear-gradient(160deg, ${PEACH_SOFT}88 0%, ${LAVENDER_BG} 60%, ${PAGE_BG} 100%)`,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: PEACH,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {timeStr}
        </div>

        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 58,
            lineHeight: 0.95,
            letterSpacing: "-1px",
            marginBottom: 4,
          }}
        >
          <span style={{ color: "#2D2D2D" }}>{dayName.slice(0, 3)}</span>
          <span style={{ color: PEACH }}>{dayName.slice(3)}</span>
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 38,
            lineHeight: 1,
            color: "#888",
            letterSpacing: "-0.5px",
            marginBottom: 18,
          }}
        >
          {monthDay}
        </div>

        {/* Weather bubble */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            borderRadius: 99,
            padding: "8px 16px",
            fontSize: 13,
            color: "#666",
            fontWeight: 500,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <span>{weather?.emoji ?? "🌡️"}</span>
          <span>{weather?.summary ?? "Loading…"}</span>
        </div>
      </div>

      {/* SONG CARD */}
      <div style={{ ...fade(0.1), padding: "20px 26px 0" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${LAVENDER}CC, ${PEACH_SOFT}CC)`,
            borderRadius: 20,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "white",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            🎵
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#9B8FC0",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              Song of the day
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#2D2D2D",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Morning Phase
            </div>
            <div style={{ fontSize: 12, color: "#7B6FA0", fontWeight: 500 }}>
              Beck
            </div>
          </div>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M1 1L11 7L1 13V1Z" fill={PEACH} />
            </svg>
          </div>
        </div>
      </div>

      {/* MORNING BRIEF */}
      <div style={{ ...fade(0.2), padding: "24px 26px 0" }}>
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          <SectionLabel color="#E07A5F" bg="#FFE8E0">
            Morning brief
          </SectionLabel>
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: "#555",
              fontWeight: 400,
            }}
          >
            Nothing urgent in the news.
          </div>
        </div>
      </div>

      {/* TODOS */}
      <div style={{ ...fade(0.3), padding: "16px 26px 0" }}>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div onClick={() => toggleTodo(todo)} style={{ cursor: "pointer" }}>
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
            {/* Add todo input */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
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
                  fontSize: 14,
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
                    fontSize: 12,
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

      {/* DIVIDER — zone 2 */}
      <div
        style={{ ...fade(0.35), padding: "32px 26px 8px", textAlign: "center" }}
      >
        <div
          style={{ fontSize: 18, letterSpacing: "0.3em", color: PEACH_SOFT }}
        >
          ✦ ✦ ✦
        </div>
      </div>

      {/* DAILY IMAGE */}
      <div style={{ ...fade(0.4), padding: "8px 26px 0" }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 20,
            background: `linear-gradient(135deg, ${LAVENDER}, ${PEACH_SOFT}, ${BUTTER})`,
            display: "flex",
            alignItems: "flex-end",
            padding: "14px 16px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 25% 35%, rgba(255,255,255,0.35) 0%, transparent 55%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 10,
                color: "rgba(60,40,80,0.55)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              The Met Open Access
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#3C2850" }}>
              Starry Night Study, 1889
            </div>
          </div>
        </div>
      </div>

      {/* TAO */}
      <div style={{ ...fade(0.5), padding: "20px 26px 0" }}>
        <div
          style={{
            background: LAVENDER_BG,
            borderRadius: 20,
            padding: "20px 22px",
          }}
        >
          <SectionLabel color="#6B5BA6" bg={LAVENDER + "66"}>
            Tao Te Ching · {tao.verse}
          </SectionLabel>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#3D3260",
              fontWeight: 400,
            }}
          >
            {tao.text}
          </div>
        </div>
      </div>

      {/* BUDDHIST */}
      <div style={{ ...fade(0.6), padding: "16px 26px 0" }}>
        <div
          style={{
            background: MINT_BG,
            borderRadius: 20,
            padding: "20px 22px",
          }}
        >
          <SectionLabel color="#3D7A5E" bg={MINT + "66"}>
            Teaching
          </SectionLabel>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "#2A4D3D",
              fontWeight: 400,
            }}
          >
            {buddhist}
          </div>
        </div>
      </div>

      {/* AFFIRMATION */}
      <div style={{ ...fade(0.7), padding: "16px 26px 0" }}>
        <div
          style={{
            background: BUTTER_BG,
            borderRadius: 20,
            padding: "20px 22px",
          }}
        >
          <SectionLabel color="#9A7D20" bg={BUTTER + "88"}>
            For today
          </SectionLabel>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 24,
              lineHeight: 1.35,
              color: "#4A3A10",
              letterSpacing: "-0.3px",
            }}
          >
            {affirmation}
          </div>
        </div>
      </div>

      {/* APOD */}
      <div style={{ ...fade(0.8), padding: "16px 26px 40px" }}>
        <div
          style={{
            background: "#F0EEFF",
            borderRadius: 20,
            padding: "20px 22px",
          }}
        >
          <SectionLabel color="#5B4A9B" bg={LAVENDER + "55"}>
            Astronomy · NASA
          </SectionLabel>
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              borderRadius: 14,
              background: "linear-gradient(135deg, #1a0a2e, #2d1b5e, #4a2d8a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              marginBottom: 12,
            }}
          >
            🌌
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#5B4A9B",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            The Pillars of Creation — Eagle Nebula, M16. Stellar nurseries 6,500
            light-years away.
          </div>
        </div>
      </div>
    </div>
  );
}
