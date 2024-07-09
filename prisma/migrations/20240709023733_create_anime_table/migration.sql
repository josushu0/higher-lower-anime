-- CreateTable
CREATE TABLE "Anime" (
    "id" INTEGER NOT NULL,
    "averageScore" INTEGER NOT NULL,
    "xlUrl" TEXT NOT NULL,
    "lgUrl" TEXT NOT NULL,
    "mdUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_id_key" ON "Anime"("id");
