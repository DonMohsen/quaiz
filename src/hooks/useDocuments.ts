// hooks/useDocuments.ts
"use client"

import { useState, useEffect } from "react"
import { Document, Prisma } from "@prisma/client"
import axios from "axios"

type UseDocumentsParams =
  | { action: "findMany" }
  | { action: "findUnique"; id: string }
  | { action: "create"; data: Prisma.DocumentCreateInput }

export function useDocuments(params: UseDocumentsParams) {
  const [data, setData] = useState<Document[] | Document | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let response
        switch (params.action) {
          case "findMany":
            response = await axios.get<Document[]>("/api/document")
            break
          case "findUnique":
            response = await axios.get<Document>(`/api/document/${params.id}`)
            break
          case "create":
            response = await axios.post<Document>("/api/document", params.data)
            break
        }

        setData(response?.data ?? null)
      } catch (err: any) {
        setError(err.response?.data?.error || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [JSON.stringify(params)]) // rerun on param changes

  return { data, loading, error }
}
