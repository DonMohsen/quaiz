"use server"

import { getChatByDocumentSlugOrCreate } from "@/actions/getChatByDocumentSlugOrCreate"
import getDocumentBySlug from "@/actions/getDocumentBySlug"
import ChatWithDoc from "@/components/document/ChatWithDoc"
import { currentUser } from "@clerk/nextjs/server"
import { notFound, unauthorized } from "next/navigation"
type Props = {
  params: Promise<{ documentSlug: string }>
}
const DocumantChatPage = async({params}:Props) => {
          const slug = (await params).documentSlug
          const user=await currentUser();
          const doc=await getDocumentBySlug(slug)
          if (!user) {
            return unauthorized()
          }
          if (!doc) {
            return notFound()
            
          }
          const chat=await getChatByDocumentSlugOrCreate({slug,userId:user?.id})

  return (
    <div>
        <ChatWithDoc chatId={chat.id}  doc={doc} user={{email:user?.emailAddresses[0]?.emailAddress,firstName:user?.firstName,id:user?.id,image:user?.imageUrl,lastName:user?.lastName
          ,userName:user?.username
        } }  />
    </div>
  )
}

export default DocumantChatPage