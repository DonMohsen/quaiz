// types/chat.types.ts or types/index.ts

import { Prisma } from "@prisma/client";

export type ChatWithMessages = Prisma.ChatGetPayload<{
  include: {
    messages: true;
  };
}>;
