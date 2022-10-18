/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ConsumerPermissions" (
    "id" SERIAL NOT NULL,
    "getIngredient" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "consumerId" INTEGER NOT NULL,

    CONSTRAINT "ConsumerPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerPermissions_consumerId_key" ON "ConsumerPermissions"("consumerId");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_key_key" ON "Consumer"("key");

-- AddForeignKey
ALTER TABLE "ConsumerPermissions" ADD CONSTRAINT "ConsumerPermissions_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
