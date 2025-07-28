"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DocumentWithRelations } from "@/types/document.types";

// Define a better type here for clarity if needed

export function useDocumentBySlug(slug: string) {
  return useQuery<DocumentWithRelations>({
    queryKey: ["document", slug],
    queryFn: async () => {
      const res = await axios.get(`/api/document/${slug}`);
      return res.data;
    },
    enabled: !!slug, // don't run if slug is empty
    staleTime: 1000 * 60 * 5, // cache valid for 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
