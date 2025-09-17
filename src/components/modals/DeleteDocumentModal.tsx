"use client";

import { DocumentWithRelations } from "@/types/document.types";
import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { Button } from "../ui/Button";
import { useDeleteDocument } from "@/hooks/useDocument";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/ModalStore";
import { TriangleAlert } from "lucide-react";
import { AxiosError } from "axios";

type Props = {
  document: DocumentWithRelations;
  onClose: () => void;
  userId: string;
};

const DeleteDocumentModal = ({ document, onClose, userId }: Props) => {
  const router = useRouter();
  const { closeModal } = useModalStore();
  const [loading, setLoading] = useState(false);
  const [inputSlug, setInputSlug] = useState("");
  const [error, setError] = useState("");

  const deleteDoc = useDeleteDocument();
useEffect(() => {
  console.log("error:::",error);
  
}, [error])

  const handleDelete = async () => {
    // Trim and lowercase to avoid minor typos/spaces
    if (inputSlug.trim().toLowerCase() !== document.slug.trim().toLowerCase()) {
      setError("The slug does not match. Please type it exactly.");
      return;
    }

    try {
      setLoading(true);
      await deleteDoc.mutateAsync(document.slug);
      router.push("/dashboard");
      closeModal();
    }catch (err: unknown) {
  console.error(err);

  if (err instanceof AxiosError) {
    setError(err.response?.data?.error || "Failed to delete document");
  } else if (err instanceof Error) {
    // fallback for normal errors
    setError(err.message || "Failed to delete document");
  } else {
    setError("Failed to delete document");
  }
}

finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4 w-full text-left pb-5 border-b p-5">
        Delete Document
      </h2>
      <div className="w-full h-full flex items-start justify-start flex-col p-5">
        <p className="mb-2">
          Are you sure to delete{" "}
          <span className="font-bold">{document.slug}</span> document?
        </p>

        {/* Input for confirmation */}
        <div className="mt-10 w-full">
          <p className="mb-2">Type &quot;{document.slug}&quot; below to confirm</p>
          <input
            type="text"
            placeholder="Type document slug"
            value={inputSlug}
            onChange={(e) => {
              setInputSlug(e.target.value);
              setError("");
            }}
            className={`w-full mb-2 px-3 py-2 border rounded transition-colors duration-200 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
        </div>

        {/* Warning */}
        <div className="w-full flex gap-5 px-4 py-2 mt-10 border rounded-xl">
          <TriangleAlert className="text-[#f28735]" />
          <p className="text-[#f28735]">
            This will delete all the quaizzes and other stuff related to it
          </p>
        </div>

        {/* Actions */}
        <div className="flex w-full justify-between items-end h-full gap-2 mb-[80px]">
          <Button
            className="border-2 border-black/[0.2]"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-400 hover:bg-red-500 font-bold text-white"
            onClick={handleDelete}
            loading={loading}
            disabled={loading || inputSlug.trim().toLowerCase() !== document.slug.trim().toLowerCase()}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDocumentModal;
