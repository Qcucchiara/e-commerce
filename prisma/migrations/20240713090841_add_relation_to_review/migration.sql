/*
  Warnings:

  - Added the required column `order_has_product_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `review` ADD COLUMN `order_has_product_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_order_has_product_id_fkey` FOREIGN KEY (`order_has_product_id`) REFERENCES `Order_has_Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
