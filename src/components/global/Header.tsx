"use client";
import { useRoutes } from "@/hooks/useRoutes";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HamMenu } from "./HamMenu";

const Header = () => {
  const router = useRouter();
  const routes = useRoutes();
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
<header
  className={clsx(
    "fixed z-[50] top-0 w-full h-[70px] flex items-center justify-between px-[100px] font-inter text-white transition-colors duration-300 max-md:px-[10px]",
    scrolled ? "bg-[#1f3dab]/70 backdrop-blur-md shadow-md" : "bg-transparent"
  )}
>
      <div className="w-[30%] max-md:w-full  text-[26px] font-bold h-full flex items-center justify-center  ">
        <Image
          onClick={() => router.push("/")}
          alt="Quaiz Logo"
          src={"/logo.png"}
          width={512}
          height={512}
          className="w-12 h-12 cursor-pointer"
        />
        <p
          onClick={() => router.push("/")}
          className="-translate-x-3 cursor-pointer"
        >
          uaiz
        </p>
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
