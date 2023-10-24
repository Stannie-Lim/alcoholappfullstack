/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_favoriteSpiritId_fkey";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "favoriteSpiritId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_favoriteSpiritId_fkey" FOREIGN KEY ("favoriteSpiritId") REFERENCES "spirit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
