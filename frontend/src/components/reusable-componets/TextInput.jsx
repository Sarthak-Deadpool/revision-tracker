import { User } from "lucide-react";

function TextInput({
  label,
  error,
  icon: Icon = User,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <div
        className={`
           flex h-12 items-center gap-3 rounded-2xl border bg-white px-4 transition-all duration-200 sm:h-14
          ${
            error
              ? "border-red-500 ring-4 ring-red-100"
              : "border-slate-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100"
          }
          ${className}
        `}
      >
        <Icon className="h-5 w-5 shrink-0 text-slate-400" />

        <input
          className="h-full w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextInput;