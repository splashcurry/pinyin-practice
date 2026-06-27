import type { Tone } from "../types/pinyin";

const toneMarks: Record<string, Record<Tone, string>> = {
  a: { 1: "ā", 2: "á", 3: "ǎ", 4: "à" },
  o: { 1: "ō", 2: "ó", 3: "ǒ", 4: "ò" },
  e: { 1: "ē", 2: "é", 3: "ě", 4: "è" },
  i: { 1: "ī", 2: "í", 3: "ǐ", 4: "ì" },
  u: { 1: "ū", 2: "ú", 3: "ǔ", 4: "ù" },
  ü: { 1: "ǖ", 2: "ǘ", 3: "ǚ", 4: "ǜ" },
};

export function markFinalTone(final: string, tone: Tone) {
  const text = final.replaceAll("v", "ü");
  const target =
    text.includes("a") ? "a" :
    text.includes("o") ? "o" :
    text.includes("e") ? "e" :
    text === "iu" ? "u" :
    text === "ui" ? "i" :
    text.includes("i") ? "i" :
    text.includes("u") ? "u" :
    text.includes("ü") ? "ü" :
    "";

  return target ? text.replace(target, toneMarks[target][tone]) : text;
}

export function displayFinalForInitial(initial: string, finalId: string) {
  const final = finalId.replaceAll("v", "ü");
  return initial === "y" ? final.replaceAll("ü", "u") : final;
}

export function buildPlainPinyin(initial: string, finalId: string) {
  return `${initial}${displayFinalForInitial(initial, finalId)}`;
}

export function buildPinyin(initial: string, finalId: string, tone: Tone) {
  return `${initial}${markFinalTone(displayFinalForInitial(initial, finalId), tone)}`;
}
