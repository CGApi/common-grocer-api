/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ConsumerStatus" AS ENUM ('valid', 'revoked');

-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "ConsumerStatus" NOT NULL DEFAULT 'valid',
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ConsumerPermissions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "getIngredient" BOOLEAN NOT NULL DEFAULT false,
    "consumerId" INTEGER NOT NULL,

    CONSTRAINT "ConsumerPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumerNotes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "consumerId" INTEGER NOT NULL,

    CONSTRAINT "ConsumerNotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerPermissions_consumerId_key" ON "ConsumerPermissions"("consumerId");

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_key_key" ON "Consumer"("key");

-- AddForeignKey
ALTER TABLE "ConsumerPermissions" ADD CONSTRAINT "ConsumerPermissions_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumerNotes" ADD CONSTRAINT "ConsumerNotes_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
