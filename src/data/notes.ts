export type NoteCategory = 'bizFlag' | 'bizShip' | 'bizLab' | 'bizmote';

export type NoteCategoryFilter = NoteCategory | 'all';

export type NoteAuthorId = 'daisuke-yamaoka' | 'hayato-sudo' | 'daiki-okui' | 'kyohei-watanabe';

export type NoteAuthor = {
  id: NoteAuthorId;
  name: string;
  role: string;
  initial: string;
  profile: string;
  image?: string;
};

export type NoteImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type NoteSection = {
  heading: string;
  body: string[];
};

export type NoteItem = {
  slug: string;
  category: NoteCategory;
  meta: string;
  title: string;
  excerpt: string;
  lead: string;
  tags: string[];
  status: string;
  featured: boolean;
  authorId?: NoteAuthorId;
  coverImage?: NoteImage;
  sections: NoteSection[];
  takeaways: string[];
};

export const categories: Array<{ id: NoteCategoryFilter; label: string; href: string }> = [
  { id: 'all', label: 'ALL', href: '/notes/' },
  { id: 'bizFlag', label: 'bizFlag', href: '/notes/?category=bizFlag' },
  { id: 'bizShip', label: 'bizShip', href: '/notes/?category=bizShip' },
  { id: 'bizLab', label: 'bizLab', href: '/notes/?category=bizLab' },
  { id: 'bizmote', label: 'bizmote', href: '/notes/?category=bizmote' },
];

export const categoryMeta: Record<NoteCategory, { label: string; accent: string }> = {
  bizFlag: {
    label: 'bizFlag',
    accent: 'var(--color-flag-base)',
  },
  bizShip: {
    label: 'bizShip',
    accent: 'var(--color-ship-deep)',
  },
  bizLab: {
    label: 'bizLab',
    accent: 'var(--color-lab-deep)',
  },
  bizmote: {
    label: 'bizmote',
    accent: 'var(--color-sumi)',
  },
};

export const noteAuthors: Record<NoteAuthorId, NoteAuthor> = {
  'daisuke-yamaoka': {
    id: 'daisuke-yamaoka',
    name: '山岡 大介',
    role: 'CEO / Founder',
    initial: 'D',
    profile: 'BtoB営業、新規事業・新規市場開拓を軸に、挑戦が社会に届くまでの道筋づくりを担う。bizmote全体の事業設計と会社づくりを推進。',
  },
  'hayato-sudo': {
    id: 'hayato-sudo',
    name: '須藤 隼',
    role: 'CHRO / bizShip',
    initial: 'H',
    profile: '法人新規開拓、SaaS営業支援、IS/FS組織構築、採用・育成に従事。bizShipでは挑戦者が仲間と前に進む場づくりを推進。',
  },
  'daiki-okui': {
    id: 'daiki-okui',
    name: '奥居 大輝',
    role: 'CRO / bizFlag',
    initial: 'D',
    profile: 'キーエンスでの営業経験を経て、BtoB営業・事業開発支援に従事。bizFlagで仮説を市場へ届けるGTM設計と実行を推進。',
  },
  'kyohei-watanabe': {
    id: 'kyohei-watanabe',
    name: '渡邉 恭平',
    role: 'CTO / bizLab',
    initial: 'K',
    profile: 'VRプラットフォーム企業の創業メンバー兼CTO、XR・AI領域のコンサルタントを経て、bizLabでAI実装と運用設計を推進。',
  },
};

const defaultAuthorByCategory: Record<NoteCategory, NoteAuthorId> = {
  bizFlag: 'daiki-okui',
  bizShip: 'hayato-sudo',
  bizLab: 'kyohei-watanabe',
  bizmote: 'daisuke-yamaoka',
};

export const notes: NoteItem[] = [
  {
    slug: 'gtm-first-step',
    category: 'bizFlag',
    meta: 'GTM',
    title: 'GTMは、何から始めるべきか',
    excerpt: '顧客、課題、提供価値、届け方を一度並べて、最初に検証する問いを決めるための考え方。',
    lead: 'GTMは、営業の動きだけを指す言葉ではありません。誰に、何を、どの順番で届けるかを整理し、市場に出しながら学習するための設計です。',
    tags: ['GTM', '仮説設計', '市場開拓'],
    status: 'KNOWLEDGE',
    featured: true,
    sections: [
      {
        heading: '最初に決めるのは、売り方ではなく問い',
        body: [
          '新規事業や市場開拓では、最初から完璧な営業資料やトークを作ろうとすると動きが遅くなります。まず整理したいのは、この市場で何を確かめたいのかという問いです。',
          'ターゲット、課題、導入理由、意思決定者、競合との違い。このあたりを一度並べると、最初に検証すべき仮説が見えてきます。',
        ],
      },
      {
        heading: '市場に出す前提で、仮説を小さくする',
        body: [
          '仮説は大きいままだと検証できません。業界、企業規模、部署、役職、導入タイミングまで分解し、小さく試せる形にしていきます。',
          'そのうえで、商談や失注理由を回収し、次の仮説に戻すことでGTMは少しずつ強くなります。',
        ],
      },
      {
        heading: '残すべきもの',
        body: [
          'アポ数だけではなく、誰に刺さったのか、どの言葉で反応が変わったのか、どこで止まったのかを残すことが大切です。',
          'GTMの初期は、売上だけでなく学習資産を作る期間でもあります。',
        ],
      },
    ],
    takeaways: ['顧客、課題、届け方を一度並べる', '最初に検証する問いを決める', '商談の反応を次の仮説に戻す'],
  },
  {
    slug: 'new-business-sales-pattern',
    category: 'bizFlag',
    meta: 'SALES',
    title: '新規事業の営業は、最初から型にしすぎない',
    excerpt: '市場の反応がまだ少ない段階で、営業の動きをどう設計し、どこから型化していくか。',
    lead: '新規事業の営業では、早く型を作りたい一方で、早すぎる型化が学習を止めてしまうことがあります。',
    tags: ['営業設計', '新規事業', '検証'],
    status: 'FIELD NOTE',
    featured: false,
    sections: [
      {
        heading: '初期営業は、探索の時間でもある',
        body: [
          '商談が少ない段階では、正解のトークや資料を決めきるよりも、顧客の反応を拾う余白を残した方が学びが多くなります。',
          '何に困っているのか、なぜ今なのか、既存の解決策で何が足りないのか。会話から得られる情報を仮説に戻していきます。',
        ],
      },
      {
        heading: '型にするところ、残すところ',
        body: [
          'リスト作成、初回接点、商談ログ、失注理由の記録は早めに型化してよい領域です。一方で、訴求や提案順序は市場の反応を見ながら変えていきます。',
          '営業活動を固定化するのではなく、学習しやすい構造にすることが重要です。',
        ],
      },
    ],
    takeaways: ['初期営業は探索として設計する', '記録と振り返りは早めに型化する', '訴求は市場反応から磨く'],
  },
  {
    slug: 'market-feedback-to-hypothesis',
    category: 'bizFlag',
    meta: 'LEARNING',
    title: '市場の声を、次の仮説に変える',
    excerpt: '商談で得た違和感、断られた理由、刺さった言葉を、次の打ち手に変えていく記録。',
    lead: '商談の中には、次の打ち手につながる情報が多く含まれています。大切なのは、感想で終わらせず仮説に戻すことです。',
    tags: ['商談', '失注理由', '学習'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '断られた理由を分解する',
        body: [
          '失注理由は、予算がない、時期が合わない、必要性が弱いといった一言で終わらせると次に活かしにくくなります。',
          '本当に予算の問題なのか、優先順位の問題なのか、意思決定者に届いていないのか。理由を分解すると、次に変えるべきポイントが見えてきます。',
        ],
      },
      {
        heading: '刺さった言葉を残す',
        body: [
          '顧客の反応が変わった言葉は、提案資料やトークの改善材料になります。',
          '売り手の言葉ではなく、顧客が自然に使った言葉を残すことで、訴求は現場に近づきます。',
        ],
      },
    ],
    takeaways: ['失注理由を一段深く分解する', '顧客の言葉を残す', '違和感を次の検証項目にする'],
  },
  {
    slug: 'external-support-to-internal-motion',
    category: 'bizFlag',
    meta: 'ENABLEMENT',
    title: '外部支援を、社内の動きに変える',
    excerpt: '支援で終わらせず、手順、判断基準、育成まで含めて、社内に残るGTMの型へ移していく。',
    lead: '外部支援の価値は、外側から動かすことだけではありません。支援後に社内で動ける状態を残すことが重要です。',
    tags: ['内製化', '育成', 'GTM'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '支援内容を、判断基準に変える',
        body: [
          '営業活動の一部を外部に任せるだけでは、支援が終わったあとに何も残らないことがあります。',
          'どの企業を優先するのか、どの反応を良い兆候と見るのか、どこで提案を変えるのか。判断基準まで残すことで社内の動きに変わります。',
        ],
      },
      {
        heading: '人が育つ設計にする',
        body: [
          'GTMは個人の勘だけで進めるものではありません。ログ、レビュー、改善会議、資料更新の流れを作ることで、経験がチームに蓄積されます。',
          '外部支援は、その仕組みを社内に移していく役割も担います。',
        ],
      },
    ],
    takeaways: ['作業だけでなく判断基準を残す', '営業ログを育成に使う', '支援後に社内で回る状態を目指す'],
  },
  {
    slug: 'meaning-of-btob-sales-experience',
    category: 'bizShip',
    meta: 'SALES',
    title: 'BtoB営業を経験する意味',
    excerpt: '顧客の課題を聞き、価値を届け、対価を得る経験は、事業づくりの基礎になる。',
    lead: 'BtoB営業は、ただ商品を売る仕事ではありません。顧客の課題を理解し、価値を伝え、意思決定の流れを知る実践です。',
    tags: ['BtoB営業', '実践', '事業づくり'],
    status: 'KNOWLEDGE',
    featured: true,
    sections: [
      {
        heading: '顧客理解は、会話の中で深くなる',
        body: [
          '事業アイデアは、机の上だけでは強くなりません。顧客と話すことで、何に困っているのか、何ならお金を払うのかが少しずつ見えてきます。',
          'BtoB営業の経験は、課題と価値の距離を測る力につながります。',
        ],
      },
      {
        heading: '対価を得る経験',
        body: [
          '良いと思ってもらうことと、実際に導入してもらうことの間には距離があります。',
          '営業の現場では、予算、稟議、優先順位、導入後の運用まで含めて考える必要があります。この経験は、事業づくりの基礎になります。',
        ],
      },
    ],
    takeaways: ['顧客課題を会話から学ぶ', '価値が対価に変わる流れを知る', '事業づくりの基礎体力をつける'],
  },
  {
    slug: 'time-before-next-challenge',
    category: 'bizShip',
    meta: 'PREP',
    title: '次の挑戦までの時間を、ただの待ち時間にしない',
    excerpt: '学ぶ、売る、貯める、つながる。その時間をどう使うかで、次の一歩は変わる。',
    lead: '次に何かを始めたいけれど、まだ形になっていない。そんな時間を、経験とつながりを増やす期間に変えることができます。',
    tags: ['実践経験', '収入', 'つながり'],
    status: 'FIELD NOTE',
    featured: false,
    sections: [
      {
        heading: '準備期間を、実践の時間にする',
        body: [
          '挑戦の形は、最初から起業だけに限られません。BtoB営業やスタートアップ案件に関わることで、実践しながら次の選択肢を増やすことができます。',
          '経験、収入、人とのつながりを同時につくる時間にすることが、次の一歩を軽くします。',
        ],
      },
      {
        heading: '動きながら見えてくるもの',
        body: [
          'やりたいことは、考えるだけでは固まりにくいものです。現場に入り、顧客や仲間と関わる中で、自分が向き合いたい課題が見えてくることがあります。',
        ],
      },
    ],
    takeaways: ['次の挑戦は動きながら見つける', '経験、収入、つながりを同時につくる', '起業準備だけに限定しない'],
  },
  {
    slug: 'community-keeps-challenge-moving',
    category: 'bizShip',
    meta: 'COMMUNITY',
    title: '仲間がいると、挑戦は続きやすくなる',
    excerpt: '同じ方向を向く人との壁打ちや情報交換が、孤独な準備期間を前に進める。',
    lead: '挑戦はひとりでも始められます。ただ、続けるには話せる相手や一緒に動く仲間がいることが支えになります。',
    tags: ['コミュニティ', '仲間', '壁打ち'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '壁打ちできる相手がいること',
        body: [
          '考えていることを言葉にすると、迷いが整理されることがあります。近い温度感で話せる相手がいると、次に試すことが決めやすくなります。',
          'コミュニティは、答えをもらう場所というより、考え続けるための環境です。',
        ],
      },
      {
        heading: '仕事を通じてつながる',
        body: [
          '単なる交流だけではなく、同じ案件やプロジェクトに関わることで信頼が生まれます。',
          '一緒に動いた経験は、その後の挑戦にも残る関係になります。',
        ],
      },
    ],
    takeaways: ['話せる相手がいると行動が続く', '仕事を通じた関係は強い', 'コミュニティは考え続ける環境になる'],
  },
  {
    slug: 'sales-experience-sharpens-ideas',
    category: 'bizShip',
    meta: 'STARTUP',
    title: '営業経験は、事業アイデアを強くする',
    excerpt: '顧客と話すことで、机上の仮説が現実の課題や購買行動に近づいていく。',
    lead: '事業アイデアは、顧客と話すほど具体的になります。営業経験は、課題を探し、価値を届ける感覚を育てます。',
    tags: ['起業', '顧客理解', '仮説'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '誰のどんな課題かを確かめる',
        body: [
          '良さそうなアイデアでも、誰が強く困っているのかが曖昧だと事業にはなりにくいものです。',
          '営業の現場では、顧客の言葉、導入の壁、競合との比較が見えてきます。',
        ],
      },
      {
        heading: '売る経験は、作る前の判断材料になる',
        body: [
          '作る前に売れる理由を考えることは、無駄な開発を減らします。',
          '顧客がどんな状態なら動くのかを知ることで、事業アイデアは現実に近づきます。',
        ],
      },
    ],
    takeaways: ['課題の強さを顧客から確かめる', '導入の壁を知る', '作る前の判断材料を増やす'],
  },
  {
    slug: 'ai-usecases-that-worked',
    category: 'bizLab',
    meta: 'AI USECASE',
    title: '業務で使えたAI活用だけを残す',
    excerpt: '試した結果、使えたもの、使いにくかったもの、向いていなかったものまでナレッジとして残します。',
    lead: 'AI活用では、できそうに見えることと実際に業務で使えることの間に差があります。bizLabでは、試した結果をナレッジとして残します。',
    tags: ['AI活用', '検証', '業務改善'],
    status: 'KNOWLEDGE',
    featured: true,
    sections: [
      {
        heading: '使えるかどうかは、業務の中で決まる',
        body: [
          'AIツールの機能が優れていても、現場の流れに合わなければ使われません。入力の手間、確認の必要性、権限、既存ツールとの接続まで見る必要があります。',
          'だからこそ、実際に使った結果を残すことに価値があります。',
        ],
      },
      {
        heading: '失敗例もナレッジにする',
        body: [
          'うまくいかなかった活用例にも学びがあります。自動化しない方がよい業務、確認が必要な業務、人が判断すべき業務を見極める材料になります。',
        ],
      },
    ],
    takeaways: ['機能ではなく業務で使えるかを見る', '失敗例も判断材料にする', '現場の流れに合わせて残す'],
  },
  {
    slug: 'workflow-load-inventory',
    category: 'bizLab',
    meta: 'WORKFLOW',
    title: '面倒な作業の棚卸しから始める',
    excerpt: 'AI導入の前に、どの作業が重く、どこに時間が取られているのかを整理します。',
    lead: 'AI導入の最初に必要なのは、ツール選びではありません。どの作業が重く、なぜ面倒なのかを見えるようにすることです。',
    tags: ['業務棚卸し', '作業負荷', '改善'],
    status: 'FIELD NOTE',
    featured: false,
    sections: [
      {
        heading: '作業を分けて見る',
        body: [
          '請求、契約、メール、資料作成、顧客管理。ひとつの業務に見えても、中には入力、確認、判断、送付、記録といった複数の作業があります。',
          'どこが時間を取っているのかを分けて見ると、改善すべき場所が見えてきます。',
        ],
      },
      {
        heading: 'AIでなくてよいこともある',
        body: [
          'すべてをAIで解決する必要はありません。テンプレート化、既存ツールの設定、入力項目の整理だけで軽くなる作業もあります。',
        ],
      },
    ],
    takeaways: ['ツール選定の前に作業を棚卸しする', '入力、確認、判断を分ける', 'AI以外の改善も選択肢にする'],
  },
  {
    slug: 'do-not-build-before-choosing',
    category: 'bizLab',
    meta: 'DECISION',
    title: '作る前に、作らない選択肢を見る',
    excerpt: '既存ツールで足りるなら、無理に専用ツールを作らない。現場に合う手段を選びます。',
    lead: '専用ツールを作ることは有効な選択肢ですが、最初から開発ありきにすると重くなりすぎることがあります。',
    tags: ['ツール選定', '設計', '判断'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '既存ツールで足りるかを見る',
        body: [
          'Notion、Slack、Google Workspace、freee、スプレッドシート。すでに使っているツールの組み合わせで十分に改善できる場合があります。',
          'まずは今ある環境でどこまで軽くできるかを見ます。',
        ],
      },
      {
        heading: '作るべきときだけ作る',
        body: [
          '既存ツールでは業務に合わない、権限や連携が足りない、独自の判断ロジックが必要。そうした場合に、専用ツールや自動化フローを設計します。',
        ],
      },
    ],
    takeaways: ['開発ありきにしない', '既存ツールの組み合わせを先に見る', '必要なときだけ専用化する'],
  },
  {
    slug: 'operation-makes-implementation-real',
    category: 'bizLab',
    meta: 'OPERATION',
    title: '運用されて初めて、実装になる',
    excerpt: 'ツールを渡して終わりにせず、使い方、ルール、改善まで含めて現場に残します。',
    lead: 'ツールは作っただけでは価値になりません。現場で使われ、改善され、日々の業務に残って初めて実装になります。',
    tags: ['運用', '保守', '定着'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '使い方まで設計する',
        body: [
          '誰が入力するのか、誰が確認するのか、エラーが出たときにどうするのか。運用の細部が曖昧だと、ツールは使われなくなります。',
          '実装では、画面や自動化だけでなく、使い方のルールまで整える必要があります。',
        ],
      },
      {
        heading: '改善できる状態にする',
        body: [
          '最初から完璧な運用を作る必要はありません。使いながら改善できるように、ログや問い合わせ先、変更の流れを用意しておくことが大切です。',
        ],
      },
    ],
    takeaways: ['運用ルールまで設計する', 'エラー時の動きを決める', '改善できる状態で渡す'],
  },
  {
    slug: 'company-building-in-progress',
    category: 'bizmote',
    meta: 'COMPANY',
    title: '会社づくりの途中経過',
    excerpt: '事業、人、環境が循環する仕組みをどう育てているかを、会社づくりの記録として残します。',
    lead: '会社づくりは、完成形を掲げるだけでは進みません。日々の意思決定や試行錯誤を積み重ねながら、少しずつ形になっていきます。',
    tags: ['会社づくり', '組織', '文化'],
    status: 'FIELD NOTE',
    featured: true,
    sections: [
      {
        heading: '事業、人、環境を分けずに見る',
        body: [
          'bizmoteでは、事業をつくること、人をつなぐこと、創造できる環境を整えることを分けすぎずに考えています。',
          'ひとつの事業で得た学びが、別の事業や人の成長に戻っていく。その循環を育てることが、会社づくりの中心にあります。',
        ],
      },
      {
        heading: '途中経過を残す理由',
        body: [
          '完成した話だけでは、意思決定の背景は見えません。途中で何を考え、何に迷い、どう変えたのかを残すことで、次の挑戦に使える知見になります。',
        ],
      },
    ],
    takeaways: ['会社づくりも学習の対象にする', '事業、人、環境の循環を見る', '途中経過を知見として残す'],
  },
  {
    slug: 'environment-where-challenges-continue',
    category: 'bizmote',
    meta: 'CULTURE',
    title: '挑戦が生まれ続ける環境をどうつくるか',
    excerpt: '事業だけでなく、人と環境の設計から挑戦を生み続けるための考え方。',
    lead: '挑戦は個人の意志だけに頼ると続きにくくなります。挑戦が生まれ続けるには、環境の設計が必要です。',
    tags: ['文化', '環境', '挑戦'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '挑戦しやすい状態をつくる',
        body: [
          '情報が閉じている、相談できる相手がいない、失敗が学びとして残らない。そうした状態では、挑戦は個人の頑張りに偏ります。',
          '情報、機会、仲間、振り返りの場を整えることで、挑戦は続きやすくなります。',
        ],
      },
      {
        heading: '仕組みとして残す',
        body: [
          '良い経験を一度きりで終わらせず、次の人も使える形にする。これが環境づくりの大事な役割です。',
        ],
      },
    ],
    takeaways: ['挑戦を個人任せにしない', '情報と機会を開く', '経験を仕組みとして残す'],
  },
  {
    slug: 'foundation-for-building-businesses',
    category: 'bizmote',
    meta: 'BUILDING',
    title: '事業をつくる会社の土台',
    excerpt: 'bizFlag、bizShip、bizLabを通じて、bizmoteがどんな循環をつくろうとしているか。',
    lead: 'bizmoteは、ひとつのサービスだけで完結する会社ではありません。事業、人、環境が循環する土台をつくろうとしています。',
    tags: ['事業', 'bizmote', '構想'],
    status: 'FIELD NOTE',
    featured: false,
    sections: [
      {
        heading: '3つの事業がつながる',
        body: [
          'bizFlagでは、事業が市場に届くまでの道筋をつくる。bizShipでは、挑戦する人が仲間と実践できる場をつくる。bizLabでは、面倒な作業を軽くし、創造に向かう時間をつくる。',
          'それぞれの事業は別々に見えて、挑戦が生まれ続ける仕組みの一部です。',
        ],
      },
      {
        heading: '土台を育てる',
        body: [
          '事業をつくるには、売る力、人が集まる場、創造に集中できる環境が必要です。この土台を少しずつ育てていきます。',
        ],
      },
    ],
    takeaways: ['3事業を循環として見る', '売る力、人、環境を整える', '挑戦が続く土台を育てる'],
  },
  {
    slug: 'handle-unnamed-challenges',
    category: 'bizmote',
    meta: 'QUESTION',
    title: 'まだ言葉になっていない挑戦を扱う',
    excerpt: '整理されきっていない相談や違和感を、どう次の行動に変えていくか。',
    lead: '最初からきれいに整理された相談だけが、事業や挑戦になるわけではありません。むしろ、違和感や曖昧な問いから始まることも多くあります。',
    tags: ['相談', '問い', '行動'],
    status: 'KNOWLEDGE',
    featured: false,
    sections: [
      {
        heading: '曖昧なまま話す価値',
        body: [
          'まだ言葉になっていない段階では、何を相談すべきかもわからないことがあります。',
          'その状態から、課題、選択肢、次の行動を一緒に整理していくことで、挑戦は扱えるものになります。',
        ],
      },
      {
        heading: '次の一歩に変える',
        body: [
          '大きな答えを急ぐより、まず何を確かめるのかを決める。小さな行動に落とすことで、曖昧な相談は前に進み始めます。',
        ],
      },
    ],
    takeaways: ['曖昧な相談から始めてよい', '問いを整理する', '次の小さな行動に変える'],
  },
];

export const getNoteBySlug = (slug: string) => notes.find((note) => note.slug === slug);

export const getRelatedNotes = (note: NoteItem, limit = 3) => (
  notes.filter((item) => item.category === note.category && item.slug !== note.slug).slice(0, limit)
);

export const getAdjacentNotes = (note: NoteItem) => {
  const index = notes.findIndex((item) => item.slug === note.slug);

  return {
    previous: index > 0 ? notes[index - 1] : undefined,
    next: index >= 0 && index < notes.length - 1 ? notes[index + 1] : undefined,
  };
};

export const getNoteAuthor = (note: NoteItem) => (
  noteAuthors[note.authorId ?? defaultAuthorByCategory[note.category]]
);
