import type { User, StoredUser } from "../types/user";
import type { LoginValues, RegisterValues } from "../schemas/auth";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function login(values: LoginValues): Promise<User> {
  const response = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(values.email)}&password=${encodeURIComponent(values.password)}`,
  );
  if (!response.ok) throw new Error("Failed to login");

  const users: StoredUser[] = await response.json();
  if (users.length === 0) throw new Error("Invalid email or password");

  const { password: _password, ...user } = users[0];
  return user;
}

export async function register(values: RegisterValues): Promise<User> {
  const check = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(values.email)}`,
  );
  if (!check.ok) throw new Error("Failed to register");
  const existing: StoredUser[] = await check.json();
  if (existing.length > 0) throw new Error("Email already registered");

  const { confirmPassword: _confirm, ...data } = values;

  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to register");

  const created: StoredUser = await response.json();
  const { password: _password, ...user } = created;
  return user;
}
