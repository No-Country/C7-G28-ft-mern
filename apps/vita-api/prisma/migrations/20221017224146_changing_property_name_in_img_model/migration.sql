/*
  Warnings:

  - You are about to drop the column `descriptionId` on the `imgs` table. All the data in the column will be lost.
  - Added the required column `url` to the `imgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imgs" DROP COLUMN "descriptionId",
ADD COLUMN     "url" TEXT NOT NULL;
