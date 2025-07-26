import { quickStarts } from "@/lib/consts/quickStarts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

const QuickStart = () => {
  const router=useRouter()
  return (
 <div className="my-5">
  <p className="text-[32px] font-extrabold w-full text-center mb-5">
    Quick start
  </p>

  <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 w-full">
    {quickStarts.map((quickStart) => (
      <div
        key={quickStart.title}
        className="flex flex-col justify-between bg-[#eaf7ff] p-4 gap-4 rounded-2xl"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-[10px] w-14 h-14 bg-[#c7d2fd]">
            <Image
              alt={quickStart.title}
              src={quickStart.imageUrl}
              width={1000}
              height={1000}
              className="w-full h-full p-1"
            />
          </div>
          <p className="text-[18px] font-medium text-[#5d7dff]">{quickStart.title}</p>
          <p className="text-[16px] font-light text-center">
            {quickStart.description}
          </p>
        </div>

        <Button onClick={()=>router.push(quickStart.href)} className="mx-10 bg-gradient-to-br from-[#763cfc] text-white from-[1%] to-[#a65ce7] to-[99%]">
<span>Let&apos;s Go!</span>
        </Button>
      </div>
    ))}
  </div>
</div>

  );
};

export default QuickStart;