"use server"

import ExploreDocuments from "@/components/dashboard/ExploreDocuments";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {

  const user = await currentUser();
  if (!user) return { title: "User Not Found" };

  return {
    title: user.fullName||user.username,
    description: `Documents of ${user.fullName||user.username}, create or select a document to start your journey with it!`,
  };
}
const DocumentsPage = async() => {
 
  const user=await currentUser()
  if (!user?.id) {
    return unauthorized()
  }
  return (
    <div>
      <ExploreDocuments userId={user.id}/>
    </div>

  )
}

export default DocumentsPage