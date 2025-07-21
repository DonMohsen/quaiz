import { deleteDocumentById } from '@/actions/deleteDocumentById'
import { DocumentWithRelations } from '@/types/document.types'
import { Document } from '@prisma/client'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoTrash } from 'react-icons/go'

const DocumentCard = ({doc}:{doc:DocumentWithRelations}) => {
  const handleDeleteDocument=async(id:number)=>{
  try {
    await deleteDocumentById(id);
    // Optionally re-fetch documents or use router.refresh()
  } catch (err) {
    console.error(err);
  
};
  }
  return (
      <Link
      href={`/documents/${doc.slug}`} className='rounded-[16px] w-full  bg-white flex flex-col gap-3 overflow-hidden mb-10'>

          <Image alt={doc.slug} src={doc.image||"/placeholder.webp"} width={1000} height={1000} className='object-cover w-full h-[200px]  '/>
        <div className='flex items-center justify-start gap-2 p-5 pb-0 '>
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
        </div>
        <div className='px-5 pb-5 text-[18px] font-bold flex gap-2 items-center justify-between'>
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
        </div>
          

        </Link>
  )
}

export default DocumentCard