import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (

    
    <div className='w-full h-[100dvh] flex items-center justify-center'>
<SignIn fallbackRedirectUrl={'/dashboard'}/>
  </div> 

)
}