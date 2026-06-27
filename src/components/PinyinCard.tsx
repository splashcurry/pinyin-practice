import { useState } from "react";
import type { PinyinItem } from "../types/pinyin";
import { assetPath } from "../utils/asset";
import { playAudio } from "../utils/audio";
import AudioButton from "./AudioButton";

export default function PinyinCard({ item }: { item: PinyinItem }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className="cursor-pointer rounded-lg bg-white p-5 text-center shadow-sm"
      onClick={() => playAudio(item.audio)}
    >
      <p className="text-base font-bold text-orange-700">{item.name}</p>
      <div className="mt-2 text-[86px] font-bold leading-none text-orange-600">{item.symbol}</div>
      <p className="mt-3 text-2xl font-bold">{item.keyword}</p>
      <p className="mt-1 text-lg text-stone-600">{item.rhyme}</p>
      {!imageFailed && (
        <img
          alt={item.keyword}
          className="mx-auto mt-4 h-28 w-28 rounded-lg object-contain"
          onError={() => setImageFailed(true)}
          src={assetPath(item.image)}
        />
      )}
      {imageFailed && (
        <div className="mx-auto mt-4 flex h-28 w-28 items-center justify-center rounded-lg bg-amber-100 text-stone-500">
          图片待补充
        </div>
      )}
      <div className="mt-4">
        <AudioButton src={item.audio} />
      </div>
    </article>
  );
}
