/** @format */

import FilterSearch from "../reusable-componets/FilterSearcht";
import FilterSelect from "../reusable-componets/FilterSelect";

const difficultyOptions = [
  {
    label: "All Difficulties",
    value: "",
  },
  {
    label: "Easy",
    value: "Easy",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Hard",
    value: "Hard",
  },
];

function TopicFilters({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <FilterSearch
          value={search}
          onChange={onSearchChange}
          placeholder="Search topics..."
        />

        <FilterSelect
          value={difficulty}
          onChange={onDifficultyChange}
          placeholder="Difficulty"
          options={difficultyOptions}
          className="w-full lg:w-[220px]"
        />
      </div>
    </div>
  );
}

export default TopicFilters;