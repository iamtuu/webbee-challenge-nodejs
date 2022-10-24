import { Migration } from '../cli/migration';
import { PrismaClient } from "@prisma/client";

export default class implements Migration {
  async up(prisma: PrismaClient) {
    /**
     # ToDo: Create a migration that creates all tables for the following user stories

     For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
     To not introduce additional complexity, please consider only one cinema.

     Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

     ## User Stories

     **Movie exploration**
     * As a user I want to see which films can be watched and at what times
     * As a user I want to only see the shows which are not booked out

     **Show administration**
     * As a cinema owner I want to run different films at different times
     * As a cinema owner I want to run multiple films at the same time in different showrooms

     **Pricing**
     * As a cinema owner I want to get paid differently per show
     * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

     **Seating**
     * As a user I want to book a seat
     * As a user I want to book a vip seat/couple seat/super vip/whatever
     * As a user I want to see which seats are still available
     * As a user I want to know where I'm sitting on my ticket
     * As a cinema owner I dont want to configure the seating for every show
     */

    await prisma.$queryRaw`CREATE TABLE "user" (
      "id"        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "firstName" TEXT NOT NULL,
      "lastName"  TEXT NOT NULL,
      "email"     TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "bookType" (
      "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "typeName"    TEXT NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "seat" (
      "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name"        TEXT NOT NULL,
      "bookTypeId"  INTEGER NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "showroom" (
      "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name"        TEXT NOT NULL,
      "seatAmount"  INTERGER NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "showroomSeat" (
      "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "showroomId"  INTERGER NOT NULL,
      "seatId"      INTERGER NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "showtime" (
      "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "start"       DATETIME NOT NULL,
      "end"         DATETIME NOT NULL,
      "showroomId"  INTEGER NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "cinema" (
      "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name"        TEXT NOT NULL,
      "showtimeId"  INTEGER NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "cinemaPrice" (
      "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "cinemaId"    INTEGER NOT NULL,
      "seatId"      INTEGER NOT NULL,
      "price"       INTEGER NOT NULL,
      "createdAt"   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$queryRaw`CREATE TABLE "cinemaBooked" (
      "id"            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "cinemaPriceId" INTEGER NOT NULL,
      "userId"        INTEGER NOT NULL,
      "createdAt"     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`;

  }

  async down(prisma: PrismaClient) {
    await prisma.$queryRaw`DROP TABLE "user"`;
    await prisma.$queryRaw`DROP TABLE "bookType"`;
    await prisma.$queryRaw`DROP TABLE "seat"`;
    await prisma.$queryRaw`DROP TABLE "showroom"`;
    await prisma.$queryRaw`DROP TABLE "showroomSeat"`;
    await prisma.$queryRaw`DROP TABLE "showtime"`;
    await prisma.$queryRaw`DROP TABLE "cinema"`;
    await prisma.$queryRaw`DROP TABLE "cinemaPrice"`;
    await prisma.$queryRaw`DROP TABLE "cinemaBooked"`;
  }
}
