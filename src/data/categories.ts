export type CategorySlug = 'gtm' | 'ax' | 'org' | 'newbiz';

export interface Category {
  slug: CategorySlug;
  name: string;
  anchor: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: 'gtm',
    name: 'GTM',
    anchor: 'cat-gtm',
    description:
      '市場参入の設計図。誰に・何を・どの経路で届けるかを決める工程を扱います。エンタープライズ攻略、初期顧客の獲得、価格設計、営業とマーケティングの分業までを含みます。',
  },
  {
    slug: 'ax',
    name: 'AX',
    anchor: 'cat-ax',
    description:
      '業務を個人の記憶と勘から引き剥がし、仕組みに変える。業務の分解、標準化、AI・専用ツールの実装、現場への定着までの工程を扱います。',
  },
  {
    slug: 'org',
    name: '組織',
    anchor: 'cat-org',
    description:
      '人の集まりを、成果の出る構造に変える。採用要件の設計、育成と評価、営業組織の分業と会議体、権限移譲と内製化までの工程を扱います。',
  },
  {
    slug: 'newbiz',
    name: '新規事業',
    anchor: 'cat-newbiz',
    description:
      '新規事業と起業の立ち上げを、現場の実例から扱います。事業アイデアの検証、最初の顧客の獲得、撤退と方針転換の判断、実案件で学ぶ起業家育成までを含みます。',
  },
];

export function getCategory(slug: string): Category {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) throw new Error(`Unknown category: ${slug}`);
  return cat;
}
