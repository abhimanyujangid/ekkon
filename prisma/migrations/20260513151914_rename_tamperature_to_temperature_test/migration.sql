/*
  Warnings:

  - You are about to drop the column `tamperature` on the `Generation` table. All the data in the column will be lost.
  - Added the required column `temperature` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "tamperature",
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL;
