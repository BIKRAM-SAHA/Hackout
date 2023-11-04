-- CreateTable
CREATE TABLE `patient` (
    `pk_patient_id` INTEGER NOT NULL AUTO_INCREMENT,
    `age` VARCHAR(255) NOT NULL,
    `doctor_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `fk_doctor_id` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` TEXT NULL,

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
    `token` TEXT NULL,

    UNIQUE INDEX `pk_doctor_id`(`pk_doctor_id`),
    PRIMARY KEY (`pk_doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disease` (
    `pk_disease_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_patient_id` INTEGER NOT NULL,
    `disease_name` VARCHAR(255) NULL,
    `drug_name` VARCHAR(255) NULL,
    `side_effect` VARCHAR(255) NULL,

    UNIQUE INDEX `pk_disease_id`(`pk_disease_id`),
    INDEX `disease_patient_id`(`fk_patient_id`),
    PRIMARY KEY (`pk_disease_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maternal_weight` (
    `pk_mw` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `weight` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_mw`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blood_pressure` (
    `pk_bp` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bloodpr` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_bp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fetal_movement` (
    `pk_fm` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `movement` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_fm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fetal_heart_rate` (
    `pk_fhr` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fetal_heart_rate` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_fhr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `waist_circumference` (
    `pk_wc` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `circumference` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_wc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amniotic_fluid_index` (
    `pk_afx` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amniotic_fluid_index` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_afx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blood_sugar_level` (
    `pk_bs` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `blood_sugar` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_bs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thyroid_function` (
    `pk_tf` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `thyroid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_tf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `iron_level` (
    `pk_il` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iron` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pk_il`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vitamin_d_level` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tracker_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vitamin_d` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tracker` (
    `pk_tracker_id` INTEGER NOT NULL AUTO_INCREMENT,

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
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `time_apart` DATETIME(3) NOT NULL,
    `length` DATETIME(3) NOT NULL,

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
ALTER TABLE `maternal_weight` ADD CONSTRAINT `maternal_weight_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blood_pressure` ADD CONSTRAINT `blood_pressure_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fetal_movement` ADD CONSTRAINT `fetal_movement_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fetal_heart_rate` ADD CONSTRAINT `fetal_heart_rate_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `waist_circumference` ADD CONSTRAINT `waist_circumference_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `amniotic_fluid_index` ADD CONSTRAINT `amniotic_fluid_index_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blood_sugar_level` ADD CONSTRAINT `blood_sugar_level_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thyroid_function` ADD CONSTRAINT `thyroid_function_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `iron_level` ADD CONSTRAINT `iron_level_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vitamin_d_level` ADD CONSTRAINT `vitamin_d_level_tracker_id_fkey` FOREIGN KEY (`tracker_id`) REFERENCES `tracker`(`pk_tracker_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
