import { useQuery } from "@tanstack/react-query";
import { getNotes, getNote } from "../api/notes";
import { useAuthStore } from "../store/useAuthStore";
import type { Note } from "../types/note";

export function useNotes() {
  const user = useAuthStore((s) => s.user);

  return useQuery<Note[]>({
    queryKey: ["notes", "list", user?.id],
    queryFn: () => getNotes(user!.id),
    enabled: !!user,
  });
}

export function useNote(id: string | undefined) {
  const user = useAuthStore((s) => s.user);

  return useQuery<Note>({
    queryKey: ["notes", "detail", id],
    queryFn: async () => {
      const note = await getNote(id!);
      if (String(note.userId) !== String(user?.id))
        throw new Error("Note not found");
      return note;
    },
    enabled: !!id && !!user,
  });
}
