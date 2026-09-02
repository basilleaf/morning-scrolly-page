"use client";

import { PEACH, LAVENDER, PEACH_SOFT, BUTTER, fade } from "../app/_lib/theme";

export type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  date: string | null;
  medium: string | null;
  description: string | null;
  imageUrl: string | null;
  artworkUrl: string;
};

type Props = { visible: boolean; artwork: Artwork | null };

export default function ArtOfDaySection({ visible, artwork }: Props) {
  return (
    <div style={{ ...fade(visible, 0.5), padding: "16px 26px 0" }}>
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
              style={{ width: "100%", display: "block" }}
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
                fontSize: 15,
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
              <div style={{ fontSize: 15, color: "#999", marginBottom: 2 }}>
                {artwork.artist}
                {artwork.date ? ` · ${artwork.date}` : ""}
              </div>
            )}
            {artwork?.medium && (
              <div
                style={{
                  fontSize: 15,
                  color: "#BBB",
                  marginBottom: artwork.description ? 10 : 0,
                }}
              >
                {artwork.medium}
              </div>
            )}
            {artwork?.description && (
              <div
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  fontWeight: 400,
                  color: "#666",
                  marginTop: 8,
                }}
              >
                {artwork.description}
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}
