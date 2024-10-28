-- CreateTable
CREATE TABLE `Event_Group` (
    `event_groupId` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `event_group_unique` (`eventId`, `groupId`),
    PRIMARY KEY (`event_groupId`),

    CONSTRAINT `fk_event` FOREIGN KEY (`eventId`) REFERENCES `Event` (`eventId`) ON DELETE CASCADE,
    CONSTRAINT `fk_group` FOREIGN KEY (`groupId`) REFERENCES `Group` (`groupId`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
