import Header from '@/components/global/Header'
import LeftNavbar from '@/components/global/LeftNavbar'
import { type Metadata } from 'next'
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
     <div className={`${inter.variable} bg-white flex`}>
      <Header varient="app" />
      <LeftNavbar/>
          {children}
     </div>
       
  )
}