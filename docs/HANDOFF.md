# 引き継ぎ資料(別セッション・別担当者向け)

最終更新:2026-08-14 / 対象:bizmote オウンドメディア型コーポレートサイト

このファイルだけで作業を再開できることを目的とした引き継ぎメモ。設計の詳細は `DESIGN_SPEC.md`、運用手順は `運用手順書.md` を参照。

---

## 1. プロジェクト概要

bizmote株式会社のコーポレートサイト兼オウンドメディア。既存WordPressサイトからの全面刷新。

- **リポジトリ**: `daisukeyamaoka-bizmote/HP`
- **作業ブランチ**: `claude/bizmote-owned-media-astro-e1a0k4`(**mainには未マージ**)
- **PR**: https://github.com/daisukeyamaoka-bizmote/HP/pull/3(Draft、オープン中)
- **公開予定ドメイン**: https://bizmote.jp(お名前.comで管理、未切り替え)

### プレビューURL(PRブランチの最新)
- Vercel: https://hp-git-claude-bizmote-o-7c6d1d-daisukeyamaoka-bizmotes-projects.vercel.app

---

## 2. 技術スタック

| 領域 | 採用 |
|---|---|
| フレームワーク | Astro 6(静的サイト生成) |
| 言語 | TypeScript |
| スタイル | 素のCSS(`src/styles/global.css` にCSS変数で集約。Tailwindは使っていない) |
| コンテンツ | Astro Content Collections(`content/` 配下のMarkdown) |
| CMS | Pages CMS(https://app.pagescms.org/ ・設定は `.pages.yml`) |
| デプロイ | **Vercel に一本化**(2026-08-14 決定。`wrangler.jsonc` は削除済み) |
| Node | v22系 |

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に出力
npm run preview
npm run check    # astro check(型チェック)
```

---

## 3. ディレクトリ構成

```
content/                  記事・お知らせ・執筆者(Pages CMSで編集)
  articles/               記事10本(全件 draft: true。サンプルのため非公開)
  news/                   お知らせ4件(全件 draft: true。サンプルのため非公開)
  authors/                執筆・監修者5名
src/
  data/site.json          サイト設定(社名・タグライン・コミュニティ名・カルチャーデックURL等)
  data/categories.ts      カテゴリ定義(現在4つ)
  data/services.ts        サービス定義(bizU / いつでも番頭さん / NANORIBA)
  lib/content.ts          コレクション取得ヘルパー
  lib/format.ts           日付整形・新着判定・読了時間
  content.config.ts       Content Collectionsのスキーマ
  layouts/BaseLayout.astro  SEO・OGP・JSON-LD・共通レイアウト
  components/             Header / Footer / ArticleRow / ArticleCard / ShareButtons / EmptyNote
  pages/                  各ページ(ファイルパス=URL)
  styles/global.css       デザイントークンと全スタイル
public/
  images/RGB_black.png    ヘッダー用ロゴ(正式版)
  images/RGB_white.png    フッター用ロゴ(正式版)
  images/RGB_black_b.png  「b」マーク
  images/RGB_white_b.png  「b」マーク白
  favicon.png / ogp.png   「b」マーク・横ロゴから生成
  uploads/                Pages CMSでアップした画像の保存先
docs/                     仕様書・運用手順書・本ファイル
.pages.yml                Pages CMS の編集画面定義
```

### ページ一覧
`/` `/articles/` `/articles/{slug}/` `/category/{gtm|ax|org|newbiz}/` `/authors/{slug}/` `/about/` `/services/` `/news/` `/news/{slug}/` `/culturedeck/` `/404` `/llms.txt` `/rss.xml` `/sitemap-index.xml`

**現在の生成数は16ページ**。記事・お知らせを全件 `draft: true` にしているため、`/articles/{slug}/` と `/news/{slug}/` が生成されていない。下書きを公開に戻すと記事10本+お知らせ4件で29ページになる。

> `/culturedeck/` は PR #4 で `main` に入ったカルチャーデックLP。**サイト共通レイアウトを使わない独立ページ**(`src/pages/culturedeck/index.astro` 1ファイルで完結。フォント・配色・アニメーションも独自)。`docs/DESIGN_SPEC.md` の規約は適用されない。

---

## 4. デザインの決定事項(要点)

詳細は `docs/DESIGN_SPEC.md`。特に変更されやすい・間違えやすい点のみ抜粋。

- **配色は白地に黒で固定**。ダークモード追従は明示的に廃止済み(`color-scheme: light`)。フッターのみ黒背景 `#141310` で固定
- **ヘッダーは追従型**。下スクロールで `translateY(-102%)` に隠れ、上スクロールで戻る。ページ上端140px以内は常に表示、しきい値6px
- ヘッダーのナビは**カテゴリ4つのみ**(記事一覧・運営元についてのリンクは削除済み)
- **フッターは4カラム**(ロゴ+一文説明 / 記事 / 運営元 / 専門領域)+ 最下部に llms.txt・sitemap.xml
- セクション区切りは罫線のみ。ページ最初は `2px solid`、以降は `1px solid`
- 英語の大文字ラベル(PHILOSOPHY等)は使わず**日本語**。「執筆・監修者」で表記統一
- トップページでは執筆者名と日付を表示しない
- フォント:見出し Shippori Mincho 700 / 本文 Noto Sans JP / 数字 Inter
- ブレークポイントは `max-width: 760px` のみ
- 記事0件のときは一覧に「準備中です」の一文を出す(`components/EmptyNote.astro`)

---

## 5. コンテンツ・用語の現状

### サービス(`src/data/services.ts`)
| 名称 | 内容 | サービスサイトURL |
|---|---|---|
| bizU | エンタープライズ攻略 | https://bizmote.jp/bizu/ |
| いつでも番頭さん | AX支援 | **未提供** |
| NANORIBA | 起業家輩出コミュニティ | **未提供** |

> 過去に一度 bizFlag / bizLab / bizShip という名称で実装したが、ユーザー指示により上記に戻した経緯がある。**bizFlag等は使わない**。

### カテゴリ(`src/data/categories.ts`)
`gtm`(GTM) / `ax`(AX) / `org`(組織) / `newbiz`(新規事業)

> 2026-08-14 に**案A(経営機能で軸を揃える4カテゴリ)を採用**して確定。旧 `startup`(起業・事業づくり)は `newbiz`(新規事業)に改称し、採用・組織の受け皿として `org`(組織)を新設した。3事業との1対1対応を意図的に崩し、メディアとしての器にしている。
>
> カテゴリを増減するときは、`src/data/categories.ts` / `src/content.config.ts` の `z.enum` / `.pages.yml` の select 選択肢の**3か所**を必ず揃えること。

### 執筆・監修者(`content/authors/`)
山岡 大介(CEO) / 奥居 大輝(CRO) / 須藤 隼(CHRO) / 岩田 恭行(顧問) / 渡邉 恭平(AX支援担当、メンバー欄非表示)

- 顔写真は**全員未設定**(グレーの丸が表示される)
- 記事10本・お知らせ4件は**初期構築時のサンプル**。2026-08-14 に**全件 `draft: true`(非公開)**にした。ファイルは残してあるので、実記事が用意できたら差し替える(または下書きを外して公開する)

---

## 6. AI検索対応(GEO)実装済み項目

- 全ページ固有の title / description / canonical
- OGP・Twitterカード(`public/ogp.png`)
- JSON-LD:Organization / WebSite / Article / NewsArticle / Person / BreadcrumbList / FAQPage
- `/llms.txt` を記事データから自動生成(`src/pages/llms.txt.ts`)
- `robots.txt` でAIクローラー(GPTBot / ClaudeBot / PerplexityBot / Google-Extended / CCBot 等)を明示許可
- サイトマップ自動生成、RSS(`/rss.xml`)、更新日の表示と構造化データ反映

記事の書き方ルールは `docs/運用手順書.md` の「3-2. 記事執筆ガイドライン」に記載。Claudeに記事作成を依頼するテンプレートは「3-3」にある。

---

## 7. 未解決の課題・次のアクション

### 課題1:デプロイ先が二重 → **解決済み(2026-08-14)**
**Vercel に一本化**。`wrangler.jsonc` を削除し、`運用手順書.md` 8章もVercel前提に書き直した。

> **残作業(GitHubの外・要手動)**:Cloudflare 側に残っているプロジェクトとGit連携の削除。Cloudflare管理画面 → Workers & Pages → 対象プロジェクト → Settings → Delete。放置しても表示に影響はないが、push のたびに二重にビルドが走り続ける。

### 課題2:カテゴリの括り方 → **解決済み(2026-08-14)**
**案A を採用**。`gtm` / `ax` / `org`(組織) / `newbiz`(新規事業) の4カテゴリに再編した。

- 旧 `startup`(起業・事業づくり)→ `newbiz`(新規事業)に改称。URLは `/category/startup/` → `/category/newbiz/`
- `org`(組織)を新設。CHRO(須藤)の領域である採用・育成・評価・営業組織の受け皿
- サンプル記事の再分類:キーエンスの営業組織 → `org`、起業家は育てられるのか → `newbiz`。他8本は変更なし
- `src/data/services.ts` の NANORIBA の対応カテゴリも `newbiz` / 「新規事業」に追随済み

> **公開前のため旧URLからのリダイレクトは設けていない**。公開後にカテゴリを変えるときはリダイレクト設定が必要になる。

### 課題3:未提供の素材
- ~~カルチャーデックのURL~~ → **解決済み**。`cultureDeckUrl` に `/culturedeck/` を設定し、フッター「運営元」欄と `/llms.txt` にリンクが出るようになった。外部URL(Google Slides等)に差し替える場合は `https://` から始めれば自動で別タブ表示になる
- いつでも番頭さん / NANORIBA のサービスサイトURL
- メンバー5名の顔写真
- 記事のメイン画像(現状すべて未設定)

### 課題4:PR未マージ
PR #3 はDraftのまま。デザイン確認後に Ready for review → Merge が必要。

2026-08-14 時点で `origin/main` を作業ブランチに取り込み済み(`main` との差分は本ブランチの変更のみ)。`main` に新しいコミットが入ったら、マージ前に再度 `git merge origin/main` すること。

---

## 8. 作業の進め方(ワークフロー)

### デザイン変更
```
① Claudeのデザイン機能で編集・確定
      ↓ DESIGN_SPEC.md や .dc.html を書き出す
② そのファイルを Claude Code に渡す
      ↓
③ Astroに反映して push
      ↓
④ プレビュー確認 → マージ
```
デザインの正は `docs/DESIGN_SPEC.md`。実装を変えたらこのファイルも必ず更新すること。

### コンテンツ変更
Pages CMS(https://app.pagescms.org/)でブラウザ完結。
> **注意**: `.pages.yml` はまだ `main` に無いため、Pages CMSでブランチを `claude/bizmote-owned-media-astro-e1a0k4` に切り替えないと編集メニューが出ない。PRをマージすれば解消する。

### Git運用
- 作業ブランチ: `claude/bizmote-owned-media-astro-e1a0k4`
- `git push -u origin claude/bizmote-owned-media-astro-e1a0k4`
- push すると Vercel が自動でプレビューを更新する

---

## 9. 実装済み確認事項(リグレッション防止)

変更を加えたら以下を確認すること。

- [ ] `npm run build` が成功(現在16ページ。下書きを公開に戻すと29ページ)
- [ ] `npm run check` がエラー0
- [ ] OSをダークモードにしても白地のまま(`color-scheme: light` が効いている)
- [ ] ヘッダーが下スクロールで隠れ、上スクロールで戻る
- [ ] `/llms.txt` にサービス名・カテゴリ・全記事が出力される
- [ ] フッターが4カラムで、専門領域が現行サービス名になっている
- [ ] モバイル(390px)でレイアウトが崩れない
- [ ] ヘッダー・フッターのカテゴリが4つ(GTM / AX / 組織 / 新規事業)出ている
- [ ] フッター「運営元」欄にカルチャーデックのリンクがあり `/culturedeck/` に飛ぶ
- [ ] 記事0件でもトップ・記事一覧・カテゴリ・執筆者ページが「準備中」表示で成立している

---

## 10. 関連ドキュメント

| ファイル | 内容 |
|---|---|
| `docs/DESIGN_SPEC.md` | デザイン仕様書(色・タイポ・レイアウト・各ページ構成)**デザインの正** |
| `docs/運用手順書.md` | 非エンジニア向け運用手順(記事追加・執筆ガイドライン・ドメイン設定) |
| `docs/01_PROJECT_OVERVIEW.md` 〜 `05_...md` | 初期構想時の仕様書群(一部は現状と乖離。サービス名やカテゴリは本ファイルが優先) |
| `README.md` | 開発者向けの短い説明 |
