import React from "react";

export const PEACH = "#FF8C6B";
export const PEACH_SOFT = "#FFD4C2";
export const LAVENDER = "#C5B8F5";
export const LAVENDER_BG = "#F0ECFF";
export const MINT = "#A8E6CF";
export const MINT_BG = "#EDFAF4";
export const BUTTER = "#FFE8A3";
export const BUTTER_BG = "#FFFBEE";
export const ROSE = "#F4A0A0";
export const ROSE_BG = "#FFF0F0";
export const PAGE_BG = "#FFF8F5";

export const FONT_DISPLAY = "var(--font-righteous), sans-serif";
export const FONT_BODY = "var(--font-jakarta), sans-serif";

export const fade = (visible: boolean, delay: number): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
});
