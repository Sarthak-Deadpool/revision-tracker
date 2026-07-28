/** @format */

import { Loader2 } from "lucide-react";

function GradientButton({
  children,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        flex h-14 w-full items-center justify-center
        rounded-2xl
        bg-linear-to-b
        from-orange-500 from-10%
        via-orange-700 via-85%
        to-[#b23333] to-90%
        px-6
        text-base
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-xl
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Please wait...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default GradientButton;
