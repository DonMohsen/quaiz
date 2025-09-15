import { useRecentViews } from '@/hooks/useRecentViews';
import React from 'react'
import DocumentCard from '../global/DocumentCard';
import { Button } from '../ui/Button';

const RecentDocuments = ({userId}:{userId:string}) => {
      const { data: views, isLoading: viewsLoading } = useRecentViews(userId);
    
  return (
    <div>
        <p className='text-[32px] font-bold w-full text-center mb5'>Recent Documents</p>
    <div className='grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-8 '>
        {views?.length===0&&
        <div className='w-full'>
                <Button>Add one yourself!</Button>
        </div>
        }
        {views?.map((view)=>(
            <DocumentCard key={view.id} view={view}/>
        ))}
    </div>
        </div>
  )
}

export default RecentDocuments