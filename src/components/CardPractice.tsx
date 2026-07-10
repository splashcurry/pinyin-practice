import { useState } from "react";
import type { ReactNode } from "react";

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
  const [completed, setCompleted] = useState(false);

  if (!current) {
    return <p className="surface-card p-5 text-center text-lg font-bold text-slate-600">这里暂时没有内容。</p>;
  }

  if (completed) {
    return (
      <section className="practice-card p-8 text-center" aria-live="polite">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-3xl" aria-hidden="true">✓</div>
        <h2 className="mt-5 text-3xl font-black text-slate-950">练习完成</h2>
        <p className="mt-2 text-lg font-bold text-slate-600">今天的 {items.length} 项内容都练完了。</p>
        <button
          className="btn-primary mt-6 px-6 py-4 text-lg font-extrabold"
          onClick={() => {
            onIndexChange(0);
            setCompleted(false);
          }}
          type="button"
        >
          再练一次
        </button>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-3 flex items-center gap-4" aria-label={`练习进度：第 ${index + 1} 项，共 ${items.length} 项`}>
        <span className="shrink-0 text-base font-black text-slate-700">{index + 1} / {items.length}</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-orange-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-teal-400 transition-[width]"
            style={{ width: `${((index + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>
      {renderCard(current, index)}
      <div className="practice-index mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {items.map((item, itemIndex) => (
          <button
            aria-label={`第 ${itemIndex + 1} 项：${getLabel(item)}`}
            aria-pressed={itemIndex === index}
            className={`px-1 text-[15px] font-black transition active:scale-[0.98] ${
              itemIndex === index ? "choice-pill-selected" : "choice-pill"
            }`}
            key={getKey(item)}
            onClick={() => onIndexChange(itemIndex)}
            type="button"
          >
            {getLabel(item)}
          </button>
        ))}
      </div>
      {index === items.length - 1 && (
        <button className="btn-primary mt-4 w-full px-5 py-4 text-lg font-extrabold" onClick={() => setCompleted(true)} type="button">
          完成本次练习
        </button>
      )}
    </section>
  );
}
