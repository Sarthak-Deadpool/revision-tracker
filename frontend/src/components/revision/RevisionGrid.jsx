/** @format */

import RevisionCard from "./RevisionCard";
import EmptyRevision from "./EmptyRevision";

function RevisionGrid({ revisions = [], onStudy }) {
  if (!revisions.length) {
    return <EmptyRevision />;
  }

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-5

        sm:grid-cols-2
        lg:gap-6

        xl:grid-cols-3

        2xl:grid-cols-4

        auto-rows-fr
      "
    >
      {revisions.map((revision) => (
        <RevisionCard
          key={revision._id}
          revision={revision}
          onStudy={onStudy}
        />
      ))}
    </section>
  );
}

export default RevisionGrid;
