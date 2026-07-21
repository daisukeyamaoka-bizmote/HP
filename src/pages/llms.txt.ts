import type { APIRoute } from 'astro';
import site from '../data/site.json';
import { categories } from '../data/categories';
import { getPublishedArticles, getPublishedNews } from '../lib/content';

export const GET: APIRoute = async () => {
  const articles = await getPublishedArticles();
  const news = await getPublishedNews();

  const lines: string[] = [
    `# ${site.companyName}`,
    '',
    site.description,
    '',
    '## 運営元',
    '',
    `- 社名: ${site.companyName}`,
    '- 設立: 2023年5月',
    '- 代表者: 代表取締役 山岡 大介',
    `- 所在地: 〒${site.address.postalCode} ${site.address.region}${site.address.locality}${site.address.street}`,
    `- 事業内容: エンタープライズ攻略支援「bizU」／AX支援「いつでも番頭さん」／起業家輩出コミュニティ「${site.shijukuName}」`,
    `- 会社情報: ${site.siteUrl}/about/`,
    `- 事業について: ${site.siteUrl}/services/`,
    '',
    '## 思想・哲学',
    '',
    '- Philosophy: 次の“常識”をつくる',
    '- Mission: 挑戦者と共に挑戦者であり続ける',
    '- Vision: 世界から“模倣される”国へ',
    '',
    '## カテゴリ',
    '',
    ...categories.map((c) => `- ${site.siteUrl}/category/${c.slug}/ — ${c.name}: ${c.description}`),
    '',
    '## 記事一覧(新着順)',
    '',
    ...articles.map(
      (a) =>
        `- [${a.data.title}](${site.siteUrl}/articles/${a.id}/) — ${a.data.description}`
    ),
    '',
    '## お知らせ',
    '',
    ...news.map((n) => `- [${n.data.title}](${site.siteUrl}/news/${n.id}/)`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
