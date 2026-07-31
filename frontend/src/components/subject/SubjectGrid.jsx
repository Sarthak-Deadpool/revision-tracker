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
    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
