import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bizmote.jp',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
