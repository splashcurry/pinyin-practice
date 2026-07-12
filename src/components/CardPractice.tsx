import { MdCheckCircle } from "react-icons/md";
import type { ReactNode } from "react";

type CardPracticeProps<T> = {
  items: T[];
  index: number;
  onIndexChange: (index: number) => void;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  renderCard: (item: T, index: number) => ReactNode;
};

export default function CardPractice<T>({ items, index, onIndexChange, getKey, getLabel, renderCard }: CardPracticeProps<T>) {
  const current = items[index];
  const completed = index === items.length;

  if (!current && !completed) return <p className="surface-card p-5 text-center text-lg font-bold text-slate-600">这里暂时没有内容。</p>;

  if (completed) {
    return <section aria-live="polite" className="practice-card practice-complete p-8 text-center">
      <MdCheckCircle aria-hidden="true" />
      <h2>练习完成</h2><p>今天的 {items.length} 项内容都练完了。</p>
      <button className="btn-primary mt-6 px-6 py-4 text-lg font-extrabold" onClick={() => onIndexChange(0)} type="button">再练一次</button>
    </section>;
  }

  return <section className="card-practice">
    <div aria-label={`练习进度：第 ${index + 1} 项，共 ${items.length} 项`} className="practice-progress">
      <span>{index + 1} / {items.length}</span><div><i style={{ width: `${((index + 1) / items.length) * 100}%` }} /></div>
    </div>
    {renderCard(current, index)}
    <div className="practice-index">{items.map((item, itemIndex) => <button aria-label={`第 ${itemIndex + 1} 项：${getLabel(item)}`} aria-pressed={itemIndex === index} className={itemIndex === index ? "choice-pill-selected" : "choice-pill"} key={getKey(item)} onClick={() => onIndexChange(itemIndex)} type="button">{getLabel(item)}</button>)}</div>
    {index === items.length - 1 && <button className="btn-primary practice-finish" onClick={() => onIndexChange(items.length)} type="button">完成本次练习</button>}
  </section>;
}
