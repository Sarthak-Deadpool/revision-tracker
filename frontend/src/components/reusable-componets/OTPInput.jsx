/** @format */

import { useRef } from "react";

const OTPInput = ({ value, onChange, length = 6, error }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const input = e.target.value.replace(/\D/g, "");

    if (!input) {
      const newOTP = [...value];
      newOTP[index] = "";
      onChange(newOTP.join(""));
      return;
    }

    const digit = input[input.length - 1];

    const newOTP = [...value];
    newOTP[index] = digit;

    onChange(newOTP.join(""));

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newOTP = [...value];
        newOTP[index] = "";
        onChange(newOTP.join(""));
        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    onChange(pasted);

    const focusIndex = Math.min(pasted.length, length) - 1;

    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div>
      <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-3">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="
h-11 w-11
sm:h-12 sm:w-12
md:h-14 md:w-14

rounded-xl
border
border-slate-300
text-center

text-lg
sm:text-xl
md:text-2xl

font-semibold
outline-none
transition-all
duration-200

focus:border-orange-500
focus:ring-2
focus:ring-orange-200
"
          />
        ))}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default OTPInput;
