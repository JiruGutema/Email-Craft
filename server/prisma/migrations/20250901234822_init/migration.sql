-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "googleAccessToken" VARCHAR(255),
ADD COLUMN     "googleRefreshToken" VARCHAR(255);
