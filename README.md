# bizmote コーポレートサイト

bizmote 株式会社のコーポレートサイト(`https://bizmote.jp`)のソースコード。

「次の "常識" をつくる」というブランド哲学を体現する、静謐で文芸的なサイトを Astro + Tailwind CSS で構築している。

## 技術スタック

- **フレームワーク**: Astro 5.x(静的サイト生成)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4.x(CSS-first 設定)
- **アニメーション**: GSAP 3.x + ScrollTrigger
- **滑らかスクロール**: Lenis 1.x
- **画像最適化**: Sharp / Astro Image
- **ホスティング**: Cloudflare Pages

詳細は [`docs/02_TECHNICAL_SPEC.md`](./docs/02_TECHNICAL_SPEC.md) を参照。

## セットアップ

### 前提

- Node.js 20.x 以上
- npm 10.x 以上

### 初回セットアップ

```bash
# 依存関係をインストール
npm install

# 環境変数ファイルを作成(値は手動で入れる)
cp .env.example .env
```

### 開発

```bash
# 開発サーバー起動 (http://localhost:4321)
npm run dev

# 本番ビルド
npm run build

# ビルド成果物のローカルプレビュー
npm run preview
```

## ディレクトリ構造

```
src/
├── pages/        ファイルベースルーティング(URL = ファイル名)
├── layouts/      ページ共通レイアウト
├── components/   再利用コンポーネント (ui / sections / animations / shared)
├── content/      Astro Content Collections(記事 Markdown)
├── styles/       グローバル CSS(tokens / fonts / global)
└── lib/          ユーティリティ関数

public/           静的ファイル(動画・画像・llms.txt 等)
docs/             仕様書(全実装判断の基準)
scripts/          Notion 同期等のビルド補助スクリプト
```

## 仕様書

実装判断で迷ったら必ず以下を参照。自己判断で勝手な選択をしない。

- [`docs/01_PROJECT_OVERVIEW.md`](./docs/01_PROJECT_OVERVIEW.md) — プロジェクト全体像・ブランド哲学
- [`docs/02_TECHNICAL_SPEC.md`](./docs/02_TECHNICAL_SPEC.md) — 技術仕様
- [`docs/03_DESIGN_SYSTEM.md`](./docs/03_DESIGN_SYSTEM.md) — デザインシステム
- [`docs/04_IMPLEMENTATION_ROADMAP.md`](./docs/04_IMPLEMENTATION_ROADMAP.md) — 実装ロードマップ
- [`docs/05_CLAUDE_CODE_KICKOFF_PROMPT.md`](./docs/05_CLAUDE_CODE_KICKOFF_PROMPT.md) — Claude Code 起動プロンプト

## デプロイ

`main` ブランチに push されると Cloudflare Pages が自動でビルド・デプロイする。

## ライセンス

Copyright (c) 2026 bizmote inc. All rights reserved.
