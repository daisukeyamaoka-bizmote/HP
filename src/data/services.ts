import site from './site.json';

export interface Service {
  name: string;
  label: string;
  description: string;
  catSlug: string;
  catName: string;
  url: string | null;
}

export const services: Service[] = [
  {
    name: 'bizU',
    label: 'エンタープライズ攻略支援',
    description:
      '大手企業の役員宛アプローチから初回商談までを、工程として設計・実行するエンタープライズ攻略支援サービスです。宛先の選定、CXOレターによる接点づくり、初回商談の設計までを一貫して支援し、個人の腕に頼らない商談創出の仕組みを社内に残します。',
    catSlug: 'gtm',
    catName: 'GTM',
    url: 'https://bizmote.jp/bizu/',
  },
  {
    name: 'いつでも番頭さん',
    label: 'AX支援',
    description:
      '中小企業・レガシー産業の現場に残る手作業と属人化した判断を分解し、AI・専用ツールによる仕組みに置き換えて定着まで並走するAX支援サービスです。ツールの導入ではなく、業務の分解から始めることを大切にしています。',
    catSlug: 'ax',
    catName: '業務の仕組み化・AI活用',
    url: null,
  },
  {
    name: site.shijukuName,
    label: '起業家輩出コミュニティ',
    description:
      '座学ではなく、実案件への参画を通じて起業家候補の最初の数歩を支援する起業家輩出コミュニティです。小さくても意思決定を伴う役割を実戦で経験し、挑戦の初速を上げることを目指します。',
    catSlug: 'startup',
    catName: '起業・事業づくり',
    url: null,
  },
];
