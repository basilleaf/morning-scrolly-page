"use client";

import { MINT, MINT_BG, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

type Props = { visible: boolean; text: string };

export default function BuddhistSection({ visible, text }: Props) {
  return (
    <div style={{ ...fade(visible, 0.7), padding: "16px 26px 0" }}>
      <div style={{ background: MINT_BG, borderRadius: 20, padding: "20px 22px" }}>
        <SectionLabel color="#3D7A5E" bg={MINT + "66"}>
          Teaching
        </SectionLabel>
        <div style={{ fontSize: 17, lineHeight: 1.7, color: "#2A4D3D", fontWeight: 400 }}>
          {text}
        </div>
      </div>
    </div>
  );
}
