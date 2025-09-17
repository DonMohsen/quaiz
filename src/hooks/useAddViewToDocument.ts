// src/hooks/useAddViewToDocument.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddViewToDocument(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await axios.post("/api/document/views", {
        userId,
        slug, // send slug so backend can resolve the documentId
      });
      return res.data;
    },
    onSuccess: () => {
      // ✅ Refresh the cached document instantly
      queryClient.invalidateQueries({ queryKey: ["documents", slug] });
    },
  });
}
