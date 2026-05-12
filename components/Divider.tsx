"use client";

import { PEACH_SOFT, fade } from "../app/_lib/theme";

type Props = { visible: boolean };

export default function Divider({ visible }: Props) {
  return (
    <div style={{ ...fade(visible, 0.35), padding: "32px 26px 8px", textAlign: "center" }}>
      <div style={{ fontSize: 18, letterSpacing: "0.3em", color: PEACH_SOFT }}>✦ ✦ ✦</div>
    </div>
  );
}
