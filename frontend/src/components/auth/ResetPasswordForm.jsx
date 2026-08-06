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
    <div
      className="
    flex
    min-h-full
    flex-col

    px-5
    py-6

    sm:px-8

    md:px-12
    md:py-8

    lg:px-16
    lg:py-6

    xl:px-20
  "
    >
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
      <div
        className="
    flex
    flex-1
    items-center
    justify-center

    py-4
    md:py-6
  "
      >
        <div className="w-full max-w-md sm:max-w-lg">
          {/* Badge */}
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Reset Password
          </span>

          {/* Heading */}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-4xl">
            Create a New Password
          </h1>

          {/* Description */}
          <p className="mt-2 text-sm leading-6 sm:text-base lg:text-lg text-slate-500">
            Enter the verification code sent to your email and choose a new
            password for your account.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            
            {/* OTP */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Enter the 6-digit verification code sent to your email.
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
            <div className="text-center pt-1">
              <ResendOTPButton email={email} resendFunction={forgotPassword} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
