-- CreateTable
CREATE TABLE "basketballMoveCards" (
    "uid" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "basketballMoveCards_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "FavoriteCards" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "basketballMoveId" BIGINT NOT NULL,

    CONSTRAINT "FavoriteCards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "basketballMoveCards_uid_key" ON "basketballMoveCards"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FavoriteCards" ADD CONSTRAINT "FavoriteCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteCards" ADD CONSTRAINT "FavoriteCards_basketballMoveId_fkey" FOREIGN KEY ("basketballMoveId") REFERENCES "basketballMoveCards"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
