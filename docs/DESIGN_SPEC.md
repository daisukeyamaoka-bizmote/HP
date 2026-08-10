# bizmote メディアサイト デザイン仕様書

最終更新：2026-08-04 / 対象：コーポレートサイト兼オウンドメディア（全8ページ）

このファイルは、実装や別チームへの引き継ぎのために、現在のデザインの決定事項をすべて記述したものである。HTMLを読まずにこの1枚で再現できることを目的とする。

---

## 1. コンセプト

- モノクロの新聞・実務誌のトーン。装飾を足さず、罫線と余白で構造を示す。
- 写真やイラストに依存せず、テキストが主役。画像は記事サムネイルと人物写真のみ。
- グラデーション、影、角丸カード、アクセントカラー、絵文字は使わない。
- 情報の階層は「罫線の太さ」と「文字サイズ」だけで作る。

---

## 2. カラー

CSS変数として `:root` に定義。**白地に黒の1系統に固定**（`color-scheme: light`。OSがダークモードでも配色は変わらない）。
下表のダーク列は参考値として残すが、現在は使用していない。

| 変数 | ライト | ダーク | 用途 |
| --- | --- | --- | --- |
| `--bg` | `#fcfbf9` | `#161510` | 背景 |
| `--ink` | `#1a1a1a` | `#ece9e1` | 見出し、リンク、太い罫線 |
| `--body` | `#2b2823` | `#d8d4c9` | 強調本文 |
| `--body2` | `#4a463f` | `#b9b4a8` | 本文 |
| `--muted` | `#6b675f` | `#a29c8f` | 補助テキスト、ラベル |
| `--faint` | `#8a857b` | `#8a857b` | 日付など最小情報 |
| `--line` | `#d9d5cd` | `#413d33` | 中間の罫線、区切り |
| `--line-soft` | `#e4e0d8` | `#2f2c25` | リスト行の罫線 |
| `--fill` | `#eae7e0` | `#282419` | アバターの下地 |

フッターのみ固定色（ライト/ダーク共通）：背景 `#141310`、文字 `#c9c5bc`、補助 `#8a857b`、罫線 `#33312c`。

ロゴはヘッダーが黒ロゴ `images/RGB_black.png`、フッター（黒背景）が白ロゴ `images/RGB_white.png` で固定。

---

## 3. タイポグラフィ

Google Fonts：`Shippori Mincho`（500/600/700/800）、`Noto Sans JP`（400/500/700）、`Inter`（400/500/600）。

- **見出し・タイトル・人名・ブランド名**：Shippori Mincho 700。`line-height` 1.5〜1.8、`letter-spacing: 0.01em`。
- **本文・UI**：Noto Sans JP 400/500。本文 `line-height` 1.9〜2.1。
- **日付・数字ラベル**：Inter。
- 長い文には必ず `text-wrap: pretty`。本文の1行幅は `max-width: 34〜38em`。

サイズ（px）:

| 用途 | サイズ |
| --- | --- |
| ページ見出し h1 | `clamp(28px, 5vw, 42px)` |
| セクション見出し h2 | 24px（記事内リード級は `clamp(22px, 3.4vw, 28px)`） |
| 記事タイトル（カード） | 19px / 一覧行 16px |
| 小見出し h3、人名 | 17〜21px |
| 本文 | 14〜16px |
| 補助・日付・ラベル | 11〜13px |

小さいラベル（例：「理念」「ミッション」）は 11〜12px、`color: var(--muted)`。**英語の大文字ラベル（PHILOSOPHY など）は使わない。日本語で書く。**

---

## 4. レイアウト

- 外枠：`max-width: 1200px`、左右 `padding: 0 clamp(20px, 4vw, 48px)`。
- 読み物・会社紹介の本文カラム：`max-width: 760px; margin: 0 auto`。
- セクション区切り：上端に罫線を引き `padding-top: 28px`。
  - ページ最初のセクション＝ `border-top: 2px solid var(--ink)`
  - 以降のセクション＝ `border-top: 1px solid var(--ink)`
  - リストの各行＝ `border-bottom: 1px solid var(--line-soft)`
- セクション下余白：48〜56px。ページ末尾は 80px。
- 2カラムの定型：`display: grid; grid-template-columns: 200px 1fr; gap: 24px; align-items: baseline`（ラベル＋説明の行）。会社概要は `160px 1fr`。
- 並びは必ず flex/grid + `gap`。マージンで間隔を作らない。

---

## 5. ヘッダー（全ページ共通）

```
display:flex; justify-content:space-between; align-items:flex-end;
gap:16px 24px; flex-wrap:wrap; padding:30px 0 20px 0;
position:sticky; top:0; z-index:80; background:var(--bg);
border-bottom:2px solid var(--ink);
box-shadow:0 3px 0 0 var(--bg), 0 4px 0 0 var(--ink);
transition:transform 0.32s cubic-bezier(0.22,1,0.36,1);
```

- 左：ロゴ（高さ40px、SP 30px）、トップへのリンク。
- 右：グローバルナビ 14px / `letter-spacing: 0.06em`。カテゴリ3つ（GTM／AX／起業・事業づくり）のみ。
- `box-shadow` の二重指定で「太線＋1px の二重罫線」を表現する（新聞の罫）。
- **追従挙動**：下方向スクロールで `translateY(-102%)` に隠れ、上方向スクロールで戻る。ページ上端から140px以内では常に表示。しきい値は移動量6px。実装は helmet 内の小さな IIFE（`requestAnimationFrame` + `passive` scroll）。

---

## 6. フッター（全ページ共通）

- 背景 `#141310`、`padding: 56px 0 32px`。
- 4カラム `grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px`、下端に `border-bottom: 1px solid #33312c`。
  1. 白ロゴ（26px）＋一文説明「事業と経営の実務メディア。GTMコンサルティングファーム bizmote株式会社が運営しています。」
  2. 記事：記事一覧／カテゴリ3つ
  3. 運営元：運営元について／サービス／お知らせ／カルチャーデック（URL未設定のあいだは非表示）
  4. 専門領域：bizU／いつでも番頭さん／NANORIBA
- 列見出しは 11px `letter-spacing: 0.16em` `#8a857b`。
- 最下部：`© 2026 bizmote Inc.` と llms.txt / sitemap.xml を左右に。11px。

---

## 7. レスポンシブ

ブレークポイントは `max-width: 760px` のみ。ユーティリティクラスで上書きする。

| クラス | SPでの挙動 |
| --- | --- |
| `.bm-two` | 1カラム、`gap: 6px` |
| `.bm-kv` | 1カラム、`gap: 4px` |
| `.bm-g3` | 1カラム、左罫線を下罫線に変更 |
| `.bm-stack` | 1カラム |
| `.bm-foot` | 2カラム |
| `.bm-nav` | 13px、`gap: 10px 18px` |
| `.bm-logo` | 30px |

文字サイズは `clamp()` で連続的に縮小するため、SP専用のフォント指定は最小限。

---

## 8. モーション

- ヘッダーの追従のみが主要な動き。
- トップページはセクション単位のフェードアップ（`bmFadeUp`：`translateY(14px)` → 0、0.8s `cubic-bezier(0.22,1,0.36,1)`、IntersectionObserver、`threshold: 0.08`、一度だけ）。`prefers-reduced-motion: reduce` では無効。
- ホバーはリンクの下線のみ（`text-underline-offset: 4px; text-decoration-thickness: 1px`）。色は変えない。

---

## 9. 画像

- `<image-slot>`（ドラッグ&ドロップで差し替えるプレースホルダ）を使用。
  - 記事ヒーロー `aspect-ratio: 4/3`、カードサムネイル `16/10`。
  - 人物は円形（60〜72px、`border-radius: 50%`、下地 `--fill`、`::part(empty)` を非表示）。
- すべての `<img>` に意味のある alt を入れる。ロゴの alt は「bizmote（ビズモート）」。

---

## 10. ページ構成（8ページ）

| ファイル | 役割 |
| --- | --- |
| `bizmote-top.dc.html` | トップ。ヒーロー記事＋新着3本＋カテゴリ別3セクション |
| `bizmote-articles.dc.html` | 記事一覧 |
| `bizmote-category.dc.html` | カテゴリ別一覧 |
| `bizmote-article.dc.html` | 記事詳細（執筆・監修者を明示） |
| `bizmote-author.dc.html` | 執筆・監修者ページ |
| `bizmote-about.dc.html` | 運営元について（会社紹介） |
| `bizmote-news.dc.html` | お知らせ一覧 |

トップページでは執筆者名と日付を表示しない（タイトルとリードのみ）。日付は記事詳細・一覧・お知らせで表示する。

### 運営元について（現行構成）

1. タグライン「事業の成長を、構想で終わらせない。」＋会社定義1文＋メディアの位置づけ1文
2. 「良いプロダクトだけでは、市場は拓けない。」＋2段落
3. サービス：bizU／いつでも番頭さん／NANORIBA の名前・1行説明・各サービスサイトへのリンクのみ（詳細は語らない）
4. 理念／ミッション・ビジョン（横並び）／バリュー3つ
5. メンバー（各2〜3行の略歴）
6. お知らせ（3件＋一覧へ）
7. 会社概要（社名・設立・代表者・所在地・事業内容）

---

## 11. 言葉のルール（デザイン上の制約）

- セクションラベルは日本語。英語の大文字ラベルは使わない。
- 固有名（bizU、いつでも番頭さん、NANORIBA、GTM、AX）はそのまま英字で表記。
- 執筆者の表記は「執筆・監修者」で統一。
- 会社カテゴリーは「GTMコンサルティングファーム」。「営業代行」「伴走」「ワンストップ」は会社説明に使わない。
- サービスの詳細・価格はこのサイトに載せない。各サービスサイトへ送る。

---

## 12. 実装メモ

- 各ページは単一ファイルで完結し、スタイルはすべてインライン（クラスはレスポンシブ上書きとロゴ切替のみ）。
- 共通CSS変数・`@keyframes`・ヘッダー追従スクリプトは各ページ先頭の `<helmet>` に同じ内容で複製されている。実装時は共通レイアウトへ切り出す。
- SEO：各ページに `<title>`・`meta description`・`<main>`・パンくず。canonical、OGP、JSON-LD、sitemap.xml、RSS、llms.txt はサーバー側生成で対応（`README.md` のチェックリスト参照）。
