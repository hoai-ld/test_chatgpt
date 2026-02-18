import { AppPart, usePart } from "../contexts/PartContext";

const options: Array<{ value: AppPart; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "operations", label: "Operations" },
  { value: "analytics", label: "Analytics" }
];

export default function PartSelector() {
  const { currentPart, setCurrentPart } = usePart();

  return (
    <label className="part-selector">
      Part:
      <select
        value={currentPart}
        onChange={(event) => setCurrentPart(event.target.value as AppPart)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
