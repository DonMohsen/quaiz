// components/ModalRenderer.tsx
"use client";

import { useModalStore } from "@/store/ModalStore";
import QuaizMakerForm from "./QuaizMakerForm";
import FlashcardMakerForm from "./FlashcardMakerForm";

export function ModalRenderer() {
  const { type, closeModal,document,user } = useModalStore();

  if (!type) return null;

  switch (type) {
    case "CREATE_QUAIZ":
      if (user&&document) {
        
        return <QuaizMakerForm onClose={closeModal} document={document} user={user}/>;
      }

    case "CREATE_FLASHCARD":
      return <FlashcardMakerForm onClose={closeModal} />;

    default:
      return null;
  }
}