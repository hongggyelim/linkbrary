import { create } from "zustand";
interface ExpandedStore {
  isExpanded: boolean;
  toggleExpanded: () => void;
  setExpanded: () => void;
  setClosed: () => void;
}
const useExpandedStore = create<ExpandedStore>((set) => {
  return {
    isExpanded: false,
    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
    setExpanded: () => set({ isExpanded: true }),
    setClosed: () => set({ isExpanded: false }),
  };
});

export default useExpandedStore;
