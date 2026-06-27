import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import RandomPracticePage from "./pages/RandomPracticePage";
import SinglePage from "./pages/SinglePage";
import SpellPage from "./pages/SpellPage";
import TonePage from "./pages/TonePage";

export default function App() {
  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      <main className="mx-auto min-h-screen w-full max-w-[480px] px-4 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/single" element={<SinglePage />} />
          <Route path="/tones" element={<TonePage />} />
          <Route path="/spell" element={<SpellPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/random" element={<RandomPracticePage />} />
        </Routes>
      </main>
    </div>
  );
}
