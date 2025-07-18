import QuickStart from '@/components/dashboard/QuickStart'
import Welcome from '@/components/dashboard/Welcome'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='w-[80%] max-lg:w-[95%] mx-auto h-screen '>
        
      <Welcome/>
      <QuickStart/>
    </div>
  )
}

export default DashboardPage