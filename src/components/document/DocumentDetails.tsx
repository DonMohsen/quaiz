"use client";
import useMenuStore from "@/store/useMenuStore";
import { DocumentWithRelations } from "@/types/document.types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
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
import { useAddViewToDocument } from "@/hooks/useAddViewToDocument";
import { ChevronDown, ChevronLeft, Edit, Info, Trash } from "lucide-react";
type Props = {
  doc: DocumentWithRelations;
  currentUser: User;
};
const DocumentDetails = ({ doc, currentUser }: Props) => {
  const openModal = useModalStore((s) => s.openModal);
  const {
    data: quaizzes,
    isLoading: quaizzesLoading,
    error: quaizzesError,
  } = useQuaizzes({ userId: currentUser.id });
  const { mutate: addView, isPending } = useAddViewToDocument(doc.slug);
  const [docDetailMenuOpen, setDocDetailMenuOpen] = useState(false);
  useEffect(() => {
    addView(currentUser.id);
  }, []);

  const router = useRouter();

  const { menuState } = useMenuStore();

  const handleActionClick = (kind: QuickStartKind) => {
    switch (kind) {
      case QuickStartKind.CHAT:
        router.push(`/documents/${doc.slug}/chat`);
        break;

      case QuickStartKind.QUAIZ:
        openModal("CREATE_QUAIZ", { document: doc, user: currentUser });
        break;

      case QuickStartKind.FLASHCARD:
        openModal("CREATE_FLASHCARD", { document: doc, user: currentUser });
        break;

      default:
        break;
    }
  };
  console.log(quaizzes);

  return (
    <div
      className={`w-[85%] max-md:w-[95%] mx-auto h-full transition-all duration-300 pt-[100px] ${
        menuState && "lg:pl-[165px]"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center flex-col ">
        <div className="w-full py-5 border-b border-black/[0.1] flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Button className="bg-[#1c3ca9] !w-[60px] h-full hover:brightness-125">
              <ChevronLeft
                onClick={() => router.push("/dashboard")}
                className="text-white"
              />
            </Button>
            <p className="text-[36px] max-md:text-[26px] text-left font-sans">
              {doc.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                openModal("CREATE_EDIT_DOCUMENT", {
                  user: currentUser,
                  document: doc,
                })
              }
              className={`bg-[#1c3ca9] p-10 text-white max-md:hidden
              ${currentUser.id !== doc.user.id && "hidden"}
              `}
            >
              Edit Document
            </Button>

            {/* //!The docdetails Button */}
            {currentUser.id === doc.user.id ? (
              <div className="relative inline-block">
                {/* Trigger button */}
                <Button
                  onClick={() => setDocDetailMenuOpen((prev) => !prev)}
                  className="bg-white border !w-[60px] border-[#1c3ca9] p-10 text-[#1c3ca9]"
                >
                  <ChevronDown
                    style={{
                      transform: `rotate(${docDetailMenuOpen ? 180 : 0}deg)`,
                      transition: "transform 0.2s ease",
                    }}
                  />
                </Button>

                {/* Popup menu */}
                {docDetailMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                    <button
                      onClick={() => {
                        openModal("DOCUMENT_DETAILS", {
                          document: doc,
                          user: currentUser,
                        }),
                          setDocDetailMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 flex items-center justify-start gap-2 hover:bg-gray-100 transition"
                    >
                      <Info className="text-[#1c3ca9]" /> Details
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 flex items-center justify-start gap-2 hover:bg-gray-100 transition">
                      <Trash className="text-[#eb2e2e]" /> Delete
                    </button>
                    <button
                      className={`w-full md:hidden px-4 py-2 text-left text-sm font-medium text-gray-700
                     flex items-center justify-start gap-2 hover:bg-gray-100 transition"
                     ${currentUser.id !== doc.user.id && "hidden"}
                     `}
                      onClick={() => {
                        openModal("CREATE_EDIT_DOCUMENT", {
                          user: currentUser,
                          document: doc,
                        }),setDocDetailMenuOpen(false)
                      }}
                    >
                      <Edit className="text-[#1c3ca9]" /> Edit
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() =>
                  openModal("DOCUMENT_DETAILS", {
                    document: doc,
                    user: currentUser,
                  })
                }
                className="bg-[#1c3ca9] p-10 relative text-white max-md:!w-full flex items-between !justify-start gap-5 "
              >
                <Info className="w-full md:pr-3" />
                <p className="max-md:hidden w-full">Details</p>
              </Button>
            )}
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
        {quaizzesLoading ? (
          <div>Loading.....</div>
        ) : quaizzesError ? (
          <div>Error</div>
        ) : quaizzes?.length === 0 ? (
          <div>No quaizzes yet!</div>
        ) : (
          quaizzes &&
          quaizzes.length > 0 && (
            <div className="w-full grid grid-cols-3 gap-6 max-md:grid-cols-1 max-lg:grid-cols-3 max-xl:grid-cols-3">
              {quaizzes
                .filter((q) => q.results && q.results.length > 0) // only quizzes with results
                .map((q) => {
                  const percentage = Math.round(
                    (q.results[0].score / q.results[0].total) * 100
                  );

                  const titleDirection = getTextDirection(
                    q.questions?.[0]?.text || "rtl"
                  );

                  return (
                    <div
                      key={q.id}
                      onClick={() => openModal("QUAIZ_RESULTS", { quaiz: q })}
                      className="p-4 relative rounded-[12px] flex gap-2 items-center justify-start
                       w-full border border-black/[0.1] hover:shadow-lg cursor-pointer transition-all duration-300 hover:border-blue-600"
                    >
                      <CircularProgressBar
                        color={getColorByValue(percentage)}
                        max={q.results[0].total || 5}
                        value={q.results[0].score}
                        size={50}
                        strokeWidth={5}
                      />
                      <p
                        dir={titleDirection}
                        className="text-[14px] font-medium"
                      >
                        {q.title}
                      </p>
                      <p className="absolute bottom-1 right-3 text-black/[0.5] text-[12px]">
                        {timeAgo(q.createdAt.toString())}
                      </p>
                    </div>
                  );
                })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DocumentDetails;
