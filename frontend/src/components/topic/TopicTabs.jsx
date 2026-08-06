/** @format */

function TopicTabs({ value, onChange, activeCount, archivedCount }) {
  return (
    <div className="grid w-full grid-cols-2 rounded-2xl bg-slate-100  border-2">
      <button
        type="button"
        onClick={() => onChange("active")}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
          value === "active"
            ? "bg-white shadow text-slate-900"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Active
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            value === "active"
              ? "bg-orange-100 text-orange-600"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {activeCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange("archived")}
        className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
          value === "archived"
            ? "bg-white shadow text-slate-900"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Archived
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            value === "archived"
              ? "bg-orange-100 text-orange-600"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {archivedCount}
        </span>
      </button>
    </div>
  );
}

export default TopicTabs;
