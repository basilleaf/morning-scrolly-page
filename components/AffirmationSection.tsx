"use client";

import { BUTTER, BUTTER_BG, FONT_DISPLAY, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

type Props = { visible: boolean; text: string };

export default function AffirmationSection({ visible, text }: Props) {
  return (
    <div style={{ ...fade(visible, 0.8), padding: "16px 26px 0" }}>
      <div style={{ background: BUTTER_BG, borderRadius: 20, padding: "20px 22px" }}>
        <SectionLabel color="#9A7D20" bg={BUTTER + "88"}>
          For today
        </SectionLabel>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 24,
            lineHeight: 1.35,
            color: "#4A3A10",
            letterSpacing: "-0.3px",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
