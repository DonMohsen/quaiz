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
}