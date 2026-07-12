import { useState } from "react";
import AppHeader from "../components/AppHeader";
import AudioButton from "../components/AudioButton";
import BigButton from "../components/BigButton";
import { syllables } from "../data/syllables";
import type { SyllableItem } from "../types/pinyin";

const preferred = syllables.filter((item) => item.word); const randomPool = preferred.length > 0 ? preferred : syllables;
function pickRandom(current?: SyllableItem | null) { if (randomPool.length <= 1) return randomPool[0] ?? null; let next = randomPool[Math.floor(Math.random() * randomPool.length)]; while (next.id === current?.id) next = randomPool[Math.floor(Math.random() * randomPool.length)]; return next; }

export default function RandomPracticePage() {
  const [item, setItem] = useState<SyllableItem | null>(() => pickRandom());
  return <div className="practice-page"><AppHeader title="随机练习" /><p className="practice-page__hint">每次抽一组拼读，反复听读更熟练。</p>{item ? <section className="practice-card practice-card--focus compact-practice-card random-practice text-center"><p className="eyebrow-pill text-base">读一读</p><div className="pinyin-display">{item.pinyin}</div>{item.word ? <div className="pinyin-word">{item.word}</div> : <p className="pinyin-rhyme">先读准拼音</p>}<div className="random-practice__actions"><AudioButton src={item.audio} /><BigButton onClick={() => setItem(pickRandom(item))}>下一个</BigButton></div></section> : <p className="surface-card p-6 text-center text-xl font-black text-slate-600">这里暂时没有拼读内容。</p>}</div>;
}
