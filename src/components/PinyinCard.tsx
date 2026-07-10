import { useState } from "react";
import type { PinyinItem } from "../types/pinyin";
import { assetPath } from "../utils/asset";
import AudioButton from "./AudioButton";

export default function PinyinCard({ item }: { item: PinyinItem }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="practice-card pinyin-card p-5 text-center">
      <div className="pinyin-card-copy">
        <p className="eyebrow-pill text-base">{item.name}</p>
        <div className="pinyin-display">{item.symbol}</div>
        <p className="text-2xl font-black text-slate-900">{item.keyword}</p>
        <p className="mt-1 text-lg font-semibold text-slate-600">{item.rhyme}</p>
      </div>
      <div className="pinyin-card-media">
        {!imageFailed && (
          <img
            alt={item.keyword}
            className="h-24 w-24 rounded-3xl object-contain"
            onError={() => setImageFailed(true)}
            src={assetPath(item.image)}
          />
        )}
        {imageFailed && (
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-100 to-teal-50 px-2 text-sm font-bold text-slate-600">
            图片待补充
          </div>
        )}
        <div>
          <AudioButton src={item.audio} />
        </div>
      </div>
    </article>
  );
}
