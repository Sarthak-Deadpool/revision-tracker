/** @format */

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { resetPassword, forgotPassword } from "@/api/authApi";

import GradientButton from "../reusable-componets/GradientButton";
import PasswordInput from "../reusable-componets/PasswordInput";
import OTPInput from "../reusable-componets/OTPInput";
import ResendOTPButton from "../reusable-componets/ResendOTPButton";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  if (!email) return null;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });

      toast.success(response.message);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };
  return (
    <div className="flex min-h-screen flex-col px-6 py-4 sm:px-8 lg:px-20 lg:py-4">
      {/* Header */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-slate-600 transition-colors duration-300 hover:text-orange-500"
        >
          Back to Login
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="w-full max-w-md sm:max-w-lg">
          {/* Badge */}
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Reset Password
          </span>

          {/* Heading */}
          <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-xl lg:text-xl">
            Create a New Password
          </h1>

          {/* Description */}
          <p className="mt-2 text-base leading-7 text-slate-500 sm:text-lg">
            Enter the verification code sent to your email and choose a new
            password for your account.
          </p>


          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {/* OTP */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Verification Code
              </label>

              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.otp?.message}
                  />
                )}
              />
            </div>

            {/* New Password */}
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />

            {/* Confirm Password */}
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            {/* Submit Button */}
            <GradientButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </GradientButton>

            {/* Resend OTP */}
            <div className="text-center">
              <ResendOTPButton email={email} resendFunction={forgotPassword} />
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ResetPasswordForm;
