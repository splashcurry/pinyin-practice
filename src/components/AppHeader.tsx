import { Link, useLocation } from "react-router-dom";

export default function AppHeader({ title = "拼音练习小屋" }: { title?: string }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="mb-5 flex items-center justify-between gap-3">
      <h1 className="brand-title text-2xl font-black">{title}</h1>
      {!isHome && (
        <Link className="btn-secondary flex min-h-12 items-center px-4 text-base font-extrabold text-orange-700" to="/">
          返回首页
        </Link>
      )}
    </header>
  );
}
