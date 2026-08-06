/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import loginSchema from "@/schemas/loginSchema";
import { login } from "@/api/authApi";

import EmailInput from "../reusable-componets/EmailInput";
import PasswordInput from "../reusable-componets/PasswordInput";
import GradientButton from "../reusable-componets/GradientButton";

import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

function LoginForm() {
  const navigate = useNavigate();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (user) => {
    console.log(user);

    try {
      const response = await login(user);

      auth.login({
        token: response.token,
        user: response.user,
      });

      toast.success(`Welcome back, ${response.user.name}!`);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
    md:py-10

    lg:px-16
    lg:py-6

    xl:px-20
  "
    >
      {/* Header */}
      <div className="flex justify-end">
        <p className="text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-orange-500 hover:text-orange-700"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md md:max-w-lg">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Welcome Back
          </span>

          <h1
            className="mt-4 text-3xl
            sm:text-4xl
            lg:text-5xl font-bold tracking-tight text-slate-900 "
          >
            Sign In
          </h1>

          <p
            className="mt-4 text-sm
              sm:text-base
              lg:text-lg text-slate-500 "
          >
            Continue your revision journey by signing into your account.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 md:mt-10 space-y-5"
          >
            <EmailInput
              id="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register("email")}
            />

            <PasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium transition-colors  text-orange-500 hover:text-orange-700"
              >
                Forgot Password?
              </Link>
            </div>

            <GradientButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </GradientButton>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex flex-col gap-2  border-slate-200 
        mt-8
          border-t
            pt-5 text-center text-sm text-slate-500 sm:flex-row sm:items-center 
      sm:justify-between sm:text-left"
      >
        <span>© 2026 Revision Tracker</span>
        <span>Built with MERN Stack</span>
      </div>
    </div>
  );
}

export default LoginForm;
