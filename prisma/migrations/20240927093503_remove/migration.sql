/*
  Warnings:

  - You are about to drop the column `image` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "product_image_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "image";
