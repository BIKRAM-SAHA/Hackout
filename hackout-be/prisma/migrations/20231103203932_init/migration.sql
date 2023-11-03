/*
  Warnings:

  - You are about to drop the column `bmi` on the `nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `trimester` on the `nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `week_no` on the `nutrition` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `nutrition` table. All the data in the column will be lost.
  - You are about to drop the `iron_level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `map_tracker_patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vitamin_d_level` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fk_tracker_id` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `iron_level` DROP FOREIGN KEY `iron_level_tracker_id_fkey`;

-- DropForeignKey
ALTER TABLE `map_tracker_patient` DROP FOREIGN KEY `patient_map_patient_id`;

-- DropForeignKey
ALTER TABLE `map_tracker_patient` DROP FOREIGN KEY `patient_tracker_id`;

-- DropForeignKey
ALTER TABLE `vitamin_d_level` DROP FOREIGN KEY `vitamin_d_level_tracker_id_fkey`;

-- AlterTable
ALTER TABLE `nutrition` DROP COLUMN `bmi`,
    DROP COLUMN `height`,
    DROP COLUMN `trimester`,
    DROP COLUMN `week_no`,
    DROP COLUMN `weight`;

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `bmi` INTEGER NULL,
    ADD COLUMN `fk_tracker_id` INTEGER NOT NULL,
    ADD COLUMN `maternal_height` INTEGER NULL,
    ADD COLUMN `maternal_weight` INTEGER NULL,
    ADD COLUMN `trimester` INTEGER NULL,
    ADD COLUMN `week_no` INTEGER NULL;

-- DropTable
DROP TABLE `iron_level`;

-- DropTable
DROP TABLE `map_tracker_patient`;

-- DropTable
DROP TABLE `vitamin_d_level`;

-- CreateTable
CREATE TABLE `allergy` (
    `pk_allergy_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `pk_allergy_id`(`pk_allergy_id`),
    INDEX `map_patient_allergy_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_allergy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `standard_blood_pressure` (
    `pk_standard_blood_pressure_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,
    `other_symptoms` VARCHAR(255) NULL,

    UNIQUE INDEX `pk_standard_blood_pressure_id`(`pk_standard_blood_pressure_id`),
    INDEX `map_standard_blood_pressure_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_standard_blood_pressure_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `standard_fetal_heart_rate` (
    `pk_standard_fetal_heart_rate_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,

    UNIQUE INDEX `pk_standard_fetal_heart_rate_id`(`pk_standard_fetal_heart_rate_id`),
    INDEX `map_fetal_heart_rate_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_standard_fetal_heart_rate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `standard_amniotic_fluid_index` (
    `pk_standard_amniotic_fluid_index_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,

    UNIQUE INDEX `pk_standard_amniotic_fluid_index_id`(`pk_standard_amniotic_fluid_index_id`),
    INDEX `map_amniotic_fluid_index_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_standard_amniotic_fluid_index_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `standard_blood_sugar_levels` (
    `pk_standard_blood_sugar_levels_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `before_meal_min` DECIMAL(10, 0) NOT NULL,
    `before_meal_max` DECIMAL(10, 0) NOT NULL,
    `hour_after_meal_min` DECIMAL(10, 0) NOT NULL,
    `hour_after_meal_max` DECIMAL(10, 0) NOT NULL,
    `two_hours_after_meal_min` DECIMAL(10, 0) NOT NULL,
    `two_hours_after_meal_max` DECIMAL(10, 0) NOT NULL,

    UNIQUE INDEX `pk_standard_blood_sugar_levels_id`(`pk_standard_blood_sugar_levels_id`),
    INDEX `map_standard_blood_sugar_levels_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_standard_blood_sugar_levels_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `standard_thyroid_function` (
    `pk_standard_thyroid_function_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,

    UNIQUE INDEX `pk_standard_thyroid_function_id`(`pk_standard_thyroid_function_id`),
    INDEX `map_standard_thyroid_function_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_standard_thyroid_function_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `standard_haemoglobin_level` (
    `pk_standard_haemoglobin_level_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `min` DECIMAL(10, 0) NOT NULL,
    `max` DECIMAL(10, 0) NOT NULL,

    UNIQUE INDEX `pk_standard_haemoglobin_level_id`(`pk_standard_haemoglobin_level_id`),
    INDEX `map_standard_haemoglobin_level_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_standard_haemoglobin_level_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `haemoglobin_level` (
    `pk_hl` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `haemoglobin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_hl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patient` ADD CONSTRAINT `patient_tracker_id` FOREIGN KEY (`fk_tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergy` ADD CONSTRAINT `map_patient_allergy_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `standard_blood_pressure` ADD CONSTRAINT `map_standard_blood_pressure_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `standard_fetal_heart_rate` ADD CONSTRAINT `map_standard_fetal_heart_rate_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `standard_amniotic_fluid_index` ADD CONSTRAINT `map_standard_amniotic_fluid_index_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `standard_blood_sugar_levels` ADD CONSTRAINT `map_standard_blood_sugar_levels_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `standard_thyroid_function` ADD CONSTRAINT `map_standard_thyroid_function_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `standard_haemoglobin_level` ADD CONSTRAINT `map_standard_haemoglobin_level_id` FOREIGN KEY (`fk_patient_id`) REFERENCES `patient`(`pk_patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `haemoglobin_level` ADD CONSTRAINT `haemoglobin_level_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
