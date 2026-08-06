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
          !h-12
          w-full

          !rounded-2xl

          border
          border-slate-200

          bg-white

          px-4

          text-[15px]
          font-medium
          text-slate-700

          shadow-none

          transition-all
          duration-200

          hover:border-slate-300

          focus:border-orange-400
          focus:ring-4
          focus:ring-orange-100

          ${className}
        `}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className="
          rounded-2xl
          border-slate-200
          p-2
          shadow-xl
        "
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="
              rounded-xl
              text-[15px]
              font-medium
              cursor-pointer
            "
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterSelect;
