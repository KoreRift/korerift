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
  emoji: z.string().default("🎮"),         // emoji mostrata sulla copertina
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
