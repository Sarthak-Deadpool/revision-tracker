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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-6">
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
          rows={3}
          placeholder="Write a short description about this subject..."
          className={`
w-full
min-h-22.5
resize-none

rounded-xl
border
border-slate-200

bg-slate-50

px-4
py-3

text-sm

transition-all
duration-200

outline-none

focus:border-orange-500
focus:bg-white
focus:ring-4
focus:ring-orange-100

${errors.description ? "border-red-500 ring-4 ring-red-100" : ""}
`}
          {...register("description")}
        />

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

      <div className="border-t border-slate-200 pt-5">
        <GradientButton
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
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
