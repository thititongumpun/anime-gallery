-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "is_bestseller" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_new" BOOLEAN NOT NULL DEFAULT true;
