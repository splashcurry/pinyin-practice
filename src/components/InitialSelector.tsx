import { initials } from "../data/initials";
import BigButton from "./BigButton";

export default function InitialSelector({ value, onChange }: { value: string; onChange: (initial: string) => void }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {initials.map((initial) => (
        <BigButton className="px-2" key={initial} onClick={() => onChange(initial)} selected={value === initial}>
          {initial}
        </BigButton>
      ))}
    </div>
  );
}
