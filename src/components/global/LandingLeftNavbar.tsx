"use client"
import useMenuStore from "@/store/useMenuStore";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Logo from "./Logo";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const SIDEBAR_WIDTH = 240;

const LandingLeftNavbar = () => {
  const { menuState, setMenuState } = useMenuStore();
  const router = useRouter();

  return (
    <>
      {/* fake early and late navbar for visual */}
      <AnimatePresence>
        {menuState && (
          <motion.div
            key="blue-blur"
            initial={{ width: 0 }}
            animate={{ width: SIDEBAR_WIDTH }}
            exit={{ width: 0 }}
            transition={{
              duration: 0.15, // faster on open
              ease: "easeInOut",
            }}
            className="fixed top-0 md:left-0 h-[100dvh] bg-[#314eaf] z-30 max-md:right-0"
          />
        )}
      </AnimatePresence>
      <div
        className={`bg-black opacity-30 fixed w-full h-full top-0 lg:hidden  z-20 ${
          !menuState && "hidden"
        }`}
        onClick={() => setMenuState(false)}
      ></div>
      {/*  actual sidebar */}
      <motion.div
        initial={false}
        animate={{ width: menuState ? SIDEBAR_WIDTH : 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="fixed top-0 md:left-0 h-[100dvh] bg-[#1c3ca9] text-white overflow-hidden z-40 max-md:right-0 select-none"
      >
        <div className="flex flex-col items-start justify-between w-full h-full pt-[70px]">
          <div className="px-4 w-full">
            <Logo />
            <SignedOut>

            <div className="w-full flex items-center justify-center gap-4 mt-10">
              <Button
                onClick={() => router.push("/sign-in")}
                className="text-[16px] bg-[#9f58e7] px-[24px] py-[12px] whitespace-nowrap hover:brightness-150 relative"
                >
                Sign in
              </Button>
              <Button
                onClick={() => router.push("/sign-up")}
                className="text-[16px] bg-transparent border px-[24px] py-[12px] whitespace-nowrap hover:bg-blue-500"
                >
                <p>Sign Up</p>
              </Button>
            </div>
                  </SignedOut>
                  <SignedIn>
                    <UserButton/>
                  </SignedIn>
          </div>
          <div className="border-t border-white/[0.2] p-4 w-full flex gap-2 items-center justify-start cursor-pointer hover:bg-[#3450b3]">
            <Image
              alt="upgrade-plan"
              src={"/rocket.png"}
              width={200}
              height={200}
              className="w-6 h-6"
            />
            <div className="flex flex-col">
              <p className="text-[14px] whitespace-nowrap">Upgrade plan</p>
              <p className="text-[12px] whitespace-nowrap">
                Create unlimited documents!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LandingLeftNavbar;
