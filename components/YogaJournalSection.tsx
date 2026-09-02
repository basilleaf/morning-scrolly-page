"use client";

import { LAVENDER, LAVENDER_BG, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";
import type { GoodNewsStory } from "./GoodNewsSection";

type Props = { visible: boolean; stories: GoodNewsStory[] };

export default function YogaJournalSection({ visible, stories }: Props) {
  return (
    <div style={{ ...fade(visible, 1.0), padding: "16px 26px 0" }}>
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
          {stories.length === 0
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
                        style={{
                          width: "100%",
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
                            fontSize: 15,
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
              fontSize: 15,
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
  );
}
