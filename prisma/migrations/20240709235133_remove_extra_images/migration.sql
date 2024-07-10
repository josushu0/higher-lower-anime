/*
  Warnings:

  - You are about to drop the column `lgUrl` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `mdUrl` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `xlUrl` on the `Anime` table. All the data in the column will be lost.
  - Added the required column `image` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anime" (
    "id" INTEGER NOT NULL,
    "averageScore" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Anime" ("averageScore", "id", "title") SELECT "averageScore", "id", "title" FROM "Anime";
DROP TABLE "Anime";
ALTER TABLE "new_Anime" RENAME TO "Anime";
CREATE UNIQUE INDEX "Anime_id_key" ON "Anime"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
