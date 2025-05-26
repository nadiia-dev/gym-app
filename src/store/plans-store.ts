import { create } from "zustand";

export const plansStore = create((set) => ({
  selectedPlan: null,
  setSelectedPlan: (selectedPlan: any) => set({ selectedPlan }),
}));

export interface IPlansStore {
  selectedPlan: any;
  setSelectedPlan: (selectedPlan: any) => void;
}
