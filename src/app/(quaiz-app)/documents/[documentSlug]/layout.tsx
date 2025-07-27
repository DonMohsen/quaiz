import getDocumentBySlug from "@/actions/getDocumentBySlug";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ documentSlug: string }>
}
export async function generateMetadata({params}:Props): Promise<Metadata> {
    
    const slug = (await params).documentSlug
    
    const user = await currentUser();
    const doc=await getDocumentBySlug(slug)
    if (!user) return { title: "User Not Found" };
    if (!doc) return { title: "Doc Not Found" };
    
  return {
    title: doc.title,
    description: `The ${doc.title} document is ready to use by ${user.fullName||user.username}`,
  };
}
export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
     <div>
          {children}
     </div>
       
  )
}