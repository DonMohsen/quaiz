"use client";
import { useChat } from "@/hooks/useChat";
import useMenuStore from "@/store/useMenuStore";
import { DocumentWithRelations } from "@/types/document.types";
import { User } from "@prisma/client";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
type Props = {
  doc: DocumentWithRelations;
  user: User;
  chatId: number;
};
const ChatWithDoc = ({ doc, user, chatId }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { menuState } = useMenuStore();
  // const {data,error,loading}=useUser({chat})
  return (
    <div
      className={`w-[85%] max-md:w-[95%] mx-auto h-[100vh]  transition-all duration-300 pt-[100px] flex gap-2  ${
        menuState && "lg:pl-[165px]"
      }`}
    >
      <div className="bg-[#fef3b5] w-[50%] h-fit rounded-[14px] max-h-screen max-md:hidden">
        <p className="bg-[#fff7d0] w-full rounded-t-[14px] px-4 py-2 font-bold">
          Document Content
        </p>
        <p className="p-4">{doc.text}</p>
      </div>
      {/* //!chating section */}
      <div className="w-[50%] max-md:w-full h-full relative  flex flex-col   ">
        <p className="absolute bottom-0 left-[50%] -translate-x-[50%] whitespace-nowrap text-[14px]">
          AI can make mistakes. Check important info.
        </p>
        <div className="pb-[25px]  h-full flex flex-col items-center justify-between">
          <div className="w-full p-5 flex items-center justify-between max-md:p-1 bg-white border border-black/[0.1] rounded-t-[16px] ">
            <div className="flex gap-5 items-center justify-center  ">
              <Image
                alt={doc.image || "doc"}
                src={doc.image || "/placeholder.webp"}
                width={200}
                height={200}
                className="rounded-full w-10 h-10 "
              />
              <div className="flex flex-col ">
                <p className="font-bold">{doc.title}</p>
                <p className="font-light">{`Created by ${
                  doc.user.userName === user.userName
                    ? "You"
                    : doc.user.userName
                }`}</p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="overflow-auto">lorem*11</div>
          <div
            onClick={() => inputRef.current?.focus()}
            className="flex items-center gap-2 rounded-[18px] border border-[#a8a7de] shadow-md px-4 py-2 w-full bg-white cursor-text"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Chat to document..."
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400 cursor-text"
            />
            <button
              type="submit"
              className="text-white bg-[#4b6bfb] hover:bg-[#3b57e0] px-4 py-2 rounded-full transition"
            >
              <SendHorizontal className="text-white fill-transparent w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithDoc;
