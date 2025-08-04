/*
  Warnings:

  - You are about to drop the column `count` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "count";

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
