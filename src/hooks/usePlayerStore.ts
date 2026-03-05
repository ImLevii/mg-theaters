import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PlayerSettingsState {
  autoPlay: boolean;
  setAutoPlay: (autoPlay: boolean) => void;
  toggleAutoPlay: () => void;
}

export const usePlayerStore = create<PlayerSettingsState>()(
  persist(
    (set) => ({
      autoPlay: true,
      setAutoPlay: (autoPlay) => set({ autoPlay }),
      toggleAutoPlay: () => set((state) => ({ autoPlay: !state.autoPlay })),
    }),
    {
      name: "vadedtv-player-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
