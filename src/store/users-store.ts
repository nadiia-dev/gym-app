import { ISubscription } from "@/types/subscription";
import { IUser } from "@/types/user";
import { create } from "zustand";

const usersStore = create((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
  curSubscription: null,
  setCurSubscription: (curSubscription: ISubscription) =>
    set({ curSubscription }),
}));

export default usersStore;

export interface IUsersStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  curSubscription: ISubscription | null;
  setCurSubscription: (curSubscription: ISubscription) => void;
}
