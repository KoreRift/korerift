// games.ts — elenco centrale dei giochi mostrati nella sezione /giochi.
// "name" DEVE combaciare con il campo "game" nei file Markdown (per il filtro).
// "image" è opzionale: se metti un banner in public/games/, lo userà al posto del gradiente.
// "bannerComplete" è opzionale: true SOLO se l'immagine contiene già nome/testo/bottone.
// "genre" decide in quale filtro appare nella pagina /giochi: "Gacha" | "Moba" | "MMO" | "Altro".
// "aliases" sono i soprannomi usati dalla ricerca (es. NTE, WuWa).

export interface Game {
  slug: string;             // usato nell'URL: /giochi/<slug>
  name: string;             // nome esatto, deve combaciare con "game" nei contenuti
  thumb: string;            // classe gradiente di fallback: gt-genshin/gt-wuwa/gt-mha/gt-creator
  emoji: string;
  tagline: string;
  genre: string;            // filtro pagina /giochi: "Gacha" | "Moba" | "MMO" | "Altro"
  image?: string;           // opzionale: es. "/games/nte.jpg"
  bannerComplete?: boolean; // true se l'immagine contiene già nome/testo/bottone
  assetPrefix?: string;     // prefisso dei file asset se diverso dallo slug (es. "wuwa")
  aliases?: string[];       // soprannomi per la ricerca (es. ["NTE"], ["WuWa", "WW"])
}

export const games: Game[] = [
  {
    slug: "nte",
    name: "Neverness To Everness",
    thumb: "gt-creator",
    emoji: "🌃",
    tagline: "Open world anime RPG tra stile urbano, action e mistero.",
    genre: "Gacha",
    image: "/games/nte.jpg",
    aliases: ["NTE"],
  },
  {
    slug: "honkai-star-rail",
    name: "Honkai Star Rail",
    thumb: "gt-genshin",
    emoji: "🌌",
    tagline: "RPG a turni in viaggio tra le stelle.",
    genre: "Gacha",
    image: "/games/honkai-star-rail.jpg",
    aliases: ["HSR", "Honkai"],
  },
  {
    slug: "wuthering-waves",
    name: "Wuthering Waves",
    thumb: "gt-wuwa",
    emoji: "🌊",
    tagline: "Action RPG dinamico e veloce.",
    genre: "Gacha",
    image: "/games/wuthering-waves.jpg",
    aliases: ["WuWa", "WW"],
  },
  {
    slug: "zenless-zone-zero",
    name: "Zenless Zone Zero",
    thumb: "gt-mha",
    emoji: "🏙️",
    tagline: "Action urbano, stiloso e frenetico.",
    genre: "Gacha",
    image: "/games/zenless-zone-zero.jpg",
    aliases: ["ZZZ"],
  },
  {
    slug: "arknights-endfield",
    name: "Arknights: Endfield",
    thumb: "gt-genshin",
    emoji: "🤖",
    tagline: "Strategy RPG 3D nel mondo di Arknights.",
    genre: "Gacha",
    image: "/games/arknights-endfield.jpg",
    aliases: ["Endfield", "Arknights"],
  },
  {
    slug: "gta-vi",
    name: "GTA VI",
    thumb: "gt-mha",
    emoji: "🌴",
    tagline: "Il ritorno a Vice City. Open world crime.",
    genre: "Altro",
    image: "/games/gta-vi.jpg",
    aliases: ["GTA", "GTA 6", "GTA6"],
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    thumb: "gt-genshin",
    emoji: "⚔️",
    tagline: "Il MOBA competitivo più giocato al mondo.",
    genre: "Moba",
    image: "/games/league-of-legends.jpg",
    aliases: ["LoL", "League"],
  },
  {
    slug: "inazuma-eleven-cross",
    name: "Inazuma Eleven Cross",
    thumb: "gt-mha",
    emoji: "⚽",
    tagline: "Calcio e tecniche speciali: la leggenda continua.",
    genre: "Gacha",
    image: "/games/inazuma-eleven-cross.jpg",
    aliases: ["Inazuma", "IEC"],
  },
  {
    slug: "pokemon-champions",
    name: "Pokemon Champions",
    thumb: "gt-creator",
    emoji: "⚡",
    tagline: "Battaglie competitive tra Allenatori.",
    genre: "Altro",
    image: "/games/pokemon-champions.jpg",
    aliases: ["Pokemon", "Pokémon", "Champions"],
  },
];

// Helper: trova un gioco dal suo slug.
export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
