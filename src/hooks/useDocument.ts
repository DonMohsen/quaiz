"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Document, Prisma } from "@prisma/client"
import axios from "axios"
import { DocumentWithRelations } from "@/types/document.types"

// ✅ Fetch documents
async function fetchDocuments(userId?: string): Promise<DocumentWithRelations[]> {
  const url = userId 
    ? `/api/document?userId=${encodeURIComponent(userId)}`
    : "/api/document"
  const response = await axios.get<DocumentWithRelations[]>(url)
  return response.data
}

// ✅ Create document
async function createDocument(data: Prisma.DocumentCreateInput): Promise<Document> {
  const response = await axios.post<Document>("/api/document", data)
  return response.data
}

// ✅ All documents
export function useAllDocuments() {
  return useQuery<DocumentWithRelations[], Error>({
    queryKey: ["documents"],
    queryFn: () => fetchDocuments(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })
}

// ✅ Documents filtered by userId
export function useUserDocuments(userId: string) {
  return useQuery<Document[], Error>({
    queryKey: ["documents", userId],
    queryFn: () => fetchDocuments(userId),
    enabled: !!userId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })
}

// ✅ Create document hook
export function useCreateDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Prisma.DocumentCreateInput) => createDocument(data),
    onSuccess: (newDocument) => {
      // ✅ v5 syntax: pass { queryKey } object
      queryClient.invalidateQueries({ queryKey: ["documents"] })
      queryClient.invalidateQueries({ queryKey: ["documents", newDocument.userId] })
    },
  })
}
async function editDocument(slug: string, data: Partial<Document>): Promise<Document> {
  const response = await axios.put<Document>(`/api/document/${slug}`, data);
  return response.data;
}

export function useEditDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<Document> }) =>
      editDocument(slug, data),
    onSuccess: (updatedDoc) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["documents", updatedDoc.userId] });
    },
  });
}