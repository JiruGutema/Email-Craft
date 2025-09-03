-- CreateTable
CREATE TABLE "public"."Subscription" (
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "public"."Subscription"("email");
