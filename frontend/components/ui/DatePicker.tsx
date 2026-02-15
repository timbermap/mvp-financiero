"use client";

type DatePickerProps = {
  value?: string;
  dates: string[];
  onChange: (date: string) => void;
  label?: string;
};

export default function DatePicker({
  value,
  dates,
  onChange,
  label = "Date",
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-500">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={dates.length === 0}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
      >
        {dates.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}
