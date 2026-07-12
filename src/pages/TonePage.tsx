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
  const [index, setIndex] = useState(0); const [tone, setTone] = useState<Tone>(1);
  return <div className="practice-page page-practice-expanded"><AppHeader title="四声练习" /><p className="practice-page__hint">切换声调，听清每一个音的高低变化。</p>
    <CardPractice getKey={(item) => item.id} getLabel={(item) => item.symbol} index={index} items={finals} onIndexChange={setIndex} renderCard={(final) => <section className="practice-card practice-card--focus compact-practice-card text-center"><p className="eyebrow-pill text-base">{final.name}</p><div className="pinyin-display">{markFinalTone(final.symbol, tone)}</div><AudioButton src={getToneAudioPath(final.id, tone)} /></section>} />
    <section className="practice-options"><h2>选择声调</h2><ToneSelector onChange={setTone} value={tone} /></section>
  </div>;
}
