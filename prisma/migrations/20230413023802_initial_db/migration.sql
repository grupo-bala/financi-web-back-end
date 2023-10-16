-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financi_user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fixedincome" DECIMAL(10,2) NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "financi_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "total_value" DECIMAL(10,2) NOT NULL,
    "current_value" DECIMAL(10,2) NOT NULL,
    "deadline" DATE NOT NULL,

    CONSTRAINT "goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson" (
    "id" SERIAL NOT NULL,
    "video_url" TEXT NOT NULL,
    "duration_sec" INTEGER NOT NULL,
    "id_course" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "occurrence_date" DATE NOT NULL,
    "id_category" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_entry" BOOLEAN NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viewed_lesson" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_lesson" INTEGER NOT NULL,

    CONSTRAINT "viewed_lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financi_user_username_key" ON "financi_user"("username");

-- AddForeignKey
ALTER TABLE "goal" ADD CONSTRAINT "goal_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "financi_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "financi_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "viewed_lesson" ADD CONSTRAINT "viewed_lesson_id_lesson_fkey" FOREIGN KEY ("id_lesson") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "viewed_lesson" ADD CONSTRAINT "viewed_lesson_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "financi_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
