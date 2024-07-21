/*
  Warnings:

  - Added the required column `updateAt` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` ADD COLUMN `updateAt` DATETIME(3) NOT NULL;
