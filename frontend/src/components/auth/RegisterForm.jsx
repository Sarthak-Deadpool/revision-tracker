/** @format */

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import registerSchema from "@/schemas/registerSchema";
import { register as registerUser } from "@/api/authApi";
import { toast } from "sonner";

import EmailInput from "../reusable-componets/EmailInput";
import PasswordInput from "../reusable-componets/PasswordInput";
import GradientButton from "../reusable-componets/GradientButton";
import TextInput from "../reusable-componets/TextInput";

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

      sessionStorage.setItem("verificationEmail", data.email);

      toast.success("Account created successfully!");

      navigate("/verify-email", {
        state: {
          email: data.email,
        },
      });
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
      <div className="flex justify-end pb-2">
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
      <div
        className="
    flex
    flex-1
    items-center
    justify-center
    py-4

    md:py-8
  "
      >
        <div className="w-full max-w-md md:max-w-lg">
          <span
            className="text-2xl
            sm:text-4xl
            lg:text-3xl font-semibold uppercase text-orange-500 "
          >
            Create Account
          </span>

          <p
            className="mt-2 text-sm
            sm:text-base
            lg:text-lg text-slate-500"
          >
            Create your Revision Tracker account and start building consistent
            study habits.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4
            md:mt-8 space-y-4 md:space-y-5"
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
