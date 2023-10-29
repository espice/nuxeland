import { builder } from "../builder";
import { prisma } from "../../client/prisma";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
    avatar: t.exposeString("avatar"),
    balance: t.exposeInt("balance"),
    transactions: t.prismaField({
      type: ["Transaction"],
      resolve: async (query, _root, _args, ctx) => {
        return await prisma.transaction.findMany({
          where: {
            OR: [
              {
                receiverId: ctx.userId,
              },
              {
                initiatorId: ctx.userId,
              },
            ],
          },
          ...query,
        });
      },
    }),
  }),
});

builder.queryFields((t) => ({
  me: t.withAuth({ loggedIn: true }).prismaField({
    type: "User",
    resolve: async (query, _root, _args, ctx) => {
      return await prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.userId,
        },
        ...query,
      });
    },
  }),
}));
