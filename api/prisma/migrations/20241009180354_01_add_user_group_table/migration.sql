-- CreateTable
CREATE TABLE `User_Group` (
    `user_groupId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_group_unique` (`userId`, `groupId`),
    PRIMARY KEY (`user_groupId`),

    CONSTRAINT `fk_email` FOREIGN KEY (`email`) REFERENCES `User` (`email`) ON DELETE CASCADE,
    CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`) ON DELETE CASCADE,
    CONSTRAINT `fk_group` FOREIGN KEY (`groupId`) REFERENCES `Group` (`groupId`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
