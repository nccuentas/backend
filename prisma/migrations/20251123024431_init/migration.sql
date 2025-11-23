-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StreamingAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreServicio` VARCHAR(191) NOT NULL,
    `correoAcceso` VARCHAR(191) NOT NULL,
    `contrasenaAcceso` VARCHAR(191) NOT NULL,
    `fechaAdquisicion` DATETIME(3) NULL,
    `fechaExpiracion` DATETIME(3) NULL,
    `notasAdicionales` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombrePerfil` VARCHAR(191) NULL,
    `tienePin` BOOLEAN NULL,
    `pin` VARCHAR(191) NULL,
    `asignadoACliente` VARCHAR(191) NULL,
    `estadoPerfil` ENUM('Libre', 'Ocupado', 'Mantenimiento') NOT NULL DEFAULT 'Libre',
    `streamingAccountId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_streamingAccountId_fkey` FOREIGN KEY (`streamingAccountId`) REFERENCES `StreamingAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
