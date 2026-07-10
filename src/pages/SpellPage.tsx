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
  const [initial, setInitial] = useState("b");
  const [index, setIndex] = useState(0);
  const [tone, setTone] = useState<Tone>(1);
  const bases = useMemo(() => syllableBases.filter((item) => item.initial === initial), [initial]);

  useEffect(() => {
    setIndex(0);
  }, [initial]);

  function findSyllable(base: SyllableBase) {
    return syllables.find((item) => item.id === `${base.id}${tone}`);
  }

  return (
    <>
      <AppHeader title="拼读练习" />
      <section className="mb-4">
        <h2 className="mb-3 text-xl font-black text-slate-950">选择声母</h2>
        <div className="initial-selector grid grid-cols-5 gap-2">
          {initials.map((item) => {
            const disabled = !syllableBases.some((base) => base.initial === item);
            return (
              <button
                className={`min-h-12 px-2 text-lg font-black transition active:scale-[0.98] ${
                  item === initial ? "choice-pill-selected" : "choice-pill"
                } ${disabled ? "opacity-40" : ""}`}
                disabled={disabled}
                key={item}
                onClick={() => setInitial(item)}
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>
      <CardPractice
        getKey={(item) => item.id}
        getLabel={(item) => buildPlainPinyin(item.initial, item.final)}
        index={index}
        items={bases}
        onIndexChange={setIndex}
        renderCard={(base) => {
          const syllable = findSyllable(base);
          return (
            <section className="practice-card compact-practice-card p-6 text-center">
              <p className="eyebrow-pill text-base">{buildPlainPinyin(base.initial, base.final)}</p>
              {syllable ? (
                <>
                  <div className="pinyin-display my-6 text-[96px]">{syllable.pinyin}</div>
                  {syllable.word && <div className="mb-5 text-5xl font-black text-slate-950">{syllable.word}</div>}
                  {!syllable.word && <p className="mb-5 text-lg font-bold text-slate-500">先读准拼音</p>}
                  <AudioButton label="听拼读" src={syllable.audio} />
                </>
              ) : (
                <p className="py-8 text-2xl font-black text-slate-600">这个组合我们后面再学</p>
              )}
            </section>
          );
        }}
      />
      <section className="practice-options mt-5">
        <h2 className="mb-3 text-xl font-black text-slate-950">选择声调</h2>
        <ToneSelector onChange={setTone} value={tone} />
      </section>
    </>
  );
}
