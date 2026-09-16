-- CreateTable
CREATE TABLE `HeroContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `heading` TEXT NOT NULL,
    `subheading` TEXT NULL,
    `ctaText` VARCHAR(191) NULL,
    `ctaLink` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
