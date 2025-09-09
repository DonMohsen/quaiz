"use client"
import { deleteDocumentById } from '@/actions/deleteDocumentById'
import { getTextDirection } from '@/lib/utils/getTextDirection'
import { DocumentWithRelations } from '@/types/document.types'
import { Document } from '@prisma/client'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { GoTrash } from 'react-icons/go'
import { Button } from '../ui/Button'
import { useRouter } from 'next/navigation'

const DocumentCard = ({doc}:{doc:DocumentWithRelations}) => {
  const handleDeleteDocument=async(id:number)=>{
  try {
    await deleteDocumentById(id);
    // Optionally re-fetch documents or use router.refresh()
  } catch (err) {
    console.error(err);
  
};
  }
  const router=useRouter()
  return (
      <div
      // href={`/documents/${doc.slug}`} 
      className='rounded-[16px] w-full min-w-full border border-black/[0.1] bg-white flex flex-col  overflow-hidden'>

          <Image alt={doc.slug} src={doc.image||"/placeholder.webp"} width={1000} height={1000} className='object-cover w-full h-[200px]  '/>
        {/* <div className='flex items-center justify-start gap-2 p-5 pb-0 '>
          {doc?.quaizzes.length>0&&
          <div className='rounded-[20px] bg-[#3c3d42] text-white p-2 text-[16px] flex items-center justify-center w-fit'>
            Quaiz
          </div>
        
        }
         {doc?.flashCards.length>0&&
          <div className='rounded-[20px] bg-[#3c3d42] text-white p-2 text-[16px] flex items-center justify-center w-fit'>
            Flash Card
          </div>
        
        }
        </div> */}
        <div className='p-5'>

        <p className=' font-medium w-full text-[20px]'>{doc.title}</p>
        <p className=' font-medium text-black/[0.5] w-full text-[16px]'>Created by {doc.user.userName}</p>
        <p dir={getTextDirection(doc.text ||"ltr")} className='text-left font-light line-clamp-2 my-3  '>{doc.text}</p>
        {/* //!The line */}
        <p className='w-full h-[12px]  border-b-2 border-black/[0.1]'></p>
        {/* //!The bottom parts */}
        <div className='flex items-center justify-start gap-5'>

         <div className='rounded-full mt-5  text-white p-2 text-[16px] min-w-[80px] bg-gradient-to-br from-[#1c3ca9] to-[#a05dfa] flex items-center justify-center w-fit'>
        {doc.quaizzes.length||"No"}    Quaiz{doc.quaizzes.length>1||doc.quaizzes.length===0?'zes':""}
          </div>
          <div className='rounded-full mt-5  text-white p-2 text-[16px] min-w-[80px] bg-gradient-to-br from-[#a05dfa] to-[#1c3ca9] flex items-center justify-center w-fit'>
        {doc.flashCards.length||"No"}    Flashcard{doc.flashCards.length>1||doc.flashCards.length===0?'s':""}
          </div>
        </div>
        <div className='w-full flex items-center justify-end'>

        <Button 
        onClick={()=>router.push(`documents/${doc.slug}`)}
        className='mt-5 bg-gradient-to-r bg-white text-black border-[#a05dfa] border-2 sm:hover:bg-[#1c3ca9] sm:hover:text-white transition-all duration-300'>
          Check it out
        </Button>
        </div>
        </div>
        {/* <div className='p-5 pb-5 text-[18px] font-medium flex gap-2 items-center justify-between'>
          {doc.title}
             <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault(); // prevent <Link> from triggering
          handleDeleteDocument(doc.id);
        }}
        className="hover:text-red-500"
      >

        <GoTrash/>
        </button>
        </div> */}
          

        </div>
  )
}

export default DocumentCard