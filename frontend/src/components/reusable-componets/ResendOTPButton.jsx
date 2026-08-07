/** @format */

import { useState } from "react";
import { toast } from "sonner";

import useCountdown from "@/hooks/useCountdown";

const ResendOTPButton = ({ email, resendFunction, type = "verify" }) => {
  const { timeLeft, isExpired, restart } = useCountdown(60);

  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    if (!isExpired || isLoading) return;

    try {
      setIsLoading(true);

      const response = await resendFunction({
        email,
        type,
      });

      toast.success(response.message);

      restart();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={!isExpired || isLoading}
      className="
        text-sm
        font-medium
        text-orange-500
        transition-colors
        duration-200

        hover:text-orange-600

        disabled:cursor-not-allowed
        disabled:text-slate-400
      "
    >
      {isLoading
        ? "Sending..."
        : isExpired
          ? "Resend OTP"
          : `Resend OTP (${timeLeft}s)`}
    </button>
  );
};

export default ResendOTPButton;
