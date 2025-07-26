import { auth, currentUser } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { unauthorized } from 'next/navigation';
import Image from 'next/image'
import React from 'react'

const Welcome = ({user}:{user:User} ) => {
  if(!user){
    return unauthorized()
  }
  return (
    <div className='flex items-start justify-start gap-6  w-full border-b border-black/[0.1] pb-5'>
        <Image alt='image' src={user.image||"/placeholder.webp"} width={1000} height={1000} className=' rounded-full w-20 h-20 max-md:w-14 max-md:h-14 border-2 border-purple-800'/>
        <div className='flex flex-col  -translate-y-3'>
            <p className='text-[36px] max-md:text-[24px] max-sm:text-[18px] font-bold '>
                Welcome {user.firstName||user.userName}
            </p>
            <p className='text-[16px] max-sm:text-[14px] text-slate-600'>
                A free plan can have 1 document of their own!
            </p>
        </div>
    </div>
  )
}

export default Welcome