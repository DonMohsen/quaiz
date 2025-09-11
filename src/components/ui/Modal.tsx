"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";

const Modal = ({
  onClose,
  children,
}: Readonly<{
  children: React.ReactNode;
  onClose: () => void;
}>) => {
  const [isVisible, setIsVisible] = useState(true);

  // When onClose is called, trigger exit animation first
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        onClose(); // finally update your store after exit animation
      }}
    >
      {isVisible && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-screen h-[100dvh] fixed z-[99990] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            key="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
              mass: 1,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-[40%] max-md:w-[100%] h-[80%] max-md:h-[100dvh] relative bg-white rounded-[16px] max-md:rounded-none border-white/[0.1] border p-5"
          >
            <div
              onClick={handleClose}
              className="sm:hover:bg-red-200 rounded-full bg-slate-300 absolute top-5 right-5 p-2 max-md:top-2 max-md:right-2  cursor-pointer hover:scale-125  transition-all duration-300 z-[100000]"
            >
              <RxCross1 className="w-4 h-4" />
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
