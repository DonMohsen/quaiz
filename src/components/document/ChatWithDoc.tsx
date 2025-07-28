"use client";
import { User } from "@prisma/client";
import React from "react";
import ChatUI from "./ChatUI";
import { useDocumentBySlug } from "@/hooks/useDocumentBySlug";
import ChatUILoading from "../Loadings/ChatUILoading";
import { AlertCircle } from "lucide-react";
type Props = {
documentSlug:string
  user: User;

};
const ChatWithDoc = ({ documentSlug, user }: Props) => {
const { data, isLoading, error } = useDocumentBySlug(documentSlug);

  if (isLoading) return <ChatUILoading />;

  if (error)
    return (
      <div className="h-[100vh] flex flex-col items-center justify-center text-center text-red-500 px-4">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="font-semibold text-lg">Failed to fetch the document.</p>
        <p className="text-sm opacity-80 mt-1">{error.message}</p>
      </div>
    );

  if (!data)
    return (
      <div className="h-[100vh] flex items-center justify-center text-center text-gray-500 px-4">
        Document not found.
      </div>
    );

  return <ChatUI document={data} user={user} />;
};

export default ChatWithDoc;