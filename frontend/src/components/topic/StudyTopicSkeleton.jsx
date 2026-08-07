/** @format */

function StudyTopicSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-10 w-28 rounded-xl bg-slate-200" />

        <div className="h-8 w-56 rounded-lg bg-slate-200" />

        <div className="h-4 w-80 rounded bg-slate-200" />
      </div>

      {/* Workspace */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left Sidebar */}
        <div className="space-y-5">
          {/* Subject Card */}
          <div className="rounded-3xl border bg-white p-6">
            <div className="h-7 w-40 rounded bg-slate-200" />

            <div className="mt-4 h-4 w-28 rounded bg-slate-200" />

            <div className="mt-6 h-8 w-24 rounded-full bg-slate-200" />
          </div>

          {/* Mastery */}
          <div className="rounded-3xl border bg-white p-6">
            <div className="mb-4 flex justify-between">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-4 w-10 rounded bg-slate-200" />
            </div>

            <div className="h-3 rounded-full bg-slate-200" />
          </div>

          {/* Stats */}
          <div className="rounded-3xl border bg-white p-6 space-y-4">
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
          </div>
        </div>

        {/* Notes */}
        <div className="overflow-hidden rounded-3xl border bg-white">
          <div className="border-b bg-slate-100 p-6">
            <div className="h-6 w-40 rounded bg-slate-200" />
          </div>

          <div className="space-y-4 p-8">
            {Array.from({ length: 14 }).map((_, index) => (
              <div
                key={index}
                className="h-4 rounded bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyTopicSkeleton;