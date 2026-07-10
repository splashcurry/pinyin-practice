import { useState } from "react";
import AppHeader from "../components/AppHeader";
import AudioButton from "../components/AudioButton";
import BigButton from "../components/BigButton";
import { syllables } from "../data/syllables";
import type { SyllableItem } from "../types/pinyin";

const preferred = syllables.filter((item) => item.word);
const randomPool = preferred.length > 0 ? preferred : syllables;

function pickRandom(current?: SyllableItem | null) {
  if (randomPool.length <= 1) {
    return randomPool[0] ?? null;
  }
  let next = randomPool[Math.floor(Math.random() * randomPool.length)];
  while (next.id === current?.id) {
    next = randomPool[Math.floor(Math.random() * randomPool.length)];
  }
  return next;
}

export default function RandomPracticePage() {
  const [item, setItem] = useState<SyllableItem | null>(() => pickRandom());

  return (
    <>
      <AppHeader title="随机练习" />
      {item ? (
        <section className="practice-card compact-practice-card p-6 text-center">
          <p className="eyebrow-pill text-base">读一读</p>
          <div className="pinyin-display my-5 text-[96px]">{item.pinyin}</div>
          {item.word && <div className="mb-5 text-5xl font-black text-slate-950">{item.word}</div>}
          {!item.word && <p className="mb-5 text-lg font-bold text-slate-500">先读准拼音</p>}
          <div className="grid gap-3">
            <AudioButton src={item.audio} />
            <BigButton onClick={() => setItem(pickRandom(item))}>下一个</BigButton>
          </div>
        </section>
      ) : (
        <p className="surface-card p-6 text-center text-xl font-black text-slate-600">这里暂时没有拼读内容。</p>
      )}
    </>
  );
}
