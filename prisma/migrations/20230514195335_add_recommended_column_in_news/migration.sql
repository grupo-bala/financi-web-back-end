/*
  Warnings:

  - Added the required column `recommended` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "recommended" BOOLEAN NOT NULL;
