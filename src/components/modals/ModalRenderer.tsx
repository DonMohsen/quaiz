// components/ModalRenderer.tsx
"use client";

import { useModalStore } from "@/store/ModalStore";
import QuaizMakerForm from "./QuaizMakerForm";
import FlashcardMakerForm from "./FlashcardMakerForm";

export function ModalRenderer() {
  const { type, closeModal } = useModalStore();

  if (!type) return null;

  switch (type) {
    case "CREATE_QUAIZ":
      return <QuaizMakerForm onClose={closeModal} />;

    case "CREATE_FLASHCARD":
      return <FlashcardMakerForm onClose={closeModal} />;

    default:
      return null;
  }
}