"use client";
import useMenuStore from "@/store/useMenuStore";
import { DocumentWithRelations } from "@/types/document.types";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { quickStarts } from "@/lib/consts/quickStarts";
import { useRouter } from "next/navigation";
import { QuickStartKind } from "@/types/quaiz.types";
import { useModalStore } from "@/store/ModalStore";
import { User } from "@prisma/client";
import { useQuaizzes } from "@/hooks/useQuaizzes";
import { timeAgo } from "@/lib/utils/timeAgo";
import CircularProgress from "../ui/CircularProgressProps";
import CircularProgressBar from "../ui/CircularProgressProps";
import { getColorByValue } from "@/lib/utils/getColorByValue";
import { getTextDirection } from "@/lib/utils/getTextDirection";
type Props = {
  doc: DocumentWithRelations
  currentUser:User
};
const DocumentDetails = ({ doc,currentUser }: Props) => {
  const openModal = useModalStore((s) => s.openModal);
const { data: quaizzes, isLoading:quaizzesLoading, error:quaizzesError, } = useQuaizzes({userId:currentUser.id});

  const router = useRouter();

  const { menuState } = useMenuStore();

  const handleActionClick = (kind: QuickStartKind) => {
  switch (kind) {
    case QuickStartKind.CHAT:
      router.push(`/documents/${doc.slug}/chat`);
      break;

    case QuickStartKind.QUAIZ:
      openModal("CREATE_QUAIZ",doc,currentUser);
      break;

    case QuickStartKind.FLASHCARD:
      openModal("CREATE_FLASHCARD",doc,currentUser);
      break;

    default:
      break;
  }
};

  return (
    <div
      className={`w-[85%] max-md:w-[95%] mx-auto min-h-[300vh] h-full transition-all duration-300 pt-[100px] ${
        menuState && "lg:pl-[165px]"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center flex-col ">
        {/* <Image
          alt={doc.slug}
          src={doc.image || "/placeholder.webp"}
          width={1000}
          height={300}
          className="w-full max-h-[200px] rounded-[8px] object-cover"
        /> */}
        <div className="w-full py-5 border-b border-black/[0.1] flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">

        <Button className="bg-[#1c3ca9] h-full hover:brightness-125">
          <ChevronLeft
          onClick={router.back}
          className="text-white"/>
        </Button>
          <p className="text-[36px] max-md:text-[26px] text-left font-sans">
            {doc.title}
          </p>
        </div>
          <div className="flex items-center gap-2">
            <Button className="bg-[#1c3ca9] p-10 text-white max-md:hidden">
              Edit Document
            </Button>
            <Button className="bg-white border border-[#1c3ca9] p-10 text-[#1c3ca9]">
              <ChevronDown />
            </Button>
          </div>
        </div>
        <p className="font-medium text-[20px] text-left w-full py-5">
          Choose a study method
        </p>

        <div className="flex w-full items-center justify-center gap-6 max-md:flex-col ">
          {quickStarts.map((q) => (
            <div
              onClick={() => handleActionClick(q.kind)}
              key={q.kind}
              className={`p-4 rounded-[16px] flex gap-2 items-center justify-start
           w-full border border-black/[0.1] hover:shadow-lg cursor-pointer transition-all duration-300 hover:border-blue-600`}
            >
              <Image
                alt={q.title}
                src={q.imageUrl}
                width={200}
                height={200}
                className="w-12 h-12 rounded-[10px] bg-[#c2c3ff] p-[2px]"
              />
              {q.title}
            </div>
          ))}
        </div>
         <p className="font-medium text-[20px] text-left w-full py-5">
          Previous Quaizzes
        </p>
          {quaizzesLoading?
        <div>Loading.....</div>  
        :quaizzesError?
        <div>Error</div>
        :
        quaizzes?.length===0?<div>No quaizzes yet!</div>:quaizzes&&
        <div className=" w-full grid grid-cols-3 gap-6 max-md:grid-cols-1 max-lg:grid-cols-3 max-xl:grid-cols-3 ">
          {quaizzes.map((q) => { 
            const percentage = Math.round((q?.results[0]?.score / q.results[0].total) * 100);
              console.log(percentage);
              const titleDirection=getTextDirection(q.questions[0].text||'rtl')
            return(
            <div
              key={q.id}
              className={`p-4 relative rounded-[12px] flex gap-2 items-center justify-start
           w-full border border-black/[0.1] hover:shadow-lg cursor-pointer transition-all duration-300 hover:border-blue-600`}
            >
             
            <CircularProgressBar color={getColorByValue(percentage)} max={q.results[0].total} value={q.results[0].score} size={50} strokeWidth={5}  />
          <p dir={titleDirection} className="text-[14px] font-medium">

              {q.title}
            </p>
              <p className="absolute bottom-1 right-3 text-black/[0.5] text-[12px] ">

              {timeAgo(q.createdAt.toString())}
              </p>
            </div>
            
          )})}
        </div>

        }
      </div>
    </div>
  );
};

export default DocumentDetails;
