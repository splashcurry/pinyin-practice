import type { Tone } from "../types/pinyin";
import BigButton from "./BigButton";

const tones: { value: Tone; label: string }[] = [
  { value: 1, label: "一声" },
  { value: 2, label: "二声" },
  { value: 3, label: "三声" },
  { value: 4, label: "四声" },
];

export default function ToneSelector({ value, onChange }: { value: Tone; onChange: (tone: Tone) => void }) {
  return (
    <div className="tone-selector grid grid-cols-2 gap-3">
      {tones.map((tone) => (
        <BigButton className="text-lg" key={tone.value} onClick={() => onChange(tone.value)} selected={value === tone.value}>
          {tone.label}
        </BigButton>
      ))}
    </div>
  );
}
