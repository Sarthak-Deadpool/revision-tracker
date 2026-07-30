/** @format */

import { Check, Palette } from "lucide-react";

const SUBJECT_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Green", value: "#22C55E" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Orange", value: "#F97316" },
  { name: "Red", value: "#EF4444" },
  { name: "Pink", value: "#EC4899" },
];

function SubjectColorPicker({ value, onChange, error }) {
  const isCustomColor = !SUBJECT_COLORS.some(
    (color) => color.value === value
  );

  const selectedColor =
    SUBJECT_COLORS.find((color) => color.value === value) ?? {
      name: "Custom",
      value,
    };

  return (
    <div className="space-y-4">
      {/* Heading */}

      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          Subject Color
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Choose a color to easily identify this subject.
        </p>
      </div>

      {/* Color Palette */}

      <div className="flex flex-wrap gap-3">
        {SUBJECT_COLORS.map((color) => {
          const isSelected = value === color.value;

          return (
            <button
              key={color.value}
              type="button"
              aria-label={color.name}
              title={color.name}
              onClick={() => onChange(color.value)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-white shadow-md transition-all duration-200 hover:scale-110 ${
                isSelected
                  ? "scale-110 ring-2 ring-indigo-500 ring-offset-2"
                  : ""
              }`}
              style={{
                backgroundColor: color.value,
              }}
            >
              {isSelected && (
                <Check className="h-5 w-5 text-white" />
              )}
            </button>
          );
        })}

        {/* Custom Color Picker */}

        <label
          className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-dashed bg-slate-50 transition-all duration-200 hover:scale-110 ${
            isCustomColor
              ? "border-indigo-500 ring-2 ring-indigo-500 ring-offset-2"
              : "border-slate-300 hover:border-indigo-500"
          }`}
          title="Custom Color"
        >
          <Palette className="h-5 w-5 text-slate-600" />

          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>

      {/* Selected Color Preview */}

      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div
          className="h-6 w-6 rounded-full border border-white shadow"
          style={{
            backgroundColor: selectedColor.value,
          }}
        />

        <div>
          <p className="font-medium text-slate-900">
            {selectedColor.name}
          </p>

          <p className="font-mono text-sm text-slate-500">
            {selectedColor.value}
          </p>
        </div>
      </div>

      {/* Error */}

      {error && (
        <p className="text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default SubjectColorPicker;