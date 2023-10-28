import { PrismaClient } from "@nuxeland/database";

export const prisma: PrismaClient = new PrismaClient({
  errorFormat: "pretty",
});
