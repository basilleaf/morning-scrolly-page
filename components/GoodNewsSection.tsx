"use client";

import { MINT, MINT_BG, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

export type GoodNewsStory = {
  title: string;
  link: string;
  description: string;
  imageUrl: string | null;
  pubDate: string;
};

type Props = { visible: boolean; stories: GoodNewsStory[] };

export default function GoodNewsSection({ visible, stories }: Props) {
  return (
    <div style={{ ...fade(visible, 0.9), padding: "16px 26px 0" }}>
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
          {stories.length === 0
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
            : stories.map((story, i) => (
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
                      marginBottom: i < stories.length - 1 ? 14 : 0,
                      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                    }}
                  >
                    {story.imageUrl && (
                      <img
                        src={story.imageUrl}
                        alt=""
                        style={{ width: "100%", display: "block" }}
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
                            fontSize: 15,
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
              fontSize: 15,
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
  );
}
