/*
  Warnings:

  - The values [REDEEMED,CANCELLED] on the enum `RedemptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RedemptionStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'USED');
ALTER TABLE "reward_redemption" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "reward_redemption" ALTER COLUMN "status" TYPE "RedemptionStatus_new" USING ("status"::text::"RedemptionStatus_new");
ALTER TYPE "RedemptionStatus" RENAME TO "RedemptionStatus_old";
ALTER TYPE "RedemptionStatus_new" RENAME TO "RedemptionStatus";
DROP TYPE "RedemptionStatus_old";
ALTER TABLE "reward_redemption" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
