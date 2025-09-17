import { useRecentViews } from '@/hooks/useRecentViews';
import React from 'react'
import DocumentCard from '../global/DocumentCard';
import { Button } from '../ui/Button';
import { useModalStore } from '@/store/ModalStore';
import { User } from '@prisma/client';

const RecentDocuments = ({user}:{user:User}) => {
      const { data: views, isLoading: viewsLoading } = useRecentViews(user.id);
      const{openModal}=useModalStore()
    
  return (
    <div>
        <p className='text-[32px] font-bold w-full text-center mb5'>Recent Documents</p>
        {views?.length===0&&
        <div className='w-full flex items-center justify-center mt-5'>
                <Button
                onClick={()=>openModal('CREATE_EDIT_DOCUMENT',{user})}
                className='!w-[300px] max-md:!w-[200px] bg-[#a359e8] text-white font-bold hover:brightness-125'>Add one yourself!</Button>
        </div>
        }
    <div className='grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-8 mb-[70px] mt-5'>
        {views?.map((view)=>(
            <DocumentCard key={view.id} view={view}/>
        ))}
    </div>
        </div>
  )
}

export default RecentDocuments