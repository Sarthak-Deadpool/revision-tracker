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

import GradientButton from "@/components/reusable-componets/GradientButton";

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>

          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          <div className="flex flex-col items-center">
            <div className="group relative">
              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile?.name || "User")
                }
                alt="Avatar Preview"
                className="h-32 w-32 rounded-full border-4 border-orange-100 object-cover shadow-md"
              />

              <label
                htmlFor="avatar"
                className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100"
              >
                <Camera className="h-6 w-6" />
              </label>
            </div>

            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <p className="mt-3 text-xs text-slate-500">
              JPG, PNG or WEBP • Max 2 MB
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>

            <input
              {...register("name")}
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-orange-500 disabled:bg-slate-100"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <GradientButton
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </GradientButton>

            <GradientButton type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </GradientButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;
