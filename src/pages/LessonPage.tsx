import { useMemo, useState } from "react";
import { MdMenuBook } from "react-icons/md";
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

function pickRandom(items: SyllableItem[]) { return items[Math.floor(Math.random() * items.length)]; }

export default function LessonPage() {
  const { id } = useParams(); const lesson = lessons.find((item) => item.id === id); const lessonSingles = useMemo(() => singleItems.filter((item) => lesson?.singles.includes(item.id)), [lesson]); const lessonSyllables = useMemo(() => syllables.filter((item) => lesson?.syllables.includes(item.id)), [lesson]); const [singleIndex, setSingleIndex] = useState(0); const [randomItem, setRandomItem] = useState<SyllableItem | null>(null);
  if (!lesson) return <div className="practice-page"><AppHeader title="课程练习" /><p className="surface-card p-6 text-center text-xl font-black text-slate-600">没有找到这节课。</p></div>;
  return <div className="practice-page"><AppHeader title="课程练习" /><section className="route-intro"><p><MdMenuBook aria-hidden="true" /> 第 {lesson.id} 课</p><h2>{lesson.title}</h2><span>{lesson.description}</span></section><section className="daily-practice"><h2>先听一听</h2><CardPractice getKey={(item) => item.id} getLabel={(item) => item.symbol} index={singleIndex} items={lessonSingles} onIndexChange={setSingleIndex} renderCard={(item) => <PinyinCard item={item} />} /></section><section className="lesson-section"><h2>拼一拼</h2>{lessonSyllables.length > 0 ? <div className="lesson-spell-list">{lessonSyllables.map((item) => <article key={item.id}><div><b>{item.pinyin}</b>{item.word && <strong>{item.word}</strong>}</div><AudioButton label="听读" src={item.audio} /></article>)}</div> : <p className="surface-card p-4 text-center text-lg font-bold text-slate-500">本课主要练习认读。</p>}</section><section className="lesson-random"><h2>随机练一组</h2>{lessonSyllables.length > 0 ? <>{randomItem && <div className="lesson-random__word"><b>{randomItem.pinyin}</b>{randomItem.word && <strong>{randomItem.word}</strong>}<AudioButton src={randomItem.audio} /></div>}<BigButton onClick={() => setRandomItem(pickRandom(lessonSyllables))}>{randomItem ? "下一个" : "开始"}</BigButton></> : <p>本课还没有拼读随机练习。</p>}</section></div>;
}
