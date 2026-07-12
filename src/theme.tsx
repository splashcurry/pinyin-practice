import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ThemePreference = "light" | "dark" | "system";
type EffectiveTheme = Exclude<ThemePreference, "system">;

type AndroidThemeBridge = { setTheme: (theme: EffectiveTheme) => void };
type ThemeContextValue = { preference: ThemePreference; effectiveTheme: EffectiveTheme; setPreference: (preference: ThemePreference) => void };

const storageKey = "pinyin-practice-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function initialPreference(): ThemePreference {
  const stored = localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

function systemTheme(): EffectiveTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);
  const [effectiveTheme, setEffectiveTheme] = useState<EffectiveTheme>(() => initialPreference() === "system" ? systemTheme() : initialPreference() as EffectiveTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => setEffectiveTheme(preference === "system" ? (media.matches ? "dark" : "light") : preference);
    updateTheme();
    media.addEventListener("change", updateTheme);
    return () => media.removeEventListener("change", updateTheme);
  }, [preference]);

  useEffect(() => {
    document.documentElement.dataset.theme = effectiveTheme;
    localStorage.setItem(storageKey, preference);
    const bridge = (window as Window & { AndroidTheme?: AndroidThemeBridge }).AndroidTheme;
    bridge?.setTheme(effectiveTheme);
  }, [effectiveTheme, preference]);

  const value = useMemo(() => ({ preference, effectiveTheme, setPreference }), [preference, effectiveTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
