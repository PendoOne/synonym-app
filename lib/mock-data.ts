// ---------------------------------------------------------------------------
// Mock Data — 6组高频易混词 (MVP)
// 数据源: TOP100高频易混同义词组.json + 人工语义标注
// ---------------------------------------------------------------------------

import { SynonymGroup } from "./types";

export const synonymGroups: SynonymGroup[] = [
  // -----------------------------------------------------------------------
  // Group 1: 影响类
  // -----------------------------------------------------------------------
  {
    group_name: "影响类",
    semantic_core: "产生影响/改变",
    confusion_level: 9,
    words: [
      {
        word: "affect",
        core_meaning: "直接作用于对象，引起情绪或状态变化",
        semantic_difference:
          "侧重'直接作用'和'情感层面'。暗示因果链条中即刻可见的改变结果。与 influence 的关键区别在于：affect 是'一拳打上去就有反应'，不经过缓慢渗透。",
        strength_level: 6,
        formality_level: "中等偏正式",
        emotion_color: "中性偏负面（高频搭配负面结果）",
        exam_context: [
          "阅读理解因果分析题（X affects Y → 直接因果关系，答案线索）",
          "完形填空中与 effect 的词性辨析（affect=v., effect=n.）",
          "社会科学、心理学类文章高频出现",
        ],
        collocations: [
          "adversely affect 产生不利影响",
          "directly affect 直接影响",
          "affect the outcome 影响结果",
          "significantly affect 显著影响",
        ],
        common_mistakes: [
          "与 effect 混淆：effect 作名词意为'效果'，作动词意为'实现/引起'而非'影响'",
          "误加 to → 'affect to sth' 是错的，正确为 'affect sth'",
        ],
        one_sentence_difference:
          "affect 强调直接作用于对象并产生可观察变化（多为情绪或负面），influence 侧重潜移默化的间接塑造，impact 暗示冲击性的强力作用，alter 只关心'变了没有'不关心力度。",
        chinese_confusion_reason:
          "中文'影响'一词同时覆盖 affect（直接作用）和 influence（间接渗透），导致学生无法感知'一拳打脸' vs '水流慢慢渗透'的英语语感差异。",
        memory_tip:
          "A-force → 一股力量直接打上去。联想：「A 拳打脸」→ 立刻有反应。同根词：affection（感情）→ 情感被触碰。",
      },
      {
        word: "influence",
        core_meaning: "通过潜移默化的方式塑造思想、行为或发展方向",
        semantic_difference:
          "强调'间接'和'渐进'的作用过程。常涉及思想、观点、行为的长期塑造，不强调即时可见结果，而关注持续的影响力渗透。与 impact 不同，influence 不暗示强烈冲击感。",
        strength_level: 5,
        formality_level: "正式",
        emotion_color: "中性偏正面（常用于正面影响力的描述）",
        exam_context: [
          "社科人文类文章（社会影响、文化影响、意识形态影响）",
          "人物传记类（某人对后代/某领域的影响）",
          "观点态度题（谁影响了作者的观点形成）",
          "教育心理学类高频核心词",
        ],
        collocations: [
          "exert influence on 对…施加影响",
          "profound influence 深远影响",
          "under the influence of 在…的影响下",
          "political/cultural influence 政治/文化影响力",
        ],
        common_mistakes: [
          "抽象意义中 influence 通常不可数，'many influences' 不自然",
          "混淆 'influence on' 和 'influence to'：正确为 influence on/upon",
        ],
        one_sentence_difference:
          "influence 是'润物细无声'——水流慢慢渗入改变你；impact 是'彗星撞地球'——轰的一声不可忽视。",
        chinese_confusion_reason:
          "中文'影响（力）'把动词和名词含义合并成同一个词，导致学生用 'influence sb to do' 这种错误结构。（influence 后直接加名词或加 on，不用 to do）",
        memory_tip:
          "in-（进入）+ flu（flow=流）→ 像水流一样渗入。同源词：influenza（流感病毒悄悄入侵身体）、fluid（流体）。水流哲学：不急不慢，慢慢改变河道。",
      },
      {
        word: "impact",
        core_meaning: "强烈的、通常是突然的、冲击性的影响",
        semantic_difference:
          "语气四词中最强。强调'力度'和'撞击感'，暗示影响是显著的、有时是突发的。与 alter 不同，impact 不关心改变结果本身，而关注'撞击式的作用力'。名词用法远多于动词用法。",
        strength_level: 9,
        formality_level: "半正式",
        emotion_color: "强烈/戏剧性（常暗示重大或毁灭性后果）",
        exam_context: [
          "环境科学类（environmental impact 环境影响评估）",
          "经济类文章（economic impact of recession 经济衰退的冲击）",
          "科技类（the impact of AI on employment 人工智能对就业的冲击）",
          "主旨大意题（某事件/趋势的'重大影响'往往是正确答案关键词）",
        ],
        collocations: [
          "far-reaching impact 深远影响",
          "environmental/social impact 环境/社会影响",
          "have a profound impact on 对…产生深远影响",
          "impact assessment 影响评估",
        ],
        common_mistakes: [
          "过度使用——在只需要温和表达的语境中用 impact 过于强烈（如 'the book impacted me' → 应改用 influenced）",
          "'impact on' 冗余使用：正式写作中 'have an impact on' 比 'impact on sth' 更稳妥",
        ],
        one_sentence_difference:
          "impact 是四词中'力量感的天花板'——暗示撞击式的、不可忽视的强力作用；affect 是中性直接作用；influence 是软性渗透；alter 只问'变没变'。",
        chinese_confusion_reason:
          "中文把'重大影响'翻译为 important influence，但英语的 impact 强调的是'冲击力'而非'重要性'。考研阅读中识别 impact 的力度判断是作者态度题的解题关键。",
        memory_tip:
          "im-（加强）+ pact（拍→ pact=拍击）→ 猛拍上去！联想：小行星撞击地球的冲击波——不是风吹，是撞击。",
      },
      {
        word: "alter",
        core_meaning: "部分地、具体地改变某物的性质、外观或结构",
        semantic_difference:
          "alter 与前三词的根本差异：它聚焦于'改变本身的行为和结果'，而非'影响的过程'。不关心通过什么方式、用了多大力，只关心'变了'这个事实。在四词中，alter 最不关注'影响力'，最关注'变化结果'。语气比 change 更正式。",
        strength_level: 4,
        formality_level: "正式（学术和技术语境高频出现）",
        emotion_color: "中性/客观——纯粹的描述性词汇，适合学术写作",
        exam_context: [
          "科技类说明文（alter the structure/data 改变结构/数据）",
          "生物医学类（alter the gene expression 改变基因表达）",
          "社会科学类（alter the balance of power 改变权力平衡）",
          "细节题（某因素是否 altered 了某状态 → 精确判断）",
        ],
        collocations: [
          "fundamentally alter 根本性地改变",
          "alter the course of 改变…的进程",
          "alter one's perception 改变某人的认知",
          "significantly alter 显著改变",
        ],
        common_mistakes: [
          "把 alter 当 change 的全等替换词 → alter 暗示'局部修改'（裁缝改衣服），'alter my job' 是错误的（改用 change jobs）",
          "拼写混淆：alter（改变） vs altar（祭坛），只差一个字母",
        ],
        one_sentence_difference:
          "alter 说的是'东西被改成了什么样'（改变的结果）；affect/influence/impact 说的是'用了多大的力去推它'（作用的方式和力度）。",
        chinese_confusion_reason:
          "中文'改变'同时覆盖 alter（局部修改，如'改衣服'）、change（通用更换，如'换工作'）、transform（彻底转变，如'变形金刚'）。学生背单词时把三者当同义词压缩存储，导致阅读理解中的精确歧义失分。",
        memory_tip:
          "alter → alteration（服装修改）→ 裁缝在衣服上'局部改动'：换颗纽扣、改短裤腿，不是重做整件。altar（祭坛）差一个字母，别上错了供桌。",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Group 2: 获得类
  // -----------------------------------------------------------------------
  {
    group_name: "获得类",
    semantic_core: "获取/得到",
    confusion_level: 9,
    words: [
      {
        word: "acquire",
        core_meaning: "通过持续努力、学习或购买逐步获得有价值的东西",
        semantic_difference:
          "强调'渐进积累'和'获得物的价值感'。acquire 暗示需要时间、努力或投入。与 obtain 的核心区别：acquire 更偏'习得/养成'的渐进过程，obtain 更偏'一次性获取'的结果。",
        strength_level: 5,
        formality_level: "正式",
        emotion_color: "正面（暗示增长、进步、积累）",
        exam_context: [
          "教育/语言学习类（acquire knowledge/language）",
          "商业并购类（acquire a company 收购公司）",
          "个人发展类（acquire skills/habits）",
        ],
        collocations: [
          "acquire knowledge 获取知识",
          "acquire a language 习得一门语言",
          "acquire a company 收购公司",
          "acquire a taste for 养成对…的爱好",
        ],
        common_mistakes: [
          "把 acquire 当 get 的万能替换——acquire 暗示'过程性'和'价值感'，'acquire a cold' 是错的（get a cold 才是'感冒'）",
        ],
        one_sentence_difference:
          "acquire 是'慢慢攒出来的'（时间+努力），obtain 是'一次拿到的'（结果导向），gain 是'逐渐增加的'（量变导向），derive 是'从源头提取的'（来源导向）。",
        chinese_confusion_reason: "中文'获得'不区分过程性（慢慢积累）和结果性（一次性得到），导致 acquire/obtain/gain 混用。",
        memory_tip: "ac-（加强）+ quire（quest=寻求）→ 不断寻求最终获得。联想：acquisition（收购）→ 整个公司慢慢变成你的。",
      },
      {
        word: "obtain",
        core_meaning: "通过正式渠道、努力或请求获得某物（结果导向）",
        semantic_difference:
          "强调'获得的结果'而非过程。obtain 暗示有一个正式的、有时是困难的获取过程，但焦点在'到手了'。比 acquire 更偏一次性动作，比 gain 更偏正式渠道。",
        strength_level: 4,
        formality_level: "高度正式/学术",
        emotion_color: "中性（纯粹的描述性词汇，不带情感色彩）",
        exam_context: [
          "科研论文类（obtain data/results 获得数据/结果）",
          "法律/行政类（obtain permission/visa 获得许可/签证）",
          "正式书面语体标志词",
        ],
        collocations: [
          "obtain information 获取信息",
          "obtain permission 获得许可",
          "obtain a degree 获得学位",
          "obtain results 获得结果",
        ],
        common_mistakes: [
          "过于正式的语体用于日常场景——'I obtained a coffee' 非常不自然（用 got/bought）",
        ],
        one_sentence_difference:
          "obtain = 通过正式渠道'拿到手了'，结果已达成；acquire = '在攒的过程中'，价值和能力在增长。",
        chinese_confusion_reason: "中文'获得'不区分渠道正式与否，学生常把 obtain（走流程/填表获取）和 get（随便拿到）划等号。",
        memory_tip: "ob-（朝向）+ tain（tenere=持有）→ 伸向某物并握在手里。联想：tain 家族—contain（装在里面）、maintain（维持在手里）、retain（保留在手里）。",
      },
      {
        word: "gain",
        core_meaning: "逐渐增加地获得（数量、重量、经验、优势等可量化/可感知的东西）",
        semantic_difference:
          "gain 的核心是'增量'。与 acquire 不同，gain 更偏数量/程度上的累积增长，而非技能/知识的习得。与 obtain 不同，gain 不强调'一次性获取'，而强调'逐渐增多'。",
        strength_level: 4,
        formality_level: "中等偏正式",
        emotion_color: "正面（暗示进步、收益、提升）",
        exam_context: [
          "经济/商业类（gain profits/market share 获得利润/市场份额）",
          "个人成长类（gain experience/confidence 获得经验/信心）",
          "科学类（gain a better understanding 获得更好的理解）",
        ],
        collocations: [
          "gain access to 获得…的使用权",
          "gain weight/experience 增加体重/获得经验",
          "gain an advantage 获得优势",
          "gain insight into 深入了解",
        ],
        common_mistakes: [
          "gain 不与具体物品搭配（'gain a book' 错误，用 get/obtain）",
        ],
        one_sentence_difference:
          "gain = 秤上的数字在涨（增量感）；acquire = 技能树在点亮（积累感）；obtain = 快递已签收（结果感）。",
        chinese_confusion_reason: "中文'获得'不区分'增量型获取'和'取得型获取'，gain 的'逐渐增加'语义在中文里无对应词汇。",
        memory_tip: "gain → 联想到体重秤 gain weight（长胖）→ 数字逐渐往上跳。gain 的东西通常是可量化的增量。",
      },
      {
        word: "derive",
        core_meaning: "从某个来源/源头提取、推导或获得（强调来源导向）",
        semantic_difference:
          "derive 与前三词的根本不同：它不仅是'获得'，更强调'从何处获得'。derive 总暗示有一个清晰的来源或起点。在学术写作中，derive 常用来表示'推导出'或'来源于'。",
        strength_level: 3,
        formality_level: "高度正式/学术",
        emotion_color: "纯学术中性（不含任何情感色彩）",
        exam_context: [
          "学术论文类（derive a formula/conclusion 推导公式/结论）",
          "词源/语言类（derive from Latin 源于拉丁语）",
          "逻辑推理类（derive meaning from context 从上下文推导含义）",
        ],
        collocations: [
          "derive from 来源于/从…提取",
          "derive benefit from 从…中获益",
          "derive pleasure 获得乐趣",
          "derive a conclusion 推导结论",
        ],
        common_mistakes: [
          "混淆 derive 和 deprive（剥夺）——拼写差一个字母，意思完全相反",
          "derive 几乎总是和 from 搭配使用，单独使用不自然",
        ],
        one_sentence_difference:
          "derive = '从矿里挖出来的'（强调来源）；acquire/obtain/gain = '手里现在有的'（强调拥有）。derive 的特点是总让你追问：from where？",
        chinese_confusion_reason: "中文没有专门强调'来源导向'的获取动词，'derive from nature' 学生脑内翻成'从自然获得'，丢失了 derive 的'提取/推导'含义。",
        memory_tip: "derive → de-（向下剥离）+ rive（river=河流）→ 从河流里舀水出来用。联想：river（河）→derive（从河里取水）→ 水是有源头的。deprive（de-向下+prive=私人）→ 从你手里抢走私人财产 = 剥夺。",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Group 3: 表明类
  // -----------------------------------------------------------------------
  {
    group_name: "表明类",
    semantic_core: "显示/指示/证明",
    confusion_level: 9,
    words: [
      {
        word: "indicate",
        core_meaning: "通过迹象或数据间接指出某事物的存在或趋势",
        semantic_difference:
          "indicate 是'迹象指向'——它不直接说'这就是真相'，而是'数据/线索暗示了某件事可能是真的'。与 demonstrate 的核心区别：indicate 暗示间接性和不确定性，demonstrate 暗示直接性和确定性。",
        strength_level: 4,
        formality_level: "正式",
        emotion_color: "中性/谨慎（科学写作中的谨慎措辞）",
        exam_context: [
          "科学研究类（results indicate that... 结果表明…）",
          "数据图表类（the figure indicates a trend 图表指示了趋势）",
          "作者暗示类（what does the author indicate? → 推断题）",
        ],
        collocations: [
          "as the name indicates 顾名思义",
          "evidence indicates that 证据表明",
          "clearly indicate 清楚表明",
          "indicate a shift 表明转变",
        ],
        common_mistakes: [
          "把 indicate 当 show 的万能高级替换——indicate 的间接性在需要直接陈述时不适用",
        ],
        one_sentence_difference:
          "indicate = 温度计指向了发烧（间接迹象→推断）；demonstrate = 医生当众解剖给你看（直接展示→证明）。",
        chinese_confusion_reason:
          "中文'表明'不区分'迹象推断'和'直接证明'。考研阅读中，indicate 暗示答案需要推断（作者没说但暗示了），demonstrate 暗示答案在文中直接呈现。",
        memory_tip: "in-（指向）+ dic（dict=说）+ ate → 用手指着说。联想：index（食指/索引）→ 食指指出方向 → indicate 是'用数据/迹象指出方向'。",
      },
      {
        word: "demonstrate",
        core_meaning: "通过实例、实验或行动直观地证明某事物",
        semantic_difference:
          "demonstrate 是'摆出来给你看'——它不仅是表明，更是通过可见的证据（实验、演示、具体案例）来证明。比 indicate 确定性强得多，比 reveal 更积极主动，比 illustrate 更强调'证明'而非'解释'。",
        strength_level: 8,
        formality_level: "正式",
        emotion_color: "正面/自信（暗示确定性、说服力）",
        exam_context: [
          "科学研究类（experiments demonstrate that... 实验证明…）",
          "议论文类（the author demonstrates his point by... 作者通过…论证观点）",
          "语法/写作类（as demonstrated above 如上所述/所示）",
        ],
        collocations: [
          "clearly demonstrate 清楚证明",
          "demonstrate the ability to 展示…的能力",
          "demonstrate the effectiveness 证明有效性",
          "as demonstrated by 如…所示",
        ],
        common_mistakes: [
          "demonstrate 后接从句必须用 that（不可省略），'The study demonstrates this method works' 不规范",
        ],
        one_sentence_difference:
          "demonstrate = 把证据摆在你面前让你亲眼看到（确定性高）；indicate = 用迹象告诉你那边可能有东西（不确定性高）。",
        chinese_confusion_reason: "中文'表明'、'证明'、'显示'三个词在日常中混用，但英语中 demonstrate 的'证明力度'远高于 indicate。阅读理解作者态度题中这个力度差异是解题关键。",
        memory_tip: "de-（完全）+ monstrate（monstrare=展示）→ 完完整整展示出来。联想：demonstration（示威游行）→ 走上街头'展示'诉求。democracy 不是同源但听着像 → 民主就是把观点展示出来。",
      },
      {
        word: "reveal",
        core_meaning: "揭示之前未知或隐藏的真相/信息",
        semantic_difference:
          "reveal 的关键语义成分是'从隐藏到公开'。与 indicate 和 demonstrate 的核心区别：reveal 暗示被揭示的信息之前是'未知的、隐藏的或保密的'。有一种'揭开帷幕'的戏剧感。",
        strength_level: 7,
        formality_level: "中等偏正式",
        emotion_color: "戏剧性/揭秘感（暗示重要信息被公开）",
        exam_context: [
          "研究结果类（the study reveals a shocking truth 研究揭示惊人真相）",
          "调查报道类（the investigation revealed corruption 调查揭露腐败）",
          "主旨题/态度题（what does the passage reveal about...）",
        ],
        collocations: [
          "reveal the truth 揭示真相",
          "reveal a secret 揭露秘密",
          "reveal the identity 揭示身份",
          "it was revealed that 据透露",
        ],
        common_mistakes: [
          "reveal 后接双宾语时不用 to（'reveal me the secret' 错误，应为 'reveal the secret to me'）",
        ],
        one_sentence_difference:
          "reveal = 掀开魔术师的黑布让你看里面（从隐藏→公开）；demonstrate = 魔术师现场表演给你看（从抽象→具体）；indicate = 魔术师的微表情出卖了他（从迹象→推断）。",
        chinese_confusion_reason: "中文'揭示'和'显示'在翻译题中互换使用，但 reveal 的'揭秘感'在态度题中暗示作者用这个词时有'曝光/揭露'的立场。",
        memory_tip: "re-（反向/回去）+ veal（velum=面纱）→ 把面纱掀回去 → 露出真容。联想：veil（面纱）→ reveal（掀开面纱）。新娘掀盖头的画面。",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Group 4: 确保类
  // -----------------------------------------------------------------------
  {
    group_name: "确保类",
    semantic_core: "保证/确认",
    confusion_level: 10,
    words: [
      {
        word: "ensure",
        core_meaning: "采取行动使某事一定发生/不发生（行动导向）",
        semantic_difference:
          "ensure 的关键是'行动'——你做某事以保证结果。主语通常是有行动能力的人或措施。与 assure 的区别：ensure 保证的是'事'，assure 安抚的是'人'。与 guarantee 的区别：ensure 偏过程管理，guarantee 偏结果承诺。",
        strength_level: 8,
        formality_level: "正式",
        emotion_color: "可靠/确定（暗示负责和承诺）",
        exam_context: [
          "政策/措施类（to ensure safety/fairness 以确保安全/公平）",
          "教育类（ensure equal access to education 确保教育公平）",
          "科学类（ensure accuracy of data 确保数据准确性）",
        ],
        collocations: [
          "ensure that 确保…（后接从句）",
          "ensure safety/quality 确保安全/质量",
          "ensure compliance 确保合规",
          "take steps to ensure 采取措施确保",
        ],
        common_mistakes: [
          "ensure/assure/insure 三者混淆——考研高频失分点：ensure=确保事情发生，assure=向人保证让人放心，insure=买保险",
          "'ensure sb to do sth' 是错误的，正确为 'ensure that sb does sth'",
        ],
        one_sentence_difference:
          "ensure = 你动手去做以保证结果（行动）；assure = 你动嘴去说以消除疑虑（言语）；guarantee = 你拍胸脯担责（承诺+赔偿）。",
        chinese_confusion_reason:
          "中文'保证'同时覆盖行动保证（ensure）、口头保证（assure）、合同保证（guarantee）、买保险（insure），四个英语词的中文翻译都在'保证'周围徘徊，导致学生脑内混成一锅粥。",
        memory_tip: "en-（使）+ sure（确定）→ 使某事确定发生。sure 家族：ensure（动手确保事）、assure（动嘴安抚人）、insure（买保险防风险）。记住：做事用 ensure，哄人用 assure，投保用 insure。",
      },
      {
        word: "assure",
        core_meaning: "用言语向某人保证以消除其疑虑或担忧（人际导向）",
        semantic_difference:
          "assure 的关键是'人际沟通'——它消除的是人的心理疑虑，而非保证客观事件的发生。主语是人，宾语也是人（assure sb of sth / assure sb that...）。与 ensure 的核心区别：assure 的作用对象是'人的心情'，ensure 的作用对象是'事情的走向'。",
        strength_level: 5,
        formality_level: "中等偏正式",
        emotion_color: "温暖/安抚（暗示关怀和信任建立）",
        exam_context: [
          "人际沟通类（I can assure you that... 我可以向你保证…）",
          "商务信函类（assure you of our commitment 确保我们对您的承诺）",
          "完形填空中的近义词辨析题高频考点",
        ],
        collocations: [
          "assure sb that 向某人保证",
          "assure sb of sth 向某人确保某事",
          "I can assure you 我可以向你保证",
          "rest assured 尽管放心",
        ],
        common_mistakes: [
          "把 assure 当 ensure 用——'assure safety' 错误（应用 ensure safety），assure 的对象是人不是事",
          "'assure that sth will happen'（没有人为对象）不规范",
        ],
        one_sentence_difference:
          "assure = '你放心，我盯着呢'（对人的心理安抚）；ensure = 你已经把门锁了三道（对事的客观保障）。",
        chinese_confusion_reason:
          "中文'我保证…'既可以对事（'我保证这事能成'）也可以对人（'我向你保证'），但英语中 assure 必须有人作为宾语（assure YOU），学生屡屡写出 'assure the success' 这种错误。",
        memory_tip: "as-（朝向）+ sure（安心）→ 朝着某人让他安心。联想：碰到紧张的朋友，拍着他的肩膀说 'I assure you, it'll be fine'——你在 assuage（减轻）他的焦虑。",
      },
      {
        word: "guarantee",
        core_meaning: "对结果做出庄严承诺，通常附带责任或赔偿条件（法律/商业导向）",
        semantic_difference:
          "guarantee 的核心是'承诺+责任'——它不仅保证结果，还暗示如果结果没达成，说话人愿意承担责任。比 ensure 更进一步：ensure 是'我做我能做的去保证'，guarantee 是'我拍胸脯说肯定行，不行我负责'。语气在三词中最强。",
        strength_level: 9,
        formality_level: "正式（商业和法律语境高频词）",
        emotion_color: "强烈承诺/不容置疑（暗示法律约束力）",
        exam_context: [
          "商业/法律类（money-back guarantee 退款保证）",
          "宪法/权利类（guarantee freedom of speech 保障言论自由）",
          "产品/质量类（quality guarantee 质量保证）",
        ],
        collocations: [
          "guarantee that 保证…",
          "money-back guarantee 退款保证",
          "guarantee the right to 保障…的权利",
          "no guarantee 无法保证",
        ],
        common_mistakes: [
          "口语中过度使用 guarantee——日常琐事用 guarantee 过于沉重（'I guarantee the food is good' → 不如用 'I'm sure'）",
        ],
        one_sentence_difference:
          "guarantee = '不行我兜底'（承诺+责任后果）；ensure = '我尽量让这事成'（行动努力）；assure = '你放心别焦虑'（心理安抚）。guarantee 是三者中唯一的'有法律味'的词。",
        chinese_confusion_reason: "中文'保证'不区分'我努力去确保'和'我承诺并对后果负责'的差异。考研法律/商业类文章中对 guarantee 的精确理解影响判断题得分。",
        memory_tip: "guarantee → 联想到 warranty（保修单）→ 商家 guarantee 产品三年不坏，坏了免费修。guarantee = 有代价的承诺——没做到要赔钱。",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Group 5: 争论类
  // -----------------------------------------------------------------------
  {
    group_name: "争论类",
    semantic_core: "辩论/主张/争执",
    confusion_level: 8,
    words: [
      {
        word: "argue",
        core_meaning: "以理性论证的方式提出并捍卫一个观点",
        semantic_difference:
          "argue 的核心是'论证'而非'吵架'。在学术语境中，argue 是非常正面的词，表示'提出论据支持某个立场'。与 debate 的区别：argue 是'我有立场，我给你看证据'，debate 是'双方各自有立场，来回交锋'。与 dispute 的区别：argue 偏理性论证，dispute 偏对抗性质疑。",
        strength_level: 7,
        formality_level: "正式（学术语境）",
        emotion_color: "理性/坚定（学术写作中是中性正面词）",
        exam_context: [
          "议论文/学术类（the author argues that... 作者论证说…）",
          "态度判断题（what is the author arguing? → 作者的核心论点是？）",
          "逻辑推理题（to argue his point, the author uses... 作者用…论证观点）",
        ],
        collocations: [
          "argue convincingly 有说服力地论证",
          "argue that 论证说（后接从句）",
          "argue for/against 支持/反对…的论证",
          "it could be argued that 可以说/有人认为",
        ],
        common_mistakes: [
          "把 argue 老理解为'争吵'——考研阅读中 argue = 论证，不是骂街",
          "'argue about sth for hours' 才是'为某事争论不休'（有 about 才是吵架义）",
        ],
        one_sentence_difference:
          "argue = 法庭上的律师拿着证据陈词（理性论证）；debate = 辩论赛正反方交替发言（结构化的对抗）；dispute = 两个邻居为篱笆界线吵架（具体事件的争执）。",
        chinese_confusion_reason:
          "中文'争论'暗示情绪化和冲突，但英语学术语境中的 argue 是高度理性化的'论证'。学生看到 'The author argues that...' 时如果理解为'作者在吵架'，则完全误解文章基调。",
        memory_tip: "argue → argument（论据）→ 写 argumentative essay（议论文）时你是在 argue，不是在吵架。学术 argue = 把论据摆上台面的理性行为。",
      },
      {
        word: "debate",
        core_meaning: "就一个有争议的话题进行结构化的、通常是对抗性的讨论",
        semantic_difference:
          "debate 的核心是'结构性对抗'——至少有两个（通常是明确的）对立立场，在一定的规则下进行思想交锋。与 argue 不同：debate 强调'双方/多方来回'的对抗动态，argue 更侧重'单方阐述论证'的静态行为。debate 也更偏正式场合（议会、学术界、公开辩论）。",
        strength_level: 6,
        formality_level: "正式",
        emotion_color: "对抗性/智力交锋感（中性偏正面）",
        exam_context: [
          "热点议题类（the debate over climate change 关于气候变化的论战）",
          "学术争议类（a long-standing debate 长期争论）",
          "结构分析题（how is the debate structured in the passage）",
        ],
        collocations: [
          "heated debate 激烈争论",
          "ongoing debate 持续进行的争论",
          "spark a debate 引发争论",
          "public debate 公开辩论",
          "debate over sth 关于…的辩论",
        ],
        common_mistakes: [
          "'debate about' → 正确为 'debate over/on' — debate 不用 about 搭配",
        ],
        one_sentence_difference:
          "debate = 拳击台上你一拳我一拳（多个立场交替交锋）；argue = 一个人站在台上做 TED 演讲（单方说理）。debate 是动态交战，argue 是静态陈词。",
        chinese_confusion_reason: "中文'辩论'和'争论'区分度低，但英语中 debate 暗示更结构化和正式的对抗（时政辩论、学术论战），而 argue 可以是任何强度的论证。",
        memory_tip: "de-（向下/完全）+ bate（batter=打/击）→ 双方互相'打'回去。联想：debate → battle（战斗）→ 思想上的战斗。debate club（辩论社）= 用大脑格斗的俱乐部。",
      },
      {
        word: "dispute",
        core_meaning: "对某事物的真实性、合法性或正确性提出正式质疑/挑战",
        semantic_difference:
          "dispute 的核心是'质疑合法性/真实性'——它不仅是'不同意'，更是'我认为你说的/做的不对或不合法'。与 argue 和 debate 的核心区别：dispute 暗示有一个具体的争议标的物（一笔钱、一块地、一个事实认定），而 argue/debate 可以是纯粹的思想/观点争议。",
        strength_level: 8,
        formality_level: "正式（法律和商务语境）",
        emotion_color: "对抗性/冲突性（常暗示利益对立）",
        exam_context: [
          "法律/商业类（legal dispute 法律纠纷, contract dispute 合同争议）",
          "事实争议类（dispute the accuracy of the report 质疑报告的准确性）",
          "国际关系类（territorial dispute 领土争端）",
        ],
        collocations: [
          "legal/border dispute 法律/边界纠纷",
          "in dispute 有争议的",
          "beyond dispute 毋庸置疑",
          "dispute the claim 对主张提出异议",
          "resolve a dispute 解决纠纷",
        ],
        common_mistakes: [
          "把 dispute 当成 disagree 的升级版——dispute 暗示有具体的争议对象和更正式的对立关系",
        ],
        one_sentence_difference:
          "dispute = '这账单不对，我不认'（针对具体标的物的对抗性争议）；argue = '我来论证为什么这个理论是对的'（观点+证据的理性阐述）。dispute 总是关于一个'东西'（钱、权、事实），argue 可以是关于一个'想法'。",
        chinese_confusion_reason:
          "中文'纠纷'、'争论'、'抗议'三个词覆盖了 dispute 的语义域，但 dispute 在法律/商业语境中的'正式争议'意味没有直接对应，导致学生低估其对抗强度和正式程度。",
        memory_tip: "dis-（分离/否定）+ pute（putare=思考/计算）→ 思考的结果不一样 → 两边各执一词。联想：dispute → compute（计算）→ 会计两边算出来的数对不上 → 纠纷。",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Group 6: 构成类 (confusion_level=10)
  // -----------------------------------------------------------------------
  {
    group_name: "组成类",
    semantic_core: "构成/包含",
    confusion_level: 10,
    words: [
      {
        word: "comprise",
        core_meaning: "由若干部分构成一个整体（整体作主语或宾语均可）",
        semantic_difference:
          "comprise 是英语中最被误用的动词之一。核心语义：整体 comprise 部分（The team comprises 11 players）。也接受被动式：be comprised of。与 compose 的关系最纠缠：compose 是'部分构成整体'，comprise 是'整体包含部分'，但 comprise 的被动式和 compose 的主动式用法渐趋重叠。",
        strength_level: 3,
        formality_level: "高度正式/学术",
        emotion_color: "纯中性描述",
        exam_context: [
          "学术描述类（the committee comprises 12 members 委员会由12人组成）",
          "完形填空近义词辨析（comprise/compose/consist/constitute 四选一）",
          "图表描述类写作",
        ],
        collocations: [
          "be comprised of 由…组成",
          "comprise the majority 占大多数",
          "together comprise 共同构成",
        ],
        common_mistakes: [
          "'comprise of'（无 be）——'The team comprises of 11 players' 是经典错误，应为 'comprises 11 players' 或 'is comprised of 11 players'",
          "comprise 和 compose 的主动/被动方向搞反",
        ],
        one_sentence_difference:
          "comprise = 袋子装了苹果（整体→部分，主动态）；compose = 苹果组成了袋子（部分→整体，主动时主语是部分）；consist = 袋子是由苹果做的（整体→部分，但必须加 of）；constitute = 这些苹果在法律意义上'构成'了一个袋子（正式/抽象）。",
        chinese_confusion_reason:
          "中文'由…组成'、'包括'、'包含'三个结构覆盖了这四个英语词的全部语义，但英语中主被动态方向、是否可以拆开等用法差异极大。这组词是考研完形填空的'终极BOSS'。",
        memory_tip: "com-（一起）+ prise（prehendere=抓住）→ 把多个东西抓在一起成为一个整体。联想：prison（监狱）→ 把犯人关在一起；comprise → 把关在一起的犯人看作一个整体 = 这个监狱 comprises 500 inmates。",
      },
      {
        word: "constitute",
        core_meaning: "若干部分/因素联合起来在法律、规则或本质上形成某个整体或结果",
        semantic_difference:
          "constitute 的核心是'构成的法律/本质意义'——它不只是物理上拼在一起，更暗示'这些部分加起来等于'。与 comprise 不同：constitute 通常从部分出发（部分 constitute 整体），而 comprise 通常从整体出发。constitute 的抽象程度高于其他三个词。",
        strength_level: 6,
        formality_level: "高度正式/学术（法律语境高频词）",
        emotion_color: "权威/官方（暗示正式认定）",
        exam_context: [
          "法律/宪法类（constitute a crime/violation 构成犯罪/违规）",
          "社会科学类（constitute a threat 构成威胁）",
          "学术类（constitute a significant contribution 构成重要贡献）",
        ],
        collocations: [
          "constitute a crime 构成犯罪",
          "constitute a threat 构成威胁",
          "constitute a violation 构成违规",
          "what constitutes... 什么是/什么构成…",
        ],
        common_mistakes: [
          "把 constitute 当 compose 用——constitute 太正式且偏抽象，日常'组成'场景不适用",
        ],
        one_sentence_difference:
          "constitute = '这几条加起来，在法律上就是犯罪了'（抽象/法律上的构成认定）；comprise = '这个团队有12个人'（物理/数量上的包含关系）。constitute 是法官判案用的，comprise 是清点人数用的。",
        chinese_confusion_reason: "中文'构成'既用于物理拼装也用于法律认定，学生无法感知 constitute 的'法律/正式认定'意味，在阅读理解法律类文章时可能误解严肃程度。",
        memory_tip: "con-（一起）+ stitute（statuere=站立/设立）→ 把东西一起立起来形成什么。联想：constitution（宪法）→ 一堆条款立起来 = 国家的基本构成。institute（学院）→ 把学者立在一起。constitute = 在纸面上/法律上'立起来'一个概念。",
      },
      {
        word: "compose",
        core_meaning: "若干部分组合形成一个整体（侧重创作/组合过程）",
        semantic_difference:
          "compose 的核心语义方向是从部分到整体：部分 compose 整体。与 comprise 的方向相反。此外，compose 还承载'创作'含义（compose music/a poem），这是其他三个词没有的。被动式 be composed of 在语义上等同于 comprise 的主动式。",
        strength_level: 3,
        formality_level: "中等偏正式",
        emotion_color: "中性（带创作/艺术感）",
        exam_context: [
          "组成描述类（be composed of 由…组成）",
          "艺术/音乐类（compose a symphony 创作交响乐）",
          "学术写作类（compose an essay 撰写文章）",
        ],
        collocations: [
          "be composed of 由…组成",
          "compose music/poetry 创作音乐/诗歌",
          "compose a letter 写信",
          "compose oneself 使自己镇定",
        ],
        common_mistakes: [
          "'is composed with' → 正确为 'is composed of'",
          "主动语态方向：A compose B → A 是部分，B 是整体（与中文语序相反）",
        ],
        one_sentence_difference:
          "compose = 音符拼成交响乐（部分→整体+创作感）；comprise = 交响乐团有120人（整体→部分+统计感）。主动态时方向完全相反。",
        chinese_confusion_reason: "中文'组成'没有方向性（'A组成B'和'B由A组成'意思一样），但英语中 compose 的主动态方向（部分→整体）与中文直觉相反。",
        memory_tip: "com-（一起）+ pose（放）→ 把东西放在一起。联想：composer（作曲家）→ 把音符放在一起 → 创作交响乐。pose（姿势）→ 把手脚放在特定位置。compose = 创作式地拼装。",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

/** 按 word 查找对应 group */
export function findGroupByWord(word: string): SynonymGroup | undefined {
  const lower = word.toLowerCase();
  return synonymGroups.find((g) =>
    g.words.some((w) => w.word.toLowerCase() === lower),
  );
}

/** 获取所有独立单词（去重） */
export function getAllWords(): string[] {
  const set = new Set<string>();
  synonymGroups.forEach((g) => g.words.forEach((w) => set.add(w.word)));
  return Array.from(set);
}

/** 搜索匹配的单词和词组 */
export function searchWords(query: string): {
  word: string;
  groupName: string;
  group: SynonymGroup;
}[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];
  const results: {
    word: string;
    groupName: string;
    group: SynonymGroup;
  }[] = [];
  synonymGroups.forEach((g) => {
    g.words.forEach((w) => {
      if (w.word.toLowerCase().includes(lower)) {
        results.push({ word: w.word, groupName: g.group_name, group: g });
      }
    });
  });
  return results;
}
