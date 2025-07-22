// actions/deleteDocument.ts
"use client";
import axios from "axios";

export async function deleteDocumentById(id: number) {
  try {
    const res = await axios.delete(`/api/document/${id}`);
    return res.data;
  } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
          
        } else if (
          typeof err === "object" &&
          err !== null &&
          "response" in err
        ) {
          const errorResponse = err as {
            response?: { data?: { error?: string } }
          }
          console.log(

            (errorResponse.response?.data?.error ?? "Unknown error occurred")
          );
        } else {
          console.log(

            "Unknown error occurred"
          );
        }
      }
}
