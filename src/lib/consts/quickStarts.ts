import { QuickStartKind, QuickStartType } from "@/types/quaiz.types";

export const quickStarts: QuickStartType[] = [
  {
    kind: QuickStartKind.CHAT,
    title: "Chat to document",
    description:
      "you can analaize your imported document and chat with it like your friend! maybe even generate something from it",
    imageUrl: "/chat.png",
    href:'/documents'
  },
  {
    kind: QuickStartKind.QUAIZ,

    title: "Start Quaiz",
    description:
    "Generate a fully customizable test from a document and prove yourself with a high score!",
    imageUrl: "/quaiz.png",
    href:'/documents'
  },
  {
    kind: QuickStartKind.FLASHCARD,

    title: "Study by flash cards",
    description:
      "Not ready for a Quaiz yet? then start to studying a document by flash cards is the way to go",
    imageUrl: "/flash-card.png",
    href:'/documents'
  },
];
