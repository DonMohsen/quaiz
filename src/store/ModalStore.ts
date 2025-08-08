// stores/modalStore.ts
import { create } from "zustand";

type ModalType = "CREATE_QUAIZ" | "CREATE_FLASHCARD" | null;

interface ModalState {
  type: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  openModal: (type) => set({ type }),
  closeModal: () => set({ type: null }),
}));