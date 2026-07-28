/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import registerSchema from "@/schemas/registerSchema";
import { register as registerUser } from "@/api/authApi";
import {toast} from "sonner"


import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import GradientButton from "./GradientButton";
import TextInput from "./TextInput";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex h-full flex-col px-6 py-6 sm:px-8 lg:px-20 lg:py-12">
      {/* Header */}
      <div className="flex justify-end">
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:text-orange-700"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center py-6 lg:py-8">
        <div className="w-full max-w-lg">
          <span className="text-3xl font-semibold uppercase text-orange-500 sm:text-4xl">
            Create Account
          </span>

          <p className="mt-2 text-base text-slate-500">
            Create your Revision Tracker account and start building consistent
            study habits.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-3 sm:space-y-4"
          >
            {/* Full Name */}
            <TextInput
              id="name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              error={errors.name?.message}
              {...register("name")}
            />

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
              placeholder="Create a password"
              error={errors.password?.message}
              {...register("password")}
            />

            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <GradientButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </GradientButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
