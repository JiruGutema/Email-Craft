-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('user', 'admin', 'superadmin');

-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'user';
