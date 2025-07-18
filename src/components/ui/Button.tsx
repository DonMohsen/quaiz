'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes, FC } from 'react'

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  redirect?:string|null
}

export const Button: FC<SimpleButtonProps> = ({ className, children,redirect, ...props }) => {
  const router=useRouter()

  return (
    <button
    onClick={()=>router.push(redirect||'/documents')}
    className={clsx(`bg-black text-white px-4 py-2 rounded-md   cursor-pointer transition-all duration-300`,className)} {...props}>
      {children}
    </button>
  )
}