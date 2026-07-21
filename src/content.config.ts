import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    summary: z.string().optional(),
    category: z.enum(['gtm', 'ax', 'startup']),
    author: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    readingTime: z.number().optional(),
    draft: z.boolean().default(false),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/news' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    type: z.enum(['release', 'announce', 'event', 'media']).default('announce'),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    note: z.string().optional(),
    bio: z.string(),
    bioShort: z.string().optional(),
    avatar: z.string().optional(),
    member: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

export const collections = { articles, news, authors };
