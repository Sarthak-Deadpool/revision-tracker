/** @format */

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { verifyEmail, resendVerificationOTP } from "@/api/authApi";
import { verifyEmailSchema } from "@/schemas/verifyEmailSchema";
import GradientButton from "../reusable-componets/GradientButton";
import OTPInput from "../reusable-componets/OTPInput";
import ResendOTPButton from "../reusable-componets/ResendOTPButton";

const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || sessionStorage.getItem("verificationEmail");

  useEffect(() => {
    if (!email) {
      navigate("/register", { replace: true });
    }
  }, [email, navigate]);

  if (!email) return null;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await verifyEmail({
        email,
        otp: data.otp,
      });

      toast.success(response.message);
      sessionStorage.removeItem("verificationEmail");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Email verification failed.",
      );
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
    md:py-6

    lg:px-16
    lg:py-12

    xl:px-20
  "
    >
      {/* Header */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("verificationEmail");
            navigate("/login");
          }}
          className="text-sm font-medium text-slate-600 transition hover:text-orange-500"
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
  "
      >
        <div className="w-full max-w-md md:max-w-lg">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Verify Account
          </span>

          <h1
            className="mt-4 text-3xl
              sm:text-4xl
              lg:text-5xl font-bold tracking-tight text-slate-900 "
          >
            Verify Your Email
          </h1>

          <p
            className="mt-2 text-sm
              sm:text-base
              lg:text-lg text-slate-500 "
          >
            We've sent a 6-digit verification code to your email address. Enter
            the code below to activate your account.
          </p>

          {/* Email Box */}
          <div className="mt-2 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              Email Address
            </p>

            <p className="mt-2 break-all text-base font-medium text-slate-800">
              {email}
            </p>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Didn't receive the code? Check your spam folder or request a new OTP
            below.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 md:mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="otp"
                className="mb-3 block text-sm font-medium text-slate-700"
              >
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

            <GradientButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </GradientButton>

            <div className="text-center pt-1">
              <ResendOTPButton
                email={email}
                resendFunction={resendVerificationOTP}
                type="verify"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex flex-col gap-2 border-t border-slate-200 mt-6
          pt-3 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left"
      >
        <span>© 2026 Revision Tracker</span>
        <span>Secure Email Verification</span>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
