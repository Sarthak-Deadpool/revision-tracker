/** @format */

function RevisionSkeleton() {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* Accent */}
          <div className="absolute" />

          {/* Header */}
          <div className="space-y-3">
            <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
          </div>

          {/* Badges */}
          <div className="mt-6 flex gap-2">
            <div className="h-7 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="h-7 w-28 animate-pulse rounded-full bg-slate-200" />
          </div>

          {/* Date */}
          <div className="mt-10 flex justify-between">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
          </div>

          {/* Button */}
          <div className="mt-10">
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RevisionSkeleton;