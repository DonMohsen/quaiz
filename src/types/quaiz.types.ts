import { Prisma } from "@prisma/client";

export enum QuickStartKind {
    CHAT,
    QUAIZ,
    FLASHCARD
}
export type QuickStartType={
    kind:QuickStartKind;
    title:string;
    description:string;
    imageUrl:string;
    href:string
}
export type QuaizCreatePayload = Prisma.QuaizCreateInput;
