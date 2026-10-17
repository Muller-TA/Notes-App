import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router-dom";
import { loginSchema, type LoginValues } from "../schemas/auth";
import { useAuthMutations } from "../hooks/useAuthMutations";
import { useAuthStore } from "../store/useAuthStore";
function LoginPage() {
  const user = useAuthStore((s) => s.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });
  const { loginMutation } = useAuthMutations();
  if (user) return <Navigate to="/notes" replace />;

  return (
    <form
      onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
      className="mx-auto max-w-sm space-y-4"
    >
      <h2 className="text-2xl font-bold">Login</h2>

      <div>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("password")}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {loginMutation.isError && (
        <p className="text-sm text-red-600">{loginMutation.error.message}</p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loginMutation.isPending ? "Loading..." : "Login"}
      </button>

      <p className="text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 underline">
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginPage;
