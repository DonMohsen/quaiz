"use server"

import getDocumentById from "@/actions/getDocumentBySlug";
import DocumentDetails from "@/components/document/DocumentDetails";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: doc.title,
    description: `The ${doc.title} document is ready to use by ${user.fullName||user.username}`,
  };
}
const DocumentsPage = async({params}:Props) => {
      const slug = (await params).documentSlug

  const user = await currentUser();
    const doc=await getDocumentById(slug)
   if (!user) return (notFound())
    if (!doc) return (
    notFound()
    )
    
  return (
         <DocumentDetails doc={doc}/>


  )
}

export default DocumentsPage