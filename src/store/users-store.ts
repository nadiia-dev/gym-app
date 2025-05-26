import { IUser } from "@/types/user";
import { create } from "zustand";

const usersStore = create((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
}));

export default usersStore;

export interface IUsersStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}
