/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Speciality` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Speciality_name_key" ON "Speciality"("name");
