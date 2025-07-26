"use client";
import { motion, AnimatePresence } from "framer-motion";
import useMenuStore from "@/store/useMenuStore";
import Logo from "./Logo";
import Image from "next/image";
import { appRoutes } from "@/lib/consts/appRoutes";
import Link from "next/link";
import { useAllDocuments } from "@/hooks/useAllDocuments";

const SIDEBAR_WIDTH = 240;

const LeftNavbar = () => {
  const { menuState, setMenuState } = useMenuStore();
  const{data:allDocs,error:allDocsError,loading:allDocsLoading}=useAllDocuments()
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
            className="fixed top-0 md:left-0 h-screen bg-[#314eaf] z-30 max-md:right-0"
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
        className="fixed top-0 md:left-0 h-screen bg-[#1c3ca9] text-white overflow-hidden z-40 max-md:right-0 select-none"
      >
        <div className="flex flex-col items-start justify-between w-full h-full pt-[75px]">
          <div className="px-4 w-full">
            <Logo />
            <div className=" mt-5 flex flex-col border-b border-white/[0.2] w-full pb-2">
              {appRoutes.map((appRoute) => (
                <Link
                  key={appRoute.path}
                  href={appRoute.path}
                  className="flex gap-2 items-center py-3 hover:bg-[#2047c5] rounded-xl transition-colors duration-300 whitespace-nowrap "
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
              {/* //? The Documents section */}
          <div className="w-full  h-full whitespace-nowrap">
            <p className=" font-extralight text-[14px] text-white/[0.7] mt-5 mb-2">Documents</p>
            {allDocs?
            <div className="flex items-start justify-center flex-col gap-3">
              {allDocs.map((doc)=>(
                <Link href={`/documents/${doc.slug}`} key={doc.id} className="flex items-center justify-start gap-1 hover:bg-[#2047c5] w-full p-2 rounded-md ">
                  <Image alt={doc.slug} src={doc.image||'/placeholder.webp'} height={200} width={200} className="rounded-md w-6 h-6"/>
                  <p className="text-[14px] font-bold">
                    
                  {doc.title}
                  </p>
                  
                  </Link>
              ))}
            </div>
            :
            <div>
              No documents yet!
            </div>
            }


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
      </motion.div>
    </>
  );
};

export default LeftNavbar;
