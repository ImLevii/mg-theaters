import { create } from "zustand";

interface PiPState {
    isActive: boolean;
    isMinimized: boolean;
    source: string | null;
    title: string | null;
    metadata: {
        id: number;
        type: "movie" | "tv";
        season?: number;
        episode?: number;
    } | null;
    openPiP: (
        source: string,
        title: string,
        metadata: PiPState["metadata"]
    ) => void;
    closePiP: () => void;
    toggleMinimize: () => void;
}

export const usePiPStore = create<PiPState>((set) => ({
    isActive: false,
    isMinimized: true,
    source: null,
    title: null,
    metadata: null,
    openPiP: (source, title, metadata) =>
        set({ isActive: true, isMinimized: true, source, title, metadata }),
    closePiP: () =>
        set({
            isActive: false,
            isMinimized: true,
            source: null,
            title: null,
            metadata: null,
        }),
    toggleMinimize: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));
