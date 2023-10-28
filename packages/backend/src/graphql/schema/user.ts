import { builder } from "../builder";
import { prisma } from "../../client/prisma";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
    avatar: t.exposeString("avatar"),
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
