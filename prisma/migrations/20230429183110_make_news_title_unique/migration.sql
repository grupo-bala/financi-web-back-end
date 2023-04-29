/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `news` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_title" ON "news"("title");
