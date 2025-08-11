import { QuaizWithRelations } from "@/types/ai.types";
import { QuaizCreatePayload } from "@/types/quaiz.types";
import { Quaiz } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuaizStoreType {
  quaiz: QuaizCreatePayload|null;
  setQuaiz: (quaiz: QuaizCreatePayload) => void;
}

const useQuaizStore = create<QuaizStoreType>()(
  persist(
    (set) => ({
      quaiz: null,
  
      setQuaiz: (state) => set({ quaiz: state }),
    }),
    {
      name: "quaiz-storage", // localStorage key
    }
  )
);

export default useQuaizStore;
