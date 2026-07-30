/** @format */

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Plus, Save } from "lucide-react";
import { useEffect } from "react";

import TextInput from "../reusable-componets/TextInput";
import GradientButton from "../reusable-componets/GradientButton";
import subjectSchema from "@/schemas/subjectSchema";
import SubjectColorPicker from "./SubjectColorPicker";

const INITIAL_VALUES = {
  name: "",
  description: "",
  color: "#3B82F6",
};

function SubjectForm({
  defaultValues,
  onSubmit,
  submitButtonText = "Create Subject",
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: defaultValues ?? INITIAL_VALUES,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Subject Name */}

      <div className="space-y-2">
        <TextInput
          id="name"
          label="Subject Name"
          icon={BookOpen}
          placeholder="Enter subject name"
          error={errors.name?.message}
          {...register("name")}
        />

        <p className="text-sm text-slate-500">
          Give your subject a meaningful name.
        </p>
      </div>

      {/* Description */}

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-semibold text-slate-800"
        >
          Description
          <span className="ml-2 text-xs font-normal text-slate-400">
            Optional
          </span>
        </label>

        <textarea
          id="description"
          rows={4}
          placeholder="Write a short description about this subject..."
          className={`
               w-full resize-none rounded-2xl
               border border-slate-200
             bg-slate-50
               px-4 py-3
               text-sm
                transition-all
                duration-200
                  outline-none

                  focus:bg-white
                 focus:border-indigo-500
                      focus:ring-4
                     focus:ring-indigo-100

    ${errors.description ? "border-red-500 ring-4 ring-red-100" : ""}
  `}
          {...register("description")}
        />

        <p className="text-sm text-slate-500">
          This helps you identify the subject later.
        </p>

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Color Picker */}

      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <SubjectColorPicker
            value={field.value}
            onChange={field.onChange}
            error={errors.color?.message}
          />
        )}
      />

      {/* Footer */}

      <div className="flex justify-end gap-3 border-t pt-6">
        <GradientButton type="submit" disabled={isSubmitting}>
          {submitButtonText === "Create Subject" ? (
            <Plus className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}

          {isSubmitting ? "Saving..." : submitButtonText}
        </GradientButton>
      </div>
    </form>
  );
}

export default SubjectForm;
