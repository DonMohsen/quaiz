import { quickStarts } from '@/lib/consts/quickStarts'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const QuickStart = () => {
  return (
    <div className='my-5'>
        <p className='text-[24px] font-bold w-full mb-5'>
            Quick start
        </p>
        <div className='flex max-md:flex-col w-full gap-8'>
      {quickStarts.map((quickStart)=>(
        <Link href={quickStart.href} key={quickStart.title} className='rounded-[12px] p-4 w-full bg-white flex flex-col gap-3'>
          <div className='rounded-[10px] w-14 h-14 bg-[#c7d2fd]'>

          <Image alt={quickStart.title} src={quickStart.imageUrl} width={1000} height={1000} className='w-full h-full p-1'/>
          </div>
          <p className='text-[18px] font-medium'>
            {quickStart.title}
          </p>
          <p className='text-[16px] font-light'>
            {quickStart.description}
          </p>

        </Link>
      ))}
        </div>
        
    </div>
  )
}

export default QuickStart