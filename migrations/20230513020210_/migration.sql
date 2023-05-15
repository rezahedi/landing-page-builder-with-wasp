-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "contentHtml" TEXT NOT NULL DEFAULT '',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    CONSTRAINT "Pages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pages" ("content", "description", "id", "isPublished", "slug", "title", "userId") SELECT "content", "description", "id", "isPublished", "slug", "title", "userId" FROM "Pages";
DROP TABLE "Pages";
ALTER TABLE "new_Pages" RENAME TO "Pages";
CREATE UNIQUE INDEX "Pages_slug_key" ON "Pages"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
