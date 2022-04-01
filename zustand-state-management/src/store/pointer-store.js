import create from "zustand";

const useStore = create((set, get) => ({
  pointer: 0,
  incrementPointer: () => set((state) => ({ pointer: state.pointer + 1 })),
  decrementPointer: () => set((state) => ({ pointer: state.pointer - 1 })),
  resetPointer: () => set((state) => ({ pointer: 0 })),
  logPointer: () => {
    console.log(get().pointer);
    // state access karna he but state set ni karna to use get() method
  },
}));

export default useStore;
