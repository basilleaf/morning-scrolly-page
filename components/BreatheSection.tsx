"use client";

import { LAVENDER, LAVENDER_BG, fade } from "../app/_lib/theme";
import SectionLabel from "./SectionLabel";

type Props = { visible: boolean };

export default function BreatheSection({ visible }: Props) {
  return (
    <>
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          28.5% { transform: scale(1.45); }
          43% { transform: scale(1.45); }
          85.5% { transform: scale(1); }
        }
        @keyframes breathe-in-label {
          0%, 24% { opacity: 0.75; }
          28.5% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes breathe-out-label {
          0%, 43% { opacity: 0; }
          47% { opacity: 0.75; }
          82% { opacity: 0.75; }
          86% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
      <div style={{ ...fade(visible, 0.47), padding: "16px 26px 0" }}>
        <div
          style={{
            background: LAVENDER_BG,
            borderRadius: 20,
            padding: "24px 22px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SectionLabel color="#6B5BA6" bg={LAVENDER + "66"}>
            Breathe
          </SectionLabel>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "2px solid #C5B8F5",
              background: "linear-gradient(145deg, #F5F0FF 0%, #ECE6FF 100%)",
              boxShadow: "0 4px 24px rgba(197,184,245,0.4)",
              animation: "breathe 14s ease-in-out infinite",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 9,
                height: 4,
                border: "1.5px solid #9B8FC0",
                borderBottomColor: "transparent",
                borderRadius: "50%",
                top: "32%",
                left: "32%",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 9,
                height: 4,
                border: "1.5px solid #9B8FC0",
                borderBottomColor: "transparent",
                borderRadius: "50%",
                top: "32%",
                right: "32%",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 20,
                height: 7,
                top: "47%",
                left: "50%",
                transform: "translateX(-50%)",
                border: "1.5px solid #9B8FC0",
                borderTop: "none",
                borderRadius: "0 0 20px 20px",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 20,
              height: 18,
              position: "relative",
              width: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9B8FC0",
                animation: "breathe-in-label 14s ease-in-out infinite",
              }}
            >
              in
            </span>
            <span
              style={{
                position: "absolute",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9B8FC0",
                animation: "breathe-out-label 14s ease-in-out infinite",
              }}
            >
              out
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
