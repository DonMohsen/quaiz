import React from 'react'
import { Button } from '../ui/Button'

const Hero = () => {
  return (
<div className='overflow-x-hidden w-full h-screen overflow-y-hidden flex relative items-start justify-center '>
<div className='absolute w-full h-screen overflow-x-hidden top-0 right-0'>

<div className='bg-[#1c3ca9] clipped relative flex items-center justify-center'>
    <div className='absolute bottom-0 left-0 bottom-left-poly bg-gradient-to-r from-[#098af2] to-[#165bc8] w-[200px] h-[100px]'/>
   <div className='absolute top-[300px] right-[200px] middle-poly bg-gradient-to-r from-[#1c3ca9] to-[#2a48ac] w-[800px] h-[200px]'/>
    <div className='absolute right-0 top-[200px] top-right-poly bg-gradient-to-r from-[#098af2] to-[#0062ff] w-[200px] h-[100px]'/>
  {/* Simulated Border */}
<div className="absolute top-[200px] left-0 w-[300px] h-[200px]">
  <div className="absolute w-full h-full top-left-poly border-box bg-white/[0.1]" />

  {/* Inner Content Layer */}
  <div className=" absolute w-[calc(100%-4px)] h-[calc(100%-4px)] top-[2px] left-[2px] top-left-poly bg-[#173da8]" />
 </div> 
 </div>

</div>
<div className='text-white z-[50] w-full  mt-[150px] max-md:mt-[100px] px-[15px] text-center md:px-[400px]'>
  <p className='text-[40px] font-medium'>
    
  Advanced quiz generator with AI
  </p>
  <p className='text-[20px] font-light mt-2 max-w-[400px] mx-auto'>
    Quaiz is a fantastic way to start your learning journies. Just give us the documents and get ready to solve Quaizzes with variety of difficulities!
  </p>
<div className='w-full flex items-center justify-center max-md:flex-col gap-4'>

  <Button className='max-md:w-full py-5 bg-gradient-to-br from-[#7939fc] to-[#a35be5] font-semibold mt-7 md:px-[40px]'>
    Start Now
  </Button>
   <Button className='max-md:w-full py-5 bg-transparent border font-semibold md:mt-7  md:px-[40px]'>
    About us
  </Button>
</div>


</div>
</div>
 

  )
}

export default Hero