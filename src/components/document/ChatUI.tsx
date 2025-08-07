"use client";
import { useChatByUserAndDoc } from "@/hooks/useChatByUserAndDoc";
import useMenuStore from "@/store/useMenuStore";
import { DocumentWithRelations } from "@/types/document.types";
import { Message as MessageType, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

type Props = {
  document: DocumentWithRelations;
  user: User;
};
type OptimisticMasseges = {
  id: string;
  content: string;
  role: string;
};
const ChatUI = ({ document: doc, user }: Props) => {
  const [message, setMessage] = useState("");
  const { data: chat, isLoading } = useChatByUserAndDoc(user.id, doc.slug);
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { menuState } = useMenuStore();
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticMasseges[]
  >([]);
  const [aiMessage, setAiMessage] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);

  const sendMessageMutation = useMutation({
    mutationFn: async (payload: {
      content: string;
      documentSlug: string;
      userId: string;
      role: string;
    }) => {
      const res = await axios.post("/api/chat/send", payload);
      return res.data;
    },
    // ,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["chat", user.id, doc.slug],
    //   });
    // },
  });

  // Auto-scroll to bottom when messages update

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const userMessage = {
        id: crypto.randomUUID(), // ✅ Unique ID

      content: message,
      role: "user",
    };

    // Optimistically show user's message
    setOptimisticMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Send to backend to persist
    sendMessageMutation.mutate({
      content: message,
      documentSlug: doc.slug,
      userId: user.id,
      role: "user",
    });

    // Begin AI response
    setIsAiResponding(true);
    setAiMessage(""); // reset
const allMessages = [...optimisticMessages, ...(chat?.messages || [])];

// Get last 3 messages from the merged list
const lastMessages = allMessages.slice(-5);
    try {
      const res = await fetch("/api/answering-ai", {
        method: "POST",
        body: JSON.stringify({
          prompt: message,
          history: lastMessages, // must be defined in your component
          doc: doc.text, // must be defined in your component
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.body) {
        setIsAiResponding(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullAiMessage = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullAiMessage += chunk;
        setAiMessage((prev) => prev + chunk);
      }
      const aiMessage = {
          id: crypto.randomUUID(), // ✅ Unique ID

        content: fullAiMessage,
        role: "assistant",
      };
      setOptimisticMessages((prev) => [...prev, aiMessage]);

      setIsAiResponding(false);

      sendMessageMutation.mutate({
        content: fullAiMessage, // ✅ not from state
        documentSlug: doc.slug,
        userId: user.id, // ✅ don't reuse user's ID
        role: "assistant",
      });

      // queryClient.invalidateQueries({
      //   queryKey: ["chat", user.id, doc.slug],
      // });
    } catch (error) {
      console.error("AI stream error:", error);
      setIsAiResponding(false);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // slight delay ensures the DOM is fully rendered

    return () => clearTimeout(timeout);
  }, [chat?.messages.length, optimisticMessages.length, aiMessage]);
  function isRTL(text: string): boolean {
    // Checks if the text contains mostly Persian/Arabic characters
    const rtlCharPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return rtlCharPattern.test(text);
  }
  return (
    <div
      className={`w-[85%] max-md:w-[95%] mx-auto h-[100vh] transition-all duration-300 pt-[80px] flex gap-2 ${
        menuState && "lg:pl-[165px]"
      }`}
    >
      {/* Left: Document preview */}
      <div className="bg-transparent w-[50%] h-full overflow-hidden overflow-x-hidden min-h-full  max-h-screen max-md:hidden pb-[25px]">
        <div className="bg-white h-full rounded-[14px] border border-black/[0.1]">
          <p className="bg-white w-full rounded-t-[14px] px-4 py-2 font-bold">
            Document Content
          </p>
          <p
            dir={isRTL(doc.text!) ? "rtl" : "ltr"}
            className="p-4 overflow-auto"
          >
            {doc.text}
          </p>
        </div>
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
                  alt={doc.image || "doc"}
                  src={doc.image || "/placeholder.webp"}
                  width={200}
                  height={200}
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{doc.title}</p>
                  <p className="font-light">{`Created by ${
                    doc.user.userName === user.userName
                      ? "You"
                      : doc.user.userName
                  }`}</p>
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 w-full overflow-y-auto p-4 space-y-2 break-words whitespace-pre-wrap">
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading messages...</p>
              ) : chat?.messages.length === 0 ? (
                <p className="text-sm text-gray-500">No messages yet.</p>
              ) : (
                [...(chat?.messages || []), ...optimisticMessages].map(
                  (msg) => (
                    <div
                      key={msg.id}
                      className={`chat break-words whitespace-pre-wrap ${
                        msg.role === "user" ? "chat-end" : "chat-start"
                      }`}
                    >
                      <div
                        className={`chat-bubble break-words whitespace-pre-wrap   ${
                          msg.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <div
                                                      dir={isRTL(msg.content) ? "rtl" : "ltr"}

                          className="overflow-x-hidden">{msg.content}</div>
                        ) : (
                          <div
                            id="chat-container"
                            dir={isRTL(msg.content) ? "rtl" : "ltr"}
                            className="overflow-x-hidden"
                          >
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )
              )}
              {isAiResponding && aiMessage && (
                <div className="chat chat-start">
                  <div className="chat-bubble max-w-[70%] break-words whitespace-pre-wrap bg-gray-200 text-black">
                    <ReactMarkdown>{aiMessage}</ReactMarkdown>
                  </div>
                </div>
              )}

              {isAiResponding && (
                <span className="italic text-gray-500">Thinking...</span>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Chat input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="w-full p-3"
            >
              <div
                onClick={() => inputRef.current?.focus()}
                className="flex items-center gap-2 rounded-[12px] border border-[#a8a7de] shadow-md px-4 py-1 w-full bg-white cursor-text"
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  ref={inputRef}
                  type="text"
                  placeholder="Chat to doc..."
                  className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="text-white bg-[#4b6bfb] hover:bg-[#3b57e0] px-4 py-2 rounded-full transition"
                >
                  <SendHorizontal className="text-white fill-transparent w-4 h-4" />
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
