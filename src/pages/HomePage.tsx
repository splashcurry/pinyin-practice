import { useEffect } from "react";
import { MdArrowOutward, MdMenuBook, MdMic, MdRecordVoiceOver, MdTextFields, MdWbSunny } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { dailyAssignments } from "../data/dailyAssignments";

const modules = [
  { title: "单个拼音", path: "/single", icon: MdTextFields, tone: "orange" },
  { title: "四声", path: "/tones", icon: MdRecordVoiceOver, tone: "teal" },
  { title: "拼读", path: "/spell", icon: MdMic, tone: "violet" },
  { title: "课程", path: "/random", icon: MdMenuBook, tone: "yellow" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const assignment = dailyAssignments[0];
  useEffect(() => { if (window.location.hash === "#free-practice") document.getElementById("free-practice")?.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);

  return <><AppHeader /><div className="home-layout">
    <section className="daily-task-card">
      <div className="daily-task-card__copy">
        <p className="daily-kicker"><MdWbSunny aria-hidden="true" /> 今日练习</p>
        <h2>单韵母 <span>a o e</span></h2>
        <div className="daily-progress" aria-label="练习进度 1 / 3"><strong>1 / 3</strong><span><i /></span></div>
        <p className="daily-description">先听读音，再跟读三遍</p>
        <button className="btn-primary daily-start" onClick={() => navigate(`/daily/${assignment.date}`)} type="button">开始练习 <MdArrowOutward aria-hidden="true" /></button>
      </div>
      <img alt="太阳陪伴阅读的插画" className="daily-illustration" src="/pinyin-practice/images/daily-sun-book.png" />
    </section>
    <section className="free-practice" id="free-practice">
      <h2><span aria-hidden="true" /> 自由练习</h2>
      <div className="module-grid">{modules.map(({ icon: Icon, path, title, tone }) => <button className={`module-card module-card--${tone}`} key={path} onClick={() => navigate(path)} type="button"><Icon aria-hidden="true" /><span>{title}</span></button>)}</div>
    </section>
  </div></>;
}
