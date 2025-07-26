/*
  Warnings:

  - You are about to drop the column `documentId` on the `Chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,documentSlug]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentSlug` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_documentId_fkey";

-- DropIndex
DROP INDEX "Chat_userId_documentId_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "documentId",
ADD COLUMN     "documentSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_userId_documentSlug_key" ON "Chat"("userId", "documentSlug");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_documentSlug_fkey" FOREIGN KEY ("documentSlug") REFERENCES "Document"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
