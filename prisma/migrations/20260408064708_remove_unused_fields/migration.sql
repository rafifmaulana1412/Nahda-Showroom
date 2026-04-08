/*
  Warnings:

  - You are about to drop the column `brand` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `fuel` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `transmission` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brand",
DROP COLUMN "color",
DROP COLUMN "condition",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "features",
DROP COLUMN "fuel",
DROP COLUMN "images",
DROP COLUMN "isFeatured",
DROP COLUMN "model",
DROP COLUMN "transmission",
DROP COLUMN "updatedAt",
DROP COLUMN "year",
ALTER COLUMN "location" DROP NOT NULL;
