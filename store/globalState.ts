import { create } from "zustand";

export type State = {
  // type states
  auth: boolean;
  userEmail: string;
};

export type Action = {
  // setter functions
  setAuth: (auth: State["auth"]) => void;
  setUserEmail: (userEmail: State["userEmail"]) => void;

  // clear functions
  clearAuth: () => void;
  clearUserEmail: () => void;
};

export const globalState = create<State & Action>((set) => ({
  // initial values
  auth: false,
  userEmail: "",

  // setter functions
  setAuth: (value) => set(() => ({ auth: value })),
  setUserEmail: (value) => set(() => ({ userEmail: value })),

  // clear functions
  clearAuth: () => set({ auth: false }),
  clearUserEmail: () => set({ userEmail: "" }),
}));
