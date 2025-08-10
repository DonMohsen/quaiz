// stores/modalStore.ts
import { DocumentWithRelations } from "@/types/document.types";
import { User } from "@prisma/client";
import { create } from "zustand";


type ModalType = "CREATE_QUAIZ" | "CREATE_FLASHCARD" | null;

interface ModalState {
  document: DocumentWithRelations | null;
  user:User|null
  type: ModalType;
  openModal: (type: ModalType, document?: DocumentWithRelations | null,user?:User|null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  document: null,
  user:null,
  openModal: (type, document = null,user=null) => set({ type, document: document,user:user }),
  closeModal: () => set({ type: null, document: null,user:null }),
}));