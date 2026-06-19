// games.ts — elenco centrale dei giochi mostrati nella sezione /giochi.
// "name" DEVE combaciare con il campo "game" nei file Markdown (per il filtro).
// "image" è opzionale: se metti un banner in public/games/, lo userà al posto del gradiente.
// "bannerComplete" è opzionale: true SOLO se l'immagine contiene già nome/testo/bottone.

export interface Game {
  slug: string;             // usato nell'URL: /giochi/<slug>
  name: string;             // nome esatto, deve combaciare con "game" nei contenuti
  thumb: string;            // classe gradiente di fallback: gt-genshin/gt-wuwa/gt-mha/gt-creator
  emoji: string;
  tagline: string;
  image?: string;           // opzionale: es. "/games/nte.jpg"
  bannerComplete?: boolean; // true se l'immagine contiene già nome/testo/bottone
}

export const games: Game[] = [
  {
    slug: "nte",
    name: "Neverness To Everness",
    thumb: "gt-creator",
    emoji: "🌃",
    tagline: "Open world anime RPG tra stile urbano, action e mistero.",
    image: "/games/nte.jpg",
  },
  {
    slug: "honkai-star-rail",
    name: "Honkai Star Rail",
    thumb: "gt-genshin",
    emoji: "🌌",
    tagline: "RPG a turni in viaggio tra le stelle.",
    image: "/games/honkai-star-rail.jpg",
  },
  {
    slug: "wuthering-waves",
    name: "Wuthering Waves",
    thumb: "gt-wuwa",
    emoji: "🌊",
    tagline: "Action RPG dinamico e veloce.",
    image: "/games/wuthering-waves.jpg",
  },
  {
    slug: "zenless-zone-zero",
    name: "Zenless Zone Zero",
    thumb: "gt-mha",
    emoji: "🏙️",
    tagline: "Action urbano, stiloso e frenetico.",
    image: "/games/zenless-zone-zero.jpg",
  },
  {
    slug: "arknights-endfield",
    name: "Arknights: Endfield",
    thumb: "gt-genshin",
    emoji: "🤖",
    tagline: "Strategy RPG 3D nel mondo di Arknights.",
    image: "/games/arknights-endfield.jpg",
  },
  {
    slug: "gta-vi",
    name: "GTA VI",
    thumb: "gt-mha",
    emoji: "🌴",
    tagline: "Il ritorno a Vice City. Open world crime.",
    image: "/games/gta-vi.jpg",
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    thumb: "gt-genshin",
    emoji: "⚔️",
    tagline: "Il MOBA competitivo più giocato al mondo.",
    image: "/games/league-of-legends.jpg",
  },
  {
    slug: "inazuma-eleven-cross",
    name: "Inazuma Eleven Cross",
    thumb: "gt-mha",
    emoji: "⚽",
    tagline: "Calcio e tecniche speciali: la leggenda continua.",
    image: "/games/inazuma-eleven-cross.jpg",
  },
  {
    slug: "pokemon-champions",
    name: "Pokemon Champions",
    thumb: "gt-creator",
    emoji: "⚡",
    tagline: "Battaglie competitive tra Allenatori.",
    image: "/games/pokemon-champions.jpg",
  },
];

// Helper: trova un gioco dal suo slug.
export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
