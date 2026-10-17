import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createNote, editNote, deleteNote } from "../api/notes";
import type { NoteFormValues } from "../schemas/schema";
import { useAuthStore } from "../store/useAuthStore";
export function useNoteMutations() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const createMutation = useMutation({
    mutationFn: (values: NoteFormValues) => {
      if (!user) throw new Error("You must be logged in");
      return createNote(values, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/notes");
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: NoteFormValues }) =>
      editNote(id, values),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate(`/notes/${id}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/notes");
    },
  });

  return { createMutation, updateMutation, deleteMutation };
}
