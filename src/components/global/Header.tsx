"use client";
import { useRoutes } from "@/hooks/useRoutes";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HamMenu } from "./HamMenu";
import useMenuStore from "@/store/useMenuStore";
import { Book, PanelTopOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type HeaderProps={
varient:"landing"|"app"
}
const Header = ({varient}:HeaderProps) => {
  const router = useRouter();
  const routes = useRoutes();
  const{MenuState,toggleMenuState}=useMenuStore();
    const [scrolled, setScrolled] = useState(false);
 const [shouldRender, setShouldRender] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  return (
<header
  className={clsx(
    "fixed z-[50] top-0 w-full h-[70px] flex  items-center justify-between px-[100px] font-inter text-white transition-all duration-500 max-md:px-[10px]",
    varient === "app"
      ? scrolled
        ? "bg-[#1f3dab]/90 backdrop-blur-md shadow-md"
        : "bg-[#1c3ca9]"
      : scrolled
      ? "bg-[#1f3dab]/70 backdrop-blur-md shadow-md"
      : "bg-transparent shadow-none"
  )}
>


      <div className="w-[30%] max-md:w-full relative  text-[26px] font-bold h-full flex items-center justify-center select-none  ">

        <PanelTopOpen
  onClick={toggleMenuState}
  style={{
    transform: `rotate(${MenuState ? 90 : 270}deg)`,
  }}
  className={clsx(
    "transition-transform duration-300 w-6 h-6 absolute -left-3 max-md:hidden cursor-pointer",
    varient === "landing" && "hidden"
  )}
/>

   <AnimatePresence>
      {!MenuState && (
        <motion.div
          key="logo-section"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center relative"
        >
  
          <div className="flex items-center justify-center ">

          <Image
            onClick={() => router.push("/")}
            alt="Quaiz Logo"
            src="/logo.png"
            width={512}
            height={512}
            className="w-16 h-16 cursor-pointer"
            />

          <p
            onClick={() => router.push("/")}
            className="cursor-pointer -translate-x-3"
            >
            uaiz
          </p>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
      </div>
      <div className="md:hidden max-md:w-full h-full flex items-center justify-center">
        <HamMenu />
      </div>

      <div className="flex items-center max-md:hidden  justify-center gap-7 text-[12px] font-light px-[20px] h-full w-full  ">
        {routes.map((route) => (
          <p
            key={route.label}
            className={clsx(
              `tracking-tight cursor-pointer`,
              route.label === "Home" && "font-bold"
            )}
          >
            {route.label}
          </p>
        ))}
      </div>
      <div className="max-md:hidden flex items-center justify-center w-[30%] text-[12px] font-light gap-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button
            onClick={() => router.push("/sign-in")}
            className="bg-transparent px-[24px] py-[12px] whitespace-nowrap hover:bg-blue-900 relative"
          >
            Sign in
          </Button>
          <Button
            onClick={() => router.push("/sign-up")}
            className="bg-transparent border px-[24px] py-[12px] whitespace-nowrap hover:bg-blue-500"
          >
            <p>Sign Up</p>
          </Button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
