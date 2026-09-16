-- CreateTable
CREATE TABLE `AssessmentResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `job` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `answers` JSON NOT NULL,
    `results` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AssessmentResult_userId_idx`(`userId`),
    INDEX `AssessmentResult_type_idx`(`type`),
    INDEX `AssessmentResult_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssessmentResult` ADD CONSTRAINT `AssessmentResult_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
