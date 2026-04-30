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
import musicData from "./music.json";

export const TAO: { verse: number; text: string }[] = taoData;

type MusicTrack = {
  name: string;
  artist: string;
  artworkUrl: string;
  url: string;
};
export const SONGS: MusicTrack[] = (
  musicData as {
    data: {
      relationships?: {
        tracks?: {
          data: {
            attributes: {
              name: string;
              artistName: string;
              artwork: { url: string };
              url: string;
            };
          }[];
        };
      };
    }[];
  }
).data
  .flatMap((playlist) => playlist.relationships?.tracks?.data ?? [])
  .map((track) => ({
    name: track.attributes.name,
    artist: track.attributes.artistName,
    artworkUrl: track.attributes.artwork.url.replace("{w}x{h}", "104x104"),
    url: track.attributes.url,
  }));

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
  // the rest via https://www.thegoodtrade.com/features/positive-affirmations-morning-routine/
  "I am not defined by my job",
  "I am allowed to feel good.",
  "I am capable of balancing ease and effort in my life.",
  "I am in charge of how I feel and I choose to feel happy.",
  "I am more than my circumstances dictate.",
  "I am open to healing.",
  "I am proof enough of who I am and what I deserve.",
  "I am peaceful and whole.",
  "I am safe and surrounded by love and support.",
  "It’s okay to make mistakes.",
  "I can control how I respond to things that are confronting.",
  "I celebrate the good qualities in others and myself.",
  "I deserve information and I deserve moments of silence, too.",
  "I do not have to linger in dark places; there is help for me here.",
  "I do not rush through my life, I temper speed with stillness.",
  "I grow towards my interests, like a plant reaching for the sun.",
  "I have everything I need to succeed.",
  "I hold community for others, and am held in community by others.",
  "I hold wisdom beyond knowledge.",
  "I invite art and music into my life.",
  "I let go of the things that sit achingly out of reach.",
  "I leave room in my life for spontaneity.",
  "I love that I love what I love.",
  "I nourish myself with kind words and joyful foods.",
  "I release the fears that do not serve me.",
  "I practice gratitude for all that I have, and all that is yet to come.",
  "I seek out mystery in the ordinary.",
  "I strive for joy, not for perfection.",
  "I uplift my joy and the joy of others.",
  "I will allow myself to evolve.",
  "My life is not a race or competition.",
  "There is growth in stillness.",
  "There is poetry in everything, if I look for it.",
  "Today is an opportunity to grow and learn.",
  "When I forgive myself, I free myself.",
  "When I talk to myself as I would a friend, I see all my best qualities and I allow myself to shine.",
  "Words may shape me, but they do not make me. I am here already.",
];
