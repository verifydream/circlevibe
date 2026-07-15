"use client";

import { cn } from "@/lib/utils";

interface CheckboxGroupProps {
  label?: string;
  options: { value: string; label: string; icon?: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  max?: number;
}

export function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  max,
}: CheckboxGroupProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      if (max && selected.length >= max) return;
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {max && (
            <span className="ml-1 text-gray-400">(maks {max})</span>
          )}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm transition-all",
              selected.includes(opt.value)
                ? "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
            )}
          >
            {opt.icon && <span>{opt.icon}</span>}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}