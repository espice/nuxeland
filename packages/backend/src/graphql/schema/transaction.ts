import { builder } from "../builder";
import { prisma } from "../../client/prisma";
import { stripe } from "../../client/stripe";
import { env } from "../../utils/env";

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

builder.mutationFields((t) => ({
  createCheckout: t.withAuth({ loggedIn: true }).field({
    type: "String",
    nullable: true,
    args: {
      amount: t.arg.int({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const checkoutSession = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
          {
            price_data: {
              unit_amount: args.amount,
              currency: "inr",
              product_data: {
                name: "Add Balance",
                description: "Add Balance to your nuxEland Account.",
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        return_url: `${env(
          "FRONTEND_URL"
        )}/pay/return?session_id={CHECKOUT_SESSION_ID}`,
      });

      return checkoutSession.client_secret;
    },
  }),
  addBalance: t.withAuth({ loggedIn: true }).field({
    type: "Boolean",
    args: {
      sessionId: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      try {
        const session = await stripe.checkout.sessions.retrieve(args.sessionId);

        if (session.status != "complete") return false;

        const transaction = await prisma.transaction.findFirst({
          where: {
            stripeSessionId: args.sessionId,
          },
        });

        if (transaction) return false;

        const amount = session.amount_subtotal as number;

        await prisma.user.update({
          where: {
            id: ctx.userId,
          },
          data: {
            balance: {
              increment: amount,
            },
          },
        });

        await prisma.transaction.create({
          data: {
            amount,
            receiverId: ctx.userId,
            initiatorId: ctx.userId,
            stripeSessionId: args.sessionId,
          },
        });

        return true;
      } catch (e) {
        return false;
      }
    },
  }),
}));
