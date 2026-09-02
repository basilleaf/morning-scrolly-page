"use client";

import { ROSE, ROSE_BG, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

type Quote = { q: string; a: string };

type Props = { visible: boolean; quote: Quote };

export default function QuoteSection({ visible, quote }: Props) {
  return (
    <div style={{ ...fade(visible, 0.85), padding: "16px 26px 0" }}>
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
            fontSize: 15,
            fontWeight: 600,
            color: "#A05050",
            letterSpacing: "0.04em",
          }}
        >
          — {quote.a}
        </div>
      </div>
    </div>
  );
}
