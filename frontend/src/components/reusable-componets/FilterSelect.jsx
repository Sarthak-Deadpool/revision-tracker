/** @format */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FilterSelect({
  value,
  onChange,
  placeholder = "Select",
  options = [],
  className = "",
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`
          h-11
          min-w-[180px]
          rounded-xl
          border-slate-200
          bg-slate-50
          text-sm
          shadow-none
          transition-all
          duration-200

          hover:border-slate-300

          focus:ring-4
          focus:ring-indigo-100
          focus:border-indigo-500

          ${className}
        `}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="rounded-xl">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterSelect;