import {create}from "zustand"


interface MenuStoreType{
    menuState:boolean
    toggleMenuState:()=>void
    setMenuState: (state: boolean) => void;
}
const useMenuStore=
create<MenuStoreType>((set)=>({
    menuState:false,
    toggleMenuState:()=>{
        set((state)=>({menuState:!state.menuState}))
    },
      setMenuState: (state) => set({ menuState: state }),

}))
export default useMenuStore