-- DropForeignKey
ALTER TABLE `meals` DROP FOREIGN KEY `meals_userId_fkey`;

-- DropIndex
DROP INDEX `user_id_key` ON `user`;

-- AlterTable
ALTER TABLE `meals` MODIFY `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
