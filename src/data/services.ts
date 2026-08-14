import site from './site.json';

export interface Service {
  slug: string;
  name: string;
  /** 1行説明。詳細・価格はこのサイトには載せない(DESIGN_SPEC 11) */
  summary: string;
  catSlug: string;
  catName: string;
  /** 各サービスサイトのURL。未設定のあいだはリンクを出さない */
  url: string | null;
}

export const services: Service[] = [
  {
    slug: 'bizu',
    name: 'bizU',
    summary: 'エンタープライズ攻略。',
    catSlug: 'gtm',
    catName: 'GTM',
    url: 'https://bizmote.jp/bizu/',
  },
  {
    slug: 'bantou',
    name: 'いつでも番頭さん',
    summary: 'AX支援。',
    catSlug: 'ax',
    catName: 'AX',
    url: null,
  },
  {
    slug: 'community',
    name: site.communityName,
    summary: '起業家輩出コミュニティ。',
    catSlug: 'newbiz',
    catName: '新規事業',
    url: null,
  },
];

/** 会社概要の「事業内容」表記 */
export const businessLine = services.map((s) => s.name).join('／');
