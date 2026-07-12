import { MdHistory, MdHomeFilled, MdMenuBook, MdMic } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "首页", path: "/", icon: MdHomeFilled, match: (pathname: string, hash: string) => (pathname === "/" && hash !== "#free-practice") || pathname.startsWith("/daily/") },
  { label: "练习", path: "/random", icon: MdMic, match: (pathname: string) => ["/random", "/single", "/tones", "/spell"].includes(pathname) },
  { label: "课程", path: "/#free-practice", icon: MdMenuBook, match: (pathname: string, hash: string) => (pathname === "/" && hash === "#free-practice") || pathname.startsWith("/lesson/") },
  { label: "历史", path: "/daily-history", icon: MdHistory, match: (pathname: string) => pathname === "/daily-history" },
];

export default function BottomNavigation() {
  const location = useLocation();
  return <nav aria-label="主要导航" className="bottom-navigation"><div className="bottom-navigation__inner">{items.map(({ icon: Icon, label, match, path }) => {
    const active = match(location.pathname, location.hash);
    return <Link aria-current={active ? "page" : undefined} className={`bottom-navigation__item${active ? " is-active" : ""}`} key={label} to={path}>
      <span aria-hidden="true" className="bottom-navigation__icon"><Icon /></span><span>{label}</span>
    </Link>;
  })}</div></nav>;
}
