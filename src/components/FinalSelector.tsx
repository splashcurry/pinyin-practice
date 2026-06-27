import { finals } from "../data/finals";
import BigButton from "./BigButton";

export default function FinalSelector({ value, onChange }: { value: string; onChange: (finalId: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {finals.map((final) => (
        <BigButton className="px-2" key={final.id} onClick={() => onChange(final.id)} selected={value === final.id}>
          {final.symbol}
        </BigButton>
      ))}
    </div>
  );
}
