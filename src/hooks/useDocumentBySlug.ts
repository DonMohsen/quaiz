// hooks/useDocuments.ts
"use client"

import { useState, useEffect } from "react"
import { Document, Prisma } from "@prisma/client"
import axios from "axios"

export function useDocumentBySlug({slug}:{slug:string}) {
  const [data, setData] = useState<Prisma.DocumentCreateInput[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("all docs fetched!!");
    
    const fetchDocuments = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get<Prisma.DocumentCreateInput[]|null>(`/api/document/${slug}`)
        setData(response.data)
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
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  return { data, loading, error }
}
