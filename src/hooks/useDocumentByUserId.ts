// hooks/useDocuments.ts
"use client";

import { useState, useEffect } from "react";
import { Document } from "@prisma/client";
import axios from "axios";
import { DocumentWithRelations } from "@/types/document.types";

export function useDocumentsByUserId(userId: string) {
  const [data, setData] = useState<DocumentWithRelations[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchDocs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<DocumentWithRelations[]>(
          `/api/document/user/${userId}`
        );
        setData(res.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.error || "Error fetching user documents."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [userId]);

  return { data, loading, error };
}
