import { builder } from "../builder";
import { prisma } from "../../client/prisma";
import { env } from "../../utils/env";

const PublicUser = builder.prismaObject("User", {
  variant: "PublicUser",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    avatar: t.exposeString("avatar"),
  }),
});

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
      try {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: ctx.userId,
          },
          ...query,
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  }),
  userById: t.withAuth({ loggedIn: true }).prismaField({
    type: PublicUser,
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      try {
        return await prisma.user.findUnique({
          where: {
            id: args.id,
          },
          ...query,
        });
      } catch (e) {
        return null;
      }
    },
  }),
}));
