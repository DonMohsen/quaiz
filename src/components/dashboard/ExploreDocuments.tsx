"use client"
import { useDocumentsByUserId } from '@/hooks/useDocumentByUserId';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DocumentCard from '../global/DocumentCard';
import { Book, ChevronLeft, Plus } from 'lucide-react';
import clsx from 'clsx';
import { useAllDocuments } from '@/hooks/useDocument';
import useMenuStore from '@/store/useMenuStore';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

const ExploreDocuments = ({userId}:{userId:string}) => {
  const{menuState}=useMenuStore()
  const [isopen, setIsopen] = useState(false)
  const {data,error,isLoading}=useAllDocuments();
    const router=useRouter()
  
  return (
    <div className={`pt-[100px] transition-all duration-300 w-[85%] max-md:w-[95%] mx-auto  ${
        menuState && "lg:pl-[165px]"
      }`}>
        
<div className={clsx(`w-full mb-5 flex items-center justify-between transition-all duration-500`,isopen?'pl-20':'p-0')}>
  <div className='pb-5 border-b w-full'>
    <div className='flex items-center justify-start gap-4'>

 <Button className="bg-[#1c3ca9] h-full hover:brightness-125">
          <ChevronLeft
          onClick={()=>router.push('/dashboard')}
          className="text-white"/>
        </Button>
        <div>

  <h2 className="text-[36px] font-bold">Explore Documents</h2>
  <p className='text-black/[0.6]'>All recent documents in the world</p>
        </div>
          </div>
  </div>
  
  {/* <button
    className="flex items-center gap-2 px-4 py-2 rounded-2xl text-white bg-blue-600 hover:bg-blue-700 transition-colors"
  >
    <Plus className="w-5 h-5" />
    <span className="text-sm font-medium">Add</span>
  </button> */}
</div>
        <div className='grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-8'>
      {data?.map((doc)=>(
        <>
       <DocumentCard key={doc.id} doc={doc}/>
      
        
        </>
      ))}
      
        </div>
                    {/* <Book className='rotate-90 cursor-pointer' onClick={()=>setIsopen((prev)=>!prev)}/> */}

    </div>
  )
}

export default ExploreDocuments