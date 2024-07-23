/*
  Warnings:

  - Added the required column `updatedAt` to the `User_Has_Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_Has_Product_product_id_fkey` ON `user_has_product`;

-- DropIndex
DROP INDEX `User_Has_Product_user_id_fkey` ON `user_has_product`;

-- AlterTable
ALTER TABLE `user_has_product` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `User_Has_Product` ADD CONSTRAINT `User_Has_Product_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Has_Product` ADD CONSTRAINT `User_Has_Product_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
