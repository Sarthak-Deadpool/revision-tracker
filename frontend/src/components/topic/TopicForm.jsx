/** @format */

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Save, Plus } from "lucide-react";

import TextInput from "../reusable-componets/TextInput";
import GradientButton from "../reusable-componets/GradientButton";

import topicSchema from "@/schemas/topicSchema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INITIAL_VALUES = {
  name: "",
  difficulty: "Easy",
  subject: "",
  notes: "",
};

function TopicForm({
  defaultValues,
  onSubmit,
  submitButtonText = "Create Topic",
  showSubjectField = false,
  subjects = [],
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: defaultValues ?? INITIAL_VALUES,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!showSubjectField && <input type="hidden" {...register("subject")} />}

      <div className="space-y-2">
        <TextInput
          id="name"
          label="Topic Name"
          icon={BookOpen}
          placeholder="Enter topic name"
          error={errors.name?.message}
          {...register("name")}
        />

        <p className="text-sm text-slate-500">
          Give your topic a meaningful name.
        </p>
      </div>

      {/* Difficulty */}

      <div className="space-y-2">
        <label
          htmlFor="difficulty"
          className="text-sm font-semibold text-slate-800"
        >
          Difficulty
        </label>

        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={
                  `w-full errors.difficulty ? "border-red-500 focus:ring-red-100" : ""`
                }
              >
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <p className="text-sm text-slate-500">
          Select the current difficulty level of this topic.
        </p>

        {errors.difficulty && (
          <p className="text-sm text-red-500">{errors.difficulty.message}</p>
        )}
      </div>

      {/* Subject */}

      {showSubjectField && (
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-semibold text-slate-800"
          >
            Subject
          </label>

          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={
                   `w-full errors.subject ? "border-red-500 focus:ring-red-100" : ""`
                  }
                >
                  <SelectValue placeholder="Select Subject">
                    {
                      subjects.find((subject) => subject._id === field.value)
                        ?.name
                    }
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <p className="text-sm text-slate-500">
            Choose the subject this topic belongs to.
          </p>

          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>
      )}

      {/* Notes */}

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-semibold text-slate-800">
          Notes
          <span className="ml-2 text-xs font-normal text-slate-400">
            Optional
          </span>
        </label>

        <textarea
          id="notes"
          rows={5}
          placeholder="Write your revision notes..."
          className={`
            w-full resize-none rounded-2xl
            border border-slate-200
            bg-slate-50
            px-4 py-3
            text-sm
            outline-none
            transition-all duration-200

            focus:border-indigo-500
            focus:bg-white
            focus:ring-4
            focus:ring-indigo-100

            ${errors.notes ? "border-red-500 ring-4 ring-red-100" : ""}
          `}
          {...register("notes")}
        />

        <p className="text-sm text-slate-500">
          Add important formulas, concepts or reminders.
        </p>

        {errors.notes && (
          <p className="text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 border-t pt-6">
        <GradientButton type="submit" disabled={isSubmitting}>
          {submitButtonText === "Create Topic" ? (
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

export default TopicForm;
