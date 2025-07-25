"use client";
import React from "react";
import Welcome from "./Welcome";
import QuickStart from "./QuickStart";
import { User } from "@prisma/client";
import useMenuStore from "@/store/useMenuStore";
import { SPACE_FROM_LEFT_FOR_NAVBAR } from "@/lib/consts/magicNumbers";

const Dashboard = ({ user }: { user: User }) => {
  const { menuState } = useMenuStore();
  const paddingClass = menuState
    ? `lg:pl-[${SPACE_FROM_LEFT_FOR_NAVBAR}]`
    : "pl-0";

  return (
    <div
      className={`w-[85%] max-md:w-[95%] mx-auto min-h-[300vh] h-full transition-all duration-300 pt-[110px] ${paddingClass}`}
    >
      <Welcome user={user} />
      <QuickStart />
    </div>
  );
};

export default Dashboard;
