/*
  Warnings:

  - You are about to drop the column `materia` on the `Professores` table. All the data in the column will be lost.
  - Added the required column `materias` to the `Professores` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "materias" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "fotosrc" TEXT
);
INSERT INTO "new_Professores" ("departamento", "fotosrc", "id", "nome") SELECT "departamento", "fotosrc", "id", "nome" FROM "Professores";
DROP TABLE "Professores";
ALTER TABLE "new_Professores" RENAME TO "Professores";
CREATE UNIQUE INDEX "Professores_nome_key" ON "Professores"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
