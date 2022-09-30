-- CreateEnum
CREATE TYPE "StatusAppointment" AS ENUM ('PENDING', 'APPROVED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "statusAppointment" "StatusAppointment" NOT NULL DEFAULT 'PENDING',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
