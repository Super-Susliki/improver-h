/*
  Warnings:

  - The primary key for the `user_store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `is_merchant` to the `user_signature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_signature" DROP CONSTRAINT "user_signature_userId_storeId_fkey";

-- AlterTable
ALTER TABLE "user_signature" ADD COLUMN     "is_merchant" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "user_store" DROP CONSTRAINT "user_store_pkey",
ADD COLUMN     "is_merchant" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "user_store_pkey" PRIMARY KEY ("userId", "storeId", "is_merchant");

-- AddForeignKey
ALTER TABLE "user_signature" ADD CONSTRAINT "user_signature_userId_storeId_is_merchant_fkey" FOREIGN KEY ("userId", "storeId", "is_merchant") REFERENCES "user_store"("userId", "storeId", "is_merchant") ON DELETE RESTRICT ON UPDATE CASCADE;
