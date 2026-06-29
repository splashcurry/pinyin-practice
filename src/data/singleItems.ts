import type { PinyinItem, PinyinType } from "../types/pinyin";

type RawSingle = {
  id: string;
  symbol: string;
  type: PinyinType;
  name: string;
  keyword: string;
  rhyme: string;
};

const rawSingles: RawSingle[] = [
  { id: "b", symbol: "b", type: "initial", name: "声母 b", keyword: "菠萝", rhyme: "菠萝菠萝 b b b" },
  { id: "p", symbol: "p", type: "initial", name: "声母 p", keyword: "泼水", rhyme: "泼水泼水 p p p" },
  { id: "m", symbol: "m", type: "initial", name: "声母 m", keyword: "摸门", rhyme: "摸门摸门 m m m" },
  { id: "f", symbol: "f", type: "initial", name: "声母 f", keyword: "风车", rhyme: "风车风车 f f f" },
  { id: "d", symbol: "d", type: "initial", name: "声母 d", keyword: "大鼓", rhyme: "大鼓大鼓 d d d" },
  { id: "t", symbol: "t", type: "initial", name: "声母 t", keyword: "梯子", rhyme: "梯子梯子 t t t" },
  { id: "n", symbol: "n", type: "initial", name: "声母 n", keyword: "小门", rhyme: "一个门洞 n n n" },
  { id: "l", symbol: "l", type: "initial", name: "声母 l", keyword: "小棍", rhyme: "一根小棍 l l l" },
  { id: "g", symbol: "g", type: "initial", name: "声母 g", keyword: "鸽子", rhyme: "鸽子鸽子 g g g" },
  { id: "k", symbol: "k", type: "initial", name: "声母 k", keyword: "蝌蚪", rhyme: "蝌蚪蝌蚪 k k k" },
  { id: "h", symbol: "h", type: "initial", name: "声母 h", keyword: "喝水", rhyme: "喝水喝水 h h h" },
  { id: "j", symbol: "j", type: "initial", name: "声母 j", keyword: "母鸡", rhyme: "母鸡母鸡 j j j" },
  { id: "q", symbol: "q", type: "initial", name: "声母 q", keyword: "气球", rhyme: "气球气球 q q q" },
  { id: "x", symbol: "x", type: "initial", name: "声母 x", keyword: "西瓜", rhyme: "西瓜西瓜 x x x" },
  { id: "zh", symbol: "zh", type: "initial", name: "声母 zh", keyword: "织毛衣", rhyme: "织毛衣 zh zh zh" },
  { id: "ch", symbol: "ch", type: "initial", name: "声母 ch", keyword: "吃苹果", rhyme: "吃苹果 ch ch ch" },
  { id: "sh", symbol: "sh", type: "initial", name: "声母 sh", keyword: "狮子", rhyme: "狮子狮子 sh sh sh" },
  { id: "r", symbol: "r", type: "initial", name: "声母 r", keyword: "太阳", rhyme: "日出日出 r r r" },
  { id: "z", symbol: "z", type: "initial", name: "声母 z", keyword: "写字", rhyme: "写字写字 z z z" },
  { id: "c", symbol: "c", type: "initial", name: "声母 c", keyword: "刺猬", rhyme: "刺猬刺猬 c c c" },
  { id: "s", symbol: "s", type: "initial", name: "声母 s", keyword: "蚕丝", rhyme: "蚕丝蚕丝 s s s" },
  { id: "y", symbol: "y", type: "initial", name: "声母 y", keyword: "衣服", rhyme: "衣服衣服 y y y" },
  { id: "w", symbol: "w", type: "initial", name: "声母 w", keyword: "乌鸦", rhyme: "乌鸦乌鸦 w w w" },

  { id: "a", symbol: "a", type: "final", name: "韵母 a", keyword: "阿姨", rhyme: "阿姨阿姨 a a a" },
  { id: "o", symbol: "o", type: "final", name: "韵母 o", keyword: "公鸡", rhyme: "公鸡打鸣 o o o" },
  { id: "e", symbol: "e", type: "final", name: "韵母 e", keyword: "天鹅", rhyme: "天鹅天鹅 e e e" },
  { id: "i", symbol: "i", type: "final", name: "韵母 i", keyword: "衣服", rhyme: "衣服衣服 i i i" },
  { id: "u", symbol: "u", type: "final", name: "韵母 u", keyword: "乌鸦", rhyme: "乌鸦乌鸦 u u u" },
  { id: "v", symbol: "ü", type: "final", name: "韵母 ü", keyword: "小鱼", rhyme: "小鱼小鱼 ü ü ü" },
  { id: "ai", symbol: "ai", type: "final", name: "韵母 ai", keyword: "挨着", rhyme: "挨着挨着 ai ai ai" },
  { id: "ei", symbol: "ei", type: "final", name: "韵母 ei", keyword: "诶呀", rhyme: "诶呀诶呀 ei ei ei" },
  { id: "ui", symbol: "ui", type: "final", name: "韵母 ui", keyword: "围巾", rhyme: "围巾围巾 ui ui ui" },
  { id: "ao", symbol: "ao", type: "final", name: "韵母 ao", keyword: "棉袄", rhyme: "棉袄棉袄 ao ao ao" },
  { id: "ou", symbol: "ou", type: "final", name: "韵母 ou", keyword: "海鸥", rhyme: "海鸥海鸥 ou ou ou" },
  { id: "iu", symbol: "iu", type: "final", name: "韵母 iu", keyword: "皮球", rhyme: "皮球皮球 iu iu iu" },
  { id: "ie", symbol: "ie", type: "final", name: "韵母 ie", keyword: "椰子", rhyme: "椰子椰子 ie ie ie" },
  { id: "ve", symbol: "üe", type: "final", name: "韵母 üe", keyword: "月亮", rhyme: "月亮月亮 üe üe üe" },
  { id: "er", symbol: "er", type: "final", name: "韵母 er", keyword: "耳朵", rhyme: "耳朵耳朵 er er er" },
  { id: "an", symbol: "an", type: "final", name: "韵母 an", keyword: "天安门", rhyme: "天安门 an an an" },
  { id: "en", symbol: "en", type: "final", name: "韵母 en", keyword: "摁门铃", rhyme: "摁门铃 en en en" },
  { id: "in", symbol: "in", type: "final", name: "韵母 in", keyword: "树荫", rhyme: "树荫树荫 in in in" },
  { id: "un", symbol: "un", type: "final", name: "韵母 un", keyword: "白云", rhyme: "白云白云 un un un" },
  { id: "vn", symbol: "ün", type: "final", name: "韵母 ün", keyword: "白云", rhyme: "白云白云 ün ün ün" },
  { id: "ang", symbol: "ang", type: "final", name: "韵母 ang", keyword: "昂头", rhyme: "昂头昂头 ang ang ang" },
  { id: "eng", symbol: "eng", type: "final", name: "韵母 eng", keyword: "台灯", rhyme: "台灯台灯 eng eng eng" },
  { id: "ing", symbol: "ing", type: "final", name: "韵母 ing", keyword: "老鹰", rhyme: "老鹰老鹰 ing ing ing" },
  { id: "ong", symbol: "ong", type: "final", name: "韵母 ong", keyword: "钟声", rhyme: "钟声钟声 ong ong ong" },

  { id: "zhi", symbol: "zhi", type: "whole", name: "整体认读音节 zhi", keyword: "蜘蛛", rhyme: "蜘蛛织网 zhi zhi zhi" },
  { id: "chi", symbol: "chi", type: "whole", name: "整体认读音节 chi", keyword: "吃饭", rhyme: "吃饭吃饭 chi chi chi" },
  { id: "shi", symbol: "shi", type: "whole", name: "整体认读音节 shi", keyword: "狮子", rhyme: "狮子狮子 shi shi shi" },
  { id: "ri", symbol: "ri", type: "whole", name: "整体认读音节 ri", keyword: "日出", rhyme: "日出日出 ri ri ri" },
  { id: "zi", symbol: "zi", type: "whole", name: "整体认读音节 zi", keyword: "写字", rhyme: "写字写字 zi zi zi" },
  { id: "ci", symbol: "ci", type: "whole", name: "整体认读音节 ci", keyword: "刺猬", rhyme: "刺猬刺猬 ci ci ci" },
  { id: "si", symbol: "si", type: "whole", name: "整体认读音节 si", keyword: "蚕丝", rhyme: "蚕丝蚕丝 si si si" },
  { id: "yi", symbol: "yi", type: "whole", name: "整体认读音节 yi", keyword: "衣服", rhyme: "衣服衣服 yi yi yi" },
  { id: "wu", symbol: "wu", type: "whole", name: "整体认读音节 wu", keyword: "乌鸦", rhyme: "乌鸦乌鸦 wu wu wu" },
  { id: "yu", symbol: "yu", type: "whole", name: "整体认读音节 yu", keyword: "小鱼", rhyme: "小鱼小鱼 yu yu yu" },
  { id: "ye", symbol: "ye", type: "whole", name: "整体认读音节 ye", keyword: "叶子", rhyme: "叶子叶子 ye ye ye" },
  { id: "yue", symbol: "yue", type: "whole", name: "整体认读音节 yue", keyword: "月亮", rhyme: "月亮月亮 yue yue yue" },
  { id: "yuan", symbol: "yuan", type: "whole", name: "整体认读音节 yuan", keyword: "圆圈", rhyme: "圆圈圆圈 yuan yuan yuan" },
  { id: "yin", symbol: "yin", type: "whole", name: "整体认读音节 yin", keyword: "音乐", rhyme: "音乐音乐 yin yin yin" },
  { id: "yun", symbol: "yun", type: "whole", name: "整体认读音节 yun", keyword: "白云", rhyme: "白云白云 yun yun yun" },
  { id: "ying", symbol: "ying", type: "whole", name: "整体认读音节 ying", keyword: "老鹰", rhyme: "老鹰老鹰 ying ying ying" },
];

export const singleItems: PinyinItem[] = rawSingles.map((item) => ({
  ...item,
  image: `/images/${item.id}.png`,
  audio: `/audio/single/${item.id}.mp3`,
}));
