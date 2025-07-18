import Image from 'next/image'
import React from 'react'

const Welcome = () => {
  return (
    <div className='flex items-center justify-start gap-6  w-full border-b border-black/[0.1] pb-5'>
        <Image alt='image' src={'/placeholder.webp'} width={1000} height={1000} className='rounded-full w-20 h-20 border-2 border-purple-800'/>
        <div className='flex flex-col  -translate-y-3'>
            <p className='text-[36px] max-md:text-[24px] font-semibold '>
                Welcome User545
            </p>
            <p className='text-[16px] text-slate-600'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi qui, perspiciatis asperiores alias vero delectus.
            </p>
        </div>
    </div>
  )
}

export default Welcome