"use server"

import getAllDocuments from "@/actions/getAllDocuments";
import getDocumentById from "@/actions/getDocumentBySlug";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
type Props = {
  params: Promise<{ documentSlug: string }>
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    
    const slug = (await params).documentSlug
    
    const user = await currentUser();
    const doc=await getDocumentById(slug)
    if (!user) return { title: "User Not Found" };
    if (!doc) return { title: "Doc Not Found" };
    
  return {
    title: doc.slug,
    description: `The ${doc.title} document is ready to use by ${user.fullName||user.username}`,
  };
}
const DocumentsPage = async() => {
 
  
  return (
    <div>
    
    </div>

  )
}

export default DocumentsPage