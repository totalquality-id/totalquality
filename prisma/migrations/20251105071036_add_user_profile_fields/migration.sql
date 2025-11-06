/*
  Warnings:

  - You are about to drop the `_careertouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_careertouser` DROP FOREIGN KEY `_CareerToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_careertouser` DROP FOREIGN KEY `_CareerToUser_B_fkey`;

-- AlterTable
ALTER TABLE `career` ADD COLUMN `experience` VARCHAR(191) NULL,
    ADD COLUMN `jobType` VARCHAR(191) NULL,
    ADD COLUMN `salary` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `certifications` TEXT NULL,
    ADD COLUMN `dateOfBirth` DATETIME(3) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `gpa` DOUBLE NULL,
    ADD COLUMN `graduationYear` INTEGER NULL,
    ADD COLUMN `institution` VARCHAR(191) NULL,
    ADD COLUMN `isProfileComplete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `jobDescription` TEXT NULL,
    ADD COLUMN `lastCompany` VARCHAR(191) NULL,
    ADD COLUMN `lastEducation` VARCHAR(191) NULL,
    ADD COLUMN `lastPosition` VARCHAR(191) NULL,
    ADD COLUMN `linkedinUrl` VARCHAR(191) NULL,
    ADD COLUMN `major` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `portfolioUrl` VARCHAR(191) NULL,
    ADD COLUMN `reasonLeaving` TEXT NULL,
    ADD COLUMN `skills` TEXT NULL,
    ADD COLUMN `workEndDate` DATETIME(3) NULL,
    ADD COLUMN `workStartDate` DATETIME(3) NULL;

-- DropTable
DROP TABLE `_careertouser`;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `careerId` INTEGER NOT NULL,
    `coverLetter` TEXT NULL,
    `expectedSalary` VARCHAR(191) NULL,
    `availableDate` DATETIME(3) NULL,
    `referenceContact` TEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `appliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reviewedAt` DATETIME(3) NULL,
    `notes` TEXT NULL,

    INDEX `Application_userId_idx`(`userId`),
    INDEX `Application_careerId_idx`(`careerId`),
    UNIQUE INDEX `Application_userId_careerId_key`(`userId`, `careerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserCareers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserCareers_AB_unique`(`A`, `B`),
    INDEX `_UserCareers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `Career`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserCareers` ADD CONSTRAINT `_UserCareers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Career`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserCareers` ADD CONSTRAINT `_UserCareers_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
