/*
  Warnings:

  - You are about to drop the `UserAccess` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accessId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAccess" DROP CONSTRAINT "UserAccess_accessId_fkey";

-- DropForeignKey
ALTER TABLE "UserAccess" DROP CONSTRAINT "UserAccess_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserAccess";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
