import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thesocialchicken.github.io',
  base: '/BaarnsMannenKoor',
  output: 'static',
  integrations: [sitemap()],
});
