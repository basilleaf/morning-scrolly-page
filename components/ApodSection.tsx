"use client";

import { fade } from "../app/_lib/theme";

export type Apod = {
  title: string | null;
  url: string | null;
  hdurl: string | null;
  explanation: string | null;
  media_type: string | null;
  thumbnail_url: string | null;
  copyright: string | null;
  date: string | null;
};

type Props = { visible: boolean; apod: Apod | null };

export default function ApodSection({ visible, apod }: Props) {
  return (
    <div style={{ ...fade(visible, 0.4), padding: "8px 26px 0" }}>
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
          {apod?.media_type === "video" ? (
            apod.thumbnail_url ? (
              <div style={{ position: "relative" }}>
                <img
                  src={apod.thumbnail_url}
                  alt={apod.title ?? "Astronomy Picture of the Day"}
                  style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }}
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
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
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
                  background: "linear-gradient(135deg, #1a0a2e, #2d1b5e, #4a2d8a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                }}
              >
                🌌
              </div>
            )
          ) : apod?.url ? (
            <img
              src={apod.url}
              alt={apod.title ?? "Astronomy Picture of the Day"}
              style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #1a0a2e, #2d1b5e, #4a2d8a)",
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
              style={{ fontSize: 15, fontWeight: 700, color: "#2D2D2D", marginBottom: 8 }}
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
    </div>
  );
}
