export function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >> 7;
    h ^= h << 17;
    return (h >>> 0) / 0xffffffff;
  };
}

import taoData from "./tao.json";

export const TAO: { verse: number; text: string }[] = taoData;

export const BUDDHIST = [
  "The mind is everything. What you think, you become.",
  "Peace comes from within. Do not seek it without.",
  "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
  "Every morning we are born again. What we do today is what matters most.",
  "If you are quiet enough, you will hear the flow of the universe.",
  "The present moment is the only moment available to us, and it is the door to all moments.",
  "When you realize how perfect everything is, you will tilt your head back and laugh at the sky.",
  "Happiness is not something ready-made. It comes from your own actions.",
];

export const AFFIRMATIONS = [
  "I am exactly where I need to be.",
  "My work creates real value in the world.",
  "I move through uncertainty with grace.",
  "I trust my own instincts.",
  "Today I will do one thing beautifully.",
  "Rest is not a reward — it is a practice.",
  "I am building something that matters.",
  "My creativity is a gift I give freely.",
];
