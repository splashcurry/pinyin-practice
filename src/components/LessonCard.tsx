import { Link } from "react-router-dom";
import type { Lesson } from "../types/pinyin";

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link className="block rounded-lg bg-white p-4 shadow-sm active:scale-[0.99]" to={`/lesson/${lesson.id}`}>
      <h3 className="text-xl font-bold text-orange-700">{lesson.title}</h3>
      <p className="mt-2 text-base text-stone-600">{lesson.description}</p>
    </Link>
  );
}
