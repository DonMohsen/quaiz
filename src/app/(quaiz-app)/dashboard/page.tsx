"use server"
import Dashboard from '@/components/dashboard/Dashboard';
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
      <Dashboard user={{email:user?.emailAddresses[0]?.emailAddress,firstName:user.firstName,id:user.id,image:user.imageUrl,lastName:user.lastName,userName:user.username}}/>
        
   
  )
}

export default DashboardPage