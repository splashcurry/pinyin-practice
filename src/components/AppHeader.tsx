import { useState } from "react";
import { MdBrightnessAuto, MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../theme";

const themeOptions = [
  { value: "light" as const, label: "浅色模式", icon: MdLightMode },
  { value: "dark" as const, label: "深色模式", icon: MdDarkMode },
  { value: "system" as const, label: "跟随系统", icon: MdBrightnessAuto },
];

export default function AppHeader({ title = "拼音练习" }: { title?: string }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { effectiveTheme, preference, setPreference } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const ActiveIcon = preference === "system" ? MdBrightnessAuto : effectiveTheme === "dark" ? MdDarkMode : MdLightMode;

  return <header className="app-header mb-5 flex items-center justify-between gap-3">
    <h1 className="brand-title text-2xl font-black">{title}</h1>
    <div className="app-header__actions">
      <div className="theme-picker">
        <button aria-expanded={menuOpen} aria-label="主题设置" className="theme-orb" onClick={() => setMenuOpen((open) => !open)} type="button"><ActiveIcon aria-hidden="true" /></button>
        {menuOpen && <div aria-label="选择显示主题" className="theme-picker__menu" role="group">{themeOptions.map(({ icon: Icon, label, value }) => <button aria-pressed={preference === value} className={preference === value ? "is-selected" : ""} key={value} onClick={() => { setPreference(value); setMenuOpen(false); }} type="button"><Icon aria-hidden="true" /><span>{label}</span></button>)}</div>}
      </div>
      {!isHome && <Link className="btn-secondary app-header__back flex items-center text-base font-extrabold text-orange-700" to="/">返回首页</Link>}
    </div>
  </header>;
}
