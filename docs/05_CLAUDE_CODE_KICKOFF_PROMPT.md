# bizmote コーポレートサイト 05: Claude Code 起動プロンプト

> 本ドキュメントは、Daisuke さんが Claude Code を起動した時に、そのまま貼り付けて使う「起動プロンプト」を提供する。本ドキュメントの「6. 起動プロンプト本文」セクションをコピーして Claude Code に渡す。

---

## 1. このドキュメントの使い方

### 1.1 全体の流れ

```
[1] ローカル PC で HP リポジトリのフォルダに入る
    cd ~/Projects/HP

[2] Claude Code を起動
    claude

[3] 本ドキュメントの「6. 起動プロンプト本文」をコピー

[4] Claude Code のチャット欄にペースト → 送信

[5] Claude Code が Phase 0 を自動実行
    - Astro プロジェクトの初期化
    - 各種ライブラリのインストール
    - ディレクトリ構造の作成
    - 初期ファイルの生成

[6] 完了したら npm run dev で動作確認

[7] git commit & push
```

### 1.2 前提条件

このプロンプトを使う前に、以下が完了していること:

- [ ] Node.js 20.x 以上がインストール済み
- [ ] Git がインストール済み
- [ ] Claude Code がインストール済み
- [ ] HP リポジトリがローカルにクローン済み
- [ ] 仕様書 01-04 が `HP/docs/` に配置済み
- [ ] HP フォルダの中で Claude Code を起動している

---

## 2. プロンプトの設計思想

このプロンプトは、Claude Code が **3つの原則** に従って動くように設計されている:

### 原則 1: 仕様書ファーストで動く

Claude Code は、技術判断・デザイン判断で迷ったら、必ず `docs/` 配下の仕様書を参照する。自己判断で勝手な選択をしない。

### 原則 2: 段階的に進める

一度に全部実装しようとしない。Phase 0 → 確認 → Phase 1 → 確認、と段階的に。

### 原則 3: Daisuke の確認を取る

大きな決定が必要な場面では、Daisuke に確認を取る。仕様書に書いていないことは「仕様書に書いていないので、判断してください」と聞く。

---

## 3. 補助プロンプト集

メインの起動プロンプト(Section 6)以外に、用途別の補助プロンプトを用意している。

### 3.1 Phase 1 開始プロンプト

Phase 0 完了後、Phase 1(ヒーロー実装)を始める時に使う:

```
Phase 1 を開始します。
docs/04_IMPLEMENTATION_ROADMAP.md の Section 3「Phase 1: コーポレートトップ・ヒーロー」
の内容に従って、ヒーローセクションを実装してください。

事前準備として、以下のファイルを配置済みです:
- public/videos/hero-corporate.mp4(15 秒墨絵動画)

実装する際は、docs/03_DESIGN_SYSTEM.md のフォント・カラー・タイポグラフィ仕様に
厳密に従ってください。

完了したら、ローカルで npm run dev を起動して
http://localhost:4321 で確認できる状態にしてください。
```

### 3.2 デザイン判断確認プロンプト

実装中、何かのデザイン判断で迷った時:

```
今、○○ について実装判断が必要です。
docs/03_DESIGN_SYSTEM.md を参照して、bizmote のデザイン哲学に沿った
正しい実装方法を提案してください。

複数の選択肢がある場合は、それぞれのメリット・デメリットを
比較して、推奨案を示してください。
```

### 3.3 セクション実装プロンプト

特定のセクションを実装する時:

```
○○ セクションを実装してください。
仕様は以下に従ってください:
- 全体構成: docs/04_IMPLEMENTATION_ROADMAP.md の該当 Phase
- デザイン: docs/03_DESIGN_SYSTEM.md のコンポーネント設計とアニメーション仕様
- 技術: docs/02_TECHNICAL_SPEC.md のディレクトリ構造とコンポーネント設計

実装後は、以下を確認してください:
- ローカルでの表示が正常か(npm run dev)
- レスポンシブ対応が効いているか
- アクセシビリティ要件を満たしているか
```

### 3.4 エラー解決プロンプト

エラーが出た時:

```
以下のエラーが発生しています:

[エラーメッセージをここに貼り付け]

このエラーを解決してください。
解決策が複数ある場合、bizmote の技術スタック
(docs/02_TECHNICAL_SPEC.md に記載)に最も適した方法を選んでください。
```

### 3.5 Notion 連携セットアップ用プロンプト

Phase 6 で Notion 連携を実装する時:

```
Phase 6 の Notion 連携機能を実装します。

事前準備として、Notion で以下を作成済みです:
- Insights データベース(docs/02_TECHNICAL_SPEC.md Section 5.2 の構造)
- News データベース(同上)
- Notion Integration を作成し、API キーを取得済み
- 各データベースに Integration を招待済み

以下を実装してください:
1. .env ファイルに NOTION_API_KEY、NOTION_DATABASE_ID_INSIGHTS、
   NOTION_DATABASE_ID_NEWS の変数を準備
2. scripts/notion-sync.ts で同期スクリプトを実装
3. Notion ブロック → Markdown 変換ロジック
4. 画像のダウンロード・WebP 変換ロジック
5. npm run notion-sync コマンドで同期できるように

セキュリティ面で、API キーは絶対に Git にコミットしないようにしてください。
```

### 3.6 デプロイ用プロンプト

Phase 9 でリリースする時:

```
Phase 9: リリースを進めます。
docs/04_IMPLEMENTATION_ROADMAP.md の Section 11 を参照してください。

以下の手順をガイドしてください:

1. Cloudflare Pages のプロジェクト作成手順
2. GitHub リポジトリとの連携設定
3. Build 設定(Build command、Output directory、Node version)
4. 環境変数の設定方法
5. カスタムドメインの追加手順
6. お名前.com でのネームサーバー変更手順

特にネームサーバー変更は不可逆な操作なので、
事前確認が必要な点を明確にしてください。
```

---

## 4. やってはいけないこと(Claude Code への注意)

Claude Code に伝えるべき「やってはいけない」事項。プロンプトに含めるか、別途指示する。

### 4.1 技術的にやってはいけない

- WordPress などの既存 CMS の流用検討(完全新規構築)
- React フレームワーク(Next.js / Remix 等)への切り替え提案(Astro 確定)
- jQuery などのレガシーライブラリの導入
- 不必要に重い JavaScript ライブラリの追加(動画ライブラリ等)
- 環境変数を Git にコミット
- console.log のまま本番デプロイ

### 4.2 デザイン的にやってはいけない

- `docs/03_DESIGN_SYSTEM.md` の「やらないことリスト」に違反する実装
- 紫グラデーション、ガラスモーフィズム
- ストック写真の使用
- 絵文字の使用
- 4 色以上の同時使用
- 細いウェイトを無視して太字を多用

### 4.3 構造的にやってはいけない

- ディレクトリ構造を勝手に変える(`02_TECHNICAL_SPEC.md` Section 2.1 で確定)
- URL 構造を勝手に変える(`02_TECHNICAL_SPEC.md` Section 2.1 で確定)
- 仕様書に書かれていないページを勝手に作る

---

## 5. プロジェクト関連の固有情報

Claude Code が知っておくべき bizmote 固有の情報をまとめる。

### 5.1 会社情報

- **会社名**: bizmote 株式会社
- **設立**: 2023 年 5 月 1 日
- **代表**: 山岡 大介(やまおか だいすけ / Daisuke Yamaoka)
- **所在地**: 〒160-0023 東京都新宿区西新宿 4-8-11 SHINJUKU NEW VILLA 203
- **事業**: BtoB 事業の GTM(市場開拓)パートナー

### 5.2 経営チーム

- **山岡 大介**: 代表取締役(CEO)
- **須藤 隼**: CHRO、bizShip 運営責任者
- **奥居 大輝**: CRO、bizFlag 運営責任者
- **渡辺 恭平**: 執行役員、bizLab 運営責任者
- **岩田 恭行**: 顧問

### 5.3 3 事業ブランド

- **bizFlag**: BtoB スタートアップ向け GTM コンサル(深紅 #8B1E1E)
- **bizShip**: 実践的起業家輩出コミュニティ(蛍光青 #00C8FF)
- **bizLab**: AI 起点の新規事業創出(蛍光緑 #00FF7F)

### 5.4 ブランド表現の固有ルール

- 「GTM アーキテクチャファーム」より「BtoB 事業の GTM パートナー」を優先使用
- 「副業」という単語は使わない(業務委託案件と表記)
- 「bizCrew」という単語は表に出さない
- 絵文字を使わない
- カタカナビジネス用語の濫用を避ける

### 5.5 Tagline / Headline 一覧

- **bizmote**: 次の "常識" をつくる。
- **bizFlag**: 描いて、走って、渡す。 / Design. Drive. Transfer.
- **bizShip**: たどりつく、みんなで。 / AI 時代に "人間力" で生きる。
- **bizLab**: 次の常識を、AI でつくる。

### 5.6 MVV

- **Philosophy**: 次の "常識" をつくる
- **Mission**: 挑戦者と共に、挑戦者であり続ける
- **Vision**: 世界から "模倣される" 国へ

### 5.7 6 Values

1. ファーストペンギンでいよう
2. 仮説なき行動はバグだ
3. 失敗を賞賛し最速で修正せよ
4. 期待値を超えろ
5. 個を尖らせチームで勝て
6. ギブ・アンド・ギブ

---

## 6. 起動プロンプト本文

**↓↓↓ 以下を Claude Code にそのまま貼り付ける ↓↓↓**

---

```
これから、bizmote 株式会社のコーポレートサイトを構築します。
あなた(Claude Code)は、Daisuke 山岡(CEO)とペアで実装を進めるエンジニアです。

# プロジェクト情報

- 会社名: bizmote 株式会社
- サイト URL: https://bizmote.jp
- リポジトリ: https://github.com/daisukeyamaoka-bizmote/HP
- 設計思想: 「次の常識をつくる」を体現する、静謐で文芸的なコーポレートサイト

# 重要: 仕様書を最初に読んでください

このリポジトリの docs/ フォルダに、5 つの仕様書が配置されています。
作業を始める前に、必ず以下の 4 つを順に読んでください:

1. docs/01_PROJECT_OVERVIEW.md - プロジェクト全体像・ブランド哲学
2. docs/02_TECHNICAL_SPEC.md - 技術スタック・ディレクトリ構造
3. docs/03_DESIGN_SYSTEM.md - デザインシステム
4. docs/04_IMPLEMENTATION_ROADMAP.md - 実装ロードマップ

これらは、bizmote のすべての設計判断の基準です。
実装中に判断に迷ったら、必ず仕様書を参照してください。
仕様書に矛盾する判断を、自己判断で行わないでください。

# 今回の作業: Phase 0 (プロジェクト初期化)

docs/04_IMPLEMENTATION_ROADMAP.md の Section 2 に従って、
Phase 0(プロジェクト初期化)を実行してください。

具体的には以下を行ってください:

## ステップ 1: 既存ファイルの確認

現在のリポジトリ内容を確認してください。
docs/ フォルダ以外に何もないはずです。

## ステップ 2: Astro プロジェクトの初期化

Astro 5.x を使ってプロジェクトを初期化してください。
TypeScript 設定ありで。

## ステップ 3: 必要なライブラリのインストール

以下のライブラリをインストールしてください:

- Tailwind CSS 4.x (Astro 統合経由)
- @astrojs/sitemap
- @astrojs/mdx
- gsap 3.x
- lenis 1.x
- sharp(画像最適化用)

## ステップ 4: ディレクトリ構造の作成

docs/02_TECHNICAL_SPEC.md の Section 2.1 に定義された
完全なディレクトリ構造を作成してください。

特に以下のフォルダを作成:
- src/pages/ (各ページ)
- src/layouts/ (共通レイアウト)
- src/components/ui/, sections/, animations/, shared/
- src/content/insights/{flag,ship,lab}/, news/
- src/styles/
- src/lib/
- public/videos/, images/, og/
- scripts/

## ステップ 5: 設定ファイルの作成

以下を作成してください:

### astro.config.mjs
- Tailwind 統合
- sitemap 統合
- output: 'static'
- site: 'https://bizmote.jp'
- 日本語ロケール設定

### tailwind.config.mjs
- docs/03_DESIGN_SYSTEM.md の Section 12 にあるデザイントークンを反映
  - カラー(墨、生成、各サブブランドカラー)
  - フォント(Shippori Mincho、Noto Serif JP、Cormorant Garamond、JetBrains Mono)
  - スペーシング(8pt グリッド)

### tsconfig.json
- Astro 推奨設定
- パスエイリアス: @/* → src/*

### .gitignore
- node_modules/
- dist/
- .env
- .DS_Store

### .env.example
- NOTION_API_KEY=
- NOTION_DATABASE_ID_INSIGHTS=
- NOTION_DATABASE_ID_NEWS=
- PUBLIC_SITE_URL=https://bizmote.jp

### README.md
- プロジェクト概要
- セットアップ手順(npm install, npm run dev など)
- 仕様書への参照リンク

## ステップ 6: グローバル CSS の作成

docs/03_DESIGN_SYSTEM.md に従って、以下のファイルを作成:

### src/styles/tokens.css
- カラートークン(CSS 変数)
- タイポグラフィトークン
- スペーシングトークン
- イージングトークン

### src/styles/fonts.css
- Google Fonts のインポート
  - Shippori Mincho (200, 400, 500, 700)
  - Noto Serif JP (400, 500, 700)
  - Cormorant Garamond (300, 400, 500, 700)
  - JetBrains Mono (300, 400, 500)

### src/styles/global.css
- リセット CSS
- 基本タイポグラフィ
- prefers-reduced-motion 対応

## ステップ 7: 共通レイアウトの作成

### src/layouts/BaseLayout.astro
- HTML 基本構造(lang="ja")
- メタタグ(title, description, OG, Twitter Card)
- フォント読み込み
- グローバル CSS 読み込み
- JSON-LD(Organization schema、bizmote の会社情報)
- Header / Footer の配置

## ステップ 8: 最小限のトップページ作成

### src/pages/index.astro
- BaseLayout を使用
- 仮のヒーロー: "bizmote" と中央に表示するだけ
- 仕様書を反映した最小実装(動画はまだ追加しない)
- フォントが正しく読み込まれているか確認できる程度

## ステップ 9: 動作確認

npm run dev でローカルサーバーを起動できる状態にしてください。
http://localhost:4321 で「bizmote」が正しいフォントで表示されることを確認してください。

## ステップ 10: 完了報告

以下を報告してください:

- インストールしたパッケージのリスト
- 作成したファイルのリスト
- 動作確認の結果
- 次のステップ(Phase 1)への準備状況

# 作業ルール

- 仕様書に書かれていないことは、Daisuke に確認を取ってください
- 重要な判断は、選択肢を提示してから実装してください
- エラーが出たら、解決策を提案してください
- 各ステップ完了時に、何を実行したか報告してください

それでは Phase 0 を開始してください。
まず docs/01_PROJECT_OVERVIEW.md から順に読み込んで、
プロジェクトの全体像を把握することから始めてください。
```

---

**↑↑↑ 以上を Claude Code にコピー&ペースト ↑↑↑**

---

## 7. プロンプト実行後の確認事項

Claude Code が Phase 0 を完了したら、以下を確認:

### 7.1 動作確認

ターミナルで:

```bash
npm run dev
```

→ http://localhost:4321 にアクセス
→ 「bizmote」が Shippori Mincho フォントで表示されれば成功

### 7.2 ファイル確認

以下のファイルが存在することを確認:

- [ ] package.json
- [ ] astro.config.mjs
- [ ] tailwind.config.mjs
- [ ] tsconfig.json
- [ ] .gitignore
- [ ] .env.example
- [ ] README.md
- [ ] src/pages/index.astro
- [ ] src/layouts/BaseLayout.astro
- [ ] src/styles/global.css
- [ ] src/styles/tokens.css
- [ ] src/styles/fonts.css

### 7.3 ディレクトリ確認

`docs/02_TECHNICAL_SPEC.md` の Section 2.1 にある構造が完全に作成されているか。

### 7.4 git commit

```bash
git add .
git commit -m "Phase 0: プロジェクト初期化完了"
git push origin main
```

---

## 8. Phase 1 への移行

Phase 0 が完了したら、`3.1 Phase 1 開始プロンプト` を Claude Code に渡して Phase 1 に進む。

ただし、Phase 1 を始める前に **以下のアセットを準備** してから:

- [ ] ヒーロー動画(墨絵フロー、15 秒ループ MP4)を `public/videos/hero-corporate.mp4` に配置
- [ ] bizmote ロゴ(PNG)を `public/images/logo/` に配置

これらが揃ったら、Phase 1 開始プロンプトで Claude Code に渡す。

---

## 9. トラブルシューティング

### 9.1 よくある問題と対処

| 問題 | 対処法 |
|---|---|
| Claude Code が仕様書を読まずに勝手に実装する | 「まず docs/ の仕様書を全て読んでから判断してください」と再指示 |
| Astro バージョンの問題 | 最新 LTS の Astro 5.x を使うよう明示 |
| Tailwind 4.x の設定エラー | Tailwind 4 は Astro 統合方式が変わっているので、最新ドキュメントを参照 |
| node_modules のサイズ問題 | .gitignore に確実に含める |
| 環境変数が読まれない | Astro では PUBLIC_ プレフィックスが必要なものに注意 |

### 9.2 困った時の質問テンプレ

```
今、○○ で困っています。
具体的なエラー:
[エラーメッセージ貼り付け]

何を試した:
- ○○
- ○○

何を試すべきか、3 つの選択肢を提案してください。
それぞれのメリット・デメリットを比較してください。
```

---

## 10. プロジェクト全体のチェックポイント

各 Phase 完了時に、以下のチェックリストで進捗を確認:

### Phase 0 完了チェック
- [ ] `npm run dev` が起動する
- [ ] http://localhost:4321 でページが表示される
- [ ] フォント(Shippori Mincho)が読み込まれている
- [ ] ディレクトリ構造が docs/02_TECHNICAL_SPEC.md と一致
- [ ] git commit & push 済み

### Phase 1 完了チェック
- [ ] ヒーロー動画がループ再生される
- [ ] 大見出しが Shippori Mincho 200 で表示
- [ ] ナビゲーションが上部に表示
- [ ] スマホで崩れない
- [ ] git commit

### Phase 2 完了チェック
- [ ] スクロールが滑らか(Lenis 効いている)
- [ ] スクロールで背景動画が切り替わる(クロスフェード)
- [ ] 要素が fade-up で出現する
- [ ] git commit

### Phase 3 完了チェック
- [ ] 全 8 セクションが完成
- [ ] スクロール体験が最後まで気持ちよい
- [ ] お問い合わせフォームが送信できる
- [ ] git commit

### Phase 4 完了チェック
- [ ] /ship/ で bizShip LP が表示
- [ ] 蛍光青のアクセントが効いている
- [ ] 申込フォームが機能する
- [ ] git commit

### Phase 5 完了チェック
- [ ] /flag/ と /lab/ が完成
- [ ] 3 LP に統一感がある
- [ ] 各 LP が固有の色・動きで個性的
- [ ] git commit

### Phase 6 完了チェック
- [ ] Notion 連携で記事公開できる
- [ ] /insights/ で記事一覧が見られる
- [ ] /news/ で最新ニュースが見られる
- [ ] git commit

### Phase 7 完了チェック
- [ ] 全ページにメタデータ完備
- [ ] JSON-LD 実装
- [ ] llms.txt 公開
- [ ] sitemap.xml 公開
- [ ] git commit

### Phase 8 完了チェック
- [ ] Lighthouse 全項目 90+
- [ ] 全ブラウザで動作
- [ ] アクセシビリティ問題なし
- [ ] git commit

### Phase 9 完了チェック
- [ ] bizmote.jp が新サイト表示
- [ ] HTTPS 有効
- [ ] アナリティクス取得確認
- [ ] git tag v1.0

---

## 11. 関連ドキュメント

- `01_PROJECT_OVERVIEW.md` - プロジェクト全体像
- `02_TECHNICAL_SPEC.md` - 技術仕様
- `03_DESIGN_SYSTEM.md` - デザインシステム
- `04_IMPLEMENTATION_ROADMAP.md` - 実装ロードマップ
- (本ドキュメント) `05_CLAUDE_CODE_KICKOFF_PROMPT.md` - Claude Code 起動プロンプト

---

> Document version: 1.0
> Created: 2026-05-04
> Author: Daisuke Yamaoka × Claude
> Status: Draft (確定後 Final 化)
