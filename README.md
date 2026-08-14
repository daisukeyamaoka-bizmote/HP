# bizmote オウンドメディア型コーポレートサイト

bizmote株式会社のオウンドメディア型コーポレートサイト。Astro による静的サイトで、記事・お知らせは Content Collections(`content/`)で管理し、[Pages CMS](https://pagescms.org/) からブラウザで編集できます。

## 技術構成

- **フレームワーク**: Astro(静的サイト生成)
- **コンテンツ**: `content/articles/`(記事)・`content/news/`(お知らせ)・`content/authors/`(書き手)の Markdown
- **CMS**: Pages CMS(設定は `.pages.yml`)
- **ホスティング**: Vercel(`main` ブランチへの push で自動デプロイ)
- **AI検索対応(GEO)**: JSON-LD 構造化データ、`/llms.txt`(自動生成)、AIクローラー許可済み `robots.txt`、サイトマップ、RSS

## 開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に本番ビルド
npm run preview  # ビルド結果の確認
```

## ディレクトリ

```
content/            記事・お知らせ・書き手(Pages CMSで編集)
src/pages/          ページ(URL = ファイルパス)
src/layouts/        共通レイアウト(SEO/OGP/JSON-LD)
src/components/     ヘッダー・フッター・記事リスト等
src/data/site.json  サイト設定(社名・住所・「私塾」名称など)
public/             ロゴ・OGP画像・robots.txt 等
.pages.yml          Pages CMS の編集画面定義
docs/運用手順書.md   非エンジニア向け運用マニュアル
```

## ドキュメント

| ファイル | 内容 |
|---|---|
| [docs/HANDOFF.md](docs/HANDOFF.md) | **引き継ぎ資料**。現状・未解決課題・作業の進め方。別セッションで再開するときはここから |
| [docs/DESIGN_SPEC.md](docs/DESIGN_SPEC.md) | デザイン仕様書(デザインの正) |
| [docs/運用手順書.md](docs/運用手順書.md) | 非エンジニア向け運用手順(記事の追加・公開・執筆ガイドライン・ドメイン設定) |
