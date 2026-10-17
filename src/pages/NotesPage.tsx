import { Link } from "react-router-dom";
import { useUIStore } from "../store/useUIStore";
import { useNotes } from "../hooks/useNotes";
function NotesPage() {
  const search = useUIStore((state) => state.search);

  const { data, isLoading, error } = useNotes();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  const filteredNotes = data?.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );
  const hasNoNotes = data?.length === 0;
  const noSearchResults = !hasNoNotes && filteredNotes?.length === 0;
  return (
    <div className="flex flex-col gap-4 ">
      {hasNoNotes && (
        <div className="py-12 text-center">
          <p className="text-slate-500">You have no notes yet.</p>
          <Link
            to="/new"
            className="mt-2 inline-block text-indigo-600  dark:text-slate-400 underline"
          >
            Add your first note
          </Link>
        </div>
      )}

      {noSearchResults && (
        <p className="text-center text-slate-500">
          No notes match your search.
        </p>
      )}
      {filteredNotes?.map((note) => (
        <Link
          key={note.id}
          to={`/notes/${note.id}`}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-800"
        >
          <h2 className="font-semibold">{note.title}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {note.content}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default NotesPage;
