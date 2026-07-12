import { MdChevronRight, MdHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { formatShortDate, historyAssignments } from "../data/dailyAssignments";

export default function DailyHistoryPage() {
  const assignments = historyAssignments();
  return <div className="practice-page"><AppHeader title="练习历史" /><section className="route-intro"><p><MdHistory aria-hidden="true" /> 往期内容</p><h2>按日期回看练习</h2><span>把之前的内容补一补，练习进度不断档。</span></section><section className="history-list">{assignments.length > 0 ? assignments.map((assignment) => <Link className="history-item" key={assignment.date} to={`/daily/${assignment.date}`}><div><p>{formatShortDate(assignment.date)}</p><h3>{assignment.title}</h3><span>{assignment.description}</span></div><MdChevronRight aria-hidden="true" /></Link>) : <p className="surface-card p-6 text-center text-lg font-bold text-slate-500">还没有三天以前的练习。</p>}</section></div>;
}
