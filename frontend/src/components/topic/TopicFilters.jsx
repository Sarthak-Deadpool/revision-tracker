/** @format */

import FilterSearch from "../reusable-componets/FilterSearcht";
import FilterSelect from "../reusable-componets/FilterSelect";

const difficultyOptions = [
  { label: "All Difficulties", value: "" },
  { label: "Easy", value: "Easy" },
  { label: "Medium", value: "Medium" },
  { label: "Hard", value: "Hard" },
];

function TopicFilters({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search */}

      <div className="flex-1">
        <FilterSearch
          value={search}
          onChange={onSearchChange}
          placeholder="Search topics..."
        />
      </div>

      {/* Difficulty */}

      <div className="sm:w-52 lg:w-60">
        <FilterSelect
          value={difficulty}
          onChange={onDifficultyChange}
          placeholder="Difficulty"
          options={difficultyOptions}
        />
      </div>
    </div>
  );
}

export default TopicFilters;
