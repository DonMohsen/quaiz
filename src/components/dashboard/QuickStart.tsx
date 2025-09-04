"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { quickStarts } from "@/lib/consts/quickStarts";
import { Button } from "../ui/Button";


const QuickStart = () => {
  const router = useRouter();

  return (
    <div className="my-5">
      <p className="text-[32px] font-extrabold w-full text-center mb-5">
        Quick start
      </p>

      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-8 w-full">
        {quickStarts.map((quickStart) => (
          <QuickStartCard
            key={quickStart.title}
            quickStart={quickStart}
            onClick={() => router.push(quickStart.href)}
          />
        ))}
      </div>

      {/* Mobile swiper */}
      <div className="md:hidden w-full">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={true}
            initialSlide={1} // start with the first card in center

        >
          {quickStarts.map((quickStart) => (
            <SwiperSlide key={quickStart.title}>
              <QuickStartCard
                quickStart={quickStart}
                onClick={() => router.push(quickStart.href)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const QuickStartCard = ({
  quickStart,
  onClick,
}: {
  quickStart: (typeof quickStarts)[number];
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between bg-[#eaf7ff] p-4 gap-4 rounded-2xl h-[330px]">
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
        <p className="text-[18px] font-medium text-[#5d7dff]">
          {quickStart.title}
        </p>
        <p className="text-[16px] font-light text-center">
          {quickStart.description}
        </p>
      </div>

      <Button
        onClick={onClick}
        className="mx-10 bg-gradient-to-br from-[#763cfc] text-white from-[1%] to-[#a65ce7] to-[99%]"
      >
        <span>Let&apos;s Go!</span>
      </Button>
    </div>
  );
};

export default QuickStart;
