"use client";

import { LAVENDER, LAVENDER_BG, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

type TaoVerse = { verse: string | number; text: string };

type Props = {
  visible: boolean;
  tao: TaoVerse;
  taoReflection: string | null;
};

export default function TaoSection({ visible, tao, taoReflection }: Props) {
  return (
    <div style={{ ...fade(visible, 0.6), padding: "20px 26px 0" }}>
      <div
        style={{
          background: LAVENDER_BG,
          borderRadius: 20,
          padding: "20px 22px",
        }}
      >
        <SectionLabel color="#6B5BA6" bg={LAVENDER + "66"}>
          Tao Te Ching · {tao.verse}
        </SectionLabel>
        <div
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "#3D3260",
            fontWeight: 400,
          }}
        >
          {tao.text}
        </div>
        {taoReflection !== null && (
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: `1px solid ${LAVENDER}`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#9B8FC0",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              For today
            </div>
            <div
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "#5B4A9B",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {taoReflection}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
