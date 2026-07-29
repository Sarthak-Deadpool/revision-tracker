/** @format */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { forgotPassword } from "@/api/authApi";

import TextInput from "../reusable-componets/TextInput";
import GradientButton from "../reusable-componets/GradientButton";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword({
        email: data.email,
      });

      toast.success(response.message);

      navigate("/reset-password", {
        state: {
          email: data.email,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset OTP");
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-6 py-6 sm:px-8 lg:px-20 lg:py-12">
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
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md sm:max-w-lg">
          {/* Badge */}
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Password Recovery
          </span>

          {/* Heading */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Forgot Password?
          </h1>

          {/* Description */}
          <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">
            Enter your registered email address and we'll send you a
            verification code to securely reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <TextInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
            />

            <GradientButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending OTP..." : "Send Reset OTP"}
            </GradientButton>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <span>© 2026 Revision Tracker</span>
        <span>Secure Password Recovery</span>
      </div>
    </div>
  );
};

export default ForgotPasswordForm