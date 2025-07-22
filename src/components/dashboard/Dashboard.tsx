"use client"
import React from 'react'
import Welcome from './Welcome'
import QuickStart from './QuickStart'
import { User } from '@prisma/client'
import useMenuStore from '@/store/useMenuStore'

const Dashboard = ({user}:{user:User} ) => {
    const{MenuState,toggleMenuState}=useMenuStore();

  return (
    <div className={`w-[85%] max-xl:w-[95%] mx-auto min-h-[300vh] h-full transition-all duration-300 pt-[110px] ${MenuState===true?'lg:pl-[150px]':'pl-0'}`}>
           <Welcome user={user} />
      <QuickStart/>
    </div>
  )
}

export default Dashboard