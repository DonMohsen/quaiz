"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMenuStore from "@/store/useMenuStore";
import Logo from "./Logo";
import Image from "next/image";
import { appRoutes } from "@/lib/consts/appRoutes";
import Link from "next/link";

const SIDEBAR_WIDTH = 240;

const LeftNavbar = () => {
  const { menuState, setMenuState } = useMenuStore();
  const [hasMountedFully, setHasMountedFully] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (menuState) {
      timeout = setTimeout(() => setHasMountedFully(true), 150); // match your animation duration
    } else {
      setHasMountedFully(false);
    }
    return () => clearTimeout(timeout);
  }, [menuState]);

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
            className="fixed top-0 left-0 h-screen bg-[#314eaf] z-30"
          />
        )}
      </AnimatePresence>
      <div
        className={`bg-black opacity-30 fixed w-full h-full top-0 lg:hidden max-md:hidden z-20 ${
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
        className="fixed top-0 left-0 h-screen bg-[#1c3ca9] text-white overflow-hidden z-40"
      >
        {hasMountedFully && (
          <div className="flex flex-col items-start justify-between w-full h-full pt-[75px]">
            <div className="px-4 w-full">
              <Logo />
              <div className="my-[60px] flex flex-col border-b border-white/[0.2] w-full">
                {appRoutes.map((appRoute) => (
                  <Link
                    key={appRoute.path}
                    href={appRoute.path}
                    className="flex gap-2 items-center pb-5"
                  >
                    <Image
                      alt={appRoute.label}
                      src={appRoute.imageUrl}
                      width={200}
                      height={200}
                      className="w-8 h-8"
                    />
                    {appRoute.label}
                  </Link>
                ))}
              </div>
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
        )}
      </motion.div>
    </>
  );
};

export default LeftNavbar;
