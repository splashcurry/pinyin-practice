import type { ReactNode } from "react";
import BigButton from "./BigButton";

type CardPracticeProps<T> = {
  items: T[];
  index: number;
  onIndexChange: (index: number) => void;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  renderCard: (item: T, index: number) => ReactNode;
};

export default function CardPractice<T>({
  items,
  index,
  onIndexChange,
  getKey,
  getLabel,
  renderCard,
}: CardPracticeProps<T>) {
  const current = items[index];

  if (!current) {
    return <p className="rounded-lg bg-white p-5 text-center text-lg shadow-sm">这里暂时没有内容。</p>;
  }

  function go(delta: number) {
    onIndexChange((index + delta + items.length) % items.length);
  }

  return (
    <section>
      {renderCard(current, index)}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <BigButton onClick={() => go(-1)}>上一张</BigButton>
        <BigButton onClick={() => go(1)}>下一张</BigButton>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {items.map((item, itemIndex) => (
          <button
            className={`min-h-11 rounded-lg px-2 text-base font-bold shadow-sm ${
              itemIndex === index ? "bg-orange-500 text-white" : "bg-white text-stone-700"
            }`}
            key={getKey(item)}
            onClick={() => onIndexChange(itemIndex)}
            type="button"
          >
            {getLabel(item)}
          </button>
        ))}
      </div>
    </section>
  );
}
