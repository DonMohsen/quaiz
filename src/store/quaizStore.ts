import { QuaizCreatePayload, QuaizPayload, QuaizWithRelations, UserAnswer } from "@/types/quaiz.types";
import { Quaiz } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuaizStoreType {
  quaiz: QuaizPayload|null;
  setQuaiz: (quaiz: QuaizPayload|null) => void;
  currentQuestion:number|null
  setCurrentQuestion:(index:number|null)=>void
  userAnswer:UserAnswer[],
  setUserAnswer:(answer:UserAnswer[])=>void
}

const useQuaizStore = create<QuaizStoreType>()(
  persist(
    (set) => ({
      quaiz: null,
      setQuaiz: (state) => set({ quaiz: state }),
      currentQuestion:null,
      setCurrentQuestion: (state) => set({currentQuestion:state }),
      userAnswer:[],
      setUserAnswer: (state) => set({userAnswer:state }),

    }),
    {
      name: "quaiz-storage", // localStorage key
    }
  )
);

export default useQuaizStore;