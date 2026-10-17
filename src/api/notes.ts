import type { Note } from "../types/note";
import type { NoteFormValues } from "../schemas/schema";
const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

export async function getNotes(userId: string): Promise<Note[]> {
  const response = await fetch(
    `${API_URL}?userId=${encodeURIComponent(userId)}`,
  );
  if (!response.ok) throw new Error("Failed to fetch notes");
  return response.json();
}

export async function createNote(
  values: NoteFormValues,
  userId: string,
): Promise<Note> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...values,
      userId,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) throw new Error("Failed to create note");
  return response.json();
}
export async function getNote(id: string): Promise<Note> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Note not found");
  return response.json();
}

export async function editNote(
  id: string,
  values: NoteFormValues,
): Promise<Note> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!response.ok) throw new Error("Failed to update note");
  return response.json();
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete note");
}
