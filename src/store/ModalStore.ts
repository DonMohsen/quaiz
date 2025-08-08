// stores/modalStore.ts
import { create } from "zustand";

type ModalType = "CREATE_QUAIZ" | "CREATE_FLASHCARD" | null;

interface ModalState {
  type: ModalType;
  props: Record<string, any> | null;
  openModal: (type: ModalType, props?: Record<string, any>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  props: null,
  openModal: (type, props = {}) => set({ type, props }),
  closeModal: () => set({ type: null, props: null }),
}));