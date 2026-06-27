import { Link, useLocation } from "react-router-dom";

export default function AppHeader({ title = "拼音练习小屋" }: { title?: string }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="mb-4 flex items-center justify-between gap-3">
      <h1 className="text-2xl font-bold text-orange-700">{title}</h1>
      {!isHome && (
        <Link className="rounded-lg bg-white px-4 py-3 text-base font-semibold text-orange-700 shadow-sm" to="/">
          返回首页
        </Link>
      )}
    </header>
  );
}
