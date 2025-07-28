import React from "react";
import useMenuStore from "@/store/useMenuStore";
import Skeleton from "../ui/Skeleton";

const ChatUILoading = () => {
  const { menuState } = useMenuStore();

  return (
    <div
      className={`w-[85%] max-md:w-[95%] mx-auto h-[100vh] transition-all duration-300 pt-[80px] flex gap-2 ${
        menuState && "lg:pl-[165px]"
      }`}
    >
      {/* Document preview skeleton */}
      <div className="bg-[#fef3b5] w-[50%] max-md:hidden rounded-[14px] p-4 space-y-4">
        <Skeleton className="h-6 w-1/2 bg-[#fff7d0]" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Chat skeleton */}
      <div className="w-[50%] max-md:w-full h-full flex flex-col relative">
        <Skeleton className="h-16 w-full rounded-t-[18px]" />
        <div className="flex-1 p-4 space-y-3 overflow-auto">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-3/4 rounded-md" />
          ))}
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-[12px] border border-[#a8a7de] shadow-md px-4 py-2 w-full bg-white">
            <Skeleton className="h-5 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUILoading;
