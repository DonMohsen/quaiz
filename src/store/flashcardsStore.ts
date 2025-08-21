import { FlashCardCreatePayload } from "@/types/flashcards.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface flashcardsStoreType {
  flashcards: FlashCardCreatePayload|null;
  setFlashcards: (flashcards: FlashCardCreatePayload|null) => void;
    currentFlashcard:number|null
  setCurrentFlashcard:(index:number|null)=>void
}

const useFlashcardsStore = create<flashcardsStoreType>()(
  persist(
    (set) => ({
      flashcards: null,
      setFlashcards: (state) => set({ flashcards: state }),
       currentFlashcard:null,
      setCurrentFlashcard: (state) => set({currentFlashcard:state }),
      
    }),
    {
      name: "flashcards", // localStorage key
    }
  )
);

export default useFlashcardsStore;