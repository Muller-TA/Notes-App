import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  noteSchema,
  type NoteFormValues as noteFormValues,
} from "../schemas/schema";
import { useNoteMutations } from "../hooks/useNoteMutations";

function NewNotePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<noteFormValues>({
    resolver: zodResolver(noteSchema),
  });
  const { createMutation } = useNoteMutations();
  return (
    <form
      onSubmit={handleSubmit((values) => createMutation.mutate(values))}
      className="space-y-4"
    >
      <div>
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("content")}
          placeholder="Content"
          rows={5}
          className="w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {createMutation.isPending ? "Saving..." : "Save Note"}
      </button>
    </form>
  );
}

export default NewNotePage;
