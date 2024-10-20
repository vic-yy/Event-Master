-- CreateTable
CREATE TABLE `Participant` (
    `participantId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_event_unique` (`userId`, `eventId`),
    PRIMARY KEY (`participantId`),

    CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`) ON DELETE CASCADE,
    CONSTRAINT `fk_event` FOREIGN KEY (`eventId`) REFERENCES `Event` (`eventId`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;