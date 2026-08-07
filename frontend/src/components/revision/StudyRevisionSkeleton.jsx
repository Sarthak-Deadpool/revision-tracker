/** @format */

function StudyRevisionSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* ================= Header ================= */}

      <div className="space-y-3">
        <div className="h-10 w-28 rounded-xl bg-slate-200" />

        <div className="h-8 w-56 rounded-lg bg-slate-200" />

        <div className="h-4 w-80 rounded bg-slate-200" />
      </div>

      {/* ================= Hero Card ================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <div className="h-8 w-72 rounded-lg bg-slate-200" />

            <div className="h-5 w-40 rounded bg-slate-200" />
          </div>

          <div className="flex gap-3">
            <div className="h-9 w-24 rounded-full bg-slate-200" />

            <div className="h-9 w-32 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>

      {/* ================= Workspace ================= */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ================= Notes ================= */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Notes Header */}

          <div className="border-b border-slate-200 bg-slate-50 p-6">
            <div className="h-6 w-44 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-72 rounded bg-slate-200" />
          </div>

          {/* Notes */}

          <div className="space-y-4 p-8 xl:h-[76vh]">
            {Array.from({ length: 18 }).map((_, index) => (
              <div
                key={index}
                className={`h-4 rounded bg-slate-200 ${
                  index % 4 === 0
                    ? "w-full"
                    : index % 4 === 1
                      ? "w-11/12"
                      : index % 4 === 2
                        ? "w-10/12"
                        : "w-8/12"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= Sidebar ================= */}

        <div className="space-y-6">
          {/* Topic Details */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-6 w-36 rounded bg-slate-200" />

            <div className="mt-6 space-y-5">
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-200" />
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-6 w-20 rounded-full bg-slate-200" />
              </div>

              <div className="flex justify-between">
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="h-4 w-16 rounded bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Study Tips */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-6 w-28 rounded bg-slate-200" />

            <div className="mt-6 space-y-4">
              <div className="h-4 rounded bg-slate-200" />
              <div className="h-4 rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
              <div className="h-4 w-4/5 rounded bg-slate-200" />
            </div>
          </div>

          {/* Rating */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-7 w-40 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-full rounded bg-slate-200" />

            <div className="mt-6 space-y-4">
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
            </div>

            <div className="mt-6 h-32 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyRevisionSkeleton;
