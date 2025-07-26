import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MenuStoreType {
  menuState: boolean;
  toggleMenuState: () => void;
  setMenuState: (state: boolean) => void;
}

const useMenuStore = create<MenuStoreType>()(
  persist(
    (set) => ({
      menuState: false,
      toggleMenuState: () =>
        set((state) => ({ menuState: !state.menuState })),
      setMenuState: (state) => set({ menuState: state }),
    }),
    {
      name: "menu-storage", // localStorage key
    }
  )
);

export default useMenuStore;
