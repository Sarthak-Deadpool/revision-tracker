// /** @format */

// function SubjectProgress({ subjects }) {
//   return (
//     <div className="rounded-2xl border bg-white p-6 shadow-sm">
//       <div className="mb-6">
//         <h2 className="text-xl font-bold">Subject Progress</h2>

//         <p className="text-sm text-slate-500">
//           Average mastery level across your subjects.
//         </p>
//       </div>

//       {subjects.length === 0 ? (
//         <div className="py-10 text-center text-slate-400">
//           No subject progress available.
//         </div>
//       ) : (
//         <div className="space-y-5">
//           {subjects.map((subject) => (
//             <div key={subject._id}>
//               <div className="mb-2 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="h-3 w-3 rounded-full"
//                     style={{
//                       backgroundColor: subject.color,
//                     }}
//                   />

//                   <span className="font-medium">{subject.name}</span>
//                 </div>

//                 <span className="text-sm font-semibold text-slate-600">
//                   {Math.round(subject.averageMastery)}%
//                 </span>
//               </div>

//               <div className="h-3 overflow-hidden rounded-full bg-slate-200">
//                 <div
//                   className="h-full rounded-full transition-all duration-500"
//                   style={{
//                     width: `${subject.averageMastery}%`,
//                     backgroundColor: subject.color,
//                   }}
//                 />
//               </div>

//               <p className="mt-2 text-xs text-slate-500">
//                 {subject.totalTopics} Topics
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SubjectProgress;


/** @format */

import { TrendingUp } from "lucide-react";

function SubjectProgress({ subjects }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-100 p-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Subject Progress
          </h2>

          <p className="text-sm text-slate-500">
            Track your mastery across all subjects.
          </p>
        </div>
      </div>

      {subjects.length === 0 ? (
        <div className="py-12 text-center text-slate-400">
          No subject progress available.
        </div>
      ) : (
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div
              key={subject._id}
              className="rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-orange-300 hover:shadow-md"
            >
              {/* Header */}

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: subject.color,
                    }}
                  />

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {subject.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {subject.totalTopics} Topics
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {Math.round(subject.averageMastery)}%
                </span>
              </div>

              {/* Progress */}

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${subject.averageMastery}%`,
                    backgroundColor: subject.color,
                  }}
                />
              </div>

              {/* Footer */}

              <div className="mt-3 flex justify-between text-xs text-slate-500">
                <span>Learning Progress</span>

                <span>
                  {Math.round(subject.averageMastery) >= 80
                    ? "Excellent"
                    : Math.round(subject.averageMastery) >= 60
                      ? "Good"
                      : Math.round(subject.averageMastery) >= 40
                        ? "Keep Going"
                        : "Needs Revision"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectProgress;