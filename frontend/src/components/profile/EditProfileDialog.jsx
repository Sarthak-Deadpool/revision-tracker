/** @format */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Camera } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name cannot exceed 30 characters."),
});

function EditProfileDialog({ open, onOpenChange, profile, onSubmit, loading }) {
  const [preview, setPreview] = useState(profile?.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile?.name || "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
      });

      setPreview(profile.avatar || "");
      setAvatarFile(null);
    }
  }, [profile, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2 MB.");

      return;
    }

    setAvatarFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    onSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);

        if (!open) {
          reset({
            name: profile.name,
          });

          setPreview(profile.avatar || "");
          setAvatarFile(null);
        }
      }}
    >
      <DialogContent
        className="
    w-[95vw]
    max-w-md

    rounded-3xl

    p-6

    sm:max-w-lg

    max-h-[90vh]
    overflow-y-auto
  "
      >
        <DialogHeader className="border-b border-slate-200 pb-5">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Edit Profile
          </DialogTitle>

          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile?.name || "User")
                }
                alt="Avatar"
                className="
        h-28
        w-28
        rounded-full
        border-4
        border-orange-100
        object-cover
        shadow-lg

        sm:h-32
        sm:w-32
      "
              />

              <label
                htmlFor="avatar"
                className="
        absolute
        bottom-1
        right-1

        flex
        h-10
        w-10
        cursor-pointer
        items-center
        justify-center

        rounded-full

        bg-orange-500
        text-white

        shadow-lg

        transition

        hover:scale-105
        hover:bg-orange-600
      "
              >
                <Camera className="h-5 w-5" />
              </label>
            </div>

            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <p className="mt-4 text-center text-xs text-slate-500">
              JPG, PNG or WEBP
              <br />
              Maximum file size 2 MB
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800">
              Full Name
            </label>

            <input
              {...register("name")}
              disabled={loading}
              placeholder="Enter your full name"
              className="
      h-12
      w-full

      rounded-2xl

      border
      border-slate-200

      bg-slate-50

      px-4

      outline-none

      transition-all

      focus:border-orange-500
      focus:bg-white
      focus:ring-4
      focus:ring-orange-100

      disabled:bg-slate-100
    "
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex gap-3 border-t border-slate-200 pt-6">
            {/* Cancel */}

            <button
              type="button"
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="
      flex-1
      rounded-xl
      border
      border-slate-200
      bg-white
      px-4
      py-3

      text-sm
      font-semibold
      text-slate-700

      transition-all
      duration-200

      hover:border-slate-300
      hover:bg-slate-50

      active:scale-[0.98]

      disabled:cursor-not-allowed
      disabled:opacity-50
    "
            >
              Cancel
            </button>

            {/* Save */}

            <button
              type="submit"
              disabled={loading}
              className="
      flex-1

      rounded-xl

      bg-orange-500

      px-4
      py-3

      text-sm
      font-semibold
      text-white

      shadow-sm

      transition-all
      duration-200

      hover:bg-orange-600
      hover:shadow-md

      active:scale-[0.98]

      disabled:cursor-not-allowed
      disabled:bg-orange-300
    "
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;
