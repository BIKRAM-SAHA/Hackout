/*
  Warnings:

  - You are about to alter the column `amniotic_fluid_index` on the `amniotic_fluid_index` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,0)`.
  - You are about to drop the column `bloodpr` on the `blood_pressure` table. All the data in the column will be lost.
  - You are about to drop the column `blood_sugar` on the `blood_sugar_level` table. All the data in the column will be lost.
  - You are about to alter the column `fetal_heart_rate` on the `fetal_heart_rate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,0)`.
  - You are about to alter the column `movement` on the `fetal_movement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `haemoglobin` on the `haemoglobin_level` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,0)`.
  - You are about to alter the column `weight` on the `maternal_weight` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,0)`.
  - You are about to drop the column `max` on the `standard_blood_pressure` table. All the data in the column will be lost.
  - You are about to drop the column `min` on the `standard_blood_pressure` table. All the data in the column will be lost.
  - You are about to alter the column `thyroid` on the `thyroid_function` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,0)`.
  - You are about to drop the `waist_circumference` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `diastolic` to the `blood_pressure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `systolic` to the `blood_pressure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blood_sugar_2_post_food` to the `blood_sugar_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blood_sugar_fast` to the `blood_sugar_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blood_sugar_one_post_food` to the `blood_sugar_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_dias` to the `standard_blood_pressure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_sys` to the `standard_blood_pressure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_dias` to the `standard_blood_pressure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_sys` to the `standard_blood_pressure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `waist_circumference` DROP FOREIGN KEY `waist_circumference_tracker_id_fkey`;

-- AlterTable
ALTER TABLE `amniotic_fluid_index` MODIFY `amniotic_fluid_index` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `blood_pressure` DROP COLUMN `bloodpr`,
    ADD COLUMN `diastolic` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `systolic` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `blood_sugar_level` DROP COLUMN `blood_sugar`,
    ADD COLUMN `blood_sugar_2_post_food` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `blood_sugar_fast` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `blood_sugar_one_post_food` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `fetal_heart_rate` MODIFY `fetal_heart_rate` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `fetal_movement` MODIFY `movement` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `haemoglobin_level` MODIFY `haemoglobin` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `maternal_weight` MODIFY `weight` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `standard_blood_pressure` DROP COLUMN `max`,
    DROP COLUMN `min`,
    ADD COLUMN `max_dias` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `max_sys` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `min_dias` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `min_sys` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `thyroid_function` MODIFY `thyroid` DECIMAL(10, 0) NOT NULL;

-- DropTable
DROP TABLE `waist_circumference`;
