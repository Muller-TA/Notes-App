import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUIStore } from "../store/useUIStore";
import { useAuthStore } from "../store/useAuthStore";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
  }`;

export default function Layouts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  const search = useUIStore((state) => state.search);
  const setSearch = useUIStore((state) => state.setSearch);
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link
          to="/"
          className="text-lg font-bold text-indigo-600 dark:text-indigo-400"
        >
          📝 Notes App
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NavLink to="/notes" className={linkClass}>
                Notes
              </NavLink>
              <NavLink to="/new" className={linkClass}>
                New Note
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {user && pathname === "/notes" && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            dir="auto"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm sm:w-56 dark:border-slate-600 dark:bg-slate-700 "
          />
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {user && (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
