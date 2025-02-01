import { create } from "zustand";
interface ExpandedStore {
  isExpanded: boolean;
  toggleExpanded: () => void;
  setExpanded: () => void;
}
const useExpandedStore = create<ExpandedStore>((set) => {
  return {
    isExpanded: false,
    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
    setExpanded: () => set({ isExpanded: true }),
  };
});

export default useExpandedStore;
