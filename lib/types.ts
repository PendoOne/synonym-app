// ---------------------------------------------------------------------------
// 考研英语 AI 同义词辨析 — 全局类型定义
// ---------------------------------------------------------------------------

export interface SynonymWord {
  word: string;
  core_meaning: string;
  semantic_difference: string;
  strength_level: number; // 1-10
  formality_level: string;
  emotion_color: string;
  exam_context: string[];
  collocations: string[];
  common_mistakes: string[];
  one_sentence_difference: string;
  chinese_confusion_reason: string;
  memory_tip: string;
}

export interface SynonymGroup {
  group_name: string;
  semantic_core: string;
  words: SynonymWord[];
  confusion_level: number; // 1-10
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  groupName: string;
}

export interface SearchResult {
  word: string;
  groupName: string;
  group: SynonymGroup;
  matchType: "exact" | "related";
}
