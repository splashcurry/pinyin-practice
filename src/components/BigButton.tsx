import type { ButtonHTMLAttributes, ReactNode } from "react";

type BigButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
};

export default function BigButton({ children, className = "", selected = false, ...props }: BigButtonProps) {
  const tone = selected ? "btn-primary" : "btn-secondary";

  return (
    <button
      className={`px-5 py-4 text-xl font-extrabold transition active:scale-[0.98] ${tone} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
