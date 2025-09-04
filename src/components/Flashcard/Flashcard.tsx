import useFlashcardsStore from "@/store/flashcardsStore";
import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "../ui/Button";
import { getTextDirection } from "@/lib/utils/getTextDirection";
import MarkerBar from "../modals/MarkerBar";
import { useModalStore } from "@/store/ModalStore";

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [direction, setDirection] = useState<1 | -1>(); // 1 = next, -1 = prev
  const { currentFlashcard, flashcards, setCurrentFlashcard,setFlashcards } =useFlashcardsStore();
  const {closeModal}=useModalStore()
 const currentF = currentFlashcard !== null && flashcards ? flashcards[currentFlashcard] : null;

  const controls = useAnimation();
const dir = useMemo(() => getTextDirection(currentF?.text ?? ""), [currentF]);

  const handleClick = useCallback(() => {
    controls.start({ scale: 0.95, transition: { duration: 0.1 } }).then(() => {
      setIsFlipped((prev) => !prev);
      controls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      });
    });
  }, [controls]);



  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };
 if (currentFlashcard === null || !flashcards) {
    return <p>Not found</p>;
  }
  const handleNext = () => {
    if (currentFlashcard < flashcards.length - 1) {
      setDirection(1);
      setCurrentFlashcard(currentFlashcard + 1);
      setIsFlipped(false);
    }else if (currentFlashcard >= flashcards.length - 1) {
      setFlashcards(null)
      setCurrentFlashcard(null)
      closeModal()
    }
  };

  const handlePrevious = () => {
    if (currentFlashcard > 0) {
      setDirection(-1);
      setCurrentFlashcard(currentFlashcard - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div
      style={{ textAlign: dir === "rtl" ? "right" : "left" }}
      className="w-full h-full flex flex-col items-center justify-center relative"
      dir={dir}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentFlashcard}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="absolute w-[70%] h-[70%] max-md:h-[40%] max-md:w-[95%] cursor-pointer perspective-1000"
          // style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className="absolute w-full h-full flex items-center justify-center bg-slate-400 rounded-xl shadow-lg"
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
            >
              {currentF?.title}
            </div>

            {/* Back */}
            <div
              className="absolute w-full h-full flex items-center justify-center bg-white rounded-xl shadow-lg"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {currentF?.text}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-4">
        <Button
          disabled={currentFlashcard === 0}
          className={`font-medium text-white transition-all duration-300
      ${
        currentFlashcard === 0
          ? "bg-red-300 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-400"
      }`}
          onClick={handlePrevious}
        >
          Previous
        </Button>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button
          // disabled={currentFlashcard >= flashcards.length - 1}
          className={`font-medium text-white transition-all duration-300
      bg-red-500 hover:bg-red-400`}
          onClick={handleNext}
        >
          {currentFlashcard >= flashcards.length - 1?'Finish':'Next'}
        </Button>
      </div>
      <div className="absolute top-0 w-[50%] max-md:w-[80%] ">
      <MarkerBar current={currentFlashcard} max={flashcards.length-1} />

      </div>
    </div>
  );
};

export default Flashcard;
