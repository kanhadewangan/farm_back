/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "farmer" ALTER COLUMN "id" DROP DEFAULT,
ADD CONSTRAINT "farmer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "farmer_id_seq";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_image_key" ON "product"("image");
