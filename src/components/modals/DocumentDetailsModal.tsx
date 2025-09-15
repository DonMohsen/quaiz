import { DocumentWithRelations } from '@/types/document.types';
import React from 'react'
import Modal from '../ui/Modal';
import { getTextDirection } from '@/lib/utils/getTextDirection';
import { getDateFromPrisma } from '@/lib/utils/getDateFromPrisma';
import { timeAgo } from '@/lib/utils/timeAgo';
type Props={
      document: DocumentWithRelations;
        onClose: () => void;
        userId:string

    
}
const DocumentDetailsModal = ({document,onClose,userId}:Props) => {
  return (
    <Modal onClose={onClose}>
        <div className='w-full  h-full'>
            <p className='text-[36px] w-full text-center font-font'>
                {document.title}
            </p>
            <div className='w-full flex items-center justify-center mt-4 gap-2'>
                 <div className=' px-4 py-2 rounded-xl w-fit max-lg:text-[12px] text-center flex items-center flex-col justify-center '>
                <p className='font-medium text-[16px]'>
             Created by

                </p>
                <p className='text-[12px] font-light text-black/[0.7]'>
                {document.user.id===userId?
              'You'  :

            `${document.user.userName}`
              }

                </p>

                </div>
                  <div className=' px-4 py-2 rounded-xl w-fit max-lg:text-[12px] text-center flex items-center flex-col justify-center '>
                <p className='font-medium text-[16px]'>
             Views

                </p>
                <p className='text-[12px] font-light text-black/[0.7]'>
            {document.views.length}

                </p>

                </div>
                  <div className=' px-4 py-2 rounded-xl w-fit max-lg:text-[12px] text-center flex items-center flex-col justify-center '>
                <p className='font-medium text-[16px]'>
             Quaizzes created

                </p>
                <p className='text-[12px] font-light text-black/[0.7]'>
            {document.quaizzes.length}

                </p>

                </div>
                
                
            </div>
            <p dir={getTextDirection(document.text||'ltr')} className='text-[16px] my-10 px-[10%]  maxsm:h-[300px] h-[200px] overflow-y-auto font-light w-full text-center'>
                {document.text}

            </p>
            <div className='mt-5  w-full flex flex-col items-start justify-center'>
              <p>

              Last seen list
              </p>
              <div>
                {document.views.slice(-3).reverse().map((v)=>(
                  <p className='text-black/[0.5]' key={v.id}>{`${v.user.id===userId?'You':`${v.user.userName}`}`}</p>
                ))}
              </div>

            </div>
        </div>
        
    </Modal>
  )
}

export default DocumentDetailsModal