-- AlterTable
ALTER TABLE `career` MODIFY `description` TEXT NOT NULL,
    MODIFY `requirements` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `event` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `forum` MODIFY `quote` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `news` ADD COLUMN `author` VARCHAR(191) NULL,
    MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `description` TEXT NOT NULL;
