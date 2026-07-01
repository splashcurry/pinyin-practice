import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { findAssignment, formatShortDate, recentDateTabs } from "../data/dailyAssignments";

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

  return (
    <>
      <AppHeader />
      <section className="surface-card overflow-hidden p-5">
        <div className="eyebrow-pill">今日复习</div>
        <h2 className="mt-4 text-3xl font-black leading-tight text-slate-950">读一读，拼一拼，今天也稳稳进步。</h2>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-500">
          声母、韵母、整体认读和拼读练习都在这里。家长打开页面，孩子直接点卡片练习。
        </p>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        {modules.map((item) => (
          <button
            className={`module-card bg-gradient-to-br ${item.tone} transition active:scale-[0.98]`}
            key={item.path}
            onClick={() => navigate(item.path)}
            type="button"
          >
            <span className="text-sm font-black text-orange-600">{item.mark}</span>
            <span className="mt-3 block text-xl font-black text-slate-950">{item.title}</span>
            <span className="mt-2 block text-sm font-bold leading-5 text-slate-500">{item.desc}</span>
          </button>
        ))}
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-black text-slate-950">每日练习</h2>
          <Link className="shrink-0 text-sm font-bold text-orange-600" to="/daily-history">
            查看往期内容 &gt;
          </Link>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          {tabs.map((item) => (
            <button
              className={`min-h-16 rounded-2xl px-2 py-3 text-left transition active:scale-[0.98] ${
                item.date === selectedDate
                  ? "bg-orange-100 text-slate-950 shadow-md shadow-orange-100"
                  : "border border-white/80 bg-white/80 text-slate-500"
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

        <article className="surface-card p-5">
          <div className="eyebrow-pill">{selectedTab.label}的练习</div>
          {assignment ? (
            <>
              <h3 className="mt-4 text-2xl font-black leading-tight text-slate-950">{assignment.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {assignment.items.flatMap((group) =>
                  group.content.map((item) => (
                    <span className="choice-pill flex min-h-11 items-center px-4 text-lg font-black" key={`${group.label}-${item}`}>
                      {item}
                    </span>
                  )),
                )}
              </div>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-500">{assignment.description}</p>
              <p className="mt-2 text-sm font-bold text-slate-400">预计用时 {assignment.estimatedMinutes} 分钟</p>
              <button
                className="btn-primary mt-5 w-full px-5 py-4 text-xl font-extrabold transition active:scale-[0.98]"
                onClick={() => navigate(`/daily/${assignment.date}`)}
                type="button"
              >
                开始练习
              </button>
            </>
          ) : (
            <>
              <h3 className="mt-4 text-2xl font-black leading-tight text-slate-950">{selectedTab.label}暂未布置练习</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-slate-500">可以先复习昨天或前天的内容。</p>
              <Link className="btn-secondary mt-5 flex items-center justify-center px-5 py-4 text-lg font-extrabold text-orange-700" to="/daily-history">
                查看往期内容
              </Link>
            </>
          )}
        </article>
      </section>
    </>
  );
}
