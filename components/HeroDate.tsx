"use client";

import {
  PEACH,
  PEACH_SOFT,
  LAVENDER_BG,
  PAGE_BG,
  FONT_DISPLAY,
  FONT_BODY,
  fade,
} from "../app/_lib/theme";

type Weather = {
  summary: string;
  emoji: string;
  sunrise: string;
  sunset: string;
};
type Aqi = { aqi: number; category: string; emoji: string };

type Props = {
  visible: boolean;
  isLoggedIn: boolean | null;
  dayName: string;
  monthDay: string;
  timeStr: string;
  weather: Weather | null;
  aqi: Aqi | null;
  onLogin: () => void;
  onLogout: () => void;
};

export default function HeroDate({
  visible,
  isLoggedIn,
  dayName,
  monthDay,
  timeStr,
  weather,
  aqi,
  onLogin,
  onLogout,
}: Props) {
  return (
    <div
      style={{
        ...fade(visible, 0),
        padding: "44px 26px 28px",
        background: `linear-gradient(160deg, ${PEACH_SOFT}88 0%, ${LAVENDER_BG} 60%, ${PAGE_BG} 100%)`,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}
      >
        {isLoggedIn === true ? (
          <button
            onClick={onLogout}
            style={{
              background: "none",
              border: "none",
              fontSize: 11,
              color: "#C0B0A0",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: 0,
              fontFamily: FONT_BODY,
            }}
          >
            Sign out
          </button>
        ) : isLoggedIn === false ? (
          <button
            onClick={onLogin}
            style={{
              background: "none",
              border: "none",
              fontSize: 11,
              color: PEACH,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: 0,
              fontFamily: FONT_BODY,
            }}
          >
            Sign in
          </button>
        ) : null}
      </div>

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

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <a href="weather://" style={{ textDecoration: "none" }}>
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
            {weather?.emoji ?? "🌡️"}
            <span>{weather?.summary ?? "Loading…"}</span>
          </div>
        </a>
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
  );
}
