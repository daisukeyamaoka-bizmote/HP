import { getCollection, type CollectionEntry } from 'astro:content';

/** 公開記事を新着順で返す */
export async function getPublishedArticles(): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 公開お知らせを新着順で返す */
export async function getPublishedNews(): Promise<CollectionEntry<'news'>[]> {
  const news = await getCollection('news', ({ data }) => !data.draft);
  return news.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 著者を id で引ける Map を返す */
export async function getAuthorsMap(): Promise<Map<string, CollectionEntry<'authors'>>> {
  const authors = await getCollection('authors');
  return new Map(authors.map((a) => [a.id, a]));
}

export const newsTypeLabels: Record<string, string> = {
  release: 'プレスリリース',
  announce: 'お知らせ',
  event: 'イベント',
  media: 'メディア掲載',
};
