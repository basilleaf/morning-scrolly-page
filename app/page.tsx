"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NewsDigest from "../components/NewsDigest";
import {
  TAO,
  BUDDHIST,
  AFFIRMATIONS,
  SONGS,
  seededRandom,
} from "./_lib/content";
import { quotes } from "./_lib/quotes";
import tnhQuotes from "./_lib/tnh-quotes.json";

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
  const song = SONGS[Math.floor(rng() * SONGS.length)];
  const quote = quotes[Math.floor(rng() * quotes.length)];
  const tnhQuote = tnhQuotes[Math.floor(rng() * tnhQuotes.length)];

  type Todo = { id: number; text: string; done: boolean };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  type Artwork = {
    id: number;
    title: string;
    artist: string | null;
    date: string | null;
    medium: string | null;
    description: string | null;
    imageUrl: string | null;
    artworkUrl: string;
  };
  type Apod = {
    title: string | null;
    url: string | null;
    hdurl: string | null;
    explanation: string | null;
    media_type: string | null;
    thumbnail_url: string | null;
    copyright: string | null;
    date: string | null;
  };
  const [visible, setVisible] = useState(false);
  const [weather, setWeather] = useState<{
    summary: string;
    emoji: string;
    sunrise: string;
    sunset: string;
  } | null>(null);
  const [aqi, setAqi] = useState<{
    aqi: number;
    category: string;
    emoji: string;
  } | null>(null);
  const [taoReflection, setTaoReflection] = useState<string | null>(null);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [artworkStory, setArtworkStory] = useState<string | null>(null);
  const [apod, setApod] = useState<Apod | null>(null);
  type GoodNewsStory = {
    title: string;
    link: string;
    description: string;
    imageUrl: string | null;
    pubDate: string;
  };
  const [goodNews, setGoodNews] = useState<GoodNewsStory[]>([]);
  const [yogaStories, setYogaStories] = useState<GoodNewsStory[]>([]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    fetch("/api/weather")
      .then((r) => r.json())
      .then(setWeather)
      .catch(() => {});
    fetch("/api/air-quality")
      .then((r) => r.json())
      .then((d) => !d.error && setAqi(d))
      .catch(() => {});
    fetch("/api/todos")
      .then((r) => r.json())
      .then(setTodos)
      .catch(() => {});
    fetch(`/api/tao-reflection?verse=${tao.verse}`)
      .then((r) => r.json())
      .then((d) => setTaoReflection(d.reflection ?? null))
      .catch(() => {});
    fetch("/api/artwork")
      .then((r) => r.json())
      .then((d) => !d.error && setArtwork(d))
      .catch(() => {});
    fetch("/api/apod")
      .then((r) => r.json())
      .then((d) => !d.error && setApod(d))
      .catch(() => {});
    fetch("/api/good-news")
      .then((r) => r.json())
      .then((d) => d.stories && setGoodNews(d.stories))
      .catch(() => {});
    fetch("/api/yoga-journal")
      .then((r) => r.json())
      .then((d) => d.stories && setYogaStories(d.stories))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!artwork) return;
    const params = new URLSearchParams({
      id: String(artwork.id),
      title: artwork.title,
    });
    if (artwork.artist) params.set("artist", artwork.artist);
    if (artwork.date) params.set("date", artwork.date);
    if (artwork.medium) params.set("medium", artwork.medium);
    fetch(`/api/artwork-story?${params}`)
      .then((r) => r.json())
      .then((d) => d.story && setArtworkStory(d.story))
      .catch(() => {});
  }, [artwork]);

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
          suppressHydrationWarning
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

        {/* Weather + AQI bubbles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
          {weather?.sunrise && (
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
              <span>🌅</span>
              <span>
                {weather.sunrise} · {weather.sunset}
              </span>
            </div>
          )}
          {aqi && (
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
              <span>{aqi.emoji}</span>
              <span>
                AQI {aqi.aqi} · {aqi.category}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SONG CARD */}
      <div style={{ ...fade(0.1), padding: "20px 26px 0" }}>
        <a
          href={song.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
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
            <img
              src={song.artworkUrl}
              alt={song.name}
              width={52}
              height={52}
              style={{
                borderRadius: 12,
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                objectFit: "cover",
              }}
            />
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
                {song.name}
              </div>
              <div style={{ fontSize: 12, color: "#7B6FA0", fontWeight: 500 }}>
                {song.artist}
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
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <path d="M1 1L11 7L1 13V1Z" fill={PEACH} />
              </svg>
            </div>
          </div>
        </a>
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
          <NewsDigest />
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
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#F87171")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#DDD")}
                  aria-label="Delete"
                >
                  ×
                </button>
              </div>
            ))}
            {/* Add todo input */}
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

      {/* APOD */}
      <div style={{ ...fade(0.4), padding: "8px 26px 0" }}>
        {apod?.media_type === "video" ? (
          <a
            href="https://apod.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                background: "#F0EEFF",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              }}
            >
              {apod.thumbnail_url ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={apod.thumbnail_url}
                    alt={apod.title ?? "Astronomy Picture of the Day"}
                    style={{
                      width: "100%",
                      display: "block",
                      maxHeight: 320,
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                      >
                        <path d="M1 1L15 9L1 17V1Z" fill="#5B4A9B" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    background:
                      "linear-gradient(135deg, #1a0a2e, #2d1b5e, #4a2d8a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                  }}
                >
                  🌌
                </div>
              )}
              <div style={{ padding: "14px 16px 16px" }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#9B8FC0",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Astronomy Picture of the Day · NASA
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#2D2D2D",
                    marginBottom: 8,
                  }}
                >
                  {apod.title ?? "Loading…"}
                </div>
                {apod.explanation && (
                  <div
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#666",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {apod.explanation}
                  </div>
                )}
                {apod.copyright && (
                  <div style={{ fontSize: 12, color: "#BBB", marginTop: 8 }}>
                    © {apod.copyright.trim()}
                  </div>
                )}
              </div>
            </div>
          </a>
        ) : (
          <a
            href="https://apod.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                background: "#F0EEFF",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              }}
            >
              {apod?.url ? (
                <img
                  src={apod.url}
                  alt={apod.title ?? "Astronomy Picture of the Day"}
                  style={{
                    width: "100%",
                    display: "block",
                    maxHeight: 320,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    background:
                      "linear-gradient(135deg, #1a0a2e, #2d1b5e, #4a2d8a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                  }}
                >
                  🌌
                </div>
              )}
              <div style={{ padding: "14px 16px 16px" }}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#9B8FC0",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Astronomy Picture of the Day · NASA
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#2D2D2D",
                    marginBottom: 8,
                  }}
                >
                  {apod?.title ?? "Loading…"}
                </div>
                {apod?.explanation && (
                  <div
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#666",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {apod.explanation}
                  </div>
                )}
                {apod?.copyright && (
                  <div style={{ fontSize: 12, color: "#BBB", marginTop: 8 }}>
                    © {apod.copyright.trim()}
                  </div>
                )}
              </div>
            </div>
          </a>
        )}
      </div>

      {/* THICH NHAT HANH */}
      <div style={{ ...fade(0.45), padding: "16px 26px 0" }}>
        <div
          style={{
            background: MINT_BG,
            borderRadius: 20,
            padding: "20px 22px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -6,
              left: 14,
              fontSize: 80,
              lineHeight: 1,
              color: MINT,
              fontFamily: "Georgia, serif",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            &ldquo;
          </div>
          <SectionLabel color="#3D7A5E" bg={MINT + "66"}>
            Thich Nhat Hanh
          </SectionLabel>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "#2A4D3D",
              fontWeight: 400,
              fontStyle: "italic",
              paddingLeft: 4,
            }}
          >
            {tnhQuote}
          </div>
        </div>
      </div>

      {/* BREATHE */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          28.5% { transform: scale(1.45); }
          43% { transform: scale(1.45); }
          85.5% { transform: scale(1); }
        }
        @keyframes breathe-in-label {
          0%, 24% { opacity: 0.75; }
          28.5% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes breathe-out-label {
          0%, 43% { opacity: 0; }
          47% { opacity: 0.75; }
          82% { opacity: 0.75; }
          86% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
      <div style={{ ...fade(0.47), padding: "16px 26px 0" }}>
        <div
          style={{
            background: LAVENDER_BG,
            borderRadius: 20,
            padding: "24px 22px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SectionLabel color="#6B5BA6" bg={LAVENDER + "66"}>
            Breathe
          </SectionLabel>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "2px solid #C5B8F5",
              background: "linear-gradient(145deg, #F5F0FF 0%, #ECE6FF 100%)",
              boxShadow: "0 4px 24px rgba(197,184,245,0.4)",
              animation: "breathe 14s ease-in-out infinite",
              position: "relative",
            }}
          >
            {/* left eye — closed arc */}
            <div
              style={{
                position: "absolute",
                width: 9,
                height: 4,
                border: "1.5px solid #9B8FC0",
                borderBottomColor: "transparent",
                borderRadius: "50%",
                top: "32%",
                left: "32%",
              }}
            />
            {/* right eye — closed arc */}
            <div
              style={{
                position: "absolute",
                width: 9,
                height: 4,
                border: "1.5px solid #9B8FC0",
                borderBottomColor: "transparent",
                borderRadius: "50%",
                top: "32%",
                right: "32%",
              }}
            />
            {/* smile — shallow arc */}
            <div
              style={{
                position: "absolute",
                width: 20,
                height: 7,
                top: "47%",
                left: "50%",
                transform: "translateX(-50%)",
                border: "1.5px solid #9B8FC0",
                borderTop: "none",
                borderRadius: "0 0 20px 20px",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 20,
              height: 18,
              position: "relative",
              width: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9B8FC0",
                animation: "breathe-in-label 14s ease-in-out infinite",
              }}
            >
              in
            </span>
            <span
              style={{
                position: "absolute",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9B8FC0",
                animation: "breathe-out-label 14s ease-in-out infinite",
              }}
            >
              out
            </span>
          </div>
        </div>
      </div>

      {/* ART OF THE DAY */}
      <div style={{ ...fade(0.5), padding: "16px 26px 0" }}>
        <a
          href={artwork?.artworkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", display: "block" }}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              background: "white",
              boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}
          >
            {artwork?.imageUrl ? (
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                style={{
                  width: "100%",
                  display: "block",
                  maxHeight: 320,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 200,
                  background: `linear-gradient(135deg, ${LAVENDER}, ${PEACH_SOFT}, ${BUTTER})`,
                }}
              />
            )}
            <div style={{ padding: "14px 16px 16px" }}>
              <div
                style={{
                  fontSize: 10,
                  color: PEACH,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Art of the Day · The Met
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#2D2D2D",
                  marginBottom: 2,
                }}
              >
                {artwork?.title ?? "Loading…"}
              </div>
              {artwork?.artist && (
                <div style={{ fontSize: 12, color: "#999", marginBottom: 2 }}>
                  {artwork.artist}
                  {artwork.date ? ` · ${artwork.date}` : ""}
                </div>
              )}
              {artwork?.medium && (
                <div
                  style={{
                    fontSize: 11,
                    color: "#BBB",
                    marginBottom: artworkStory || artwork.description ? 10 : 0,
                  }}
                >
                  {artwork.medium}
                </div>
              )}
              {(artworkStory || artwork?.description) && (
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#666",
                    marginTop: 8,
                  }}
                >
                  {artworkStory ?? artwork?.description}
                </div>
              )}
              {artwork && !artworkStory && !artwork.description && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#CCC",
                    marginTop: 8,
                    fontStyle: "italic",
                  }}
                >
                  Loading story…
                </div>
              )}
            </div>
          </div>
        </a>
      </div>

      {/* TAO */}
      <div style={{ ...fade(0.6), padding: "20px 26px 0" }}>
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
          {taoReflection !== null && (
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: `1px solid ${LAVENDER}`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9B8FC0",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                For today
              </div>
              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "#5B4A9B",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                {taoReflection}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BUDDHIST */}
      <div style={{ ...fade(0.7), padding: "16px 26px 0" }}>
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
      <div style={{ ...fade(0.8), padding: "16px 26px 0" }}>
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

      {/* QUOTE */}
      <div style={{ ...fade(0.85), padding: "16px 26px 0" }}>
        <div
          style={{
            background: ROSE_BG,
            borderRadius: 20,
            padding: "20px 22px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -6,
              left: 14,
              fontSize: 80,
              lineHeight: 1,
              color: ROSE,
              fontFamily: "Georgia, serif",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            &ldquo;
          </div>
          <SectionLabel color="#A05050" bg={ROSE + "55"}>
            Quote
          </SectionLabel>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "#4A2828",
              fontWeight: 400,
              fontStyle: "italic",
              paddingLeft: 4,
            }}
          >
            {quote.q.trim()}
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 12,
              fontWeight: 600,
              color: "#A05050",
              letterSpacing: "0.04em",
            }}
          >
            — {quote.a}
          </div>
        </div>
      </div>

      {/* GOOD NEWS */}
      <div style={{ ...fade(0.9), padding: "16px 26px 0" }}>
        <div
          style={{
            background: MINT_BG,
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          <SectionLabel color="#3D7A5E" bg={MINT + "66"}>
            Good news
          </SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {goodNews.length === 0
              ? [0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "white",
                      marginBottom: i < 4 ? 14 : 0,
                    }}
                  >
                    <div style={{ height: 160, background: MINT + "44" }} />
                    <div
                      style={{
                        padding: "10px 12px 12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <div
                        style={{
                          height: 13,
                          borderRadius: 6,
                          background: MINT + "55",
                          width: "85%",
                        }}
                      />
                      <div
                        style={{
                          height: 11,
                          borderRadius: 6,
                          background: MINT + "33",
                          width: "60%",
                        }}
                      />
                    </div>
                  </div>
                ))
              : goodNews.map((story, i) => (
                  <a
                    key={i}
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "white",
                        marginBottom: i < goodNews.length - 1 ? 14 : 0,
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                      }}
                    >
                      {story.imageUrl && (
                        <img
                          src={story.imageUrl}
                          alt=""
                          style={{
                            width: "100%",
                            height: 160,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      )}
                      <div style={{ padding: "10px 12px 12px" }}>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#2A4D3D",
                            lineHeight: 1.45,
                            marginBottom: story.description ? 4 : 0,
                          }}
                        >
                          {story.title}
                        </div>
                        {story.description && (
                          <div
                            style={{
                              fontSize: 13,
                              color: "#5A8070",
                              lineHeight: 1.55,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {story.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
          </div>
          <div style={{ marginTop: 14, textAlign: "right" }}>
            <a
              href="https://www.goodnewsnetwork.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                color: "#7ABBA0",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              Good News Network →
            </a>
          </div>
        </div>
      </div>

      {/* YOGA JOURNAL */}
      <div style={{ ...fade(1.0), padding: "16px 26px 0" }}>
        <div
          style={{
            background: LAVENDER_BG,
            borderRadius: 20,
            padding: "20px 22px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          <SectionLabel color="#6A52C4" bg={LAVENDER + "66"}>
            Yoga Journal
          </SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {yogaStories.length === 0
              ? [0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "white",
                      marginBottom: i < 2 ? 14 : 0,
                    }}
                  >
                    <div style={{ height: 130, background: LAVENDER + "44" }} />
                    <div
                      style={{
                        padding: "10px 12px 12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                      }}
                    >
                      <div
                        style={{
                          height: 13,
                          borderRadius: 6,
                          background: LAVENDER + "55",
                          width: "85%",
                        }}
                      />
                      <div
                        style={{
                          height: 11,
                          borderRadius: 6,
                          background: LAVENDER + "33",
                          width: "60%",
                        }}
                      />
                    </div>
                  </div>
                ))
              : yogaStories.map((story, i) => (
                  <a
                    key={i}
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "white",
                        marginBottom: i < yogaStories.length - 1 ? 14 : 0,
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                      }}
                    >
                      {story.imageUrl && (
                        <img
                          src={story.imageUrl}
                          alt=""
                          style={{
                            width: "100%",
                            height: 130,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      )}
                      <div style={{ padding: "10px 12px 12px" }}>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#2E1F5E",
                            lineHeight: 1.45,
                            marginBottom: story.description ? 4 : 0,
                          }}
                        >
                          {story.title}
                        </div>
                        {story.description && (
                          <div
                            style={{
                              fontSize: 13,
                              color: "#6A52C4",
                              lineHeight: 1.55,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {story.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
          </div>
          <div style={{ marginTop: 14, textAlign: "right" }}>
            <a
              href="https://www.yogajournal.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                color: "#6A52C4",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              Yoga Journal →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
