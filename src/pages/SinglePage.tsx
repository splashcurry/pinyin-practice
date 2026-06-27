import { useEffect, useMemo, useState } from "react";
import AppHeader from "../components/AppHeader";
import BigButton from "../components/BigButton";
import CardPractice from "../components/CardPractice";
import PinyinCard from "../components/PinyinCard";
import { singleItems } from "../data/singleItems";
import type { PinyinType } from "../types/pinyin";

type Filter = Extract<PinyinType, "initial" | "final" | "whole">;

const filters: { value: Filter; label: string }[] = [
  { value: "initial", label: "声母" },
  { value: "final", label: "韵母" },
  { value: "whole", label: "整体认读" },
];

export default function SinglePage() {
  const [filter, setFilter] = useState<Filter>("initial");
  const [index, setIndex] = useState(0);
  const items = useMemo(() => singleItems.filter((item) => item.type === filter), [filter]);

  useEffect(() => {
    setIndex(0);
  }, [filter]);

  return (
    <>
      <AppHeader title="单个拼音" />
      <div className="mb-4 grid grid-cols-3 gap-2">
        {filters.map((item) => (
          <BigButton
            className="text-lg"
            key={item.value}
            onClick={() => setFilter(item.value)}
            selected={filter === item.value}
          >
            {item.label}
          </BigButton>
        ))}
      </div>
      <CardPractice
        getKey={(item) => item.id}
        getLabel={(item) => item.symbol}
        index={index}
        items={items}
        onIndexChange={setIndex}
        renderCard={(item) => <PinyinCard item={item} />}
      />
    </>
  );
}
