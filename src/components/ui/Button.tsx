'use client'

import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

export const Button: FC<SimpleButtonProps> = ({ className, children, ...props }) => {

  return (
    <button className={clsx(`bg-black text-white px-4 py-2 rounded-md   cursor-pointer transition-all duration-300`,className)} {...props}>
      {children}
    </button>
  )
}