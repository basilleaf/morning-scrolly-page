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

export const TAO = [
  { verse: 1, text: "The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name." },
  { verse: 8, text: "The highest good is like water. Water gives life to the ten thousand things and does not strive." },
  { verse: 11, text: "Thirty spokes share the wheel's hub; it is the center hole that makes it useful." },
  { verse: 16, text: "Empty yourself of everything. Let the mind rest at peace. Return to the root is called stillness." },
  { verse: 22, text: "Yield and overcome. Bend and be straight. Empty and be full. Wear out and be new." },
  { verse: 33, text: "Knowing others is wisdom. Knowing yourself is enlightenment. Mastering others requires force. Mastering yourself requires strength." },
  { verse: 44, text: "Fame or integrity: which is more important? Money or happiness: which is more valuable?" },
  { verse: 48, text: "In pursuit of learning, every day something is acquired. In pursuit of Tao, every day something is dropped." },
  { verse: 55, text: "One who is filled with the Tao is like a newborn child. The infant is protected from harm." },
  { verse: 81, text: "True words are not beautiful. Beautiful words are not true. The sage does not compete, and therefore no one can compete with her." },
];

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
