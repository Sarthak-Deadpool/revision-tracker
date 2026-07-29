/** @format */

function LeftPanel() {
  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden bg-[#18151F] text-white">
      {/* Orange Glow */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-400/10 blur-[150px]" />

      {/* Logo */}
      <div className="z-10 px-8 pt-10 xl:px-14 xl:pt-12">
        <h2 className="text-2xl font-bold tracking-wide">Revision Tracker</h2>
      </div>

      {/* Hero */}
      <div className="z-10 flex flex-1 flex-col justify-center px-14">
        <span className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
          Smart Learning
        </span>

        <h1 className="max-w-md text-5xl font-bold leading-[1.1] xl:text-6xl">
          Master
          <br />
          Your
          <br />
          Revision.
        </h1>

        <p className="mt-8 max-w-md text-base leading-7 text-slate-300 xl:text-lg xl:leading-8">
          Organize every subject, track every revision, and build a consistent
          study habit that lasts.
        </p>

        {/* Stats */}

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-3xl font-bold">365+</h3>

            <p className="mt-2 text-sm text-slate-400">Study Days</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-3xl font-bold">1200+</h3>

            <p className="mt-2 text-sm text-slate-400">Revisions</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="text-3xl font-bold">∞</h3>

            <p className="mt-2 text-sm text-slate-400">Growth</p>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="z-10 flex items-center justify-between px-8 pb-8 text-sm text-slate-400 xl:px-14 xl:pb-10">
        <span>Discipline today.</span>

        <span>Success tomorrow.</span>
      </div>
    </section>
  );
}

export default LeftPanel;
