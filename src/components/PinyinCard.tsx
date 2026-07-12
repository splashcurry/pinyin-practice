import type { PinyinItem } from "../types/pinyin";
import AudioButton from "./AudioButton";

export default function PinyinCard({ item }: { item: PinyinItem }) {
  return <article className="practice-card practice-card--pinyin pinyin-card text-center">
    <p className="eyebrow-pill text-base">{item.name}</p>
    <div className="pinyin-display">{item.symbol}</div>
    <p className="pinyin-keyword">{item.keyword}</p>
    <p className="pinyin-rhyme">{item.rhyme}</p>
    <AudioButton src={item.audio} />
  </article>;
}
