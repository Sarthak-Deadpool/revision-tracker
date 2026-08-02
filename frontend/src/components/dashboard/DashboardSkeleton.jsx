/** @format */

function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200 ${className}`}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* ================= Welcome ================= */}

      <div className="animate-pulse rounded-3xl bg-slate-200 p-8">
        <SkeletonCard className="mb-3 h-4 w-40" />
        <SkeletonCard className="mb-4 h-10 w-72" />
        <SkeletonCard className="h-4 w-96" />

        <div className="mt-8 flex gap-4">
          <SkeletonCard className="h-24 w-40 rounded-2xl" />
          <SkeletonCard className="h-24 w-40 rounded-2xl" />
        </div>
      </div>

      {/* ================= Stats ================= */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border bg-white p-6"
          >
            <SkeletonCard className="mb-5 h-4 w-24" />

            <SkeletonCard className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* ================= Middle ================= */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Revision */}

        <div className="animate-pulse rounded-2xl border bg-white p-6">
          <SkeletonCard className="mb-2 h-6 w-48" />

          <SkeletonCard className="mb-6 h-4 w-32" />

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="mb-4 rounded-xl border p-4"
            >
              <SkeletonCard className="mb-2 h-5 w-40" />

              <SkeletonCard className="h-4 w-28" />
            </div>
          ))}
        </div>

        {/* Subject Progress */}

        <div className="animate-pulse rounded-2xl border bg-white p-6">
          <SkeletonCard className="mb-2 h-6 w-40" />

          <SkeletonCard className="mb-6 h-4 w-48" />

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="mb-5"
            >
              <div className="mb-2 flex justify-between">
                <SkeletonCard className="h-4 w-32" />

                <SkeletonCard className="h-4 w-10" />
              </div>

              <SkeletonCard className="h-3 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* ================= Upcoming ================= */}

      <div className="animate-pulse rounded-2xl border bg-white p-6">
        <SkeletonCard className="mb-2 h-6 w-52" />

        <SkeletonCard className="mb-6 h-4 w-44" />

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="mb-4 flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <SkeletonCard className="mb-2 h-5 w-40" />

              <SkeletonCard className="h-4 w-28" />
            </div>

            <SkeletonCard className="h-8 w-24 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;