// actions/deleteDocument.ts
"use client";
import axios from "axios";

export async function deleteDocumentById(id: number) {
  try {
    const res = await axios.delete(`/api/document/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("Delete error:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.error || "Failed to delete document.");
  }
}
