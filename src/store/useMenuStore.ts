import {create}from "zustand"


interface MenuStoreType{
    MenuState:boolean
    toggleMenuState:()=>void
}
const useMenuStore=
create<MenuStoreType>((set)=>({
    MenuState:false,
    toggleMenuState:()=>{
        set((state)=>({MenuState:!state.MenuState}))
    }
}))
export default useMenuStore