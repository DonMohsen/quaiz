"use client"
import useMenuStore from "@/store/useMenuStore"
import Image from "next/image"
import React from "react"

const Loading = () => {
  const{menuState}=useMenuStore()
  return (
    <div className={`h-[100dvh] transition-all duration-300 fixed w-full flex flex-col items-center justify-center
      
      ${menuState?'lg:pr-5 lg:pl-[260px] ':'lg:px-[50px] '}
      `

      
    }>
      <div className="relative">

      <Image alt="Loading Quaiz" src={'/logo.png'} width={500} height={500} className="w-[200px] h-[200px]"/>
<span className="loading loading-ring  loading-xl absolute -bottom-[2px] right-[21px]"></span>
      </div>
<span className="loading loading-spinner text-[#9d61ff]"></span>


    </div>
  )
}

export default Loading
