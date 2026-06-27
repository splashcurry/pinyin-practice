import type { Tone } from "../types/pinyin";
import { assetPath } from "./asset";

let currentAudio: HTMLAudioElement | null = null;

export function playAudio(src: string) {
  try {
    currentAudio?.pause();
    currentAudio = new Audio(assetPath(src));
    currentAudio.play().catch((error) => {
      console.error("音频播放失败：", src, error);
    });
  } catch (error) {
    console.error("音频播放失败：", src, error);
  }
}

export function getToneAudioPath(finalId: string, tone: Tone) {
  return `/audio/tone/${finalId}${tone}.mp3`;
}

export function getSpellAudioPath(initial: string, finalId: string, tone: Tone) {
  return `/audio/spell/${initial}${finalId}${tone}.mp3`;
}
