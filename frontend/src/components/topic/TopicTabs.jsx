/** @format */

function TopicTabs({
  value,
  onChange,
  activeCount,
  archivedCount,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white  shadow-sm">
      <div className="flex w-fit rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => onChange("active")}
          className={`
            rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200

            ${
              value === "active"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }
          `}
        >
          Active

          {typeof activeCount === "number" && (
            <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold">
              {activeCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => onChange("archived")}
          className={`
            rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200

            ${
              value === "archived"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }
          `}
        >
          Archived

          {typeof archivedCount === "number" && (
            <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold">
              {archivedCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default TopicTabs;