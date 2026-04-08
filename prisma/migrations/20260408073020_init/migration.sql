/*
  Warnings:

  - You are about to drop the column `bodyCondition` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `documentCondition` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `engineCondition` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `firstOwner` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `interiorCondition` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `tireCondition` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_carId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_carId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "bodyCondition",
DROP COLUMN "documentCondition",
DROP COLUMN "engineCondition",
DROP COLUMN "firstOwner",
DROP COLUMN "interiorCondition",
DROP COLUMN "service",
DROP COLUMN "tax",
DROP COLUMN "tireCondition",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "fuel" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "transmission" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "User";
