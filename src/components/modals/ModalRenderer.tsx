// components/ModalRenderer.tsx
"use client";

import { useModalStore } from "@/store/ModalStore";
import QuaizMakerForm from "./QuaizMakerForm";
import FlashcardMakerForm from "./FlashcardMakerForm";

export function ModalRenderer() {
  const { type, props, closeModal } = useModalStore();

  if (!type) return null;

  switch (type) {
    case "CREATE_QUAIZ":
      return <QuaizMakerForm onConfirm={closeModal} onClose={closeModal} {...props} />;

    case "CREATE_FLASHCARD":
      return <FlashcardMakerForm onConfirm={props?.onConfirm} onClose={closeModal} />;

    default:
      return null;
  }
}