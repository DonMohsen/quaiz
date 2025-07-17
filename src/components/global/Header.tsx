import { useRoutes } from '@/hooks/useRoutes'
import clsx from 'clsx'
import React from 'react'
import { Button } from '../ui/Button'

const Header = () => {
  const routes=useRoutes()
  return (
    <header className='absolute z-[50] top-0 w-full h-[70px] flex  font-inter text-white items-center justify-between bg-transparent px-[100px] max-md:px-[10px]'>
          <div className='w-[30%]  text-[26px] font-bold h-full flex items-center justify-center  '>
            Quaiz
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
        <Button className='bg-transparent px-[24px] py-[12px] whitespace-nowrap hover:bg-blue-900'>
          Sign in
        </Button>
         <Button  className='bg-transparent border px-[24px] py-[12px] whitespace-nowrap hover:bg-blue-500' >
          <p>

          Sign Up
          </p>
        </Button>
      </div>
    </header>
  )
}

export default Header