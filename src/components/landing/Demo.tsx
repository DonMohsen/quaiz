import { Ellipsis } from "lucide-react";
import React from "react";

const Demo = () => {
  return (
    <div className="w-full overflow-x-auto  z-0 px-[180px] max-md:px-5 pb-10 max-lg:px-[80px] ">
      
   <div className="shadow-md drop-shadow-md w-full h-[500px] max-md:h-[300px] mt-5 p-4 backdrop-blur-md bg-white/30 rounded-[12px] border border-white/20 ">
  <div className=" w-full h-full bg-transparent rounded-[12px] flex flex-col gap-4">
    <div className="flex items-center justify-center gap-4 max-h-[50px] max-md:max-h-[30px]">
        <div><Ellipsis className="w-20 h-20 text-[#f8fcf2] max-md:w-10 max-md:h-10"/></div>
        <div className="bg-[#f8fcf2] w-full h-full rounded-[6px] flex items-center justify-start text-slate-400 px-5 max-md:px-2">www.Quaiz.ir/quaiz</div>
    </div>
    <div className="w-full h-full bg-white rounded-[10px]">Enter some samples in future....</div>
  </div>
</div>
    </div>

  );
};

export default Demo;
