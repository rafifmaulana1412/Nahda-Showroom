-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "carId" TEXT,
    "nama" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "email" TEXT,
    "keperluan" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;
