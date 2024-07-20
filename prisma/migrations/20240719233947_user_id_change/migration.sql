/*
  Warnings:

  - Made the column `userId` on table `meals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `meals` DROP FOREIGN KEY `meals_userId_fkey`;

-- AlterTable
ALTER TABLE `meals` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `meals` ADD CONSTRAINT `meals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
