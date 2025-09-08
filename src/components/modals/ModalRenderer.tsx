// components/ModalRenderer.tsx
"use client";

import { useModalStore } from "@/store/ModalStore";
import QuaizMakerForm from "./QuaizMakerForm";
import FlashcardMakerForm from "./FlashcardMakerForm";
import QuaizResultsForm from "./QuaizResultsForm";
import DocumentModal from "./DocumentModal";

export function ModalRenderer() {
  const { type, closeModal,document,user,quaiz } = useModalStore();

  if (!type) return null;

  switch (type) {
    case "CREATE_QUAIZ":
      if (user&&document) {
        
        return <QuaizMakerForm onClose={closeModal} document={document} user={user}/>;
      }
      case "QUAIZ_RESULTS":
        if (quaiz) {
          return <QuaizResultsForm onClose={closeModal} quaizResults={quaiz}/>
        }
        case "CREATE_EDIT_DOCUMENT":
        if (user) {
          return <DocumentModal onClose={closeModal} document={document} user={user}/>
        }

    case "CREATE_FLASHCARD":
      if (user&&document) {
      return <FlashcardMakerForm document={document} user={user} onClose={closeModal} />;
      }
    default:
      return null;
  }
}