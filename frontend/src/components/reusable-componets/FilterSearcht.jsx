/** @format */

import { Search } from "lucide-react";

function FilterSearch({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <Search
        className="
          pointer-events-none
          absolute
          left-4
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
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          py-2.5
          pl-11
          pr-4
          text-sm
          text-slate-700
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200

          hover:border-slate-300

          focus:border-indigo-500
          focus:bg-white
          focus:ring-4
          focus:ring-indigo-100
        "
      />
    </div>
  );
}

export default FilterSearch;