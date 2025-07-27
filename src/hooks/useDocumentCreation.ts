import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Prisma } from "@prisma/client";

interface UseCreateDocumentOptions<TData = unknown, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}
export const useDocumentCreation = <TData = unknown, TError = unknown>({
  onSuccess,
  onError,
}: UseCreateDocumentOptions<TData, TError> = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDocument = async (
    payload: Prisma.DocumentCreateInput
  ): Promise<TData | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<TData>("/api/document", payload);

      onSuccess?.(response.data);
      return response.data;
    } catch (err: unknown) {
      let message = "Something went wrong";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      onError?.(err as TError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createDocument,
    loading,
    error,
  };
};
