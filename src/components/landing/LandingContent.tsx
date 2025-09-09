import React from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import { whoCanBenefit, whyQuaizWorks } from "@/lib/consts/landingContent";
import { MoveRight } from "lucide-react";

const LandingContent = () => {
  return (
    <div className="w-full">
      {/* //!.......................................................The 3 steps.............................................................. */}
      <p className="text-[48px] max-md:text-[36px] font-bold text-center">
        How Quaiz Works?
      </p>
      <div className="w-full flex flex-col gap-[60px] mt-[70px]">
        <div className="w-full flex items-center justify-center gap-[100px]">
          <div className="w-full flex flex-col gap-5 items-start justify-center">
            <p className="text-[30px] font-bold">
              Step 1-Create Or Select A Document
            </p>
            <p className="text-[18px] font-light">
              A document is the text given by you which is used to generate
              various ways to study it with AI
            </p>
            <Button>Get Started Now</Button>
          </div>
          <div className="w-full">
            <Image
              alt="Steps"
              src={"/placeholder.webp"}
              width={500}
              height={300}
              className="rounded-xl w-full h-[300px]"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-[100px]">
          <div className="w-full">
            <Image
              alt="Steps"
              src={"/placeholder.webp"}
              width={500}
              height={300}
              className="rounded-xl w-full h-[300px]"
            />
          </div>
          <div className="w-full flex flex-col gap-5 items-start justify-center">
            <p className="text-[30px] font-bold">Step 2-Study And Learn</p>
            <p className="text-[18px] font-light">
              With the great power of our AI, you can speed up the proccess of
              learning your document by generating flashcards or even chat with
              your own document
            </p>
            <Button>Get Started Now</Button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-[100px]">
          <div className="w-full flex flex-col gap-5 items-start justify-center">
            <p className="text-[30px] font-bold">
              Step 3-Prove Yourself With Quaiz
            </p>
            <p className="text-[18px] font-light">
              Now that you&apos;re ready, joining the proving grounds of Quaizzes is
              the way to go
            </p>
            <Button>Get Started Now</Button>
          </div>
          <div className="w-full">
            <Image
              alt="Steps"
              src={"/placeholder.webp"}
              width={500}
              height={300}
              className="rounded-xl w-full h-[300px]"
            />
          </div>
        </div>
      </div>
      {/* //!.......................................................Why it works really???.............................................................. */}
      <p className="text-[48px] max-md:text-[36px] font-bold text-center my-[80px]">
        How Quaiz Works?
      </p>
      <div className="w-full grid grid-cols-5 max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-3 gap-10 ">
        {whyQuaizWorks.map((w)=>(
            <div
             key={w.title} 
            className="border rounded-2xl border-black/[0.1]">
                <div className="h-[180px] p-1 bg-[#dcdffe] rounded-lg m-2 flex items-center justify-center">
                    <Image alt={w.title} src={w.imageUrl} width={70} height={70} className="w-[80px] h-[80px]"/>
                </div>
                <div className="py-4 px-3">
                <p className="text-[18px] font-medium mb-1">{w.title}</p>
                                <p className="text-[16px] font-light text-black/[0.6]">{w.description}</p>

                </div>
            </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">

      <Button className="my-[80px] bg-gradient-to-br from-[#763afe] to-[#a75de3] font-bold text-white text-[16px]">
        Get Started
      </Button>
      </div>
            {/* //!.......................................................who it even helps???.............................................................. */}

<p className="text-[48px] max-md:text-[36px] font-bold text-center mt-[80px]">
        Who can benefit?
      </p>
      <div className="flex max-lg:flex-col gap-7 w-full my-[80px]">
        {whoCanBenefit.map((h)=>(
            <div key={h.title} className="flex flex-col gap-3 w-full ">
                <div className="flex items-center justify-start gap-4">
                    <Image alt={h.title} src={h.imageUrl} width={50} height={50} className="w-12 h-12 p-3 bg-[#c2c4fe] rounded-full "/>
                    <p className="font-bold">{h.title}</p>
                </div>
                <p className="text-black/[0.6]">{h.description}</p>
                <p className="flex items-center justify-start gap-2 cursor-pointer  transition-transform duration-300 text-[#2a42b0] font-main">Get Started <MoveRight className="w-3 h-3" /></p>


            </div>
        ))}

      </div>
          </div>
  );
};

export default LandingContent;
