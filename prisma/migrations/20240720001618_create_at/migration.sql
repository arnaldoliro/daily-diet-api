/*
  Warnings:

  - You are about to drop the column `teste` on the `meals` table. All the data in the column will be lost.
  - Added the required column `createAt` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` DROP COLUMN `teste`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL;
