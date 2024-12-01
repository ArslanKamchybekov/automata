/*
  Warnings:

  - You are about to drop the column `baseId` on the `Workflows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workflows" DROP COLUMN "baseId",
ADD COLUMN     "airtableBaseId" TEXT;
