import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, type NoteFormValues } from "../schemas/schema";
import { useNote } from "../hooks/useNotes";
import { useNoteMutations } from "../hooks/useNoteMutations";
function EditNotePage() {
  const { id } = useParams();
  const { data, isLoading, error } = useNote(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    values: data,
  });
  const { updateMutation } = useNoteMutations();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div>
      {" "}
      <form
        onSubmit={handleSubmit((values) =>
          updateMutation.mutate({ id: id!, values }),
        )}
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
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditNotePage;
