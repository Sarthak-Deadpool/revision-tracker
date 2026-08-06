/** @format */

import SubjectCard from "./SubjectCard";

function SubjectGrid({
  subjects = [],
  onEdit,
  onDelete,
  onStudy,
  onCreateSubject,
}) {
  if (!subjects.length) {
    return <EmptySubjects onCreateSubject={onCreateSubject} />;
  }

  return (
    <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject._id}
          subject={subject}
          onEdit={onEdit}
          onDelete={onDelete}
          onStudy={onStudy}
        />
      ))}
    </div>
  );
}

export default SubjectGrid;
