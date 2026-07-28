/** @format */

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import loginSchema from "@/schemas/loginSchema";
import { login } from "@/api/authApi";

import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import GradientButton from "./GradientButton";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function LoginForm() {
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
      })

      console.log("Login success: ", response);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col px-6 py-6 sm:px-8 lg:px-20 lg:py-12">
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
      <div className="flex flex-1 items-center">
        <div className="w-full max-w-lg">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Welcome Back
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Sign In
          </h1>

          <p className="mt-4 text-base text-slate-500 sm:text-lg">
            Continue your revision journey by signing into your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
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
                className="text-sm font-medium text-orange-500 hover:text-orange-700"
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
        className="flex flex-col gap-2 border-t border-slate-200 
      pt-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center 
      sm:justify-between sm:text-left"
      >
        <span>© 2026 Revision Tracker</span>
        <span>Built with MERN Stack</span>
      </div>
    </div>
  );
}

export default LoginForm;
