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
    slug: 'flag',
    name: 'bizFlag',
    summary: 'GTM戦略の設計・実行・移管。',
    catSlug: 'gtm',
    catName: 'GTM',
    url: null,
  },
  {
    slug: 'lab',
    name: 'bizLab',
    summary: 'AIを起点にした新規事業創出。',
    catSlug: 'ax',
    catName: '業務の仕組み化・AI活用',
    url: null,
  },
  {
    slug: 'ship',
    name: site.communityName,
    summary: '実践的起業家輩出コミュニティ。',
    catSlug: 'startup',
    catName: '起業・事業づくり',
    url: null,
  },
];

/** 会社概要の「事業内容」表記 */
export const businessLine = services.map((s) => s.name).join('／');
