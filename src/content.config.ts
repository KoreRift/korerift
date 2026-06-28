// content.config.ts — definisce le "raccolte" di contenuti in Markdown.
// Ogni raccolta ha uno schema: i campi obbligatori/opzionali nel frontmatter
// (le righe tra --- in cima a ogni file .md). Astro li valida per te.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Schema condiviso da guide e build (stessi campi).
const articleSchema = z.object({
  title: z.string(),
  game: z.string(),                       // es. "Genshin Impact"
  description: z.string(),                // sottotitolo breve
  category: z.string().default("GUIDA"),  // etichetta colorata: GUIDA / BUILD / NEWS
  date: z.coerce.date(),                  // data di pubblicazione
  readingTime: z.string().default("5 min lettura"),
  thumb: z.string().default("gt-wuwa"),   // classe gradiente: gt-wuwa/gt-genshin/gt-mha/gt-creator
  emoji: z.string().default("🎮"),         // emoji mostrata sulla copertina (se non c'è cover)
  cover: z.string().optional(),           // immagine di copertina della card (es. "/games/nte/cover.jpg")
  views: z.number().default(0),           // popolarità manuale: ordina "Top News" (numero più alto = più in alto)
  // etichette per i filtri nella pagina del gioco (es. ["Build"], ["Tier List"]).
  // Robusto: accetta sia un singolo tag ("Build") sia una lista, e normalizza a lista.
  tags: z.preprocess(
    (v) => (v == null ? [] : Array.isArray(v) ? v : [v]),
    z.array(z.string()),
  ),

  // ─── Campi opzionali per le guide "build" (layout: "build") ───
  layout: z.enum(["build", "tierlist"]).optional(), // template grafico: build o tier list
  character: z.string().optional(),       // personaggio principale (per il ritratto grande)
  version: z.string().optional(),         // es. "1.0"
  coreBuild: z.array(z.object({
    role: z.string(),                     // es. "Best Arc", "Best Module"
    name: z.string(),                     // es. "Day Off"
    type: z.enum(["weapon", "module"]),   // tipo di asset per l'icona
    tag: z.string().optional(),           // es. "BIS + F2P"
    desc: z.string().optional(),
  })).optional(),
  mainStats: z.array(z.object({ when: z.string(), stat: z.string() })).optional(),
  subStats: z.array(z.string()).optional(),
  skillPriority: z.string().optional(),
  teams: z.array(z.object({
    name: z.string(),
    desc: z.string().optional(),
    members: z.array(z.string()),         // nomi personaggi (le icone si agganciano da sole)
  })).optional(),
  tiers: z.array(z.object({               // per le tier list (layout: "tierlist")
    rank: z.string(),                     // es. "S", "A", "B"...
    color: z.string(),                    // colore della fascia (es. "#FF3B3B")
    chars: z.array(z.string()),           // nomi personaggi della fascia
  })).optional(),
  tip: z.string().optional(),
  note: z.string().optional(),            // nota in fondo alla sezione Core Build
});

const guide = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guide" }),
  schema: articleSchema,
});

const build = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/build" }),
  schema: articleSchema,
});

export const collections = { guide, build };
