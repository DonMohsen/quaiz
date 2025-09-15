-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_documentSlug_fkey";

-- DropForeignKey
ALTER TABLE "DocumentView" DROP CONSTRAINT "DocumentView_documentId_fkey";

-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_documentId_fkey";

-- DropForeignKey
ALTER TABLE "Quaiz" DROP CONSTRAINT "Quaiz_documentSlug_fkey";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_documentSlug_fkey" FOREIGN KEY ("documentSlug") REFERENCES "Document"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quaiz" ADD CONSTRAINT "Quaiz_documentSlug_fkey" FOREIGN KEY ("documentSlug") REFERENCES "Document"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentView" ADD CONSTRAINT "DocumentView_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
