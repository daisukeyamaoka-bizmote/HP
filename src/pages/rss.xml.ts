import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import site from '../data/site.json';
import { getPublishedArticles } from '../lib/content';

export const GET: APIRoute = async (context) => {
  const articles = await getPublishedArticles();
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      link: `/articles/${a.id}/`,
      pubDate: a.data.date,
    })),
    customData: '<language>ja</language>',
  });
};
