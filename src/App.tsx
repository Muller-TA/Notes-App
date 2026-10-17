import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotesPage from "./pages/NotesPage";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import NewNotePage from "./pages/NewNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import EditNotePage from "./pages/EditNotePage";
import Layouts from "./components/Layouts";
import { useEffect } from "react";
import { useUIStore } from "./store/useUIStore";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/protectedRoute";
function App() {
  const theme = useUIStore((state) => state.theme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Layouts />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/notes/:id" element={<NoteDetailsPage />} />
            <Route path="/notes/:id/edit" element={<EditNotePage />} />
            <Route path="/new" element={<NewNotePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
