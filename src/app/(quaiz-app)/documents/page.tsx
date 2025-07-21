"use server"

import getAllDocuments from "@/actions/getAllDocuments";
import DocumentsTable from "@/components/dashboard/DocumentsTable";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  const user = await currentUser();
  if (!user) return { title: "User Not Found" };

  return {
    title: user.fullName||user.username,
    description: `Documents of ${user.fullName||user.username}, create or select a document to start your journey with it!`,
  };
}
const DocumentsPage = async() => {
 
  const docs=await getAllDocuments();
  return (
    <div>{docs.map((doc)=>(
      <div key={doc.id}>
        {doc.slug}
      </div>
      
    ))}
    {/* <div onClick={handleClick}>
      Add
    </div> */}
    <DocumentsTable/>
    </div>

  )
}

export default DocumentsPage