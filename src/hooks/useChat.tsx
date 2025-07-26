// hooks/useDocuments.ts
"use client";

import { useState, useEffect } from "react";
import { Document } from "@prisma/client";
import axios from "axios";
import { DocumentWithRelations } from "@/types/document.types";

export function useChat({userId,documentSlug}:{userId:string,documentSlug:string}) {
  const [data, setData] = useState<DocumentWithRelations[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId||!documentSlug) return;

    const fetchDocs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<DocumentWithRelations[]>(
          `/api/document/user/${userId}`
        );
        setData(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else if (
          typeof err === "object" &&
          err !== null &&
          "response" in err
        ) {
          const errorResponse = err as {
            response?: { data?: { error?: string } }
          }
          setError(errorResponse.response?.data?.error ?? "Unknown error occurred")
        } else {
          setError("Unknown error occurred")
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [userId]);

  return { data, loading, error };
}
