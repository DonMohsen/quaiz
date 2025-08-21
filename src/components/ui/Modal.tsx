"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
          className="w-screen h-[100vwh] fixed z-[99990] flex items-center justify-center bg-black/40 backdrop-blur-sm"
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
            className="w-[80%] max-md:w-[100%] h-[80%] max-md:h-[100%] bg-white rounded-[16px] max-md:rounded-none border-white/[0.1] border p-5"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
