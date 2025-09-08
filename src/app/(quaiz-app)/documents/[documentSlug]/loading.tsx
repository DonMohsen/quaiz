"use client"
import Image from "next/image"
import React from "react"

const Loading = () => {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center">
      <div className="relative">

      <Image alt="Loading Quaiz" src={'/logo.png'} width={500} height={500} className="w-[200px] h-[200px]"/>
<span className="loading loading-ring  loading-xl absolute -bottom-[2px] right-[21px]"></span>
      </div>
<span className="loading loading-spinner text-[#9d61ff]"></span>


    </div>
  )
}

export default Loading
