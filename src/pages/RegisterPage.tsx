import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router-dom";
import { registerSchema, type RegisterValues } from "../schemas/auth";
import { useAuthMutations } from "../hooks/useAuthMutations";
import { useAuthStore } from "../store/useAuthStore";
function RegisterPage() {
  const user = useAuthStore((s) => s.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });
  const { registerMutation } = useAuthMutations();
  if (user) return <Navigate to="/notes" replace />;

  return (
    <form
      onSubmit={handleSubmit((values) => registerMutation.mutate(values))}
      className="mx-auto max-w-sm space-y-4"
    >
      <h2 className="text-2xl font-bold">Register</h2>
      <div>
        <input
          {...register("username")}
          type="text"
          autoComplete="username"
          placeholder="username"
          className="w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>
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
          autoComplete="new-password"
          placeholder="Password"
          className="w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("confirmPassword")}
          type="password"
          autoComplete="new-password"
          placeholder="Confirm password"
          className="w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {registerMutation.isError && (
        <p className="text-sm text-red-600">{registerMutation.error.message}</p>
      )}
      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {registerMutation.isPending ? "Loading..." : "Register"}
      </button>
      <p className="text-sm">
        Already have an account ?
        <Link to="/login" className="text-indigo-600 underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterPage;
