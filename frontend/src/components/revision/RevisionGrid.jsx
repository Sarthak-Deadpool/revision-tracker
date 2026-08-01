/** @format */

import RevisionCard from "./RevisionCard";
import EmptyRevision from "./EmptyRevision";

function RevisionGrid({
  revisions = [],
  onStudy,
}) {
  if (!revisions.length) {
    return <EmptyRevision />;
  }

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {revisions.map((revision) => (
        <RevisionCard
          key={revision._id}
          revision={revision}
          onStudy={onStudy}
        />
      ))}
    </div>
  );
}

export default RevisionGrid;