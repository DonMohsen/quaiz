"use server"

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
const DocumentsPage = () => {
  return (
    <div>DocumentsPage</div>
  )
}

export default DocumentsPage