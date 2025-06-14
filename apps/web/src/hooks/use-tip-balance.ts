import { create } from "zustand";

export interface UseTipBalance {
  balance: string;
  setBalance: (v: string) => void;
}

export const useTipBalance = create<UseTipBalance>((set) => ({
  balance: "15",
  setBalance: (v) => {
    set({ balance: v });
  },
}));
