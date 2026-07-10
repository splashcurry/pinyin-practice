import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { dailyAssignments, findAssignment, formatShortDate, recentDateTabs } from "../data/dailyAssignments";

const modules = [
  { title: "单个拼音", desc: "声母 韵母 整体认读", path: "/single", tone: "from-orange-100 to-white", mark: "01" },
  { title: "四声练习", desc: "选韵母 练声调", path: "/tones", tone: "from-teal-100 to-white", mark: "02" },
  { title: "拼读练习", desc: "声母 + 韵母 + 声调", path: "/spell", tone: "from-violet-100 to-white", mark: "03" },
  { title: "随机练习", desc: "反复读一读", path: "/random", tone: "from-yellow-100 to-white", mark: "04" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const tabs = recentDateTabs();
  const [selectedDate, setSelectedDate] = useState(tabs[0].date);
  const selectedTab = tabs.find((item) => item.date === selectedDate) ?? tabs[0];
  const assignment = findAssignment(selectedDate);
  const fallbackAssignment = selectedDate === tabs[0].date ? dailyAssignments[0] : undefined;
  const displayedAssignment = assignment ?? fallbackAssignment;
  const isFallback = !assignment && Boolean(fallbackAssignment);

  return (
    <>
      <AppHeader />
      <div className="home-layout">
        <section className="daily-task-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="eyebrow-pill">{isFallback ? "上次练习" : `${selectedTab.label}的练习`}</div>
              <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950">今天先完成这一小步。</h2>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-600">读一读，拼一拼，几分钟就能完成。</p>
            </div>
            <Link className="shrink-0 text-sm font-bold text-orange-700" to="/daily-history">
              往期内容 &gt;
            </Link>
          </div>

          <div className="my-5 grid grid-cols-3 gap-2" aria-label="选择练习日期">
            {tabs.map((item) => (
              <button
                aria-pressed={item.date === selectedDate}
                className={`min-h-16 rounded-2xl px-2 py-3 text-left transition active:scale-[0.98] ${
                  item.date === selectedDate
                    ? "bg-orange-100 text-slate-950"
                    : "border border-slate-200/80 bg-white/70 text-slate-600"
                }`}
                key={item.date}
                onClick={() => setSelectedDate(item.date)}
                type="button"
              >
                <span className="block text-base font-black">{item.label}</span>
                <span className="mt-1 block text-sm font-bold">{formatShortDate(item.date)}</span>
              </button>
            ))}
          </div>

          {displayedAssignment ? (
            <>
              <h3 className="text-2xl font-black leading-tight text-slate-950">{displayedAssignment.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {displayedAssignment.items.flatMap((group) =>
                  group.content.map((item) => (
                    <span className="choice-pill flex min-h-11 items-center px-4 text-lg font-black" key={`${group.label}-${item}`}>
                      {item}
                    </span>
                  )),
                )}
              </div>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{displayedAssignment.description}</p>
              <p className="mt-2 text-sm font-bold text-slate-600">预计用时 {displayedAssignment.estimatedMinutes} 分钟</p>
              <button
                className="btn-primary mt-5 w-full px-5 py-4 text-xl font-extrabold transition active:scale-[0.98]"
                onClick={() => navigate(`/daily/${displayedAssignment.date}`)}
                type="button"
              >
                {isFallback ? "继续上次练习" : "开始今日练习"}
              </button>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-black leading-tight text-slate-950">{selectedTab.label}暂未布置练习</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-500">可以先复习昨天或前天的内容。</p>
            </>
          )}
        </section>

        <section className="free-practice">
          <div className="mb-3">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">自由练习</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">想练什么，就从这里开始</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {modules.map((item) => (
              <button
                className={`module-card bg-gradient-to-br ${item.tone} transition active:scale-[0.98]`}
                key={item.path}
                onClick={() => navigate(item.path)}
                type="button"
              >
                <span aria-hidden="true" className="text-sm font-black text-orange-700">{item.mark}</span>
                <span className="mt-3 block text-xl font-black text-slate-950">{item.title}</span>
                <span className="mt-2 block text-sm font-bold leading-5 text-slate-600">{item.desc}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
