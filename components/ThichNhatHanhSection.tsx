"use client";

import { MINT, MINT_BG, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

type Props = { visible: boolean; quote: string };

export default function ThichNhatHanhSection({ visible, quote }: Props) {
  return (
    <div style={{ ...fade(visible, 0.45), padding: "16px 26px 0" }}>
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
          {quote}
        </div>
      </div>
    </div>
  );
}
