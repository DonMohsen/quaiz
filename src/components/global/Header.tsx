"use client"
import { useRoutes } from '@/hooks/useRoutes'
import clsx from 'clsx'
import React from 'react'
import { Button } from '../ui/Button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Header = () => {
  const router=useRouter()
  const routes=useRoutes()
  return (
    <header className='absolute z-[50] top-0 w-full h-[70px] flex  font-inter text-white items-center justify-between bg-transparent px-[100px] max-md:px-[10px]'>
          <div className='w-[30%]  text-[26px] font-bold h-full flex items-center justify-center  '>
            <Image
            onClick={()=>router.push('/')}
            alt='Quaiz Logo' src={'/logo.png'} width={512} height={512} className='w-12 h-12 cursor-pointer' />
            <p
                        onClick={()=>router.push('/')}

            className='-translate-x-3 cursor-pointer'>

            uaiz
            </p>
          </div>
      <div className='flex items-center max-md:hidden  justify-center gap-7 text-[12px] font-light px-[20px] h-full w-full  '>
        {routes.map((route)=>(
          <p key={route.label}
          className={clsx(`tracking-tight cursor-pointer`,route.label==='Home'&&'font-bold')}
          >
              {route.label}
          </p>
        ))}

      </div>
      <div className='max-md:hidden flex items-center justify-center w-[30%] text-[12px] font-light gap-2'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <SignedOut>

        <Button
        onClick={()=>router.push('/sign-in')}
        className='bg-transparent px-[24px] py-[12px] whitespace-nowrap hover:bg-blue-900 relative'>
          Sign in
         
        </Button>
         <Button
         onClick={()=>router.push('/sign-up')}

         className='bg-transparent border px-[24px] py-[12px] whitespace-nowrap hover:bg-blue-500' >
          <p>

          Sign Up
          </p>
        </Button>
        </SignedOut>
      </div>
    </header>
  )
}

export default Header