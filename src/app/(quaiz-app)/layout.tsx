import Header from '@/components/global/Header'
import LeftNavbar from '@/components/global/LeftNavbar'
import { ModalRenderer } from '@/components/modals/ModalRenderer'
import { currentUser } from '@clerk/nextjs/server'
import { Inter } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
            const user=await currentUser();
   if (!user) {
              return
            }
  return (
     <div className={`${inter.variable} bg-white`}>
      <Header varient="app" />
      
      <LeftNavbar user={{email:user?.emailAddresses[0]?.emailAddress,firstName:user?.firstName,id:user?.id,image:user?.imageUrl,lastName:user?.lastName
          ,userName:user?.username
        }}/>
          {children}
     </div>
       
  )
}