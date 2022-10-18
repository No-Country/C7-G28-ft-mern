-- CreateTable
CREATE TABLE "diagnostics" (
    "id" SERIAL NOT NULL,
    "appointmentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "diagnostics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imgs" (
    "id" SERIAL NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "imgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnostic_in_imgs" (
    "id" SERIAL NOT NULL,
    "diagnosticId" INTEGER NOT NULL,
    "imgId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "diagnostic_in_imgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "diagnostics_appointmentId_key" ON "diagnostics"("appointmentId");

-- CreateIndex
CREATE UNIQUE INDEX "diagnostic_in_imgs_diagnosticId_key" ON "diagnostic_in_imgs"("diagnosticId");

-- CreateIndex
CREATE UNIQUE INDEX "diagnostic_in_imgs_imgId_key" ON "diagnostic_in_imgs"("imgId");

-- AddForeignKey
ALTER TABLE "diagnostics" ADD CONSTRAINT "diagnostics_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_in_imgs" ADD CONSTRAINT "diagnostic_in_imgs_imgId_fkey" FOREIGN KEY ("imgId") REFERENCES "imgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostic_in_imgs" ADD CONSTRAINT "diagnostic_in_imgs_diagnosticId_fkey" FOREIGN KEY ("diagnosticId") REFERENCES "diagnostics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
