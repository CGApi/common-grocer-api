/*
  Warnings:

  - You are about to drop the `ConsumerNotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConsumerNotes" DROP CONSTRAINT "ConsumerNotes_consumerId_fkey";

-- DropTable
DROP TABLE "ConsumerNotes";

-- CreateTable
CREATE TABLE "ConsumerNote" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT NOT NULL,
    "consumerId" INTEGER NOT NULL,

    CONSTRAINT "ConsumerNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConsumerNote" ADD CONSTRAINT "ConsumerNote_consumerId_fkey" FOREIGN KEY ("consumerId") REFERENCES "Consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
