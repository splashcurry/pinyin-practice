import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { formatShortDate, historyAssignments } from "../data/dailyAssignments";

export default function DailyHistoryPage() {
  const assignments = historyAssignments();

  return (
    <>
      <AppHeader title="往期内容" />
      <section className="surface-card p-5">
        <div className="eyebrow-pill">查看往期内容</div>
        <h2 className="mt-4 text-2xl font-black leading-tight text-slate-950">按日期回看练习</h2>
        <p className="mt-2 text-base font-semibold leading-7 text-slate-500">三天以前的练习会放在这里，方便补练和复习。</p>
      </section>

      <section className="mt-5 grid gap-3">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <Link className="surface-card block p-4 transition active:scale-[0.99]" key={assignment.date} to={`/daily/${assignment.date}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-base font-black text-orange-600">{formatShortDate(assignment.date)}</p>
                  <h3 className="mt-1 text-lg font-black text-slate-950">{assignment.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{assignment.description}</p>
                </div>
                <span className="shrink-0 text-lg font-black text-slate-300">&gt;</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="surface-card p-6 text-center text-lg font-bold text-slate-500">还没有三天以前的练习。</p>
        )}
      </section>
    </>
  );
}
