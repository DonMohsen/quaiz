"use client";
import { useChatByUserAndDoc } from "@/hooks/useChatByUserAndDoc";
import useMenuStore from "@/store/useMenuStore";
import { DocumentWithRelations } from "@/types/document.types";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  document: DocumentWithRelations;
  user: User;
};

const ChatUI = ({ document, user }: Props) => {
  const [message, setMessage] = useState("");
  const { data: chat, isLoading } = useChatByUserAndDoc(user.id, document.slug);
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { menuState } = useMenuStore();

  const sendMessageMutation = useMutation({
    mutationFn: async (payload: {
      content: string;
      documentSlug: string;
      userId: string;
    }) => {
      const res = await axios.post("/api/chat/send", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat", user.id, document.slug],
      });
    },
  });

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages?.length]);

  return (
    <div
      className={`w-[85%] max-md:w-[95%] mx-auto h-[100vh] transition-all duration-300 pt-[80px] flex gap-2 ${
        menuState && "lg:pl-[165px]"
      }`}
    >
      {/* Left: Document preview */}
      <div className="bg-[#fef3b5] w-[50%] h-fit rounded-[14px] max-h-screen max-md:hidden">
        <p className="bg-[#fff7d0] w-full rounded-t-[14px] px-4 py-2 font-bold">
          Document Content
        </p>
        <p className="p-4">{document.text}</p>
      </div>

      {/* Right: Chat panel */}
      <div className="w-[50%] max-md:w-full h-full relative flex flex-col">
        <p className="absolute bottom-1 left-[50%] -translate-x-[50%] whitespace-nowrap text-[12px] text-black/[0.7]">
          AI can make mistakes. Check important info.
        </p>

        <div className="pb-[25px] h-full flex flex-col items-center justify-between">
          <div className="w-full flex flex-col items-center justify-between h-full border border-black/[0.1] rounded-[18px]">
            {/* Chat Header */}
            <div className="w-full p-5 flex items-center justify-between max-md:p-1 bg-white border-b border-black/[0.1] rounded-t-[18px]">
              <div className="flex gap-5 items-center justify-center">
                <Image
                  alt={document.image || "doc"}
                  src={document.image || "/placeholder.webp"}
                  width={200}
                  height={200}
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{document.title}</p>
                  <p className="font-light">{`Created by ${
                    document.user.userName === user.userName
                      ? "You"
                      : document.user.userName
                  }`}</p>
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 w-full overflow-y-auto p-4 space-y-2">
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading messages...</p>
              ) : chat?.messages.length === 0 ? (
                <p className="text-sm text-gray-500">No messages yet.</p>
              ) : (
                 chat?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[70%] text-sm ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) return;

                sendMessageMutation.mutate({
                  content: message,
                  documentSlug: document.slug,
                  userId: user.id,
                });

                setMessage(""); // Clear input
              }}
              className="w-full p-3"
            >
              <div
                onClick={() => inputRef.current?.focus()}
                className="flex items-center gap-2 rounded-[12px] border border-[#a8a7de] shadow-md px-4 py-2 w-full bg-white cursor-text"
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  ref={inputRef}
                  type="text"
                  placeholder="Chat to document..."
                  className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="text-white bg-[#4b6bfb] hover:bg-[#3b57e0] px-4 py-2 rounded-full transition"
                >
                  <SendHorizontal className="text-white fill-transparent w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
