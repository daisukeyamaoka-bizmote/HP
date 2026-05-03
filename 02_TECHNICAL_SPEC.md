# bizmote コーポレートサイト 02: 技術仕様書

> 本ドキュメントは、bizmote.jp の全面刷新プロジェクトにおける技術的な意思決定と実装ルールを定義する。本ドキュメントは `01_PROJECT_OVERVIEW.md` の方針を技術側面で具体化したものである。

---

## 1. 技術スタック

### 1.1 確定した技術スタック一覧

| 領域 | 採用技術 | 採用理由 |
|---|---|---|
| **フレームワーク** | Astro 5.x | 静的サイト生成最強、GEO/SEO に最適、学習コスト低 |
| **言語** | TypeScript | 型安全性、Astro 標準 |
| **スタイリング** | Tailwind CSS 4.x | ユーティリティファースト、メンテ性高 |
| **アニメーション** | GSAP 3.x + ScrollTrigger | 業界標準、商用利用無料 |
| **滑らかスクロール** | Lenis 1.x | スクロール体験の質を上げる定番 |
| **3D/ジェネラティブ(将来)** | Three.js / OGL | 必要に応じて段階的に導入 |
| **画像最適化** | Astro Image / Sharp | 自動 WebP/AVIF 変換 |
| **動画配信** | Cloudflare Stream または直接配信 | 段階的判断 |
| **ホスティング** | Cloudflare Pages | 無料、高速、CDN 自動 |
| **DNS** | Cloudflare DNS | お名前.com からネームサーバーのみ変更 |
| **ドメイン管理** | お名前.com(維持) | ドメイン移管は不要 |
| **CMS** | Notion → Markdown 書き出し | Daisuke が慣れている、サイト速度最大 |
| **Git ホスティング** | GitHub(daisukeyamaoka-bizmote/HP) | 既存リポジトリ利用 |
| **CI/CD** | Cloudflare Pages 自動デプロイ | git push で自動公開 |
| **フォーム** | Cloudflare Workers + メール送信 | サーバーレス、無料枠で十分 |

### 1.2 技術選定の哲学

#### なぜ Astro なのか

- **静的サイト生成(SSG)が GEO/SEO 最強**: AI クローラーが完全に読み込める
- **Islands Architecture**: 必要な部分だけ JavaScript を動かすため軽量
- **Markdown ネイティブ対応**: Notion から書き出した記事をそのまま使える
- **コンテンツ重視のサイトに最適化**: bizmote のような会社サイト+ブログに完璧
- **Cloudflare Pages との相性が抜群**: ワンクリックでデプロイ可能
- **TypeScript 標準サポート**: 型安全な開発ができる
- **学習コストが低い**: HTML/CSS/JS の知識でほぼ書ける

#### なぜ Cloudflare Pages なのか

- **完全無料**: 個人・法人問わず無料枠が大きい(月 500 ビルド、無制限帯域)
- **世界最速 CDN**: 200+ 拠点から配信
- **自動 SSL**: HTTPS 化が自動
- **GitHub 連携**: push で自動デプロイ
- **bizU での実績**: 既存の Cloudflare スタックと整合
- **DNS 統合**: ドメイン管理も統合可能

#### なぜ GSAP + ScrollTrigger なのか

- **業界標準**: スクロールアニメーションの定番ライブラリ
- **2024 年から完全無料**: 商用利用も無料化された
- **学習資料が豊富**: 検索すれば情報が大量にある
- **Apple, Stripe, Linear が使用**: ベンチマークと同じ技術
- **AI(Claude Code)が扱える**: 学習データが豊富

---

## 2. ディレクトリ構造

### 2.1 プロジェクト全体構造

```
HP/                                  ← GitHub リポジトリのルート
├── docs/                            ← 仕様書群
│   ├── 01_PROJECT_OVERVIEW.md
│   ├── 02_TECHNICAL_SPEC.md        ← 本ドキュメント
│   ├── 03_DESIGN_SYSTEM.md
│   ├── 04_IMPLEMENTATION_ROADMAP.md
│   └── 05_CLAUDE_CODE_KICKOFF_PROMPT.md
│
├── public/                          ← 静的ファイル(画像・動画・llms.txt 等)
│   ├── videos/
│   │   ├── hero-corporate.mp4      ← コーポレート用墨絵動画
│   │   ├── hero-flag.mp4           ← bizFlag 用深紅動画
│   │   ├── hero-ship.mp4           ← bizShip 用蛍光青動画
│   │   └── hero-lab.mp4            ← bizLab 用蛍光緑動画
│   ├── images/
│   │   ├── logo/                   ← ロゴ各種
│   │   ├── members/                ← メンバー写真
│   │   ├── og/                     ← OGP 画像
│   │   └── insights/               ← 記事用画像(自動配置)
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   ├── llms.txt                    ← AI クローラー向け説明書
│   └── sitemap.xml                 ← 自動生成
│
├── src/                             ← ソースコード
│   ├── pages/                      ← ページ(URL = ファイル名)
│   │   ├── index.astro             ← トップ /
│   │   ├── about.astro             ← /about/
│   │   ├── contact.astro           ← /contact/
│   │   ├── flag/
│   │   │   └── index.astro         ← /flag/ (bizFlag LP)
│   │   ├── ship/
│   │   │   └── index.astro         ← /ship/ (bizShip LP)
│   │   ├── lab/
│   │   │   └── index.astro         ← /lab/ (bizLab LP)
│   │   ├── insights/
│   │   │   ├── index.astro         ← /insights/ (記事一覧)
│   │   │   ├── flag/
│   │   │   │   └── [slug].astro    ← /insights/flag/{記事スラッグ}
│   │   │   ├── ship/
│   │   │   │   └── [slug].astro    ← /insights/ship/{記事スラッグ}
│   │   │   └── lab/
│   │   │       └── [slug].astro    ← /insights/lab/{記事スラッグ}
│   │   └── news/
│   │       ├── index.astro         ← /news/ (ニュース一覧)
│   │       └── [slug].astro        ← /news/{ニューススラッグ}
│   │
│   ├── layouts/                    ← ページ共通レイアウト
│   │   ├── BaseLayout.astro        ← 全ページ共通
│   │   ├── ServiceLayout.astro     ← サービス LP 用
│   │   └── ArticleLayout.astro     ← 記事用
│   │
│   ├── components/                 ← 再利用可能コンポーネント
│   │   ├── ui/                     ← 汎用 UI 部品
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Tag.astro
│   │   ├── sections/               ← セクション部品
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Services.astro
│   │   │   ├── Insights.astro
│   │   │   ├── News.astro
│   │   │   ├── Members.astro
│   │   │   ├── Company.astro
│   │   │   └── Contact.astro
│   │   ├── animations/             ← アニメーション部品
│   │   │   ├── ScrollVideo.astro   ← スクロール連動動画
│   │   │   └── FadeIn.astro
│   │   └── shared/                 ← サイト共通
│   │       ├── Header.astro
│   │       ├── Footer.astro
│   │       └── Navigation.astro
│   │
│   ├── content/                    ← Astro Content Collections
│   │   ├── insights/               ← 記事コンテンツ(Markdown)
│   │   │   ├── flag/
│   │   │   │   └── *.md
│   │   │   ├── ship/
│   │   │   │   └── *.md
│   │   │   └── lab/
│   │   │       └── *.md
│   │   ├── news/                   ← ニュースコンテンツ
│   │   │   └── *.md
│   │   └── config.ts               ← Content スキーマ定義
│   │
│   ├── styles/                     ← グローバル CSS
│   │   ├── global.css
│   │   ├── fonts.css
│   │   └── tokens.css              ← デザイントークン(色・余白等)
│   │
│   ├── lib/                        ← ユーティリティ関数
│   │   ├── notion.ts               ← Notion API 連携
│   │   ├── gsap-helpers.ts         ← GSAP ヘルパー
│   │   └── seo.ts                  ← SEO/GEO メタデータ生成
│   │
│   └── env.d.ts                    ← 型定義
│
├── scripts/                        ← ビルド補助スクリプト
│   ├── notion-sync.ts              ← Notion から記事を同期
│   └── image-optimize.ts           ← 画像最適化
│
├── .gitignore
├── .env.example                    ← 環境変数テンプレート
├── astro.config.mjs                ← Astro 設定
├── tailwind.config.mjs             ← Tailwind 設定
├── tsconfig.json                   ← TypeScript 設定
├── package.json                    ← 依存パッケージ
└── README.md                       ← プロジェクト説明
```

### 2.2 ディレクトリの設計思想

- **`pages/`**: ファイルベースルーティング。ファイル名 = URL
- **`components/`**: 再利用するパーツ。`ui` `sections` `animations` `shared` で分類
- **`content/`**: 記事・ニュースの Markdown 置き場。Astro が自動で URL を生成
- **`public/`**: ビルド時にそのままコピーされる静的ファイル
- **`docs/`**: 仕様書群。リポジトリに含めることで設計の経緯が追える

---

## 3. 環境構築手順

### 3.1 必要なソフトウェア

実装を始める前に、以下を Daisuke さんのローカル PC にインストール:

#### Node.js(必須)

- **バージョン**: 20.x 以上(LTS 推奨)
- **インストール方法**:
  - **Mac**: ターミナルで `brew install node`
  - **Windows**: https://nodejs.org からダウンロード
- **確認方法**: `node -v` でバージョン番号が表示されれば成功

#### Git(通常はインストール済み)

- 確認方法: `git --version` でバージョン番号が表示されれば成功

#### Claude Code(必須)

- インストール方法は Anthropic のドキュメントを参照
- 確認方法: `claude` コマンドが使えれば成功

#### コードエディタ(推奨)

- Visual Studio Code を推奨(無料、Astro 拡張あり)
- https://code.visualstudio.com/

### 3.2 プロジェクト初期化フロー

Claude Code を使って、以下のフローで初期化する:

```bash
# 1. ローカルの作業ディレクトリに移動
cd ~/Projects   # 任意の場所

# 2. GitHub からリポジトリをクローン
git clone https://github.com/daisukeyamaoka-bizmote/HP.git
cd HP

# 3. Claude Code を起動して、プロジェクト初期化を依頼
claude
```

Claude Code 起動後、`05_CLAUDE_CODE_KICKOFF_PROMPT.md` のプロンプトを渡す。

### 3.3 環境変数

`.env` ファイル(Git にはコミットしない)で管理する変数:

```env
# Notion API(記事同期用)
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID_INSIGHTS=xxxxx
NOTION_DATABASE_ID_NEWS=xxxxx

# サイト基本情報
PUBLIC_SITE_URL=https://bizmote.jp
PUBLIC_GA_ID=G-XXXXX           # Google Analytics(後で設定)

# Cloudflare(必要に応じて)
CLOUDFLARE_API_TOKEN=xxxxx     # 自動デプロイ用
```

`.env.example` を Git にコミットして、必要な変数を明示する。

---

## 4. ビルドとデプロイフロー

### 4.1 開発フロー

```
[1] Daisuke が記事を Notion で書く
    ↓
[2] Claude Code で「Notion の記事を同期して」と依頼
    ↓
[3] notion-sync スクリプトが起動
    - 記事を Markdown 化
    - 画像をダウンロード・最適化
    - src/content/insights/{flag|ship|lab}/{slug}.md に保存
    ↓
[4] Claude Code でローカル確認
    npm run dev で localhost:4321 起動
    ↓
[5] OK なら git add → commit → push
    ↓
[6] Cloudflare Pages が自動でビルド・デプロイ
    ↓
[7] bizmote.jp に反映(数分以内)
```

### 4.2 npm スクリプト

`package.json` に定義する主要コマンド:

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー起動(ローカル確認用) |
| `npm run build` | 本番ビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run notion-sync` | Notion から記事を同期 |
| `npm run optimize-images` | 画像を WebP/AVIF に変換 |
| `npm run lighthouse` | パフォーマンス測定 |

### 4.3 Cloudflare Pages 設定

Cloudflare Pages のプロジェクト設定:

| 項目 | 設定値 |
|---|---|
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | `20.x` |
| **Environment variables** | `.env` の内容を反映 |

`main` ブランチに push されると、自動でビルド・デプロイされる。

### 4.4 ドメイン切り替え手順(リリース時)

```
[Step 1] Cloudflare Pages にプロジェクトを作成
         → bizmote.pages.dev で稼働確認

[Step 2] Cloudflare の「サイト追加」で bizmote.jp を登録
         → Cloudflare 側でネームサーバー(例: ns1.cloudflare.com)が発行される

[Step 3] お名前.com の管理画面で、ネームサーバーを変更
         → Cloudflare のネームサーバーに切り替え

[Step 4] DNS 切り替え完了(数時間〜24 時間)
         → bizmote.jp が新サイトを表示

[Step 5] Cloudflare Pages のカスタムドメイン設定
         → bizmote.jp を追加
         → 自動で SSL 証明書が発行される

[Step 6] 旧 WordPress サーバーは新サイト稼働確認後 1-2 週間維持
         → 問題なければ解約
```

---

## 5. Notion 連携の仕組み

### 5.1 概要

Daisuke さんが Notion で記事を書き、ボタン一つでサイトに反映される仕組みを構築する。

### 5.2 Notion 側のセットアップ

Notion 内に以下のデータベースを作成する:

#### 記事データベース(Insights 用)

| プロパティ名 | タイプ | 用途 |
|---|---|---|
| Title | Title | 記事タイトル |
| Slug | Text | URL 用スラッグ(例: is-launch-checklist) |
| Category | Select | flag / ship / lab |
| Status | Status | Draft / Review / Published |
| Published Date | Date | 公開日 |
| Updated Date | Date | 更新日(GEO 重要) |
| Author | Person | 著者 |
| Excerpt | Text | 記事概要(160 字以内) |
| Cover Image | Files | カバー画像 |
| Tags | Multi-select | タグ |

#### ニュースデータベース(News 用)

| プロパティ名 | タイプ | 用途 |
|---|---|---|
| Title | Title | ニュースタイトル |
| Slug | Text | URL 用スラッグ |
| Type | Select | release / media / event / partnership |
| Status | Status | Draft / Published |
| Published Date | Date | 公開日 |
| Excerpt | Text | 概要 |

### 5.3 同期スクリプトの動作

`scripts/notion-sync.ts` は以下を自動実行:

```
[1] Notion API で「Status = Published」の記事を取得
    ↓
[2] 各記事について:
    a. Notion ブロック構造を Markdown に変換
    b. 含まれる画像をダウンロード
    c. 画像を WebP/AVIF に変換し /public/images/insights/{slug}/ に保存
    d. Markdown 内の画像参照を新しいパスに置換
    e. メタデータ(frontmatter)を生成
    f. src/content/insights/{category}/{slug}.md として保存
    ↓
[3] 削除された記事(Notion で Status を変えた等)に対応
    ↓
[4] 完了レポート表示
```

### 5.4 Markdown ファイル例

同期後の Markdown ファイルの構造:

```markdown
---
title: "BtoB SaaS のインサイドセールス立ち上げ完全チェックリスト"
slug: is-launch-checklist
category: flag
publishedDate: 2026-05-04
updatedDate: 2026-05-04
author: 山岡 大介
excerpt: "BtoB SaaS 企業がインサイドセールス組織を立ち上げる際の30項目のチェックリスト。bizmote が3年で12社のIS立ち上げを支援した経験から抽出。"
coverImage: /images/insights/is-launch-checklist/cover.webp
tags: ["インサイドセールス", "BtoB SaaS", "GTM"]
---

(記事本文)
```

### 5.5 画像の取り扱い

- **Notion からダウンロード**: 自動
- **形式変換**: PNG/JPG → WebP(高速) + AVIF(より高速)
- **サイズ最適化**: 自動で複数サイズ生成(レスポンシブ用)
- **alt 属性**: Notion でキャプション設定したテキストを使用
- **遅延読み込み**: Astro の `<Image>` コンポーネントで自動

---

## 6. パフォーマンス目標

### 6.1 Lighthouse スコア目標

ローンチ時に達成すべき Lighthouse スコア:

| 項目 | 目標 | 必達 |
|---|---|---|
| **Performance** | 95+ | 90+ |
| **Accessibility** | 95+ | 90+ |
| **Best Practices** | 100 | 95+ |
| **SEO** | 100 | 95+ |

### 6.2 Core Web Vitals 目標

| 指標 | 目標 |
|---|---|
| **LCP**(最大コンテンツ描画時間) | 2.5 秒以内 |
| **FID/INP**(操作応答時間) | 200ms 以内 |
| **CLS**(レイアウトシフト) | 0.1 以下 |

### 6.3 ページサイズ目標

| ページ種別 | 目標サイズ |
|---|---|
| トップページ(動画含む) | 5MB 以内 |
| 記事ページ(画像含む) | 2MB 以内 |
| ニュースページ | 1MB 以内 |

### 6.4 動画のパフォーマンス対策

ヒーロー動画は容量が大きくなりがちなので、以下を徹底:

- **複数フォーマット用意**: MP4(H.264)+ WebM(VP9)
- **複数解像度用意**: モバイル用(720p)+ デスクトップ用(1080p)
- **遅延ロード**: ヒーロー外の動画はスクロールで初めて読み込む
- **モバイルでは静止画フォールバック**: 動画 OFF オプション提供
- **prefers-reduced-motion 対応**: アクセシビリティ配慮

---

## 7. SEO/GEO 技術要件

### 7.1 全ページ共通の SEO 実装

#### メタタグ

```html
<title>{ページ固有タイトル} | bizmote</title>
<meta name="description" content="{160字以内の説明}">
<meta name="keywords" content="(慎重に。AI時代では効果薄)">
<link rel="canonical" href="https://bizmote.jp/{path}">
```

#### Open Graph

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://bizmote.jp/{path}">
<meta property="og:title" content="{タイトル}">
<meta property="og:description" content="{説明}">
<meta property="og:image" content="https://bizmote.jp/images/og/{固有 OG 画像}">
<meta property="og:site_name" content="bizmote">
<meta property="og:locale" content="ja_JP">
```

#### Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@bizmoteinc">
```

### 7.2 GEO(Generative Engine Optimization)実装

#### llms.txt の設置

`/public/llms.txt` を作成し、AI クローラーに対してサイト構造と主要コンテンツを案内する:

```
# bizmote 株式会社

bizmote は、BtoB 事業の GTM(市場開拓)パートナーです。
事業の設計・実行・移管までを一貫して支援する、GTM コンサルティングファームです。

## 主要なコンテンツ

### サービス
- /flag/ - bizFlag(GTM 戦略の設計・実行・移管)
- /ship/ - bizShip(実践的起業家輩出コミュニティ)
- /lab/ - bizLab(AI を起点にした新規事業創出)

### 思想・哲学
- 次の "常識" をつくる(Philosophy)
- 挑戦者と共に、挑戦者であり続ける(Mission)

### 主要な記事
(自動生成)
```

#### JSON-LD 構造化データ

各ページに適切な JSON-LD を埋め込む:

**全ページ共通**:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "bizmote 株式会社",
  "url": "https://bizmote.jp",
  "logo": "https://bizmote.jp/images/logo/bizmote.png",
  "description": "BtoB 事業の GTM(市場開拓)パートナー",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "JP",
    "addressRegion": "東京都",
    "addressLocality": "新宿区",
    "streetAddress": "西新宿 4-8-11 SHINJUKU NEW VILLA 203",
    "postalCode": "160-0023"
  },
  "founder": {
    "@type": "Person",
    "name": "山岡 大介"
  },
  "foundingDate": "2023-05-01"
}
```

**記事ページ追加**:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{記事タイトル}",
  "datePublished": "{公開日}",
  "dateModified": "{更新日}",
  "author": {
    "@type": "Person",
    "name": "{著者名}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "bizmote",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bizmote.jp/images/logo/bizmote.png"
    }
  }
}
```

#### コンテンツ構造ルール(GEO 最適化)

すべての記事で以下を徹底する:

- **Definition Lead**: 記事冒頭 150-200 字で「[エンティティ] は [カテゴリ] であり [差別化要素] である」の構造で核心を書く
- **Answer-First Structure**: 各セクション冒頭で結論を 1-2 文で書く
- **Statistics & Citations**: 数字とソースを必ず含める
- **FAQ セクション**: 記事末尾に「よくある質問」を設置
- **更新日表示**: 「最終更新日」を明示
- **バージョン管理**: v1.0, v1.1 のような版管理(任意)

### 7.3 AI クローラー許可設定

`/public/robots.txt`:

```
User-agent: *
Allow: /

# AI クローラー明示許可
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://bizmote.jp/sitemap.xml
```

### 7.4 サイトマップ自動生成

Astro の `@astrojs/sitemap` 統合を使用し、ビルド時に自動生成する。

---

## 8. 動画とアニメーション仕様

### 8.1 ヒーロー動画の仕様

各ブランドのヒーロー動画(Runway ML で生成):

| 項目 | 仕様 |
|---|---|
| 長さ | 15 秒 |
| ループ | 必須(シームレス) |
| 解像度 | 1920×1080(デスクトップ用)+ 720×1280(モバイル用) |
| フォーマット | MP4(H.264)+ WebM(VP9) |
| 容量 | 2-5MB 目標(各バージョン) |

### 8.2 スクロール連動アニメーション

実装方針:

- **GSAP + ScrollTrigger** でスクロール位置を取得
- **Lenis** で滑らかなスクロール体験
- **セクションごとに動画切り替え**: スクロール位置で別動画にフェード
- **Reduced Motion 対応**: ユーザーが OS で「動きを減らす」設定の場合は静止画のみ

### 8.3 Phase 別実装スコープ

| Phase | 実装内容 |
|---|---|
| **Phase 1**(ローンチ時) | ヒーロー動画ループ + セクション切替フェード |
| **Phase 2**(改善) | ヒーローのスクロールスクラビング(動画再生位置がスクロール連動) |
| **Phase 3**(将来) | Three.js でリアルタイム生成アニメーション |

---

## 9. アクセシビリティ要件

### 9.1 必須対応項目

- **キーボード操作**: 全機能をキーボードで操作可能に
- **スクリーンリーダー**: 適切な ARIA 属性、見出し構造
- **コントラスト比**: WCAG AA 基準(4.5:1 以上)
- **モーション設定**: prefers-reduced-motion 対応
- **alt 属性**: 全画像に意味のある alt
- **フォーカス可視化**: focus-visible で明確に
- **ヘディング構造**: 論理的な h1-h6 階層

### 9.2 言語属性

```html
<html lang="ja">
```

将来の英語版追加時は `<html lang="en">` の英語版ページを別途用意。

---

## 10. セキュリティ要件

### 10.1 HTTPS 強制

Cloudflare Pages で自動。HTTP → HTTPS リダイレクト。

### 10.2 セキュリティヘッダー

`_headers` ファイル(Cloudflare Pages)で設定:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 10.3 環境変数管理

- API キー等は **絶対に Git にコミットしない**
- `.env` を `.gitignore` に必ず含める
- Cloudflare Pages の管理画面で環境変数を設定

### 10.4 フォーム対策

お問い合わせフォームには以下を実装:

- **Cloudflare Turnstile**(reCAPTCHA 代替、無料、プライバシー配慮)
- **レート制限**(同 IP からの大量送信防止)
- **入力バリデーション**(クライアント+サーバー両方)

---

## 11. アナリティクス・モニタリング

### 11.1 アクセス解析

- **Google Analytics 4**(無料)
- **Cloudflare Web Analytics**(無料、プライバシー配慮)
- 両方を併用する想定

### 11.2 GEO モニタリング(将来)

AI 検索での引用率を測定するツールの導入を検討:

- Superlines, GenOptima などの GEO 監視ツール
- 月額 1-3 万円程度
- ローンチ後 3 ヶ月時点で導入判断

---

## 12. メンテナンスと運用

### 12.1 定期的なタスク

- **コンテンツ更新**: 記事を月 10-15 本ペースで追加
- **既存記事のリフレッシュ**: 3-6 ヶ月ごとに更新日を更新
- **依存パッケージ更新**: 月 1 回程度、Claude Code に依頼
- **パフォーマンス測定**: 月 1 回、Lighthouse で確認

### 12.2 バックアップ

- **コード**: GitHub に常時バックアップ
- **記事**: Notion が原本。Markdown もリポジトリに残る
- **画像**: リポジトリと Cloudflare キャッシュに保存

### 12.3 障害対応

- Cloudflare Pages はほぼ落ちないが、万一の場合:
  - Cloudflare ステータスページを確認
  - 必要なら緊急用に旧 WordPress サイトのスナップショットを保管(ローンチ後数ヶ月)

---

## 13. 拡張計画

### 13.1 ローンチ後の機能追加候補

優先度順に並べる:

1. **記事への目次自動生成**(GEO 効果あり)
2. **関連記事レコメンド**
3. **タグ別記事一覧ページ**
4. **検索機能**(Pagefind 等の静的検索)
5. **Three.js でのリアルタイムアニメーション**
6. **英語版ページ**
7. **メールニュースレター登録**(Substack や Buttondown 連携)
8. **bizShip 申込フォーム高度化**

### 13.2 やらないこと

明示的にこのプロジェクトでは扱わない:

- **コメント機能**(スパムリスクと運用コスト)
- **ユーザー登録・ログイン機能**(コーポレートサイトには不要)
- **EC 機能**(将来別ドメインで検討)
- **動的な API 機能**(必要なら Cloudflare Workers で別途)

---

## 14. 関連ドキュメント

- `01_PROJECT_OVERVIEW.md` — プロジェクトの戦略・ブランド基盤
- `03_DESIGN_SYSTEM.md` — デザインシステム(色・フォント・コンポーネント)
- `04_IMPLEMENTATION_ROADMAP.md` — Phase 別実装ガイド
- `05_CLAUDE_CODE_KICKOFF_PROMPT.md` — Claude Code 起動時のプロンプト

---

> Document version: 1.0
> Created: 2026-05-04
> Author: Daisuke Yamaoka × Claude
> Status: Draft (確定後 Final 化)
