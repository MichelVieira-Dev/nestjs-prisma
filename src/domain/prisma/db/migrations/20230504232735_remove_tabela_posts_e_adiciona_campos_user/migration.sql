/*
  Warnings:

  - You are about to drop the column `obs` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `obs`,
    ADD COLUMN `password` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `post`;
