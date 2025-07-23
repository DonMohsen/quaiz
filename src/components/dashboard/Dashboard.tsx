"use client"
import React from 'react'
import Welcome from './Welcome'
import QuickStart from './QuickStart'
import { User } from '@prisma/client'
import useMenuStore from '@/store/useMenuStore'
import { SPACE_FRROM_LEFT_FOR_NAVBAR } from '@/lib/consts/magicNumbers'

const Dashboard = ({user}:{user:User} ) => {
    const{menuState}=useMenuStore();

  return (
    <div className={`w-[85%] max-md:w-[95%] mx-auto min-h-[300vh] h-full transition-all duration-300 pt-[110px] ${menuState===true?
    (`lg:pl-[${SPACE_FRROM_LEFT_FOR_NAVBAR}]`)
    :
    'pl-0'}`}>
           <Welcome user={user} />
      <QuickStart/>
    </div>
  )
}

export default Dashboard