import { Link } from "react-router-dom";
import type { Lesson } from "../types/pinyin";

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link className="surface-card block p-4 transition active:scale-[0.99]" to={`/lesson/${lesson.id}`}>
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-base font-black text-orange-700">
          {lesson.id}
        </span>
        <div>
          <h3 className="text-lg font-black text-slate-900">{lesson.title}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">{lesson.description}</p>
        </div>
      </div>
    </Link>
  );
}
