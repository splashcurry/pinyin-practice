import rawAssignments from "./assignments.json";
import { singleItems } from "./singleItems";
import { syllables } from "./syllables";
import type { DailyAssignment, PinyinItem, SyllableItem } from "../types/pinyin";

export type DailyPracticeEntry =
  | { kind: "single"; item: PinyinItem }
  | { kind: "syllable"; item: SyllableItem }
  | { kind: "custom"; label: string; value: string };

export const dailyAssignments = rawAssignments as DailyAssignment[];

export function todayDateKey() {
  return toDateKey(new Date());
}

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function shiftDateKey(dateKey: string, deltaDays: number) {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + deltaDays);
  return toDateKey(date);
}

export function formatShortDate(dateKey: string) {
  const [, month, day] = dateKey.split("-");
  return `${Number(month)}月${Number(day)}日`;
}

export function formatWeekDate(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  return `${formatShortDate(dateKey)} ${new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(date)}`;
}

export function findAssignment(dateKey: string) {
  return dailyAssignments.find((item) => item.date === dateKey);
}

export function resolvePracticeEntries(assignment: DailyAssignment | undefined): DailyPracticeEntry[] {
  if (!assignment) {
    return [];
  }

  return assignment.items.flatMap((group) =>
    group.content.flatMap((value): DailyPracticeEntry[] => {
      const normalizedValue = value === "ü" ? "v" : value;
      const single = singleItems.find((item) => item.id === normalizedValue || item.symbol === value);
      if (single) {
        return [{ kind: "single" as const, item: single }];
      }

      const matchedSyllables = syllables.filter((item) => item.id === value || item.id.startsWith(value));
      if (matchedSyllables.length > 0) {
        return matchedSyllables.map((item) => ({ kind: "syllable" as const, item }));
      }

      return [{ kind: "custom" as const, label: group.label, value }];
    }),
  );
}

export function recentDateTabs() {
  const today = todayDateKey();
  return [
    { label: "今天", date: today },
    { label: "昨天", date: shiftDateKey(today, -1) },
    { label: "前天", date: shiftDateKey(today, -2) },
  ];
}

export function historyAssignments() {
  const cutoff = shiftDateKey(todayDateKey(), -2);
  return dailyAssignments
    .filter((item) => item.date < cutoff)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}
