/** @format */

import { Search } from "lucide-react";

function FilterSearch({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search
        className="
          pointer-events-none
          absolute
          left-5
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-12
          w-full

          rounded-2xl

          border
          border-slate-200

          bg-white

          pl-14
          pr-5

          text-[15px]
          font-medium
          text-slate-700

          placeholder:font-normal
          placeholder:text-slate-400

          outline-none

          transition-all
          duration-200

          hover:border-slate-300

          focus:border-orange-400
          focus:ring-4
          focus:ring-orange-100
        "
      />
    </div>
  );
}

export default FilterSearch;
