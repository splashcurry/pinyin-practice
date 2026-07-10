import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AudioButton from "../components/AudioButton";
import CardPractice from "../components/CardPractice";
import PinyinCard from "../components/PinyinCard";
import { findAssignment, formatWeekDate, resolvePracticeEntries } from "../data/dailyAssignments";
import type { DailyPracticeEntry } from "../data/dailyAssignments";

function entryKey(entry: DailyPracticeEntry) {
  if (entry.kind === "single") {
    return `single-${entry.item.id}`;
  }
  if (entry.kind === "syllable") {
    return `syllable-${entry.item.id}`;
  }
  return `custom-${entry.label}-${entry.value}`;
}

function entryLabel(entry: DailyPracticeEntry) {
  if (entry.kind === "single") {
    return entry.item.symbol;
  }
  if (entry.kind === "syllable") {
    return entry.item.pinyin;
  }
  return entry.value;
}

function PracticeEntryCard({ entry }: { entry: DailyPracticeEntry }) {
  if (entry.kind === "single") {
    return <PinyinCard item={entry.item} />;
  }

  if (entry.kind === "syllable") {
    return (
      <article className="practice-card compact-practice-card p-6 text-center">
        <p className="eyebrow-pill text-base">拼读</p>
        <div className="pinyin-display my-6 text-[88px]">{entry.item.pinyin}</div>
        {entry.item.word && <div className="mb-5 text-5xl font-black text-slate-950">{entry.item.word}</div>}
        {!entry.item.word && <p className="mb-5 text-lg font-bold text-slate-500">先读准拼音</p>}
        <AudioButton label="听拼读" src={entry.item.audio} />
      </article>
    );
  }

  return (
    <article className="practice-card compact-practice-card p-6 text-center">
      <p className="eyebrow-pill text-base">{entry.label}</p>
      <div className="pinyin-display my-8 text-[78px]">{entry.value}</div>
      <p className="text-lg font-bold text-slate-500">跟着老师的要求读一读。</p>
    </article>
  );
}

export default function DailyPracticePage() {
  const { date = "" } = useParams();
  const assignment = findAssignment(date);
  const entries = useMemo(() => resolvePracticeEntries(assignment), [assignment]);
  const [index, setIndex] = useState(0);

  if (!assignment) {
    return (
      <>
        <AppHeader title="每日练习" />
        <section className="surface-card p-6 text-center">
          <h2 className="text-2xl font-black text-slate-950">这一天暂未布置练习</h2>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-500">可以回到首页选择最近三天，或查看往期内容。</p>
          <Link className="btn-primary mt-5 flex items-center justify-center px-5 py-4 text-lg font-extrabold" to="/daily-history">
            查看往期内容
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <AppHeader title="每日练习" />
      <section className="surface-card p-5">
        <div className="eyebrow-pill">{formatWeekDate(assignment.date)}</div>
        <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">{assignment.title}</h2>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-500">{assignment.description}</p>
        <p className="mt-2 text-sm font-bold text-slate-400">预计用时 {assignment.estimatedMinutes} 分钟</p>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-xl font-black text-slate-950">开始练习</h2>
        <CardPractice
          getKey={entryKey}
          getLabel={entryLabel}
          index={index}
          items={entries}
          onIndexChange={setIndex}
          renderCard={(entry) => <PracticeEntryCard entry={entry} />}
        />
      </section>
    </>
  );
}
