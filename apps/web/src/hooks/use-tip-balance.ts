import { create } from "zustand";

export interface UseTipBalance {
  balance: string;
  to: string;
  setBalance: (v: string) => void;
  setTo: (v: string) => void;
}

export const useTipBalance = create<UseTipBalance>((set) => ({
  balance: "15",
  to: "",
  setBalance: (v) => {
    set({ balance: v });
  },
  setTo: (v) => {
    set({ to: v });
  },
}));
