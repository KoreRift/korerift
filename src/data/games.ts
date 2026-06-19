// games.ts — elenco centrale dei giochi mostrati nella sezione /giochi.
// "name" DEVE combaciare con il campo "game" nei file Markdown (per il filtro).
// "image" è opzionale: se metti un banner in public/games/, lo userà al posto del gradiente.

export interface Game {
  slug: string;       // usato nell'URL: /giochi/<slug>
  name: string;       // nome esatto, deve combaciare con "game" nei contenuti
  thumb: string;      // classe gradiente di fallback: gt-genshin/gt-wuwa/gt-mha/gt-creator
  emoji: string;
  tagline: string;
  image?: string;     // opzionale: es. "/games/genshin.jpg"
}

export const games: Game[] = [
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    thumb: "gt-genshin",
    emoji: "⚔️",
    tagline: "Open world, gacha, esplorazione.",
  },
  {
    slug: "wuthering-waves",
    name: "Wuthering Waves",
    thumb: "gt-wuwa",
    emoji: "🌊",
    tagline: "Action RPG dinamico e veloce.",
  },
  {
    slug: "honkai-star-rail",
    name: "Honkai Star Rail",
    thumb: "gt-creator",
    emoji: "🌟",
    tagline: "RPG a turni nello spazio.",
  },
  {
    slug: "mha-strongest-hero",
    name: "MHA Strongest Hero",
    thumb: "gt-mha",
    emoji: "💥",
    tagline: "L'action ufficiale di My Hero Academia.",
  },
];

// Helper: trova un gioco dal suo slug.
export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
