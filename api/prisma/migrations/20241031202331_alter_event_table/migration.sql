/*
  Warnings:

  - Added the required column `category` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizer` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `organizer` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` VARCHAR(191) NOT NULL;
