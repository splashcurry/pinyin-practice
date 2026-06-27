import type { ButtonHTMLAttributes, ReactNode } from "react";

type BigButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
};

export default function BigButton({ children, className = "", selected = false, ...props }: BigButtonProps) {
  const tone = selected ? "bg-orange-500 text-white" : "bg-white text-stone-800";

  return (
    <button
      className={`min-h-14 rounded-lg px-5 py-4 text-xl font-bold shadow-sm transition active:scale-[0.99] ${tone} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
