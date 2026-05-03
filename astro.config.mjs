// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bizmote.jp',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },
  integrations: [
    sitemap(),
    mdx(),
  ],
  vite: {
    // NOTE: Astro 同梱の Vite と @tailwindcss/vite が参照する Vite が別インスタンスのため、
    // Plugin 型が構造的に同一でも TypeScript が別物と判定する。Astro 5 + Tailwind 4 の
    // 既知の組み合わせ問題で、実行時には何の影響もない。`as any` で型ブリッジする。
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
