import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import BigButton from "../components/BigButton";
import LessonCard from "../components/LessonCard";
import { lessons } from "../data/lessons";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <AppHeader />
      <section className="rounded-lg bg-white p-5 shadow-sm">
        <h2 className="text-3xl font-bold text-orange-700">今天也来读一读、拼一拼吧！</h2>
        <p className="mt-2 text-lg text-stone-600">声母、韵母、整体认读和拼读都可以复习。</p>
      </section>
      <section className="mt-4 grid gap-3">
        <BigButton onClick={() => navigate("/single")}>单个拼音</BigButton>
        <BigButton onClick={() => navigate("/tones")}>四声练习</BigButton>
        <BigButton onClick={() => navigate("/spell")}>拼读练习</BigButton>
        <BigButton onClick={() => navigate("/random")}>随机练习</BigButton>
      </section>
      <section className="mt-6">
        <h2 className="mb-3 text-2xl font-bold">今日课程</h2>
        <div className="grid gap-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
    </>
  );
}
