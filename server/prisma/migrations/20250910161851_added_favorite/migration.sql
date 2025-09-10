-- CreateTable
CREATE TABLE "public"."Favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Favorites_userId_idx" ON "public"."Favorites"("userId");

-- CreateIndex
CREATE INDEX "Favorites_templateId_idx" ON "public"."Favorites"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userId_templateId_key" ON "public"."Favorites"("userId", "templateId");

-- AddForeignKey
ALTER TABLE "public"."Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorites" ADD CONSTRAINT "Favorites_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."EmailTemplates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
