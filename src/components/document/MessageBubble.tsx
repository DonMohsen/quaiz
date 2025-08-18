import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import React from "react";
import { OptimisticMasseges } from "@/types/chat.types";

 const MessageBubble = React.memo(
  ( { msg }: { msg: OptimisticMasseges | {
    id: number;
    chatId: number;
    role: string;
    content: string;
    createdAt: Date;
} }) => {
    return (
      <div className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
        <div
          className={`chat-bubble ${
            msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {msg.role === "assistant" ? (
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {msg.content}
            </ReactMarkdown>
          ) : (
            msg.content
          )}
        </div>
      </div>
    );
  }
);

// ✅ Explicitly set displayName to silence ESLint
MessageBubble.displayName = "MessageBubble";
export default MessageBubble