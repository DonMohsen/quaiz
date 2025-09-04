import React from "react";
import { motion } from "framer-motion";

interface MarkerBarProps {
  current: number;
  max: number;
}

const MarkerBar: React.FC<MarkerBarProps> = ({ current, max }) => {
  // Clamp current to valid range
  const safeCurrent = Math.min(Math.max(current, 0), max);
  const progress = max > 0 ? (safeCurrent / max) * 100 : 0;

  return (
    <div className="w-full ">
      {/* Label */}
      <div className="text-center mb-2 font-bold" dir="ltr">
        {safeCurrent+1} / {max+1}
      </div>

      {/* Bar container */}
      <div className="relative w-full h-3 bg-gray-300 rounded-full">
        {/* Marker */}
        <motion.div
          className="absolute top-1/2 w-4 h-4 rounded-full bg-[#4b6bfb] shadow-md"
          animate={{ left: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            transform: "translate(-50%, -50%)", // ✅ keeps marker centered
          }}
        />
      </div>
    </div>
  );
};

export default MarkerBar;
