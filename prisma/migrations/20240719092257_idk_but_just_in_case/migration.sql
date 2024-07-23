-- DropIndex
DROP INDEX `User_Has_Product_product_id_fkey` ON `user_has_product`;

-- DropIndex
DROP INDEX `User_Has_Product_user_id_fkey` ON `user_has_product`;

-- AddForeignKey
ALTER TABLE `User_Has_Product` ADD CONSTRAINT `User_Has_Product_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Has_Product` ADD CONSTRAINT `User_Has_Product_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
