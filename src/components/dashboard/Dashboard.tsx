"use client"
import React from 'react'
import Welcome from './Welcome'
import QuickStart from './QuickStart'
import { User } from '@prisma/client'
import useMenuStore from '@/store/useMenuStore'
import RecentDocuments from '../document/RecentDocuments'

const Dashboard = ({user}:{user:User} ) => {
    const{menuState}=useMenuStore();

return (
  <div
    className={`w-[85%] max-md:w-[95%] mx-auto h-full transition-all duration-300 pt-[110px] ${menuState&&'lg:pl-[165px]'}`}
  >
    <Welcome user={user} />
    <QuickStart />
    <RecentDocuments  userId={user.id}/>
  </div>
);

}

export default Dashboard