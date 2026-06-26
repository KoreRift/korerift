// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Il tuo dominio: serve per SEO, sitemap e link assoluti corretti.
  site: "https://korerift.com",
  integrations: [sitemap()],
});
