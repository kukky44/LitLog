/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "googleBookId" TEXT,
ADD COLUMN     "imageUrl" TEXT;
