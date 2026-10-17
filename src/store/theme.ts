import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  search: string;
  setSearch: (value: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      search: "",
      setSearch: (value) => set({ search: value }),
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
