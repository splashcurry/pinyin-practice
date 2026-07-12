import { useMemo, useState } from "react";
import { MdCalendarToday } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AudioButton from "../components/AudioButton";
import CardPractice from "../components/CardPractice";
import PinyinCard from "../components/PinyinCard";
import { findAssignment, formatWeekDate, resolvePracticeEntries } from "../data/dailyAssignments";
import type { DailyPracticeEntry } from "../data/dailyAssignments";

function entryKey(entry: DailyPracticeEntry) { return entry.kind === "single" ? `single-${entry.item.id}` : entry.kind === "syllable" ? `syllable-${entry.item.id}` : `custom-${entry.label}-${entry.value}`; }
function entryLabel(entry: DailyPracticeEntry) { return entry.kind === "single" ? entry.item.symbol : entry.kind === "syllable" ? entry.item.pinyin : entry.value; }
function PracticeEntryCard({ entry }: { entry: DailyPracticeEntry }) {
  if (entry.kind === "single") return <PinyinCard item={entry.item} />;
  if (entry.kind === "syllable") return <article className="practice-card practice-card--focus compact-practice-card text-center"><p className="eyebrow-pill text-base">拼读</p><div className="pinyin-display">{entry.item.pinyin}</div>{entry.item.word ? <div className="pinyin-word">{entry.item.word}</div> : <p className="pinyin-rhyme">先读准拼音</p>}<AudioButton label="听拼读" src={entry.item.audio} /></article>;
  return <article className="practice-card practice-card--focus compact-practice-card text-center"><p className="eyebrow-pill text-base">{entry.label}</p><div className="pinyin-display">{entry.value}</div><p className="pinyin-rhyme">跟着老师的要求读一读。</p></article>;
}

export default function DailyPracticePage() {
  const { date = "" } = useParams(); const assignment = findAssignment(date); const entries = useMemo(() => resolvePracticeEntries(assignment), [assignment]); const [index, setIndex] = useState(0);
  if (!assignment) return <div className="practice-page"><AppHeader title="每日练习" /><section className="route-intro route-intro--empty"><h2>这一天暂未布置练习</h2><p>可以回到首页选择最近三天，或查看往期内容。</p><Link className="btn-primary route-intro__button" to="/daily-history">查看往期内容</Link></section></div>;
  return <div className="practice-page"><AppHeader title="每日练习" /><section className="route-intro"><p><MdCalendarToday aria-hidden="true" /> {formatWeekDate(assignment.date)}</p><h2>{assignment.title}</h2><span>{assignment.description}</span><small>预计用时 {assignment.estimatedMinutes} 分钟</small></section><section className="daily-practice"><h2>开始练习</h2><CardPractice getKey={entryKey} getLabel={entryLabel} index={index} items={entries} onIndexChange={setIndex} renderCard={(entry) => <PracticeEntryCard entry={entry} />} /></section></div>;
}
