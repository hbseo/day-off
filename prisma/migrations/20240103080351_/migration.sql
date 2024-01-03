/*
  Warnings:

  - Added the required column `offId` to the `OffDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OffDate" ADD COLUMN     "offId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OffDate" ADD CONSTRAINT "OffDate_offId_fkey" FOREIGN KEY ("offId") REFERENCES "Off"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
