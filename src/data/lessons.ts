import type { Lesson } from "../types/pinyin";

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "第 1 课：复习单韵母",
    description: "先把 a o e i u ü 读准，再练习听音跟读。",
    singles: ["a", "o", "e", "i", "u", "v"],
    initials: [],
    finals: ["a", "o", "e", "i", "u", "v"],
    syllables: [],
  },
  {
    id: "2",
    title: "第 2 课：b p m f 和 a 的拼读",
    description: "复习 b p m f，再练习 ba、pa、ma、fa 的四声。",
    singles: ["b", "p", "m", "f", "a"],
    initials: ["b", "p", "m", "f"],
    finals: ["a"],
    syllables: ["ba1", "ba2", "ba3", "ba4", "pa1", "pa2", "pa3", "pa4", "ma1", "ma2", "ma3", "ma4", "fa1", "fa2", "fa3", "fa4"],
  },
  {
    id: "3",
    title: "第 3 课：完整拼音复习",
    description: "按声母、韵母、整体认读和常见拼读进行综合复习。",
    singles: ["d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"],
    initials: ["d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"],
    finals: ["ai", "ei", "ui", "ao", "ou", "iu", "ie", "ve", "er", "an", "en", "in", "un", "vn", "ang", "eng", "ing", "ong"],
    syllables: ["zha1", "zha2", "zha3", "zha4", "ji1", "qi2", "xi1", "xve2"],
  },
];
