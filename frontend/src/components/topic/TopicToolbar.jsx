/** @format */

import FilterSearch from "../reusable-componets/FilterSearcht";
import FilterSelect from "../reusable-componets/FilterSelect";
import TopicTabs from "./TopicTabs";

const difficultyOptions = [
  { label: "All Difficulties", value: "" },
  { label: "Easy", value: "Easy" },
  { label: "Medium", value: "Medium" },
  { label: "Hard", value: "Hard" },
];

function TopicToolbar({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  tab,
  onTabChange,
  activeCount,
  archivedCount,
}) {
  return (
    <div
    
    >
      {/* Desktop */}

      <div className="hidden xl:flex items-center gap-3">
        
        <div className="flex-2">
          <FilterSearch
            value={search}
            onChange={onSearchChange}
            placeholder="Search topics..."
          />
        </div>

        <div className="w-48 shrink-0">
          <FilterSelect
            value={difficulty}
            onChange={onDifficultyChange}
            placeholder="Difficulty"
            options={difficultyOptions}
          />
        </div>
       

        <div className="w-72 shrink-0">
          <TopicTabs
            value={tab}
            onChange={onTabChange}
            activeCount={activeCount}
            archivedCount={archivedCount}
          />
        </div>
      </div>

      {/* Tablet */}

      <div className="hidden md:flex xl:hidden flex-col gap-3">
        <FilterSearch
          value={search}
          onChange={onSearchChange}
          placeholder="Search topics..."
        />

        <div className="grid grid-cols-[180px_1fr] gap-3">
          <FilterSelect
            value={difficulty}
            onChange={onDifficultyChange}
            placeholder="Difficulty"
            options={difficultyOptions}
          />

          <TopicTabs
            value={tab}
            onChange={onTabChange}
            activeCount={activeCount}
            archivedCount={archivedCount}
          />
        </div>
      </div>

      {/* Mobile */}

      {/* Mobile */}

      <div className="flex flex-col gap-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <FilterSearch
              value={search}
              onChange={onSearchChange}
              placeholder="Search topics..."
            />
          </div>

          <div className="w-28 shrink-0">
            <FilterSelect
              value={difficulty}
              onChange={onDifficultyChange}
              placeholder="Filter"
              options={difficultyOptions}
            />
          </div>
        </div>

        <TopicTabs
          value={tab}
          onChange={onTabChange}
          activeCount={activeCount}
          archivedCount={archivedCount}
        />
      </div>
    </div>
  );
}

export default TopicToolbar;
