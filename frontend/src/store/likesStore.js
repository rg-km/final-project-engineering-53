import create from "zustand";

export const likesStore = create((set) => ({
  like: 1,
  addLikes: () => set((state) => ({ like: state.like + 1 })),
  removeLikes: (id) =>
    set((state) => {
      const removedLike = state.like.filter((like) => like.id !== id);
      state.like = removedLike;
    }),
}));
