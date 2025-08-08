import Header from '@/components/global/Header'
import LeftNavbar from '@/components/global/LeftNavbar'
import { ModalRenderer } from '@/components/modals/ModalRenderer'
import { Inter } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
     <div className={`${inter.variable} bg-white`}>
      <Header varient="app" />
      <LeftNavbar/>
          {children}
     </div>
       
  )
}