export type PinyinType = "initial" | "final" | "whole";

export type Tone = 1 | 2 | 3 | 4;

export interface PinyinItem {
  id: string;
  symbol: string;
  type: PinyinType;
  name: string;
  keyword: string;
  rhyme: string;
  image: string;
  audio: string;
}

export interface FinalItem {
  id: string;
  symbol: string;
  name: string;
  group: "single" | "compound" | "nasal" | "special";
  audioPrefix: string;
}

export interface SyllableBase {
  id: string;
  initial: string;
  final: string;
}

export interface SyllableItem extends SyllableBase {
  tone: Tone;
  pinyin: string;
  word?: string;
  audio: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  singles: string[];
  initials: string[];
  finals: string[];
  syllables: string[];
}
