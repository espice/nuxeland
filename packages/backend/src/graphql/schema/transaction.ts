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
              currency: "usd",
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
}));
