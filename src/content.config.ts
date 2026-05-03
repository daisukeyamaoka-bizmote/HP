/**
 * Content Collections schema
 *
 * Source: docs/02_TECHNICAL_SPEC.md Section 5.4 (Markdown frontmatter)
 *
 * Phase 0 では最小スキーマを定義。Phase 6 (Notion 連携) で必要に応じて拡張する。
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    category: z.enum(['flag', 'ship', 'lab']),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    excerpt: z.string(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    type: z.enum(['release', 'media', 'event', 'partnership']),
    publishedDate: z.coerce.date(),
    excerpt: z.string(),
  }),
});

export const collections = { insights, news };
