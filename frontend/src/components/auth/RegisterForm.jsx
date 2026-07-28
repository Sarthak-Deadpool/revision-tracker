/** @format */

import { Link } from "react-router-dom";

import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import GradientButton from "./GradientButton";
import TextInput from "./TextInput";

function RegisterForm() {
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

          <form className="mt-6 space-y-3 sm:space-y-4">
            {/* Full Name */}
            <TextInput
              id="name"
              name="name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            />

            <EmailInput
              id="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email"
            />

            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="Create a password"
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />

            <GradientButton type="submit">Create Account</GradientButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
