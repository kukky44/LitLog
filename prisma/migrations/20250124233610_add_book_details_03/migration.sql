/*
  Warnings:

  - Made the column `googleBookId` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "googleBookId" SET NOT NULL;
