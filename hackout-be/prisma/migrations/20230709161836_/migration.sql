/*
  Warnings:

  - A unique constraint covering the columns `[pk_doctor_id]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pk_patient_id]` on the table `patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `doctor_email_key` ON `doctor`;

-- DropIndex
DROP INDEX `patient_email_key` ON `patient`;

-- CreateIndex
CREATE UNIQUE INDEX `pk_doctor_id` ON `doctor`(`pk_doctor_id`);

-- CreateIndex
CREATE UNIQUE INDEX `pk_patient_id` ON `patient`(`pk_patient_id`);
