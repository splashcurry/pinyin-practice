import { useState } from "react";
import type { PinyinItem } from "../types/pinyin";
import { assetPath } from "../utils/asset";
import { playAudio } from "../utils/audio";
import AudioButton from "./AudioButton";

export default function PinyinCard({ item }: { item: PinyinItem }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className="practice-card cursor-pointer p-6 text-center"
      onClick={() => playAudio(item.audio)}
    >
      <p className="eyebrow-pill text-base">{item.name}</p>
      <div className="pinyin-display mt-4 text-[92px]">{item.symbol}</div>
      <p className="mt-4 text-2xl font-black text-slate-900">{item.keyword}</p>
      <p className="mt-1 text-lg font-semibold text-slate-500">{item.rhyme}</p>
      {!imageFailed && (
        <img
          alt={item.keyword}
          className="mx-auto mt-5 h-28 w-28 rounded-3xl object-contain"
          onError={() => setImageFailed(true)}
          src={assetPath(item.image)}
        />
      )}
      {imageFailed && (
        <div className="mx-auto mt-5 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-100 to-teal-50 text-sm font-bold text-slate-500">
          图片待补充
        </div>
      )}
      <div className="mt-5">
        <AudioButton src={item.audio} />
      </div>
    </article>
  );
}
