/** @format */

function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-slate-200" />

            <div className="mt-6 h-7 w-40 rounded bg-slate-200" />

            <div className="mt-3 h-5 w-56 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-36 rounded bg-slate-200" />

            <div className="mt-8 h-11 w-40 rounded-xl bg-slate-200" />
          </div>
        </div>

        {/* Right Stats */}
        <div className="lg:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 h-12 w-12 rounded-xl bg-slate-200" />

                <div className="h-8 w-20 rounded bg-slate-200" />

                <div className="mt-3 h-4 w-32 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
