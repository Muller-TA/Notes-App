import { Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";

function Home() {
  const { data, isLoading, error } = useNotes();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-3xl font-bold">Save Your Notes</h2>
      <p className="text-slate-500 dark:text-slate-400">
        You have {data?.length ?? 0} notes to check
      </p>
      <Link
        to="/notes"
        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        View Notes
      </Link>
    </div>
  );
}

export default Home;
