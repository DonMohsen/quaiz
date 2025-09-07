// stores/modalStore.ts
import { DocumentWithRelations } from "@/types/document.types";
import { QuaizWithResults } from "@/types/quaiz.types";
import { User } from "@prisma/client";
import { create } from "zustand";

type ModalType = "CREATE_QUAIZ" | "CREATE_FLASHCARD"|"QUAIZ_RESULTS"|"FLASHCARDS_RESULTS"|"CREATE_EDIT_DOCUMENT"| null;

interface ModalState {
  document: DocumentWithRelations | null;
  user: User | null;
  quaiz: QuaizWithResults | null;
  type: ModalType;
  openModal: (
    type: ModalType,
    options?: {
      document?: DocumentWithRelations | null;
      user?: User | null;
      quaiz?: QuaizWithResults | null;
    }
  ) => void;
  closeModal: () => void;
  setType: (type: ModalType) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  document: null,
  user: null,
  quaiz: null,
  openModal: (type, options = {}) =>
    set({
      type,
      document: options.document ?? null,
      user: options.user ?? null,
      quaiz: options.quaiz ?? null,
    }),
  closeModal: () =>
    set({ type: null, document: null, user: null, quaiz: null }),
  setType: (type) => set({ type }),
}));
