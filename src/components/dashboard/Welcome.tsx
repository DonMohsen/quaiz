import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image'
import { unauthorized } from 'next/navigation';
import React from 'react'

const Welcome =async () => {
  const user=await currentUser();
  if(!user){
    return unauthorized()
  }
  return (
    <div className='flex items-center justify-start gap-6  w-full border-b border-black/[0.1] pb-5'>
        <Image alt='image' src={user.imageUrl} width={1000} height={1000} className='rounded-full w-20 h-20 border-2 border-purple-800'/>
        <div className='flex flex-col  -translate-y-3'>
            <p className='text-[36px] max-md:text-[24px] font-semibold '>
                Welcome {user.fullName||user.username}
            </p>
            <p className='text-s[16px] text-slate-600'>
                A free plan can have 1 document of their own!
            </p>
        </div>
    </div>
  )
}

export default Welcome