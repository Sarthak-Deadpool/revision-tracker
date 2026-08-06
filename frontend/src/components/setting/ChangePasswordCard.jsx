/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { changePassword } from "@/api/settingApi";
import { useAuth } from "@/context/AuthContext";
import GradientButton from "../reusable-componets/GradientButton";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>/?]{8,20}$/;

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .regex(
        passwordRegex,
        "Password must be 8-20 characters and include uppercase, lowercase, number and special character.",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

function ChangePasswordCard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success(response.message);

      reset();
      setTimeout(() => {
        logout();
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to change password.",
      );
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordInput = (label, name, show, setShow) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...register(name)}
          disabled={loading}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-orange-500"
        />

        <button
          type="button"
          disabled={loading}
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 disabled:cursor-not-allowed"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-orange-100 p-3">
          <Lock className="h-6 w-6 text-orange-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">Change Password</h2>

          <p className="text-sm text-slate-500">
            Update your account password.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {renderPasswordInput(
          "Current Password",
          "currentPassword",
          showCurrent,
          setShowCurrent,
        )}

        {renderPasswordInput(
          "New Password",
          "newPassword",
          showNew,
          setShowNew,
        )}

        {renderPasswordInput(
          "Confirm Password",
          "confirmPassword",
          showConfirm,
          setShowConfirm,
        )}

        <GradientButton type="submit" disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Password"}
        </GradientButton>
      </form>
    </div>
  );
}

export default ChangePasswordCard;
