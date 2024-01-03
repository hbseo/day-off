-- CreateTable
CREATE TABLE "OffDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "OffDate_pkey" PRIMARY KEY ("id")
);
