import type { SyllableBase, SyllableItem, Tone } from "../types/pinyin";
import { buildPinyin } from "../utils/tone";

const tones: Tone[] = [1, 2, 3, 4];

// 拼读练习使用合法基础音节表，不受 24 个韵母复习表限制。
// v 表示 ü，用于文件名和 id，例如 xve => xue。
const basesByInitial: Record<string, string[]> = {
  b: ["a", "ai", "an", "ang", "ao", "ei", "en", "eng", "i", "ian", "iao", "ie", "in", "ing", "o", "u"],
  p: ["a", "ai", "an", "ang", "ao", "ei", "en", "eng", "i", "ian", "iao", "ie", "in", "ing", "o", "ou", "u"],
  m: ["a", "ai", "an", "ang", "ao", "ei", "en", "eng", "i", "ian", "iao", "ie", "in", "ing", "iu", "o", "ou", "u"],
  f: ["a", "an", "ang", "ei", "en", "eng", "o", "ou", "u"],
  d: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ia", "ian", "iao", "ie", "ing", "iu", "ong", "ou", "u", "uan", "ui", "un", "uo"],
  t: ["a", "ai", "an", "ang", "ao", "e", "eng", "i", "ian", "iao", "ie", "ing", "ong", "ou", "u", "uan", "ui", "un", "uo"],
  n: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "i", "ian", "iang", "iao", "ie", "in", "ing", "iu", "ong", "ou", "u", "uan", "un", "uo", "v", "ve"],
  l: ["a", "ai", "an", "ang", "ao", "e", "ei", "eng", "i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iu", "ong", "ou", "u", "uan", "un", "uo", "v", "ve"],
  g: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
  k: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
  h: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
  j: ["i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "v", "van", "ve", "vn"],
  q: ["i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "v", "van", "ve", "vn"],
  x: ["i", "ia", "ian", "iang", "iao", "ie", "in", "ing", "iong", "iu", "v", "van", "ve", "vn"],
  zh: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
  ch: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "ong", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
  sh: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "ou", "u", "ua", "uai", "uan", "uang", "ui", "un", "uo"],
  r: ["an", "ang", "ao", "e", "en", "eng", "ong", "ou", "u", "uan", "ui", "un", "uo"],
  z: ["a", "ai", "an", "ang", "ao", "e", "ei", "en", "eng", "ong", "ou", "u", "uan", "ui", "un", "uo"],
  c: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "ong", "ou", "u", "uan", "ui", "un", "uo"],
  s: ["a", "ai", "an", "ang", "ao", "e", "en", "eng", "ong", "ou", "u", "uan", "ui", "un", "uo"],
  y: ["a", "an", "ang", "ao", "e", "i", "in", "ing", "o", "ong", "ou", "v", "van", "ve", "vn"],
  w: ["a", "ai", "an", "ang", "ei", "en", "eng", "o", "u"],
};

const exampleWords: Record<string, string> = {
  ba1: "八",
  ba2: "拔",
  ba3: "把",
  ba4: "爸",
  bi3: "笔",
  bu4: "不",
  ma1: "妈",
  ma2: "麻",
  ma3: "马",
  ma4: "骂",
  fa1: "发",
  fa3: "法",
  da4: "大",
  di4: "地",
  du2: "读",
  tu3: "土",
  ni3: "你",
  li4: "立",
  ge1: "哥",
  ke3: "可",
  he2: "河",
  ji1: "鸡",
  qi2: "旗",
  xi1: "西",
  zha1: "扎",
  zha2: "闸",
  zha3: "眨",
  zha4: "炸",
  chi1: "吃",
  shi1: "诗",
  ri4: "日",
  zi4: "字",
  ci2: "词",
  si1: "丝",
  xve2: "学",
};

export const syllableBases: SyllableBase[] = Object.entries(basesByInitial).flatMap(([initial, finals]) =>
  finals.map((final) => ({ id: `${initial}${final}`, initial, final })),
);

export const syllables: SyllableItem[] = syllableBases.flatMap((base) =>
  tones.map((tone) => {
    const id = `${base.id}${tone}`;
    return {
      ...base,
      id,
      tone,
      pinyin: buildPinyin(base.initial, base.final, tone),
      word: exampleWords[id],
      audio: `/audio/spell/${id}.mp3`,
    };
  }),
);
