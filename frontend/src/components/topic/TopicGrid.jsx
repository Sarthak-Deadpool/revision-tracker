/** @format */

import TopicCard from "./TopicCard";
import EmptyTopic from "./EmptyTopic";

function TopicGrid({
  topics = [],
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
  onStudy,
  onCreateTopic,
}) {
  if (!topics.length) {
    return <EmptyTopic onCreateTopic={onCreateTopic} />;
  }

  return (
    <div
      className="
        grid
        auto-rows-fr

        grid-cols-1

        gap-5

        sm:grid-cols-2
        sm:gap-6

        xl:grid-cols-3

        2xl:grid-cols-4
      "
    >
      {topics.map((topic) => (
        <TopicCard
          key={topic._id}
          topic={topic}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          onStudy={onStudy}
        />
      ))}
    </div>
  );
}

export default TopicGrid;