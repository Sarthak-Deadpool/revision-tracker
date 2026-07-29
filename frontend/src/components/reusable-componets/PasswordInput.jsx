import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

function PasswordInput({
  label = "Password",
  error,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div
        className={`
          flex h-12 items-center gap-3 rounded-2xl border bg-white px-4 transition-all sm:h-14
          ${
            error
              ? "border-red-500 ring-2 ring-red-100"
              : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100"
          }
          ${className}
        `}
      >
        <Lock className="h-5 w-5 text-slate-400" />

        <input
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base"
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="shrink-0 text-slate-400 transition hover:text-slate-700"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;