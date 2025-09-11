import { type Metadata } from 'next'

import Header from '@/components/global/Header'
import LeftNavbar from '@/components/global/LeftNavbar'
import { currentUser } from '@clerk/nextjs/server'
import LandingLeftNavbar from '@/components/global/LandingLeftNavbar'

export const metadata: Metadata = {
  title: 'Quaiz',
  description: 'Welcome to Quaiz, Advanced Quiz generator with AI',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user=await currentUser()
  return (
     <div className='font-main'>
        <Header varient='landing'/>
        <div className='md:hidden'>

        {user?
         <LeftNavbar user={{email:user?.emailAddresses[0]?.emailAddress,firstName:user?.firstName,id:user?.id,image:user?.imageUrl,lastName:user?.lastName
          ,userName:user?.username
        }}/> :
        <LandingLeftNavbar />
      }
      </div>
          {children}
     </div>
       
  )
}