"use client";

import { LAVENDER, PEACH_SOFT, PEACH, fade } from "../app/_lib/theme";

type Song = { name: string; artist: string; url: string; artworkUrl: string };

type Props = { visible: boolean; song: Song };

export default function SongCard({ visible, song }: Props) {
  return (
    <div style={{ ...fade(visible, 0.1), padding: "20px 26px 0" }}>
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
  );
}
