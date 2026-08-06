/** @format */

import { Construction } from "lucide-react";

function ComingSoon({ title, description }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <Construction className="h-10 w-10 text-orange-600" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        <p className="mt-4 leading-7 text-slate-600">{description}</p>

        <div className="mt-8 rounded-2xl bg-slate-100 p-4 text-sm text-slate-500">
          We're actively building this feature. It will be available in an
          upcoming update.
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
