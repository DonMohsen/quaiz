'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes, FC } from 'react'

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  redirect?: string | null
}

export const Button: FC<SimpleButtonProps> = ({
  className = '',
  children,
  redirect,
  ...props
}) => {
  const router = useRouter()
const handleClick=()=>{
  if (redirect) {
    router.push(redirect)
    
  }else
  {}
}
  return (
    <button
      onClick={handleClick}
      className={clsx(
        'px-4 py-2 rounded-md cursor-pointer transition-all duration-300',
        className // put this last so it overrides defaults
      )}
      {...props}
    >
      {children}
    </button>
  )
}
