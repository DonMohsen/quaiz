import { Difficulty, Prisma } from "@prisma/client";

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
// export type QuaizWithRelations = Prisma.QuaizGetPayload<{
//   include: {
//     user: true;            // include the user relation
//     document: true;        // include the document relation
//     questions: {
//       include: {
//         options: true;     // include options for each question
//       };
//     };
//   };
// }>;

// export type Option={
// text:string
// isCorrect:number
// }
// export type QuaizQuestions={
//     text:string
//     options:Option[]
// }
// export type QuaizStoreType={
//     userId:string
//     documentSlug:string
//     difficulity:Difficulty
//     questionCount:Number
//     questions:QuaizQuestions[]
     
// }

type QuaizOptionInput = {
  text: string;
  isCorrect: boolean;
};

export type QuaizQuestionInput = {
  text: string;
  options: QuaizOptionInput[];
};

export type QuaizPayload = {
  userId: string;
  documentSlug: string;
  difficulty: Difficulty; // or enum type if you have one for difficulty
  questionCount: number;
  questions: QuaizQuestionInput[];
  userAnswers?:UserAnswer
};
export type UserAnswer={
    selectedOptionIndex: number | null;
    isCorrect: boolean;
    answeredAt?: Date;

}
export type QuaizWithRelations = Prisma.QuaizGetPayload<{
  include: {
    questions: {
      include: {
        options: true;
      };
    };
  };
}>;