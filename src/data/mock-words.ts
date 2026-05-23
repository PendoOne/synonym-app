// ---------------------------------------------------------------------------
// 考研英语 AI 同义词辨析 — Mock Data (Light Mode MVP)
// 每组 3-5 词，包含完整辨析字段
// ---------------------------------------------------------------------------

export interface SynonymWord {
  word: string;
  pos: string;
  definition: string;
  semantic_difference: string;
  intensity: number; // 1-10
  formality: "口语" | "中等" | "正式" | "高度正式/学术";
  emotion: string;
  collocations: string[];
  exam_sentence: string;
  memory_tip: string;
  chinese_confusion: string;
}

export interface SynonymGroup {
  slug: string;
  group_name: string;
  semantic_core: string;
  confusion_level: number; // 1-10
  words: SynonymWord[];
  one_sentence_diff: string;
}

// ===========================================================================
// GROUPS
// ===========================================================================

export const groups: SynonymGroup[] = [
  // ── 1. 影响类 ──────────────────────────────────────────────────────────
  {
    slug: "affect",
    group_name: "影响类",
    semantic_core: "产生影响 / 改变",
    confusion_level: 9,
    one_sentence_diff:
      "affect 是直接的情绪触动，influence 是潜移默化的观念塑造，impact 是撞击式的强力冲击，alter 是局部修改的客观改变。",
    words: [
      {
        word: "affect",
        pos: "v.",
        definition: "直接作用于对象，引起情绪或状态变化",
        semantic_difference:
          "侧重直接、即时的作用力，暗示因果关系中可见的结果。与 influence 的核心区别：affect 是一次击打就有反应，不经过缓慢渗透。",
        intensity: 6,
        formality: "中等",
        emotion: "中性偏负",
        collocations: [
          "adversely affect",
          "directly affect",
          "affect the outcome",
          "significantly affect",
        ],
        exam_sentence:
          "The global recession has adversely affected consumer spending across all sectors.",
        memory_tip:
          "A-force → 一拳打上去。联想 'affection（感情）'——你的心被情绪触动。",
        chinese_confusion:
          "中文'影响'同时覆盖直接作用（affect）与间接渗透（influence），学生无从区分'一拳打脸'与'水流慢慢渗入'的语感差异。",
      },
      {
        word: "influence",
        pos: "v. / n.",
        definition: "通过潜移默化的方式塑造思想、行为或发展方向",
        semantic_difference:
          "强调间接、渐进的作用过程。常涉及思想、观点的长期塑造，不强调即时结果，而关注持续的影响力渗透。与 impact 不同，不暗示强烈冲击。",
        intensity: 5,
        formality: "正式",
        emotion: "中性偏正",
        collocations: [
          "exert influence on",
          "profound influence",
          "under the influence of",
          "political influence",
        ],
        exam_sentence:
          "Peer pressure can profoundly influence adolescents' decision-making processes.",
        memory_tip:
          "in-（进入）+ flu（flow=流）→ 像水流一样渗入。同源词：influenza（流感病毒悄悄入侵）。水流哲学——不急不慢，慢慢改变河道。",
        chinese_confusion:
          "中文'影响（力）'把动词和名词含义合并，导致学生写出 'influence sb to do' 这种错误结构。",
      },
      {
        word: "impact",
        pos: "n. / v.",
        definition: "强烈的、通常是突然的冲击性影响",
        semantic_difference:
          "语气四词中最强。强调力度和撞击感，暗示影响是显著的、有时是突发的。与 alter 不同，不关心改变结果本身，而关注撞击式的作用力。名词用法远多于动词。",
        intensity: 9,
        formality: "正式",
        emotion: "戏剧性/强烈",
        collocations: [
          "far-reaching impact",
          "environmental impact",
          "have a profound impact on",
          "impact assessment",
        ],
        exam_sentence:
          "The pandemic has had a far-reaching impact on global supply chains.",
        memory_tip:
          "im-（加强）+ pact（拍击）→ 猛拍上去！联想：小行星撞击地球——不是风吹，是撞击。",
        chinese_confusion:
          "中文'重大影响'让学生误以为 impact = important + affect，实际上 impact 强调的是'冲击力'而非'重要性'。",
      },
      {
        word: "alter",
        pos: "v.",
        definition: "部分地、具体地改变某物的性质、外观或结构",
        semantic_difference:
          "与前三个词的根本差异：它聚焦改变本身的行为和结果，而非影响的过程。不关心通过什么方式、用了多大力，只关心'变了'这个事实。语气比 change 更正式。",
        intensity: 4,
        formality: "高度正式/学术",
        emotion: "中性/客观",
        collocations: [
          "fundamentally alter",
          "alter the course of",
          "alter one's perception",
          "significantly alter",
        ],
        exam_sentence:
          "The discovery fundamentally altered our understanding of human evolution.",
        memory_tip:
          "alter → alteration（服装修改）→ 裁缝改衣服：换颗纽扣、改短裤腿，不是重做整件。altar（祭坛）差一个字母。",
        chinese_confusion:
          "中文'改变'同时覆盖 alter（局部修改）、change（通用更换）、transform（彻底转变），学生背单词时把三者当同义词压缩存储。",
      },
    ],
  },

  // ── 2. 获得类 ──────────────────────────────────────────────────────────
  {
    slug: "acquire",
    group_name: "获得类",
    semantic_core: "获取 / 得到",
    confusion_level: 9,
    one_sentence_diff:
      "acquire 是慢慢攒出来的，obtain 是正式拿到手的，gain 是逐渐增加的，derive 是从源头提取的。",
    words: [
      {
        word: "acquire",
        pos: "v.",
        definition: "通过持续努力、学习或购买逐步获得有价值的东西",
        semantic_difference:
          "强调渐进积累和获得物的价值感。暗示需要时间、努力或投入。与 obtain 的区别：acquire 偏习得/养成的渐进过程，obtain 偏一次性获取的结果。",
        intensity: 5,
        formality: "正式",
        emotion: "正面",
        collocations: [
          "acquire knowledge",
          "acquire a language",
          "acquire a company",
          "acquire a taste for",
        ],
        exam_sentence:
          "Children acquire language naturally through exposure and interaction.",
        memory_tip:
          "ac-（加强）+ quire（quest=寻求）→ 不断寻求最终获得。acquisition（收购）→ 整个公司慢慢变成你的。",
        chinese_confusion:
          "中文'获得'不区分过程性（慢慢积累）和结果性（一次性得到），导致 acquire/obtain/gain 混用。",
      },
      {
        word: "obtain",
        pos: "v.",
        definition: "通过正式渠道、努力或请求获得某物（结果导向）",
        semantic_difference:
          "强调获得的结果而非过程。暗示有一个正式的、有时是困难的获取过程，但焦点在'到手了'。比 acquire 更偏一次性动作，比 gain 更偏正式渠道。",
        intensity: 4,
        formality: "高度正式/学术",
        emotion: "中性",
        collocations: [
          "obtain information",
          "obtain permission",
          "obtain a degree",
          "obtain results",
        ],
        exam_sentence:
          "Researchers must obtain informed consent from all study participants.",
        memory_tip:
          "ob-（朝向）+ tain（tenere=持有）→ 伸向某物并握在手里。tain家族：contain（装）、maintain（维持）、retain（保留）。",
        chinese_confusion:
          "中文'获得'不区分渠道正式与否，学生常把 obtain（走流程填表获取）和 get（随便拿到）划等号。",
      },
      {
        word: "gain",
        pos: "v.",
        definition: "逐渐增加地获得（数量、经验、优势等可量化的东西）",
        semantic_difference:
          "核心是增量。更偏数量/程度上的累积增长。与 obtain 不同，gain 不强调一次性获取，而强调逐渐增多。",
        intensity: 4,
        formality: "中等",
        emotion: "正面",
        collocations: [
          "gain access to",
          "gain experience",
          "gain an advantage",
          "gain insight into",
        ],
        exam_sentence:
          "Graduates can gain valuable experience through internship programs.",
        memory_tip:
          "gain → 联想到体重秤 gain weight（长胖）→ 数字逐渐往上跳。gain 的东西通常是可量化的增量。",
        chinese_confusion:
          "中文'获得'不区分增量型获取和取得型获取，gain 的'逐渐增加'语义在中文里没有直接对应词汇。",
      },
      {
        word: "derive",
        pos: "v.",
        definition: "从某个来源/源头提取、推导或获得",
        semantic_difference:
          "不仅是获得，更强调从何处获得。总暗示有一个清晰的来源或起点。在学术写作中常用来表示'推导出'或'来源于'。",
        intensity: 3,
        formality: "高度正式/学术",
        emotion: "纯学术中性",
        collocations: [
          "derive from",
          "derive benefit from",
          "derive pleasure",
          "derive a conclusion",
        ],
        exam_sentence:
          "Many English words derive from Latin and Greek roots.",
        memory_tip:
          "de-（向下剥离）+ rive（river=河流）→ 从河流里舀水出来。deprive（de-向下+prive=私人）→ 从你手里抢走财产。",
        chinese_confusion:
          "中文没有专门强调'来源导向'的获取动词，'derive from nature' 学生脑内翻成'从自然获得'，丢失了 derive 的'提取/推导'含义。",
      },
    ],
  },

  // ── 3. 表明类 ──────────────────────────────────────────────────────────
  {
    slug: "indicate",
    group_name: "表明类",
    semantic_core: "显示 / 指示 / 证明",
    confusion_level: 9,
    one_sentence_diff:
      "indicate 是迹象指向（间接推断），demonstrate 是摆出证据（直接证明），reveal 是掀开帷幕（从隐藏到公开）。",
    words: [
      {
        word: "indicate",
        pos: "v.",
        definition: "通过迹象或数据间接指出某事物的存在或趋势",
        semantic_difference:
          "不直接说'这就是真相'，而是'数据/线索暗示了某事可能是真的'。暗示间接性和不确定性，是科学写作中的谨慎措辞。",
        intensity: 4,
        formality: "正式",
        emotion: "中性/谨慎",
        collocations: [
          "as the name indicates",
          "evidence indicates that",
          "clearly indicate",
          "indicate a shift",
        ],
        exam_sentence:
          "Recent studies indicate a significant decline in biodiversity worldwide.",
        memory_tip:
          "in-（指向）+ dic（dict=说）+ ate → 用手指着说。index（食指/索引）→ 食指指出方向。",
        chinese_confusion:
          "考研阅读中，indicate 暗示答案需要推断（作者没说但暗示了），demonstrate 暗示答案在文中直接呈现。",
      },
      {
        word: "demonstrate",
        pos: "v.",
        definition: "通过实例、实验或行动直观地证明某事物",
        semantic_difference:
          "摆出来给你看——通过可见的证据（实验、演示、具体案例）来证明。比 indicate 确定性强得多，比 reveal 更积极主动。",
        intensity: 8,
        formality: "正式",
        emotion: "正面/自信",
        collocations: [
          "clearly demonstrate",
          "demonstrate the ability to",
          "demonstrate the effectiveness",
          "as demonstrated by",
        ],
        exam_sentence:
          "The experiment clearly demonstrates the link between stress and health.",
        memory_tip:
          "de-（完全）+ monstrate（展示）→ 完完整整展示出来。demonstration（示威游行）→ 走上街头'展示'诉求。",
        chinese_confusion:
          "中文'表明''证明''显示'日常中混用，但英语中 demonstrate 的证明力度远高于 indicate。阅读理解态度题中力度差异是解题关键。",
      },
      {
        word: "reveal",
        pos: "v.",
        definition: "揭示之前未知或隐藏的真相或信息",
        semantic_difference:
          "关键语义：从隐藏到公开。揭示的信息之前是未知的、隐藏的或保密的。有一种'揭开帷幕'的戏剧感。",
        intensity: 7,
        formality: "中等",
        emotion: "揭秘/戏剧感",
        collocations: [
          "reveal the truth",
          "reveal a secret",
          "reveal the identity",
          "it was revealed that",
        ],
        exam_sentence:
          "The investigation revealed widespread corruption within the agency.",
        memory_tip:
          "re-（反向）+ veal（velum=面纱）→ 把面纱掀回去露出真容。veil（面纱）→ reveal（掀开面纱）。新娘掀盖头的画面。",
        chinese_confusion:
          "reveal 的'揭秘感'在态度题中暗示作者用这个词时有'曝光/揭露'的立场，比 show/indicate 带有更强的价值判断。",
      },
    ],
  },

  // ── 4. 确保类 ──────────────────────────────────────────────────────────
  {
    slug: "ensure",
    group_name: "确保类",
    semantic_core: "保证 / 确认",
    confusion_level: 10,
    one_sentence_diff:
      "ensure 是动手去做以保证结果，assure 是动嘴去说以消除疑虑，guarantee 是拍胸脯担责——不行就兜底。",
    words: [
      {
        word: "ensure",
        pos: "v.",
        definition: "采取行动使某事一定发生或不发生（行动导向）",
        semantic_difference:
          "你做某事以保证结果。主语通常是有行动能力的人或措施。与 assure 的区别：ensure 保证的是'事'，assure 安抚的是'人'。",
        intensity: 8,
        formality: "正式",
        emotion: "可靠/确定",
        collocations: [
          "ensure that",
          "ensure safety",
          "ensure compliance",
          "take steps to ensure",
        ],
        exam_sentence:
          "Governments must take measures to ensure equal access to education.",
        memory_tip:
          "en-（使）+ sure（确定）→ 使某事确定发生。做事用 ensure，哄人用 assure，投保用 insure。",
        chinese_confusion:
          "ensure/assure/insure 三者混淆——考研高频失分点：做事（ensure）、哄人（assure）、投保（insure）。",
      },
      {
        word: "assure",
        pos: "v.",
        definition: "用言语向某人保证以消除其疑虑或担忧（人际导向）",
        semantic_difference:
          "消除的是人的心理疑虑，而非保证客观事件的发生。作用是安抚人的心情。宾语必须是人。",
        intensity: 5,
        formality: "中等",
        emotion: "温暖/安抚",
        collocations: [
          "assure sb that",
          "assure sb of sth",
          "I can assure you",
          "rest assured",
        ],
        exam_sentence:
          "I can assure you that every precaution has been taken.",
        memory_tip:
          "as-（朝向）+ sure（安心）→ 朝着某人让他安心。拍着肩膀说 'I assure you, it'll be fine'。",
        chinese_confusion:
          "中文'我保证…'既可以对事也可以对人，但英语中 assure 必须有人作宾语（assure YOU），学生屡屡写出 'assure the success'。",
      },
      {
        word: "guarantee",
        pos: "v. / n.",
        definition: "对结果做出庄严承诺，通常附带责任或赔偿条件",
        semantic_difference:
          "承诺+责任：不仅保证结果，还暗示没做到说话人愿承担责任。比 ensure 更进一步：ensure 是我尽量去做，guarantee 是不行我兜底。",
        intensity: 9,
        formality: "正式",
        emotion: "强烈承诺/法律味",
        collocations: [
          "guarantee that",
          "money-back guarantee",
          "guarantee the right to",
          "no guarantee",
        ],
        exam_sentence:
          "The constitution guarantees every citizen the right to a fair trial.",
        memory_tip:
          "guarantee → warranty（保修单）→ 商家 guarantee 产品三年不坏，坏了免费修。有代价的承诺——没做到要赔钱。",
        chinese_confusion:
          "中文'保证'不区分'我努力去确保'和'我承诺并对后果负责'。法律/商业类文章中对 guarantee 的理解影响判断题得分。",
      },
    ],
  },

  // ── 5. 构成类 ──────────────────────────────────────────────────────────
  {
    slug: "comprise",
    group_name: "组成类",
    semantic_core: "构成 / 包含",
    confusion_level: 10,
    one_sentence_diff:
      "comprise 是袋子装了苹果（整体→部分），compose 是苹果组成了袋子（部分→整体），constitute 是这些在法律上构成那个。",
    words: [
      {
        word: "comprise",
        pos: "v.",
        definition: "由若干部分构成一个整体（整体作主语）",
        semantic_difference:
          "整体 comprise 部分。英语中最被误用的动词之一。主动态：整体作主语。被动式 be comprised of 语义等同。",
        intensity: 3,
        formality: "高度正式/学术",
        emotion: "纯中性",
        collocations: [
          "be comprised of",
          "comprise the majority",
          "together comprise",
        ],
        exam_sentence:
          "The committee comprises twelve leading experts in the field.",
        memory_tip:
          "com-（一起）+ prise（prehendere=抓住）→ 把多个东西抓在一起。prison → 把犯人关在一起。comprise → 监狱 comprise 500 inmates。",
        chinese_confusion:
          "这组词是考研完形填空的'终极BOSS'。中文'由…组成''包括''包含'覆盖了四个英语词的全部语义，但主被动态方向差异极大。",
      },
      {
        word: "constitute",
        pos: "v.",
        definition: "若干部分/因素联合起来在法律或本质上形成整体",
        semantic_difference:
          "不只是物理上拼在一起，更暗示'这些加起来等于'。通常从部分出发。抽象程度高于其他三个词，法律语境高频。",
        intensity: 6,
        formality: "高度正式/学术",
        emotion: "权威/官方",
        collocations: [
          "constitute a crime",
          "constitute a threat",
          "constitute a violation",
          "what constitutes",
        ],
        exam_sentence:
          "Such actions constitute a clear violation of international law.",
        memory_tip:
          "con-（一起）+ stitute（statuere=站立/设立）→ 把东西立起来。constitution（宪法）→ 一堆条款立起来 = 国家的基本构成。",
        chinese_confusion:
          "中文'构成'既用于物理拼装也用于法律认定，学生无法感知 constitute 的'法律/正式认定'意味。",
      },
      {
        word: "compose",
        pos: "v.",
        definition: "若干部分组合形成一个整体（侧重创作/组合过程）",
        semantic_difference:
          "部分 compose 整体。与 comprise 方向相反。还承载'创作'含义（compose music/a poem），这是其他三个词没有的。",
        intensity: 3,
        formality: "中等",
        emotion: "中性/创作感",
        collocations: [
          "be composed of",
          "compose music",
          "compose a letter",
          "compose oneself",
        ],
        exam_sentence:
          "Water is composed of hydrogen and oxygen atoms.",
        memory_tip:
          "com-（一起）+ pose（放）→ 把东西放在一起。composer（作曲家）→ 把音符放在一起 → 创作交响乐。",
        chinese_confusion:
          "中文'组成'没有方向性（'A组成B'和'B由A组成'意思一样），但英语中 compose 的主动态方向（部分→整体）与中文直觉相反。",
      },
    ],
  },

  // ── 6. 争论类 ──────────────────────────────────────────────────────────
  {
    slug: "argue",
    group_name: "争论类",
    semantic_core: "辩论 / 主张 / 争执",
    confusion_level: 8,
    one_sentence_diff:
      "argue 是拿着证据陈词（理性论证），debate 是双方交替交火（结构化对抗），dispute 是争一个具体的标的物（利益冲突）。",
    words: [
      {
        word: "argue",
        pos: "v.",
        definition: "以理性论证的方式提出并捍卫一个观点",
        semantic_difference:
          "学术语境中是正面词，表示'提出论据支持立场'。与 debate 的区别：argue 是我有立场我给你看证据，debate 是双方各自有立场来回交锋。",
        intensity: 7,
        formality: "正式",
        emotion: "理性/坚定",
        collocations: [
          "argue convincingly",
          "argue that",
          "argue for/against",
          "it could be argued that",
        ],
        exam_sentence:
          "The author argues that economic growth alone cannot guarantee happiness.",
        memory_tip:
          "argue → argument（论据）→ 写 argumentative essay（议论文）时你是在 argue，不是在吵架。学术 argue = 把论据摆上台面的理性行为。",
        chinese_confusion:
          "中文'争论'暗示情绪化和冲突，但英语学术语境中的 argue 是高度理性化的'论证'。学生看到 'The author argues that...' 时如果理解为'作者在吵架'，则完全误解文章基调。",
      },
      {
        word: "debate",
        pos: "n. / v.",
        definition: "就一个有争议的话题进行结构化的对抗性讨论",
        semantic_difference:
          "至少有两个明确的对立立场，在规则下进行思想交锋。强调双方/多方来回的对抗动态。比 argue 更偏正式场合（议会、学术界、公开辩论）。",
        intensity: 6,
        formality: "正式",
        emotion: "对抗/智力交锋",
        collocations: [
          "heated debate",
          "ongoing debate",
          "spark a debate",
          "public debate",
        ],
        exam_sentence:
          "There is an ongoing debate about the ethics of artificial intelligence.",
        memory_tip:
          "de-（向下/完全）+ bate（batter=打/击）→ 双方互相'打'回去。debate → battle → 思想上的战斗。debate club = 用大脑格斗的俱乐部。",
        chinese_confusion:
          "英语中 debate 暗示更结构化和正式的对抗（时政辩论、学术论战），而 argue 可以是任何强度的论证。",
      },
      {
        word: "dispute",
        pos: "n. / v.",
        definition: "对某事物的真实性、合法性或正确性提出正式质疑",
        semantic_difference:
          "不仅是不同意，更是'我认为你说的/做的不对或不合法'。总有一个具体的争议标的物（一笔钱、一块地、一个事实认定）。比 argue/debate 更偏法律/商业对抗。",
        intensity: 8,
        formality: "高度正式/学术",
        emotion: "对抗/冲突",
        collocations: [
          "legal dispute",
          "in dispute",
          "beyond dispute",
          "dispute the claim",
        ],
        exam_sentence:
          "The two companies are involved in a legal dispute over patent rights.",
        memory_tip:
          "dis-（分离/否定）+ pute（putare=思考）→ 思考结果不一样 → 各执一词。compute（计算）→ 会计两边算出来的数对不上 → 纠纷。",
        chinese_confusion:
          "中文'纠纷''争论''抗议'三个词覆盖了 dispute 的语义域，但 dispute 在法律/商业语境中的'正式争议'意味没有直接对应。",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

export function getGroupBySlug(slug: string): SynonymGroup | undefined {
  return groups.find((g) => g.slug === slug.toLowerCase());
}

export function getGroupByWord(word: string): SynonymGroup | undefined {
  const lower = word.toLowerCase();
  return groups.find((g) =>
    g.words.some((w) => w.word.toLowerCase() === lower),
  );
}

export function getAllSlugs(): string[] {
  return groups.map((g) => g.slug);
}

export function getAllWords(): { word: string; slug: string; groupName: string }[] {
  return groups.flatMap((g) =>
    g.words.map((w) => ({ word: w.word, slug: g.slug, groupName: g.group_name })),
  );
}
