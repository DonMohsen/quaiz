"use client"
import { useDocumentsByUserId } from '@/hooks/useDocumentByUserId';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DocumentCard from '../global/DocumentCard';
import { Book, Plus } from 'lucide-react';
import clsx from 'clsx';

const ExploreDocuments = ({userId}:{userId:string}) => {
  const [isopen, setIsopen] = useState(false)
  const {data,error,loading}=useDocumentsByUserId(userId);
  return (
    <div className='mt-5 '>
        
<div className={clsx(`w-full mb-5 flex items-center justify-between transition-all duration-500`,isopen?'pl-20':'p-0')}>
  <h2 className="text-[24px] font-bold">Documents</h2>
  
  <button
    onClick={() => {/* handle click */}}
    className="flex items-center gap-2 px-4 py-2 rounded-2xl text-white bg-blue-600 hover:bg-blue-700 transition-colors"
  >
    <Plus className="w-5 h-5" />
    <span className="text-sm font-medium">Add</span>
  </button>
</div>
        <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8'>
      {data?.map((doc)=>(
       <DocumentCard key={doc.id} doc={doc}/>
      ))}
      
        </div>
                    <Book className='rotate-90 cursor-pointer' onClick={()=>setIsopen((prev)=>!prev)}/>

    </div>
  )
}

export default ExploreDocuments