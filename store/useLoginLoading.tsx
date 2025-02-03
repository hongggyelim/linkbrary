import { create } from "zustand";

interface LoginLoadingStore {
  isLoading: boolean;
  setIsLoading: () => void;
  setIsDone: () => void;
}
const useLoginLoading = create<LoginLoadingStore>((set) => {
  return {
    isLoading: false,
    setIsLoading: () => set({ isLoading: true }),
    setIsDone: () => set({ isLoading: false }),
  };
});

export default useLoginLoading;
