import { create } from "zustand";
interface ExpandedStore {
  isExpanded: boolean;
  toggleExpanded: () => void;
}
const useExpandedStore = create<ExpandedStore>((set) => {
  return {
    isExpanded: false,
    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  };
});

export default useExpandedStore;
