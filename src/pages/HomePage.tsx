import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import LessonCard from "../components/LessonCard";
import { lessons } from "../data/lessons";

const modules = [
  { title: "单个拼音", desc: "声母 韵母 整体认读", path: "/single", tone: "from-orange-100 to-white", mark: "01" },
  { title: "四声练习", desc: "选韵母 练声调", path: "/tones", tone: "from-teal-100 to-white", mark: "02" },
  { title: "拼读练习", desc: "声母 + 韵母 + 声调", path: "/spell", tone: "from-violet-100 to-white", mark: "03" },
  { title: "随机练习", desc: "反复读一读", path: "/random", tone: "from-yellow-100 to-white", mark: "04" },
];

export default function HomePage() {
  const navigate = useNavigate();

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
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-2xl font-black text-slate-950">今日课程</h2>
          <span className="text-sm font-bold text-slate-400">按课次练</span>
        </div>
        <div className="grid gap-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </>
  );
}
