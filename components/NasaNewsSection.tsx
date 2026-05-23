"use client";

import { fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";
import type { GoodNewsStory } from "./GoodNewsSection";

const NASA_BLUE = "#0B3D91";
const NASA_BLUE_LIGHT = "#5B8DD9";
const NASA_BG = "#EBF1FF";
const NASA_SKELETON = "#C5D8FF";

type Props = { visible: boolean; stories: GoodNewsStory[] };

export default function NasaNewsSection({ visible, stories }: Props) {
  return (
    <div style={{ ...fade(visible, 1.0), padding: "16px 26px 0" }}>
      <div
        style={{
          background: NASA_BG,
          borderRadius: 20,
          padding: "20px 22px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}
      >
        <SectionLabel color={NASA_BLUE} bg={NASA_SKELETON + "99"}>
          NASA News
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
                  <div style={{ height: 130, background: NASA_SKELETON + "66" }} />
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
                        background: NASA_SKELETON + "88",
                        width: "85%",
                      }}
                    />
                    <div
                      style={{
                        height: 11,
                        borderRadius: 6,
                        background: NASA_SKELETON + "55",
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
                          color: NASA_BLUE,
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
                            color: NASA_BLUE_LIGHT,
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
            href="https://www.nasa.gov/news/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: NASA_BLUE,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            NASA →
          </a>
        </div>
      </div>
    </div>
  );
}
