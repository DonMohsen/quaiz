// hooks/useChatByUserAndDoc.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChatWithMessages } from "@/types/chat.types";

export const useChatByUserAndDoc = (userId: string, slug: string) => {
  return useQuery<ChatWithMessages>({
    queryKey: ["chat", userId, slug],
    queryFn: async () => {
      const res = await axios.get("/api/chat/by-user-doc", {
        params: { userId, slug },
      });

      return res.data as ChatWithMessages;
    },
    staleTime: 1000 * 60 * 5,
  });
};
