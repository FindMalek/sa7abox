/*
  Warnings:

  - You are about to drop the column `customerLocation` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "customerLocation",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
DROP COLUMN "items";

-- DropTable
DROP TABLE "contacts";

-- CreateTable
CREATE TABLE "telegram_subscribers" (
    "id" TEXT NOT NULL,
    "telegramChatId" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "telegram_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "menuItemId" TEXT,
    "isCustomPlate" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "selectedSauce" TEXT,
    "notes" TEXT,
    "calories" INTEGER,
    "protein" DECIMAL(10,2),
    "carbs" DECIMAL(10,2),
    "fat" DECIMAL(10,2),
    "fiber" DECIMAL(10,2),

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_ingredients" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_item_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_extras" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "extraId" TEXT NOT NULL,

    CONSTRAINT "order_item_extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_removed_ingredients" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "order_item_removed_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telegram_subscribers_telegramChatId_key" ON "telegram_subscribers"("telegramChatId");

-- CreateIndex
CREATE INDEX "telegram_subscribers_telegramChatId_idx" ON "telegram_subscribers"("telegramChatId");

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_menuItemId_idx" ON "order_items"("menuItemId");

-- CreateIndex
CREATE INDEX "order_item_ingredients_orderItemId_idx" ON "order_item_ingredients"("orderItemId");

-- CreateIndex
CREATE INDEX "order_item_ingredients_ingredientId_idx" ON "order_item_ingredients"("ingredientId");

-- CreateIndex
CREATE INDEX "order_item_extras_orderItemId_idx" ON "order_item_extras"("orderItemId");

-- CreateIndex
CREATE INDEX "order_item_extras_extraId_idx" ON "order_item_extras"("extraId");

-- CreateIndex
CREATE UNIQUE INDEX "order_item_extras_orderItemId_extraId_key" ON "order_item_extras"("orderItemId", "extraId");

-- CreateIndex
CREATE INDEX "order_item_removed_ingredients_orderItemId_idx" ON "order_item_removed_ingredients"("orderItemId");

-- CreateIndex
CREATE INDEX "order_item_removed_ingredients_ingredientId_idx" ON "order_item_removed_ingredients"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "order_item_removed_ingredients_orderItemId_ingredientId_key" ON "order_item_removed_ingredients"("orderItemId", "ingredientId");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_ingredients" ADD CONSTRAINT "order_item_ingredients_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_extras" ADD CONSTRAINT "order_item_extras_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_removed_ingredients" ADD CONSTRAINT "order_item_removed_ingredients_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
