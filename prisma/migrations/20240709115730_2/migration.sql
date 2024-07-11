/*
  Warnings:

  - Added the required column `order_id` to the `Order_has_Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_has_product` ADD COLUMN `order_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order_has_Product` ADD CONSTRAINT `Order_has_Product_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
