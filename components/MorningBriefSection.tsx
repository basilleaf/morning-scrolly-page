"use client";

import { fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";
import NewsDigest from "./NewsDigest";

type Props = { visible: boolean };

export default function MorningBriefSection({ visible }: Props) {
  return (
    <div style={{ ...fade(visible, 0.2), padding: "24px 26px 0" }}>
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
  );
}
