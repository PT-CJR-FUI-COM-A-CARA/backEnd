/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Materias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Materias_nome_key" ON "Materias"("nome");
