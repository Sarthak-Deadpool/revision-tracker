/** @format */

function SubjectSkeleton({ count = 6 }) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative flex h-full animate-pulse flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 pl-8 shadow-sm"
        >
          {/* Left Accent */}
          <div className="absolute left-0 top-0 h-full w-2 rounded-l-3xl bg-slate-200" />

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-slate-200" />

              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
              </div>
            </div>

            <div className="h-8 w-8 rounded-lg bg-slate-200" />
          </div>

          {/* Description */}
          <div className="mt-5 space-y-2">
            <div className="h-3 w-full rounded bg-slate-200" />
            <div className="h-3 w-5/6 rounded bg-slate-200" />
            <div className="h-3 w-3/4 rounded bg-slate-200" />
          </div>

          <div className="mt-auto">
            <div className="my-6 h-px bg-slate-200" />

            {/* Stats */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-3 w-8 rounded bg-slate-200" />
              </div>

              <div className="flex justify-between">
                <div className="h-3 w-28 rounded bg-slate-200" />
                <div className="h-3 w-12 rounded bg-slate-200" />
              </div>

              <div className="flex justify-between">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
              </div>
            </div>

            <div className="my-6 h-px bg-slate-200" />

            {/* Button */}
            <div className="h-11 w-full rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubjectSkeleton;
