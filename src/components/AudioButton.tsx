import { MouseEvent } from "react";
import { playAudio } from "../utils/audio";

export default function AudioButton({ src, label = "听一听" }: { src: string; label?: string }) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    playAudio(src);
  }

  return (
    <button
      className="min-h-14 rounded-lg bg-emerald-500 px-5 py-3 text-xl font-bold text-white shadow-sm active:scale-[0.99]"
      onClick={handleClick}
      type="button"
    >
      {label}
    </button>
  );
}
