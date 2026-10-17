import { z } from "zod";
export const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(1, "Content Is Required"),
});
export type NoteFormValues = z.infer<typeof noteSchema>;
