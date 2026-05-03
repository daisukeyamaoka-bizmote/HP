# bizmote コーポレートサイト 04: 実装ロードマップ

> 本ドキュメントは、bizmote.jp 全面刷新プロジェクトの実装手順を Phase 別に定義する。Daisuke さんが Claude Code と進める際の作業順序、各 Phase のゴール、検収基準を明確にする。

---

## 1. ロードマップ全体像

### 1.1 全 Phase 概観

| Phase | タイトル | 期間目安 | アウトプット |
|---|---|---|---|
| **Phase 0** | プロジェクト初期化 | 1 日 | プロジェクト雛形が動く状態 |
| **Phase 1** | コーポレートトップ・ヒーロー | 3-5 日 | ヒーロー単独で完成 |
| **Phase 2** | スクロール連動の基盤構築 | 3-5 日 | スクロールで動画が切り替わる |
| **Phase 3** | コーポレートトップ全セクション | 5-7 日 | 8 セクション完成 |
| **Phase 4** | bizShip LP | 5-7 日 | bizShip LP 完成・リリース可能状態 |
| **Phase 5** | bizFlag LP / bizLab LP | 7-10 日 | 全 3 事業 LP 完成 |
| **Phase 6** | コンテンツ層構築 | 5-7 日 | Insights / News / About / Contact 完成 |
| **Phase 7** | GEO/SEO 最適化 | 3-5 日 | スキーマ実装、llms.txt、メタデータ完備 |
| **Phase 8** | テスト・最終調整 | 3-5 日 | パフォーマンス測定、レスポンシブ確認 |
| **Phase 9** | リリース | 1-2 日 | bizmote.jp が新サイトに切替 |
| **Phase 10**(継続) | コンテンツ運用・拡張 | 永続 | 記事・ニュース継続発信 |

### 1.2 想定タイムライン

集中して進めれば、**全体で 6-8 週間** でリリース可能。

| 週 | 進捗 |
|---|---|
| 1 週目 | Phase 0-1 完了 |
| 2-3 週目 | Phase 2-3 完了 |
| 4 週目 | Phase 4 完了(bizShip リリース可能) |
| 5-6 週目 | Phase 5-6 完了 |
| 7 週目 | Phase 7-8 完了 |
| 8 週目 | Phase 9 リリース |

**「bizShip だけ先行リリース」も Phase 4 完了時点で可能**。コーポレート完成を待たずに bizShip コミュニティ募集を開始できる。

### 1.3 進め方の哲学

- **完璧を目指さず、各 Phase ごとに動くものを残す**: 後戻りを避ける
- **動画素材は並行して用意する**: コードを書きながら、別の時間で Runway で動画を生成
- **Phase ごとに git commit する**: 後で戻れる状態を保つ
- **わからないことは Claude Code に聞く**: 一人で悩まない

---

## 2. Phase 0: プロジェクト初期化

### 2.1 ゴール

ローカル PC で `npm run dev` を実行すると、ブラウザに「Hello, bizmote」と表示される、最小限のプロジェクトが立ち上がる状態。

### 2.2 作業内容

#### Step 0.1: 事前準備の確認

以下がインストール済みであること:

- [ ] Node.js 20.x 以上(`node -v` で確認)
- [ ] Git(`git --version` で確認)
- [ ] Claude Code(`claude` コマンドが動く)
- [ ] Visual Studio Code(推奨エディタ)
- [ ] GitHub アカウント(daisukeyamaoka-bizmote)

#### Step 0.2: ローカル環境にリポジトリをクローン

ターミナルで以下を実行:

```bash
# 作業フォルダへ移動(任意の場所)
cd ~/Projects   # 例: ~/Projects というフォルダがあれば

# GitHub から HP リポジトリをクローン
git clone https://github.com/daisukeyamaoka-bizmote/HP.git

# クローンしたフォルダに入る
cd HP
```

#### Step 0.3: Claude Code を起動

```bash
claude
```

#### Step 0.4: Claude Code に Phase 0 を依頼

`05_CLAUDE_CODE_KICKOFF_PROMPT.md` に書いてあるプロンプトを貼り付ける(別ドキュメント参照)。

Claude Code が以下を自動で実行する:

1. `package.json` の作成
2. Astro プロジェクトの初期化
3. Tailwind CSS のセットアップ
4. GSAP / Lenis の導入
5. ディレクトリ構造の作成
6. 最小限の `index.astro` 作成
7. 開発サーバーが起動する状態に

#### Step 0.5: 動作確認

```bash
npm run dev
```

→ ブラウザで http://localhost:4321 を開く
→ 「bizmote」と表示されれば成功

#### Step 0.6: 初回コミット

```bash
git add .
git commit -m "Phase 0: プロジェクト初期化完了"
git push origin main
```

### 2.3 検収基準

- [ ] `npm run dev` でローカルサーバーが起動する
- [ ] http://localhost:4321 にブラウザでアクセスできる
- [ ] Tailwind CSS のクラスが効く(試しに `<h1 class="text-4xl">` で大きく表示される)
- [ ] GitHub に push されている

### 2.4 トラブルシューティング

| 症状 | 対処 |
|---|---|
| `npm run dev` が動かない | Claude Code に「エラーメッセージは○○です。修正して」と伝える |
| Node.js のバージョンが古い | `nvm install 20` で最新 LTS をインストール |
| git push でエラー | GitHub 認証(SSH キー or Personal Access Token)の設定 |

---

## 3. Phase 1: コーポレートトップ・ヒーロー

### 3.1 ゴール

bizmote.jp のヒーローセクション(画面の上部、最初に見える部分)が完成し、墨絵動画がループ再生される状態。

### 3.2 作業内容

#### Step 1.1: ヒーロー動画の準備

すでに Runway ML で生成済みの 15 秒墨絵動画ファイル:

```
1. ファイルを以下に配置:
   public/videos/hero-corporate.mp4

2. WebM 版も用意(必要なら Claude Code に変換依頼):
   public/videos/hero-corporate.webm

3. モバイル用の軽量版も用意:
   public/videos/hero-corporate-mobile.mp4
```

#### Step 1.2: フォントの読み込み設定

Claude Code に以下を依頼:

> Google Fonts から以下を読み込むようにしてください:
> - Shippori Mincho(weight: 200, 400, 500, 700)
> - Noto Serif JP(weight: 400, 500, 700)
> - Cormorant Garamond(weight: 300, 400, 500, 700)
> - JetBrains Mono(weight: 300, 400, 500)
>
> グローバル CSS でフォントの基本設定もしてください。

#### Step 1.3: デザイントークンの実装

`03_DESIGN_SYSTEM.md` の Section 12 にあるデザイントークンを CSS カスタムプロパティとして実装。

Claude Code への指示例:

> `03_DESIGN_SYSTEM.md` の Section 12 のデザイントークンを、`src/styles/tokens.css` として実装してください。
> Tailwind config にも反映してください。

#### Step 1.4: ヘッダー(ナビゲーション)実装

```
ヘッダー要素:
- 高さ: 80px(デスクトップ)、64px(モバイル)
- 左: bizmote ロゴ(墨色 SVG)
- 右: About / Services / Insights / News / Contact のテキストリンク
- フォント: JetBrains Mono、11px、letter-spacing 0.3em、ALL CAPS
- 背景: 透明(ヒーローでは白文字、その他では墨文字)
- スクロールで微妙に固定 or 縮小
```

#### Step 1.5: ヒーロー本体の実装

```
ヒーロー要素:
- 高さ: 100vh(画面いっぱい)
- 背景: 動画(/public/videos/hero-corporate.mp4)
   - autoplay, loop, muted, playsinline
   - WebM フォーマットも source で指定
   - object-fit: cover で画面全体に
   - 透過オーバーレイ(rgba(0,0,0,0.2))で文字を読みやすく

- 中央左寄せのコンテンツ:
   - 上部: 小さなラベル "BIZMOTE — GTM ARCHITECTURE FIRM"
     (JetBrains Mono、11px、letter-spacing 0.3em、白色)
   - メイン見出し: "次の "常識"を / つくる。"
     (Shippori Mincho、120px(デスクトップ)/56px(モバイル)、weight 200、白色)
   - サブヘッディング: "挑戦者と共に、挑戦者であり続ける。 / GTM 戦略の設計から実行、移管まで。"
     (Noto Serif JP、18px、line-height 1.9、灰色 #999999)
```

#### Step 1.6: アクセシビリティ対応

- [ ] `prefers-reduced-motion: reduce` で動画を静止画にフォールバック
- [ ] 動画が再生できないブラウザのフォールバック画像
- [ ] スクリーンリーダー用の見出し構造(h1 が一つ)

#### Step 1.7: レスポンシブ対応

デスクトップ・タブレット・モバイルで適切に表示される。

特にモバイルでは:

- 動画は縦長サイズに(モバイル用動画ファイルに切り替え or object-fit 調整)
- 文字サイズは 56-64px に縮小
- 余白は調整するが、文字の存在感は保つ

### 3.3 検収基準

- [ ] ヒーロー全画面に動画がループ再生される
- [ ] 「次の "常識"を / つくる。」が大きく表示される
- [ ] ナビゲーションが上部に表示される
- [ ] スマホで見ても崩れない
- [ ] Lighthouse Performance スコア 90 以上(モバイル)
- [ ] git に commit されている

### 3.4 想定トラブル

| 症状 | 対処 |
|---|---|
| 動画が iOS Safari で再生されない | `playsinline` 属性を確認、動画コーデックを H.264 に |
| 動画ファイルが重くて表示遅い | Claude Code に「動画を 5MB 以下に圧縮して」と依頼 |
| Shippori Mincho が表示されない | Google Fonts の URL と weight 指定を確認 |

---

## 4. Phase 2: スクロール連動の基盤構築

### 4.1 ゴール

スクロールに応じて、ヒーロー → 次のセクション(About)に背景動画が滑らかに切り替わる状態。

### 4.2 作業内容

#### Step 2.1: GSAP + ScrollTrigger の初期化

Claude Code に以下を依頼:

> GSAP と ScrollTrigger をインストールし、`src/lib/gsap-helpers.ts` で初期化してください。
> Lenis も初期化して、滑らかなスクロールを実現してください。

#### Step 2.2: 背景動画スワップ機構の実装

セクションごとに背景動画が切り替わる仕組み:

```
[実装方針]

1. body 直下に固定の背景動画コンテナを配置
   <div class="fixed inset-0 z-[-1]">
     <video id="bg-video" />
   </div>

2. 各セクションには data-bg-video 属性を付与
   <section data-bg-video="/videos/hero-corporate.mp4">

3. ScrollTrigger でセクションが view に入ったら
   背景動画を data-bg-video の値に切り替え

4. 切り替えはクロスフェード(0.8 秒)
```

#### Step 2.3: フェードイン演出の実装

スクロールで要素が画面に入ったときのフェードイン:

```typescript
// 各要素に data-animate 属性
<div data-animate="fade-up">

// ScrollTrigger で監視
gsap.from('[data-animate="fade-up"]', {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: 'cubic-bezier(0, 0, 0.2, 1)',
  scrollTrigger: {
    trigger: element,
    start: 'top 80%'
  }
});
```

#### Step 2.4: About セクション(仮)の実装

ヒーローの下に About セクションを仮で実装し、スクロール連動の動作確認:

```
About セクション(Phase 2 では仮実装):
- 背景: モノトーンの墨絵動画(別バージョンを用意)
- 中央に「挑戦者と共に、挑戦者であり続ける。」
- スクロールで現れる(fade-up)
```

### 4.3 検収基準

- [ ] スクロールが滑らか(Lenis 効いている)
- [ ] ヒーローから About に切り替わるとき、背景動画が滑らかに変わる
- [ ] 要素がフェードインで現れる
- [ ] スクロールしても文字が見やすい(背景の透過処理が効いている)
- [ ] git commit

---

## 5. Phase 3: コーポレートトップ全セクション

### 5.1 ゴール

bizmote.jp のトップページ全 8 セクションが完成し、訪問者が上から下まで一通り体験できる状態。

### 5.2 セクション一覧と実装

#### Section 1: HERO(完了済み)

Phase 1 で実装。

#### Section 2: ABOUT

```
構成:
- 背景: 墨絵動画(モノトーン、静かな循環)
- 上部: 小ラベル "ABOUT BIZMOTE"
- メイン: "挑戦者と共に、挑戦者であり続ける。"
   (Shippori Mincho、64px、weight 300)
- 下部: 6 Values の表示
   - 各 Value はカード形式
   - 番号(01〜06、JetBrains Mono)
   - タイトル(Shippori Mincho、24px)
   - 説明(Noto Serif JP、14px)
   - スクロールで順次フェードイン
```

#### Section 3: SERVICES(3 事業)

```
構成:
- 背景: スクロールに応じて 3 色の動画が順次表示される
   - スクロール進行 0-33%: bizFlag(深紅)動画
   - スクロール進行 33-66%: bizShip(蛍光青)動画
   - スクロール進行 66-100%: bizLab(蛍光緑)動画
   - 切り替えはクロスフェード

- 上部: 小ラベル "SERVICES — 3 BUSINESSES"
- 各事業のカード(縦に積む or 横並び):
   - bizFlag カード
     * ラベル "01 — BIZFLAG"
     * 大見出し "描いて、走って、渡す。"
     * 説明 "BtoB 事業の GTM を、設計から実行、移管まで。"
     * CTA "詳細を見る →" → /flag/ にリンク
   - bizShip カード(同様)
   - bizLab カード(同様)
```

#### Section 4: INSIGHTS(記事一覧)

```
構成:
- 背景: 墨絵(落ち着いた流れ)
- 上部: 小ラベル "INSIGHTS — 最新の発信"
- メイン見出し: "知見の蓄積"
- 下部: 最新 6 記事を 3 カラムグリッドで表示
   - 各記事カード(`03_DESIGN_SYSTEM.md` の Article Card 仕様)
   - カテゴリラベル(FLAG / SHIP / LAB)
   - タイトル
   - 概要
   - 公開日
- 末尾: "すべての記事を見る →" → /insights/
```

#### Section 5: NEWS

```
構成:
- 背景: 静かな墨絵
- 上部: 小ラベル "NEWS"
- 最新 3-5 件のニュースをリスト形式で
   - 日付(JetBrains Mono)
   - タイトル(Shippori Mincho)
   - リンク
- 末尾: "すべてのニュースを見る →" → /news/
```

#### Section 6: MEMBERS

```
構成:
- 背景: 静寂(微動)
- 上部: 小ラベル "MEMBERS"
- メイン見出し: "経営チーム"
- 3 名の紹介(横並び):
   - 山岡 大介(代表取締役)
     * 顔写真
     * 名前(Shippori Mincho)
     * 役職(Noto Serif JP)
     * 経歴(数行、Noto Serif JP)
   - 須藤 隼(CHRO)
   - 奥居 大輝(CRO)
- 各メンバーには SNS リンク(X, LinkedIn 等)
```

#### Section 7: COMPANY

```
構成:
- 背景: 終焉に向かう墨
- 上部: 小ラベル "COMPANY INFORMATION"
- 会社情報(2 カラム):
   - 左カラム: 会社名、設立、代表、住所、事業内容
   - 右カラム: アクセスマップ(Google Maps 埋め込み)
```

#### Section 8: CONTACT

```
構成:
- 背景: 完結する流れ
- 上部: 小ラベル "CONTACT"
- メイン見出し: "お問い合わせ"
- お問い合わせフォーム:
   - 会社名
   - お名前
   - メールアドレス
   - お問い合わせ種別(Select: bizFlag / bizShip / bizLab / その他)
   - お問い合わせ内容(textarea)
   - プライバシーポリシー同意(checkbox)
   - 送信ボタン(Primary Button)
- 送信先: Cloudflare Workers でメール転送
```

### 5.3 各セクションの共通実装ルール

- セクション間の余白: 192px(デスクトップ)/ 96px(モバイル)
- スクロールで全要素が fade-up でフェードイン
- 各セクションには番号ラベル(01-08)を表示
- 背景動画の切り替えはクロスフェード 1.5 秒

### 5.4 検収基準

- [ ] 全 8 セクションが上から下までスクロールできる
- [ ] 各セクションで背景動画が切り替わる
- [ ] スクロール演出が滑らか
- [ ] モバイル表示で崩れない
- [ ] お問い合わせフォームが送信できる
- [ ] Lighthouse Performance 90+
- [ ] git commit

---

## 6. Phase 4: bizShip LP

### 6.1 ゴール

`bizmote.jp/ship/` で bizShip コミュニティ LP が完成し、入会面談の申し込みができる状態。

### 6.2 作業内容

#### Step 4.1: bizShip LP のコンテンツ準備

これまでに作成した bizShip LP の Manifesto と全文(改訂版 2)を `src/content/pages/ship.md` または直接 `src/pages/ship/index.astro` に配置。

#### Step 4.2: bizShip 専用デザイン

```
bizShip LP の特徴:
- 主要色: 蛍光青 #00C8FF
- 背景動画: 蛍光青の上昇する光(Runway で生成)
- ヒーロー: "AI 時代に "人間力"で生きる。" + "たどりつく、みんなで。"
- フォントウェイト: 細(200-300)を多用、軽やかさを表現
```

#### Step 4.3: LP 全 10 セクションの実装

`bizShip LP 改訂版 2` で確定した構成:

1. ヒーロー
2. Manifesto
3. 得られる 5 つのこと
4. 目指せる 3 つの未来
5. メンバーの声(プレースホルダー)
6. 運営メンバー
7. bizmote について
8. ジョインまでの流れ
9. よくある質問
10. CTA(面談申込)

#### Step 4.4: 面談申込フォーム

bizShip 専用の申込フォーム。一般 Contact とは別:

```
フォーム項目:
- お名前
- メールアドレス
- 現在の状況(Select: 会社員 / フリーランス / 起業準備中 / 起業済み / 学生 / その他)
- 興味のあるテーマ(自由記述)
- bizShip を知ったきっかけ
- 希望面談日時(複数選択可)
- 送信先: 山岡 + 須藤
```

### 6.3 検収基準

- [ ] /ship/ にアクセスして bizShip LP が表示される
- [ ] 蛍光青のアクセントが効いている
- [ ] 背景動画が上昇のニュアンスで動いている
- [ ] 申込フォームが送信できる
- [ ] スマホで快適に閲覧できる
- [ ] git commit

---

## 7. Phase 5: bizFlag LP / bizLab LP

### 7.1 ゴール

`/flag/` と `/lab/` の 2 LP が完成し、3 事業すべてのサイトが揃う状態。

### 7.2 作業内容

#### bizFlag LP

```
構成(bizShip と同様の 10 セクション、内容は bizFlag 用):
1. ヒーロー: "描いて、走って、渡す。"(深紅アクセント、下降の動画)
2. About: bizFlag が解決する課題
3. 3 層構造の説明: bizDesign / bizDrive / bizRelay
4. 提供価値の詳細
5. 事例(プレースホルダー、後で追加)
6. 運営メンバー: 奥居(CRO)
7. bizmote について
8. お問い合わせまでの流れ
9. よくある質問
10. CTA(問い合わせ)
```

#### bizLab LP

```
構成(同様):
1. ヒーロー: "次の常識を、AI でつくる。"(蛍光緑アクセント、放射の動画)
2. About: bizLab が目指すもの
3. 提供サービス
   - いつでも番頭さん(中小企業向け AX 支援)
   - 新規事業共創
4. 事例: 株式会社アヅマ(FAX 受注業務 AI 化)
5. 運営メンバー: 渡辺
6. bizmote について
7. お問い合わせまでの流れ
8. よくある質問
9. CTA
```

### 7.3 各 LP の動画素材

各 LP のヒーロー背景動画を Runway で生成:

- bizFlag: 深紅の墨が下降する 15 秒ループ
- bizLab: 蛍光緑の粒子が放射する 15 秒ループ

(bizShip 用は Phase 4 で準備済み)

### 7.4 検収基準

- [ ] /flag/ で bizFlag LP が表示される
- [ ] /lab/ で bizLab LP が表示される
- [ ] 各 LP が固有のブランドカラー・動画で個性的
- [ ] 3 LP の構成が統一されている(同じ家族として認識できる)
- [ ] 各 LP に CTA がある
- [ ] git commit

---

## 8. Phase 6: コンテンツ層構築

### 8.1 ゴール

Insights / News / About / Contact の各ページが完成し、Notion から記事を発信できる状態。

### 8.2 作業内容

#### Step 6.1: Notion API 連携

Claude Code に以下を依頼:

> `scripts/notion-sync.ts` を実装してください。
> 機能:
> - Notion の Insights データベースから「Status = Published」の記事を取得
> - 各記事を Markdown に変換
> - 画像をダウンロードして WebP/AVIF に変換
> - `src/content/insights/{category}/{slug}.md` として保存
> - News データベースも同様に同期

#### Step 6.2: Insights 一覧ページ

`/insights/` にアクセスすると、全記事が一覧表示される:

- カテゴリフィルタ(All / Flag / Ship / Lab)
- 各記事は Article Card で表示
- ページネーション(10 記事ずつ)

#### Step 6.3: Insights カテゴリページ

- `/insights/flag/` → bizFlag 関連記事のみ
- `/insights/ship/` → bizShip 関連記事のみ
- `/insights/lab/` → bizLab 関連記事のみ

#### Step 6.4: 個別記事ページ

`/insights/flag/is-launch-checklist` のような個別記事:

```
構成:
- ヘッダー画像(カバー画像)
- カテゴリラベル + 公開日
- タイトル(Shippori Mincho、巨大)
- 著者情報
- 記事本文(Markdown 自動レンダリング)
- 末尾の FAQ セクション
- 関連記事(同カテゴリから 3 つ)
- 関連サービスへの CTA
- ソーシャルシェアボタン
```

#### Step 6.5: News ページ

```
/news/ - 一覧
/news/{slug} - 個別

簡素な構成:
- 日付
- タイトル
- 本文
- 必要に応じてリンク・画像
```

#### Step 6.6: About ページ

会社のより詳しい情報を載せるページ:

- ミッション・ビジョン・哲学の詳しい説明
- 6 Values の詳細解説
- 沿革
- メディア掲載
- 採用情報へのリンク

#### Step 6.7: Contact ページ

コーポレートトップの Section 8 と同じフォームの単独ページ。

### 8.3 検収基準

- [ ] Notion で書いた記事がサイトに反映される
- [ ] /insights/ で全記事が見られる
- [ ] カテゴリ別に絞り込める
- [ ] 個別記事ページが整っている
- [ ] /news/ で最新ニュースが見られる
- [ ] About ページが充実している
- [ ] git commit

---

## 9. Phase 7: GEO/SEO 最適化

### 9.1 ゴール

AI 検索(ChatGPT / Claude / Perplexity)で「BtoB GTM」関連の質問に bizmote が引用されるための技術基盤が完成。

### 9.2 作業内容

#### Step 7.1: メタデータ完備

すべてのページに以下を設定:

- title
- description(160 字以内、各ページ固有)
- keywords(慎重に)
- canonical URL
- OG タグ(og:type, og:title, og:description, og:image)
- Twitter Card

#### Step 7.2: JSON-LD 構造化データ

`02_TECHNICAL_SPEC.md` の Section 7.2 で定義した JSON-LD を全ページに実装:

- Organization schema(全ページ)
- Article schema(記事ページ)
- BreadcrumbList(階層がある場合)
- FAQPage schema(FAQ セクションがあるページ)

#### Step 7.3: llms.txt の作成

`/public/llms.txt` を作成:

```
# bizmote 株式会社

bizmote は、BtoB 事業の GTM(市場開拓)パートナーです。
事業の設計・実行・移管までを一貫して支援する、GTM コンサルティングファームです。

## 主要なコンテンツ
(以下、自動生成)
```

`scripts/generate-llms-txt.ts` で自動生成する仕組みを構築。

#### Step 7.4: robots.txt の最適化

AI クローラーを明示的に許可(`02_TECHNICAL_SPEC.md` の Section 7.3 参照)。

#### Step 7.5: サイトマップ自動生成

`@astrojs/sitemap` を導入し、ビルド時に `sitemap.xml` を自動生成。

#### Step 7.6: 既存記事の Definition Lead 化

(まだ記事数が少ないので、この時点では数本のみ)
記事冒頭 150-200 字で「[エンティティ] は [カテゴリ] であり [差別化要素] である」の構造を徹底。

### 9.3 検収基準

- [ ] 各ページに固有のメタデータが設定されている
- [ ] JSON-LD が全ページに埋め込まれている
- [ ] llms.txt が公開されている(https://bizmote.jp/llms.txt)
- [ ] sitemap.xml が公開されている
- [ ] AI クローラーが許可されている
- [ ] Google Search Console に登録済み
- [ ] git commit

---

## 10. Phase 8: テスト・最終調整

### 10.1 ゴール

リリース前の最終チェック。パフォーマンス・アクセシビリティ・各種ブラウザ対応がすべてクリア。

### 10.2 作業内容

#### Step 8.1: パフォーマンステスト

- Lighthouse スコア測定(全ページ)
- Core Web Vitals 測定
- ページ読み込み速度の測定

目標スコア:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

#### Step 8.2: 動画ファイルの最適化

すべての動画を再圧縮:
- 容量: 3-5MB / 動画
- フォーマット: MP4(H.264) + WebM(VP9)
- 解像度: デスクトップ用 + モバイル用

#### Step 8.3: 画像の最適化

すべての画像を WebP/AVIF に変換、適切なサイズに。

#### Step 8.4: ブラウザテスト

以下で動作確認:
- Chrome(Mac / Windows)
- Safari(Mac / iPhone)
- Edge(Windows)
- Firefox(Mac / Windows)
- Android Chrome

特に動画再生・スクロール連動が動くか。

#### Step 8.5: アクセシビリティ確認

- スクリーンリーダー(NVDA / VoiceOver)で読める
- キーボード操作だけで全機能が使える
- prefers-reduced-motion でアニメーションが減る

#### Step 8.6: フォームテスト

すべてのフォームが正しく送信される:
- Contact フォーム
- bizShip 申込フォーム
- 各 LP の問い合わせフォーム

メールが正しく届くか確認。

#### Step 8.7: 文章の校正

- 誤字脱字チェック
- リンク切れチェック
- 画像 alt 属性チェック

### 10.3 検収基準

- [ ] Lighthouse 各項目 90+ 達成
- [ ] 主要ブラウザで正常動作
- [ ] フォームが全て機能する
- [ ] アクセシビリティ問題なし
- [ ] 文章に誤りなし
- [ ] git commit

---

## 11. Phase 9: リリース

### 11.1 ゴール

bizmote.jp が新サイトに切り替わり、世に公開される。

### 11.2 作業内容

#### Step 9.1: Cloudflare Pages の最終設定

- Production branch: main
- Build command: npm run build
- Output directory: dist
- 環境変数の設定(本番用)

#### Step 9.2: カスタムドメイン設定

- Cloudflare Pages の管理画面で `bizmote.jp` をカスタムドメインとして追加
- SSL 証明書が自動発行されることを確認

#### Step 9.3: DNS 切り替え

```
[手順]

1. Cloudflare で「サイト追加」→ bizmote.jp を入力
   → Cloudflare がネームサーバー 2 つを発行
   (例: alex.ns.cloudflare.com, bella.ns.cloudflare.com)

2. お名前.com にログイン
   → ドメイン設定 → ネームサーバー変更
   → Cloudflare のネームサーバーに変更

3. DNS 浸透待ち(数時間〜24 時間)

4. bizmote.jp にアクセスして新サイトが表示されることを確認

5. WordPress サーバーは 1-2 週間維持(切り戻し用)
```

#### Step 9.4: リリース後のモニタリング

- 訪問者数(Cloudflare Analytics、GA4)
- エラー監視
- パフォーマンス指標
- お問い合わせ受付状況

#### Step 9.5: 告知

- SNS(X)で新サイト公開を告知
- 既存クライアントへメール通知
- ニュースリリース(自社の /news/ にも投稿)

### 11.3 検収基準

- [ ] bizmote.jp が新サイトを表示している
- [ ] HTTPS が有効
- [ ] 全ページが正常表示
- [ ] フォームが機能している
- [ ] アナリティクスでアクセスを取得できている
- [ ] git に最終 commit + tag(v1.0)

---

## 12. Phase 10: コンテンツ運用・拡張(継続)

### 12.1 ローンチ後のサイクル

```
[毎週]
- 新規記事 1-2 本公開(Daisuke + AI)
- News の更新

[毎月]
- 既存記事のリフレッシュ(更新日を更新)
- パフォーマンス測定
- アクセス分析レビュー
- 依存パッケージのアップデート

[四半期]
- AI 検索での引用率測定
- コンテンツ戦略の見直し
- 新規セクション・機能の追加検討

[半年]
- メンバーの声セクションを追加(bizShip)
- 事例の追加(/cases/)
- 独自調査レポートの公開検討

[年次]
- 大規模な見直し(必要なら)
- 新規事業ローンチ時のサイト拡張
```

### 12.2 コンテンツ目標(年間)

| 種別 | 月次 | 年次 |
|---|---|---|
| Insights 記事 | 10-15 本 | 120-180 本 |
| News | 3-5 件 | 36-60 件 |
| 事例 | 1-2 件 | 12-24 件 |

---

## 13. リスクと対策

### 13.1 主要リスク

| リスク | 影響度 | 対策 |
|---|---|---|
| 動画ファイルが重くてサイトが遅い | 高 | Phase 8 で徹底的に圧縮、モバイル軽量版を用意 |
| Notion API 連携でエラー | 中 | エラーハンドリング、手動 Markdown 投入のフォールバック |
| Cloudflare Pages の制限超過 | 低 | 月 500 ビルドの上限を意識、頻繁な push を避ける |
| Daisuke の時間が足りない | 中 | Phase ごとに休憩を取る、必要なら一時的に外注検討 |
| ドメイン切り替え時のダウンタイム | 中 | DNS 浸透時間を考慮、深夜帯に切り替え |
| AI 動画生成が思った通りにならない | 中 | 複数モデル試す、CapCut で後処理 |

### 13.2 後戻り防止

- 各 Phase の完了時点で git tag(v0.1, v0.2, ...)
- 大きな変更前は branch を切る
- Cloudflare Pages のロールバック機能を活用

---

## 14. 進め方の Tips

### 14.1 一日の作業量目安

集中できる場合:

- 平日 2-3 時間 × 週 4-5 日 = 週 10-15 時間
- これで全 Phase を 6-8 週間で完了可能

### 14.2 Claude Code との対話のコツ

- **明確な指示**: 「○○セクションを実装して」より「○○ セクションを `03_DESIGN_SYSTEM.md` Section 5 のルールに従って実装して」と仕様書を参照
- **段階的に**: 一度に全部依頼せず、機能ごとに分割
- **エラー報告は丁寧に**: エラーメッセージを正確にコピペ
- **動作確認を逐一**: 一つの機能ごとに `npm run dev` で確認

### 14.3 詰まったら

- 30 分悩んだら Claude Code に聞く
- それでも解決しなければ Anthropic ドキュメントを Claude Code に検索させる
- 翌日に持ち越す勇気も大事

---

## 15. 関連ドキュメント

- `01_PROJECT_OVERVIEW.md` — プロジェクト全体像
- `02_TECHNICAL_SPEC.md` — 技術仕様
- `03_DESIGN_SYSTEM.md` — デザインシステム
- `05_CLAUDE_CODE_KICKOFF_PROMPT.md` — Claude Code 起動プロンプト

---

> Document version: 1.0
> Created: 2026-05-04
> Author: Daisuke Yamaoka × Claude
> Status: Draft (確定後 Final 化)
