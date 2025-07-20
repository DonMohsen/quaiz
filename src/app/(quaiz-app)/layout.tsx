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
     <div className={`${inter.variable} bg-[#f1f4f9]`}>
          {children}
     </div>
       
  )
}