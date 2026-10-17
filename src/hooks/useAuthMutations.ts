import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";

export function useAuthMutations() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      navigate("/notes");
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      setUser(user);
      navigate("/notes");
    },
  });

  return { loginMutation, registerMutation };
}
