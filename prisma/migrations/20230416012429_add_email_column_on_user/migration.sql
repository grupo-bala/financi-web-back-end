/*
  Warnings:

  - Added the required column `email` to the `financi_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financi_user" ADD COLUMN     "email" TEXT NOT NULL;
