/*
  Warnings:

  - You are about to drop the `user_merchant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_merchant" DROP CONSTRAINT "user_merchant_storeId_fkey";

-- DropForeignKey
ALTER TABLE "user_merchant" DROP CONSTRAINT "user_merchant_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_signature" DROP CONSTRAINT "user_signature_userId_storeId_fkey";

-- DropTable
DROP TABLE "user_merchant";

-- CreateTable
CREATE TABLE "user_store" (
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "bonuses_amount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_store_pkey" PRIMARY KEY ("userId","storeId")
);

-- AddForeignKey
ALTER TABLE "user_signature" ADD CONSTRAINT "user_signature_userId_storeId_fkey" FOREIGN KEY ("userId", "storeId") REFERENCES "user_store"("userId", "storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_store" ADD CONSTRAINT "user_store_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
