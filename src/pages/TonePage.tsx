import { useState } from "react";
import AppHeader from "../components/AppHeader";
import AudioButton from "../components/AudioButton";
import CardPractice from "../components/CardPractice";
import ToneSelector from "../components/ToneSelector";
import { finals } from "../data/finals";
import type { Tone } from "../types/pinyin";
import { getToneAudioPath } from "../utils/audio";
import { markFinalTone } from "../utils/tone";

export default function TonePage() {
  const [index, setIndex] = useState(0);
  const [tone, setTone] = useState<Tone>(1);

  return (
    <>
      <AppHeader title="四声练习" />
      <CardPractice
        getKey={(item) => item.id}
        getLabel={(item) => item.symbol}
        index={index}
        items={finals}
        onIndexChange={setIndex}
        renderCard={(final) => (
          <section className="practice-card compact-practice-card p-6 text-center">
            <p className="eyebrow-pill text-base">{final.name}</p>
            <div className="pinyin-display my-6 text-[96px]">{markFinalTone(final.symbol, tone)}</div>
            <AudioButton src={getToneAudioPath(final.id, tone)} />
          </section>
        )}
      />
      <section className="practice-options mt-5">
        <h2 className="mb-3 text-xl font-black text-slate-950">选择声调</h2>
        <ToneSelector onChange={setTone} value={tone} />
      </section>
    </>
  );
}
