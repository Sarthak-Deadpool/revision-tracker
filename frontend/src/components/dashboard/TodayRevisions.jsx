/** @format */

// import { ArrowRight, BookOpen } from "lucide-react";
// import { Link } from "react-router-dom";

// function TodayRevisions({ revisions, count }) {
//   return (
//     <div className="rounded-2xl border bg-white p-6 shadow-sm">
//       {/* Header */}

//       <div className="mb-5 flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-bold text-slate-900">
//             Today's Revisions
//           </h2>

//           <p className="text-sm text-slate-500">
//             {count} revision{count !== 1 && "s"} due today
//           </p>
//         </div>

//         <Link
//           to="/dashboard/revisions"
//           className="flex items-center gap-2 text-sm font-medium text-orange-600 transition hover:text-orange-700"
//         >
//           View All
//           <ArrowRight className="h-4 w-4" />
//         </Link>
//       </div>

//       {revisions.length === 0 ? (
//         <div className="rounded-xl bg-slate-50 py-10 text-center">
//           <BookOpen className="mx-auto h-10 w-10 text-slate-300" />

//           <p className="mt-3 text-slate-500">No revisions scheduled today.</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {revisions.map((revision) => (
//             <div
//               key={revision._id}
//               className="flex items-center justify-between rounded-xl border p-4 transition hover:border-orange-300 hover:bg-orange-50"
//             >
//               <div>
//                 <h3 className="font-semibold text-slate-900">
//                   {revision.topic.name}
//                 </h3>

//                 <p className="text-sm text-slate-500">
//                   {revision.subject.name}
//                 </p>
//               </div>

//               <Link
//                 to="/dashboard/revisions"
//                 className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
//               >
//                 Study
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default TodayRevisions;

/** @format */

import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

function TodayRevisions({ revisions, count }) {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Today's Revisions
          </h2>

          <p className="text-sm text-slate-500">
            {count} revision{count !== 1 && "s"} scheduled today
          </p>
        </div>

        <Link
          to="/dashboard/revisions"
          className="flex items-center gap-2 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {revisions.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl bg-slate-50 py-12 text-center">
          <BookOpen className="h-10 w-10 text-slate-300" />

          <p className="mt-4 text-slate-500">No revisions due today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {revisions.map((revision) => (
            <div
              key={revision._id}
              className="group rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-orange-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                {/* Left */}

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {revision.topic.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {revision.subject.name}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        difficultyColor[revision.topic.difficulty]
                      }`}
                    >
                      {revision.topic.difficulty}
                    </span>

                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Revision #{revision.revisionNumber}
                    </span>
                  </div>
                </div>

                {/* Right */}

                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Clock3 className="h-4 w-4" />
                    Due Today
                  </div>

                  <Link
                    to="/dashboard/revisions"
                    className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                  >
                    Study
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default TodayRevisions;
