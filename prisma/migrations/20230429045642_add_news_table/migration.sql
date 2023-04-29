-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publish_date" DATE NOT NULL,
    "last_update_date" DATE,
    "img_url" TEXT NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_title_summary_content_key" ON "news"("title", "summary", "content");
