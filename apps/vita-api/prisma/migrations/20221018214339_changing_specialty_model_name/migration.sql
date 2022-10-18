/*
  Warnings:

  - You are about to drop the `Speciality` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_specialityId_fkey";

-- DropTable
DROP TABLE "Speciality";

-- CreateTable
CREATE TABLE "specialities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "specialities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialities_name_key" ON "specialities"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "specialities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
