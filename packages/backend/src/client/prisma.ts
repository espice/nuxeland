import { PrismaClient } from "@cw23/database";

export const prisma: PrismaClient = new PrismaClient({
  errorFormat: "pretty",
});
