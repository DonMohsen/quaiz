"use client"

import React from "react"
import { useDocuments } from "@/hooks/useDocuments"

const DocumentsTable = () => {
  const { data, loading, error } = useDocuments({ action: "findMany" })

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>
  if (!Array.isArray(data)) return <p>No documents found.</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Slug</th>
            <th className="border px-4 py-2">User ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doc) => (
            <tr key={doc.id}>
              <td className="border px-4 py-2">{doc.id}</td>
              <td className="border px-4 py-2">{doc.title ?? "-"}</td>
              <td className="border px-4 py-2">{doc.slug}</td>
              <td className="border px-4 py-2">{doc.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentsTable
