"use server";
import React from "react";
import { Button } from "../ui/Button";
import Demo from "./Demo";
import LandingContent from "./LandingContent";

const Hero = () => {
  return (
    <div className="w-full min-h-[100dvh]  flex flex-col items-center justify-start relative overflow-hidden">
      <div className="bg-[#1c3ca9] clipped absolute flex items-center justify-center">
        {/* //!The 3 gradients.....  */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(192, 132, 252, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(147, 197, 253, 0.3) 6%, transparent 50%)",
          }}
        />
        <div
          className="absolute top-0 left-[50%] w-[400px] h-[400px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at top, rgba(192, 132, 252, 0.3) 0%, transparent 30%)",
          }}
        />

        {/* //!The clipped shard shits..... */}
        <div className="absolute bottom-0 left-0 bottom-left-poly bg-gradient-to-r from-[#098af2] to-[#165bc8] w-[200px] h-[100px]" />
        <div className="absolute top-[300px] right-[200px] middle-poly bg-gradient-to-r from-[#1c3ca9] to-[#2a48ac] w-[800px] h-[200px]" />
        <div className="absolute right-0 top-[200px] top-right-poly bg-gradient-to-r from-[#098af2] to-[#0062ff] w-[200px] h-[100px]" />
        {/* //! An illusion of a white border polygon!!!!!!!! */}
        <div className="absolute top-[200px] left-0 w-[300px] h-[200px]">
          <div className="absolute w-full h-full top-left-poly border-box bg-white/[0.1]" />

          <div className=" absolute w-[calc(100%-4px)] h-[calc(100%-4px)] top-[2px] left-[2px] top-left-poly bg-[#173da8]" />
        </div>
      </div>
      {/* //!Finally!!!!! A Hero!!!!!! */}
      <div className="text-white z-10 max-md:mt-[100px] px-4 mt-[150px] text-center flex flex-col items-center justify-start w-full">
        <p className="text-[50px] font-bold max-md:text-[36px]">
          Advanced quiz generator with AI
        </p>
        <p className="text-[18px] font-extralight mt-2 max-w-[500px] mx-auto ">
  From quizzes to flashcards and chat-to-doc, our AI turns your study material into interactive tools that make learning easier
        </p>

        <div className="w-full flex items-center justify-center max-md:flex-col gap-4 mt-7">
          <Button
          redirect="/dashboard"
           className="max-md:w-full py-5 bg-gradient-to-br from-[#7939fc] to-[#a35be5] font-semibold md:px-[40px]">
            Start Now
          </Button>
          <Button
            redirect={"/#about"}
            className="max-md:w-full py-5 bg-transparent border font-semibold md:px-[40px]"
          >
            About us
          </Button>
        </div>
      </div>

      {/* Demo Scrollable Section */}
      <Demo />
      
    </div>
  );
};

export default Hero;
