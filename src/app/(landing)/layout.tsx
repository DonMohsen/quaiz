import { type Metadata } from 'next'

import Header from '@/components/global/Header'
import LeftNavbar from '@/components/global/LeftNavbar'

export const metadata: Metadata = {
  title: 'Quaiz',
  description: 'Welcome to Quaiz, Advanced Quiz generator with AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
     <div className='font-main'>
        <Header varient='landing'/>
        {/* <LeftNavbar/> */}
          {children}
     </div>
       
  )
}