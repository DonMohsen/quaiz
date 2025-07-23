import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logo = () => {
    const router =useRouter()
  return (
  <div className="flex items-center justify-start text-[26px] font-bold">
                <Image
                  onClick={() => router.push("/")}
                  alt="Quaiz Logo"
                  src="/logo.png"
                  width={512}
                  height={512}
                  className="w-10 h-10 cursor-pointer "
                />

                <p
                  onClick={() => router.push("/")}
                  className="cursor-pointer "
                >
                  uaiz
                </p>
              </div>  )
}

export default Logo