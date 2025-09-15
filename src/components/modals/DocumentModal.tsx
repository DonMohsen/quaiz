"use client";

import { DocumentWithRelations } from "@/types/document.types";
import React from "react";
import Modal from "../ui/Modal";
import { User } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useCreateDocument, useEditDocument } from "@/hooks/useDocument";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  document: DocumentWithRelations | null;
  onClose: () => void;
  user: User;
};

// ✅ Form schema
const DocumentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(500, "Content must be at most 500 characters"),
});

type DocumentFormData = z.infer<typeof DocumentSchema>;
const DocumentModal = ({ document, onClose, user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentFormData>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      title: document?.title ?? "",
      slug: document?.slug ?? "",
      content: document?.text ?? "",
    },
  });
  const router = useRouter();
  const createDoc = useCreateDocument();
  const editDoc = useEditDocument();

  const onSubmit = (data: DocumentFormData) => {
    if (document) {
      // ✅ Edit existing doc
      editDoc.mutate(
        {
          slug: document.slug,
          data: {
            title: data.title,
            text: data.content, // slug ignored by backend
          },
        },
        {
          onSuccess: (updatedDoc) => {
            console.log("Document updated ✅", updatedDoc);
            toast(`Document ${updatedDoc.title} updated !`)
            onClose();
          },
          onError: (err: unknown) => {
            console.error("Failed to update document ❌", err);
          },
        }
      );
    } else {
      // ✅ Create new doc
      createDoc.mutate(
        {
          title: data.title,
          slug: data.slug,
          text: data.content,
          user: { connect: { id: user.id } },
        },
        {
          onSuccess: (newDocument) => {
            console.log("Document created ✅", newDocument);
                        toast(`Document ${newDocument.title} created !`)

            router.push(`/documents/${data.slug}`);
            onClose();
          },
          onError: (err: unknown) => {
            console.error("Failed to create document ❌", err);
          },
        }
      );
    }
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full mt-5 flex flex-col items-center justify-start gap-4 px-[20%] max-md:px-[10%]"
      >
        <p className="text-[30px] font-semibold text-center max-md:text-[24px]">
          How would you like your document?
        </p>
        <p className="text-[16px] font-medium text-center max-md:text-[14px] mt-2 mb-6 text-black/[0.5]">
          Adjust your document details below
        </p>

        {/* Title */}
        <Input
          placeholder="Document Title"
          {...register("title")}
          className="w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {/* Slug */}
        <Input
          placeholder="Unique name (e.g. my-document)"
          {...register("slug")}
          className="w-full"
          disabled={!!document} // 🚫 disable slug when editing
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}

        {/* Content */}
        <Textarea
          placeholder="Document content here..."
          rows={6}
          {...register("content")}
          className="w-full"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}

        {/* Submit */}
        <div className="absolute bottom-4 right-4 flex items-center justify-end">
          <Button
            loading={document ? editDoc.isPending : createDoc.isPending} // ✅ show loading
            disabled={document ? editDoc.isPending : createDoc.isPending} // optional: prevent double clicks
            type="submit"
            className="bg-[#4f36f4] text-white font-semibold text-[18px] shadow-[#382b96] shadow-md md:hover:brightness-150"
          >
            {document ? "Update Document" : "Create Document"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DocumentModal;
