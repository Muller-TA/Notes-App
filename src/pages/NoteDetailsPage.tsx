import { Link, useParams } from "react-router-dom";
import { useNote } from "../hooks/useNotes";
import { useNoteMutations } from "../hooks/useNoteMutations";
function NoteDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useNote(id);
  const { deleteMutation } = useNoteMutations();
  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="space-y-2">
        <p className="text-red-600">Error: {error.message}</p>
        <Link to="/notes" className="text-indigo-600 underline">
          Back to notes
        </Link>
      </div>
    );
  if (!data) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <p>{data.content}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {new Date(data.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-2">
        <Link
          to={`/notes/${id}/edit`}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            if (window.confirm("Delete this note?")) {
              deleteMutation.mutate(id!);
            }
          }}
          disabled={deleteMutation.isPending}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default NoteDetailsPage;
