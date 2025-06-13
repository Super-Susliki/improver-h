import type { IntMaxClient } from "intmax2-client-sdk";
import { create } from "zustand";

type UseIntMaxClientStore = {
    intMaxClient: IntMaxClient | null;
    setIntMaxClient: (intMaxClient: IntMaxClient) => void;
}

export const useIntMaxClientStore = create<UseIntMaxClientStore>((set) => ({
    intMaxClient: null,
    setIntMaxClient: (intMaxClient) => set({ intMaxClient }),
}));
