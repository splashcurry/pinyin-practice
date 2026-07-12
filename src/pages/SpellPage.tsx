import { useEffect, useMemo, useState } from "react";
import AppHeader from "../components/AppHeader";
import AudioButton from "../components/AudioButton";
import CardPractice from "../components/CardPractice";
import ToneSelector from "../components/ToneSelector";
import { initials } from "../data/initials";
import { syllableBases, syllables } from "../data/syllables";
import type { SyllableBase, Tone } from "../types/pinyin";
import { buildPlainPinyin } from "../utils/tone";

export default function SpellPage() {
  const [initial, setInitial] = useState("b"); const [index, setIndex] = useState(0); const [tone, setTone] = useState<Tone>(1);
  const bases = useMemo(() => syllableBases.filter((item) => item.initial === initial), [initial]);
  useEffect(() => { setIndex(0); }, [initial]);
  const findSyllable = (base: SyllableBase) => syllables.find((item) => item.id === `${base.id}${tone}`);
  return <div className="practice-page"><AppHeader title="拼读练习" /><p className="practice-page__hint">选声母和声调，把拼音完整地读出来。</p>
    <section className="practice-options practice-options--initial"><h2>选择声母</h2><div className="initial-selector grid grid-cols-5 gap-2">{initials.map((item) => { const disabled = !syllableBases.some((base) => base.initial === item); return <button className={item === initial ? "choice-pill-selected" : "choice-pill"} disabled={disabled} key={item} onClick={() => setInitial(item)} type="button">{item}</button>; })}</div></section>
    <CardPractice getKey={(item) => item.id} getLabel={(item) => buildPlainPinyin(item.initial, item.final)} index={index} items={bases} onIndexChange={setIndex} renderCard={(base) => { const syllable = findSyllable(base); return <section className="practice-card practice-card--focus compact-practice-card text-center"><p className="eyebrow-pill text-base">{buildPlainPinyin(base.initial, base.final)}</p>{syllable ? <><div className="pinyin-display">{syllable.pinyin}</div>{syllable.word ? <div className="pinyin-word">{syllable.word}</div> : <p className="pinyin-rhyme">先读准拼音</p>}<AudioButton label="听拼读" src={syllable.audio} /></> : <p className="practice-empty">这个组合我们后面再学</p>}</section>; }} />
    <section className="practice-options"><h2>选择声调</h2><ToneSelector onChange={setTone} value={tone} /></section>
  </div>;
}
