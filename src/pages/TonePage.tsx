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
          <section className="rounded-lg bg-white p-5 text-center shadow-sm">
            <p className="text-lg font-bold text-orange-700">{final.name}</p>
            <div className="my-4 text-[92px] font-bold leading-none text-orange-600">
              {markFinalTone(final.symbol, tone)}
            </div>
            <AudioButton src={getToneAudioPath(final.id, tone)} />
          </section>
        )}
      />
      <section className="mt-5">
        <h2 className="mb-3 text-xl font-bold">选择声调</h2>
        <ToneSelector onChange={setTone} value={tone} />
      </section>
    </>
  );
}
