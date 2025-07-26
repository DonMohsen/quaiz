"use server"

import ChatWithDoc from "@/components/document/ChatWithDoc"
import { currentUser } from "@clerk/nextjs/server"
import { unauthorized } from "next/navigation"
type Props = {
  params: Promise<{ documentSlug: string }>
}
const DocumantChatPage = async({params}:Props) => {
          const slug = (await params).documentSlug

    const user=await currentUser();

    if (!user) {
      return unauthorized()
    }
  return (
    <div>
        <ChatWithDoc slug={slug} user={{email:user?.emailAddresses[0]?.emailAddress,firstName:user?.firstName,id:user?.id,image:user?.imageUrl,lastName:user?.lastName
          ,userName:user?.username
        }}  />
    </div>
  )
}

export default DocumantChatPage