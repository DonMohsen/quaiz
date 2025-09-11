"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react"; // spinner icon

type Props = {
  loading: boolean;
};

export function LoadingButton({ loading }: Props) {
  return (
    <button
      type="submit"
      form="quizForm"
      disabled={loading}
      className="relative overflow-hidden bg-[#4f36f4] w-[160px] h-[50px]
                 text-white font-semibold text-[18px] shadow-[#382b96] shadow-md
                 flex items-center justify-center rounded-md
                 md:hover:brightness-150 transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!loading ? (
          <motion.span
            key="text"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            Create Quiz
          </motion.span>
        ) : (
          <motion.span
            key="spinner"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute flex items-center justify-center"
          >
            <Loader2 className="w-6 h-6 animate-spin" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
