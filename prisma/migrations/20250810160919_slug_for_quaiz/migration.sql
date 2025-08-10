/*
  Warnings:

  - You are about to drop the column `documentId` on the `Quaiz` table. All the data in the column will be lost.
  - Added the required column `documentSlug` to the `Quaiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quaiz" DROP CONSTRAINT "Quaiz_documentId_fkey";

-- AlterTable
ALTER TABLE "Quaiz" DROP COLUMN "documentId",
ADD COLUMN     "documentSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Quaiz" ADD CONSTRAINT "Quaiz_documentSlug_fkey" FOREIGN KEY ("documentSlug") REFERENCES "Document"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
