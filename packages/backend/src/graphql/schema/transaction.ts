import { builder } from "../builder";
import { prisma } from "../../client/prisma";

const TransactionUser = builder.prismaObject("User", {
  variant: "TransactionUser",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    avatar: t.exposeString("avatar"),
  }),
});

builder.prismaObject("Transaction", {
  fields: (t) => ({
    id: t.exposeID("id"),
    amount: t.exposeInt("amount"),
    initiator: t.relation("initiator", { type: TransactionUser }),
    receiver: t.relation("receiver", { type: TransactionUser }),
  }),
});
