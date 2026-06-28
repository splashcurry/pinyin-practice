import { MouseEvent } from "react";
import { playAudio } from "../utils/audio";

export default function AudioButton({ src, label = "听一听" }: { src: string; label?: string }) {
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    playAudio(src);
  }

  return (
    <button
      className="audio-button px-6 py-3 text-xl font-black transition active:scale-[0.98]"
      onClick={handleClick}
      type="button"
    >
      {label}
    </button>
  );
}
