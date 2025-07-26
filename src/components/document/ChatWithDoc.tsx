"use client"
import { useChat } from '@/hooks/useChat'
import useMenuStore from '@/store/useMenuStore'
import { User } from '@prisma/client'
import React from 'react'
type Props={
  slug:string
  user:User
}
const ChatWithDoc = ({slug,user}:Props) => {
    const { menuState } = useMenuStore();
  // const {data,error,loading}=useUser({chat})
  return (
     <div
      className={`w-[85%] max-md:w-[95%] mx-auto min-h-[300vh] h-full transition-all duration-300 pt-[100px] ${
        menuState && "lg:pl-[165px]"
      }`}
    >
      
    </div>
  )
}

export default ChatWithDoc