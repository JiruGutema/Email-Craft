/*
  Warnings:

  - The `to` column on the `Drafts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Drafts" DROP COLUMN "to",
ADD COLUMN     "to" TEXT[];
