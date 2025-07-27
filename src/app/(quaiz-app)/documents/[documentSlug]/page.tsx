"use server"

import getDocumentById from "@/actions/getDocumentBySlug";
import DocumentDetails from "@/components/document/DocumentDetails";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{ documentSlug: string }>
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