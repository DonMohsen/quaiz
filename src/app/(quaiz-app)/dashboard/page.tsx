"use server"
import ExploreDocuments from '@/components/dashboard/ExploreDocuments';
import QuickStart from '@/components/dashboard/QuickStart'
import Welcome from '@/components/dashboard/Welcome'
import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { unauthorized } from 'next/navigation';
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUser();
  
  if (!user) return { title: "User Not Found" };
  
  return {
    title: user.fullName||user.username,
    description: `Dashboard of ${user.fullName||user.username}, create a document and start a quaiz, or study by flash cards first!`,
  };
}
const DashboardPage = async() => {
    const user = await currentUser();

  if (!user) {
    return unauthorized()
  }

  return (
    <div className='w-[80%] max-lg:w-[95%] mx-auto min-h-screen h-full pt-[40px] '>
        
      <Welcome/>
      <QuickStart/>
      <ExploreDocuments userId={user.id}/>
    </div>
  )
}

export default DashboardPage