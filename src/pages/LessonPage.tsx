import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AudioButton from "../components/AudioButton";
import BigButton from "../components/BigButton";
import CardPractice from "../components/CardPractice";
import PinyinCard from "../components/PinyinCard";
import { lessons } from "../data/lessons";
import { singleItems } from "../data/singleItems";
import { syllables } from "../data/syllables";
import type { SyllableItem } from "../types/pinyin";

function pickRandom(items: SyllableItem[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function LessonPage() {
  const { id } = useParams();
  const lesson = lessons.find((item) => item.id === id);
  const lessonSingles = useMemo(() => singleItems.filter((item) => lesson?.singles.includes(item.id)), [lesson]);
  const lessonSyllables = useMemo(() => syllables.filter((item) => lesson?.syllables.includes(item.id)), [lesson]);
  const [singleIndex, setSingleIndex] = useState(0);
  const [randomItem, setRandomItem] = useState<SyllableItem | null>(null);

  if (!lesson) {
    return (
      <>
        <AppHeader title="课程练习" />
        <p className="surface-card p-6 text-center text-xl font-black text-slate-600">没有找到这节课</p>
      </>
    );
  }

  function nextRandom() {
    if (lessonSyllables.length > 0) {
      setRandomItem(pickRandom(lessonSyllables));
    }
  }

  return (
    <>
      <AppHeader title="课程练习" />
      <section className="surface-card p-5">
        <div className="eyebrow-pill">第 {lesson.id} 课</div>
        <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">{lesson.title}</h2>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-500">{lesson.description}</p>
      </section>
      <section className="mt-5">
        <h2 className="mb-3 text-xl font-black text-slate-950">先听一听</h2>
        <CardPractice
          getKey={(item) => item.id}
          getLabel={(item) => item.symbol}
          index={singleIndex}
          items={lessonSingles}
          onIndexChange={setSingleIndex}
          renderCard={(item) => <PinyinCard item={item} />}
        />
      </section>
      <section className="mt-5">
        <h2 className="mb-3 text-xl font-black text-slate-950">拼一拼</h2>
        {lessonSyllables.length > 0 ? (
          <div className="grid gap-3">
            {lessonSyllables.map((item) => (
              <div className="surface-card flex items-center justify-between gap-3 p-4" key={item.id}>
                <div>
                  <span className="text-4xl font-black text-orange-600">{item.pinyin}</span>
                  {item.word && <span className="ml-3 text-3xl font-black text-slate-950">{item.word}</span>}
                </div>
                <AudioButton label="听" src={item.audio} />
              </div>
            ))}
          </div>
        ) : (
          <p className="surface-card p-4 text-center text-lg font-bold text-slate-500">本课主要练习认读</p>
        )}
      </section>
      <section className="surface-card mt-5 p-5 text-center">
        <h2 className="mb-3 text-xl font-black text-slate-950">随机练一练</h2>
        {lessonSyllables.length > 0 ? (
          <>
            {randomItem && (
              <div className="mb-4">
                <div className="pinyin-display text-[78px]">{randomItem.pinyin}</div>
                {randomItem.word && <div className="text-5xl font-black text-slate-950">{randomItem.word}</div>}
                <div className="mt-3"><AudioButton src={randomItem.audio} /></div>
              </div>
            )}
            <BigButton onClick={nextRandom}>{randomItem ? "下一个" : "开始"}</BigButton>
          </>
        ) : (
          <p className="text-lg font-bold text-slate-500">本课还没有拼读随机练习。</p>
        )}
      </section>
    </>
  );
}
