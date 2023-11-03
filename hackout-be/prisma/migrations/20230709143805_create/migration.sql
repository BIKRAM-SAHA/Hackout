-- CreateTable
CREATE TABLE `patient` (
    `pk_patient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `age` VARCHAR(255) NOT NULL,
    `doctor_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `fk_doctor_id` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `pk_patient_id`(`pk_patient_id`),
    INDEX `patient_doctor_id`(`fk_doctor_id`),
    PRIMARY KEY (`pk_patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctor` (
    `pk_doctor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `age` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `pk_doctor_id`(`pk_doctor_id`),
    PRIMARY KEY (`pk_doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disease` (
    `pk_disease_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `disease_name` VARCHAR(255) NULL,
    `drug_name` VARCHAR(255) NULL,

    UNIQUE INDEX `pk_disease_id`(`pk_disease_id`),
    INDEX `disease_patient_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_disease_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tracker` (
    `pk_tracker_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gestational_age` INTEGER NULL,
    `weight` INTEGER NULL,
    `belly_size` INTEGER NULL,
    `blood_pressure` INTEGER NULL,
    `fundal_height` INTEGER NULL,
    `fetal_movement` INTEGER NULL,
    `edema` VARCHAR(191) NULL,
    `heart_rate` INTEGER NULL,

    UNIQUE INDEX `pk_tracker_id`(`pk_tracker_id`),
    PRIMARY KEY (`pk_tracker_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `map_tracker_patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `fk_tracker_id` INTEGER NOT NULL,

    UNIQUE INDEX `pk_map_tracker_patient_id`(`id`),
    INDEX `patient_map_patient_id`(`fk_patient_id`),
    INDEX `patient_tracker_id`(`fk_tracker_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contraction` (
    `pk_contraction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `timmings` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `pk_contraction_id`(`pk_contraction_id`),
    PRIMARY KEY (`pk_contraction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `map_contraction_patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `fk_contraction_id` INTEGER NOT NULL,

    UNIQUE INDEX `pk_map_contraction_patient_id`(`id`),
    INDEX `map_patient_contraction_id`(`fk_contraction_id`),
    INDEX `patient_map_contraction_patient_id`(`fk_patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nutrition` (
    `pk_nutrition_id` INTEGER NOT NULL AUTO_INCREMENT,
    `weight` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `bmi` INTEGER NOT NULL,
    `normal_scale` INTEGER NULL,
    `category` VARCHAR(191) NULL,
    `week_no` INTEGER NOT NULL,
    `trimester` INTEGER NOT NULL,
    `fk_patient_id` INTEGER NOT NULL,

    UNIQUE INDEX `pk_nutrition_id`(`pk_nutrition_id`),
    INDEX `map_patient_nutrition_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_nutrition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient` ADD CONSTRAINT `patient_doctor_id` FOREIGN KEY (`fk_doctor_id`) REFERENCES `doctor`(`pk_doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `disease` ADD CONSTRAINT `patient_disease_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `map_tracker_patient` ADD CONSTRAINT `patient_map_patient_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `map_tracker_patient` ADD CONSTRAINT `patient_tracker_id` FOREIGN KEY (`fk_tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `map_contraction_patient` ADD CONSTRAINT `map_patient_contraction_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `map_contraction_patient` ADD CONSTRAINT `patient_map_contraction_patient_id` FOREIGN KEY (`fk_contraction_id`) REFERENCES `contraction`(`pk_contraction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nutrition` ADD CONSTRAINT `map_patient_nutrition_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;
